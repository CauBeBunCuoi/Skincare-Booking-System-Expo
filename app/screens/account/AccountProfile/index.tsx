import { useEffect, useState } from "react";
import { ImageBackground, Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { styles } from "./styles";
import { Pressable } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";
import { IconButton, TextInput } from "react-native-paper";
import { asyncStorage_getByKey } from "@/app/tool/AsyncStorage";
import { callApi } from "@/app/api/main/api_call/api";
import { loginRequiredApi } from "@/app/api/instance/axiosInstance";

const data = {
  _id: "1",
  username: "lockthepoet000",
  password: "ầnnwidnaniudwjaidjawwdaw",
  phoneNumber: 896893636,
  email: "lochmse182366@fpt.edu.vn",
  roleId: 2,
  fullName: "Hoàng Minh Lộc",
  isDeleted: false,
  imageUrl:
    "https://i.pinimg.com/736x/02/f0/c5/02f0c538bbc792df8eee860567ea5b83.jpg",
};

const dataBooking = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
  { id: 11 },
  { id: 12 },
  { id: 13 },
];

const AccountProfileScreen = () => {
  // STATES
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [bookings, setBookings] = useState([]);

  // HOOKS
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  useEffect(() => {
    setLoading(true);
    setAttributes();
  }, [isFocused]);

  // FUNCTIONS
  const setAttributes = async () => {
    // Call API to get user profile
    const auth = await asyncStorage_getByKey("auth");

    const user = auth.user;
    setUser(user);

    const bookingHistory = await callApi({
      instance: loginRequiredApi,
      method: "get",
      url: `/bookings/accounts/${user._id}`,
    });
    if (bookingHistory.success) {
      setBookings(bookingHistory.data.bookings);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "AUTH", params: { screen: "Login" } }],
    });
  };

  const handleInputChange = (key, value) => {
    if (key === "phoneNumber") {
      // Loại bỏ bất kỳ ký tự nào không phải số
      let numericValue = value.replace(/[^0-9]/g, "");

      // Nếu bắt đầu với 84 (người dùng nhập đủ mã vùng), loại bỏ để tránh lặp
      if (numericValue.startsWith("84")) {
        numericValue = numericValue.slice(2); // Loại bỏ "84"
      }

      // Cập nhật state với số thuần (không có +84)
      setUser((prev) => ({
        ...prev,
        [key]: numericValue ? parseInt(numericValue) : "",
      }));
    } else {
      setUser((prev) => ({ ...prev, [key]: value }));
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/images/backgrounds/profile/main.jpg")}
        style={styles.background}
      />
      <View style={styles.container}>
        <Text style={styles.screenTitle}>User Profile</Text>
        <View style={styles.profileContainer}>
          <View style={styles.informationRow}>
            <Text style={styles.label}>Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={user.fullName}
                onChangeText={(text) => handleInputChange("fullName", text)}
                onBlur={() => console.log("Updated:", user.fullName)}
                autoCorrect={false} // Không tự động sửa từ
                autoCapitalize="words" // Viết hoa chữ cái đầu
                keyboardType="default" // Cho phép nhập chữ và dấu
              />
              <IconButton icon="pencil" size={18} />
            </View>
          </View>

          <View style={styles.informationRow}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={user.email}
                onChangeText={(text) => handleInputChange("email", text)}
                onBlur={() => console.log("Updated:", user.email)}
                keyboardType="email-address"
              />
              <IconButton icon="pencil" size={18} />
            </View>
          </View>

          <View style={styles.informationRow}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={user.phoneNumber ? `+84 ${user.phoneNumber}` : "+84 "}
                onChangeText={(text) => handleInputChange("phoneNumber", text)}
                onBlur={() => console.log("Updated:", user.phoneNumber)}
                keyboardType="phone-pad"
              />
              <IconButton icon="pencil" size={18} />
            </View>
          </View>

          <View style={styles.informationRow}>
            <Text style={styles.label}>Total Bookings</Text>
            <Text style={styles.totalBookings}>{bookings.length} Bookings</Text>
          </View>
        </View>
        {/* <Pressable
          style={styles.signOutButton}
          onPress={() => {
            // console.log("user", user);
          }}
        >
          <Text style={styles.signOutButtonText}>Check User</Text>
        </Pressable> */}
        <Pressable style={styles.signOutButton} onPress={() => handleLogout()}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AccountProfileScreen;
