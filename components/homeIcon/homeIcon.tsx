import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Dùng Icon Home từ Ionicons

const HomeIcon = ({ navigation, route }) => {
  // Nếu hiện tại đang ở màn hình "Home", không hiển thị icon
  if (route.name === "Home") {
    return null;
  }

  const handleNavigateToHome = () => {
    navigation.navigate("Home"); // Điều hướng về màn hình "Home"
  };

  return (
    <TouchableOpacity
      onPress={handleNavigateToHome}
      style={styles.iconContainer}
    >
      <Ionicons name="home" size={30} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1, // Đảm bảo icon nổi trên các thành phần khác
  },
});

export default HomeIcon;
