import { useEffect, useRef, useState } from "react";
import {
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { styles } from "./styles";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import PhoneInput from "react-native-phone-number-input";
import { callApi } from "@/app/api/main/api_call/api";
import { publicApi } from "@/app/api/instance/axiosInstance";
import { successAlert } from "@/utils/alert.util";

const RegisterScreen = () => {
  // STATES
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState(""); // State lưu lỗi
  const [acptTerm, setAcptTerm] = useState(false);
  // HOOKS
  const isFocused = useIsFocused();
  const navigate = useNavigation();
  const phoneInputRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    // setAttributes();
  }, [isFocused]);

  const handleRegister = async () => {
    if (!validate()) return;

    setError(""); // Reset lỗi nếu hợp lệ
    console.log("Đăng ký thành công với:", { username, password });
    // Thực hiện logic đăng nhập ở đây...
    const formData = {
      username,
      password,
      phoneNumber: formatPhoneNumber(phone),
      email,
      fullName,
    };

    const response = await callApi({
      instance: publicApi,
      method: "post",
      url: "/accounts/register",
      data: {
        account: formData,
        imageBase64: "abc",
      },
    });

    if (response.success) {
      successAlert("Đăng ký thành công, chào mừng bạn đến với Lumina Derma!");
      navigate.navigate("Login");
    }
  };

  const handleForgotPassword = () => {
    console.log("Forgot password");
  };

  const handleNavigateHome = () => {
    navigate.navigate("HOME");
  };

  const handleNavigateLogin = () => {
    navigate.navigate("Login");
  };

  const handlePhoneChange = (text) => {
    // Giữ nguyên chuỗi số, không convert thành Number
    const numericPhone = text.replace(/\D/g, "");
    setPhone(numericPhone);
  };

  const formatPhoneNumber = (phone) => {
    if (!phone) return null;

    // Loại bỏ khoảng trắng và các ký tự không phải số
    let formattedPhone = phone.replace(/\D/g, "");

    // Nếu số bắt đầu bằng "84", thay thế thành "0"
    if (formattedPhone.startsWith("84")) {
      formattedPhone = "0" + formattedPhone.slice(2);
    }

    return Number(formattedPhone);
  };

  const validatePhoneNumber = (phone) => {
    if (!phoneInputRef.current) return false; // Nếu ref chưa sẵn sàng, coi như invalid
    return phoneInputRef.current.isValidNumber(phone);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const validateFullName = (fullName) => {
    // Loại bỏ khoảng trắng thừa
    const trimmedName = fullName.trim();

    // Regex: Chỉ chứa chữ cái và dấu cách, có ít nhất 2 từ
    const regex = /^[A-Za-zÀ-Ỹà-ỹ]+(?:\s[A-Za-zÀ-Ỹà-ỹ]+)+$/;

    return regex.test(trimmedName);
  };

  const validate = () => {
    if (
      username.trim() === "" ||
      password.trim() === "" ||
      rePassword.trim() === "" ||
      email.trim() === "" ||
      fullName.trim() === ""
    ) {
      setError("Please fill all fields");
      return false;
    }
    if (!validatePhoneNumber(phone)) {
      setError("Invalid phone number");
      return false;
    }
    if (password !== rePassword) {
      setError("Password not match");
      return false;
    }
    if (!acptTerm) {
      setError("You must accept terms and conditions");
      return false;
    }
    if (!validateEmail(email)) {
      setError("Invalid email");
      return false;
    }
    if (username.trim().length < 6) {
      setError("Username must be at least 6 characters");
      return false;
    }
    if (password.trim().length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (!validateFullName(fullName)) {
      setError("Invalid full name");
      return false;
    }
    return true;
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/images/backgrounds/auth/main.jpg")}
        style={styles.background}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.screenTitle}>Lūmina Derma</Text>
          <View style={styles.form}>
            <Text style={styles.formTitle}>Register</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {/* Username */}
            <View style={styles.formInput}>
              <TextInput
                style={styles.formInputContent}
                placeholder="Your Username"
                value={username}
                onChangeText={(text) => setUsername(text.replace(/\s/g, ""))}
              />
            </View>

            {/* Full name */}
            <View style={styles.formInput}>
              <TextInput
                style={styles.formInputContent}
                placeholder="What should we call you ?"
                value={fullName}
                onChangeText={(text) => setFullName(text)}
              />
            </View>

            {/* Email */}
            <View style={styles.formInput}>
              <TextInput
                style={styles.formInputContent}
                placeholder="Your Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>

            {/* Phone */}
            <View style={styles.formInput}>
              <PhoneInput
                ref={phoneInputRef}
                defaultCode="VN"
                layout="first"
                onChangeFormattedText={handlePhoneChange}
                containerStyle={styles.phoneContainer}
                textContainerStyle={styles.textContainer}
                textInputStyle={styles.textInput}
                flagButtonStyle={styles.flagButton}
              />
            </View>

            {/* Password */}
            <View style={styles.formInput}>
              <TextInput
                style={styles.formInputContent}
                placeholder="Enter password"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text.replace(/\s/g, ""))} // Loại bỏ dấu cách
              />
            </View>

            {/* Re-Password */}
            <View style={styles.formInput}>
              <TextInput
                style={styles.formInputContent}
                placeholder="Re-Enter password"
                secureTextEntry={true}
                value={rePassword}
                onChangeText={(text) => setRePassword(text.replace(/\s/g, ""))} // Loại bỏ dấu cách
              />
            </View>

            <View style={styles.formInput}>
              <TouchableOpacity
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
                onPress={() => setAcptTerm(!acptTerm)}
              >
                <FontAwesome5
                  name={acptTerm ? "check-square" : "square"}
                  size={24}
                  color="#3F3E3E"
                />
                <Text style={{ color: "#3F3E3E", fontWeight: "light" }}>
                  {" "}
                  Accpet Terms and Conditions
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.signUpContainer}>
              <TouchableOpacity
                onPress={() => handleRegister()}
                style={
                  acptTerm
                    ? styles.signUpBtn
                    : {
                        ...styles.signUpBtn,
                        opacity: 0.5,
                      }
                }
                disabled={acptTerm ? false : true}
              >
                <Text style={styles.signUpText}>Sign-Up</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.registerContainer}>
              <Text>Already have an account?</Text>
              <TouchableOpacity onPress={() => handleNavigateLogin()}>
                <Text>Sign-in</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => handleNavigateHome()}
            style={styles.homeBtn}
          >
            <FontAwesome5 name="home" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default RegisterScreen;
