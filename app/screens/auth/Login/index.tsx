import { useEffect, useState } from "react";
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

const LoginScreen = () => {
  // STATES
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State lưu lỗi
  // HOOKS
  const isFocused = useIsFocused();
  const navigate = useNavigation();
  useEffect(() => {
    setLoading(true);
    // setAttributes();
  }, [isFocused]);

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      setError("Username và Password không được để trống!");
      return;
    }
    setError(""); // Reset lỗi nếu hợp lệ
    console.log("Đăng nhập thành công với:", { username, password });
    // Thực hiện logic đăng nhập ở đây...
  };

  const handleForgotPassword = () => {
    console.log("Forgot password");
  };

  const handleNavigateHome = () => {
    navigate.navigate("HOME");
  };

  const handleNavigateRegister = () => {
    navigate.navigate("Register");
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
            <Text style={styles.formTitle}>Login</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <View style={styles.formInput}>
              <TextInput
                style={styles.formInputContent}
                placeholder="Enter username or email"
                value={username}
                onChangeText={(text) => setUsername(text.replace(/\s/g, ""))}
              />
            </View>
            <View style={styles.formInput}>
              <TextInput
                style={styles.formInputContent}
                placeholder="Enter password"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text.replace(/\s/g, ""))} // Loại bỏ dấu cách
              />
            </View>
            <View style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </View>
            <View style={styles.signInContainer}>
              <TouchableOpacity
                onPress={() => handleLogin()}
                style={styles.signInBtn}
              >
                <Text style={styles.signInText}>Sign-in</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.oauth2Container}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>OR</Text>
              <View style={styles.oauth2Btn}>
                <TouchableOpacity>
                  <FontAwesome5 name="google" size={35} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <FontAwesome5 name="facebook" size={35} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.registerContainer}>
              <Text>Don't have an account?</Text>
              <TouchableOpacity onPress={() => handleNavigateRegister()}>
                <Text>Sign-up</Text>
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

export default LoginScreen;
