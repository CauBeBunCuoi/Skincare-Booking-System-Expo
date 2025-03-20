import { Alert } from "react-native";

// Thông báo yêu cầu đăng nhập
export const loginRequiredAlert = (navigation: any) => {
  Alert.alert(
    "Bạn phải đăng nhập để thực hiện chức năng này",
    "Vui lòng đăng nhập để tiếp tục",
    [
      {
        text: "Tôi chưa muốn đăng nhập",
        style: "cancel",
        onPress: () =>
          navigation.reset({
            index: 0,
            routes: [{ name: "HOME", params: { screen: "Home" } }],
          }), // Chuyển hướng đến trang Home
      },
      {
        text: "Login",
        style: "default",
        onPress: () =>
          navigation.reset({
            index: 0,
            routes: [{ name: "AUTH", params: { screen: "Login" } }],
          }), // Chuyển hướng đến trang đăng nhập
      },
    ]
  );
};

// Thông báo thành công với message
export const successAlert = (message: string) => {
  Alert.alert("Success!", message, [{ text: "OK" }]);
};

// Thông báo lỗi với chỉ message
export const errorAlert = (message: string) => {
  Alert.alert("Opps!", message, [{ text: "OK" }]);
};

// Thông báo hỏi xác nhận với message, trả về callback
export const confirmAlert = (message: string, onConfirm: () => void) => {
  Alert.alert("Bạn chắc chứ?", message, [
    {
      text: "No",
      style: "cancel",
    },
    {
      text: "Yes",
      onPress: onConfirm, // Gọi hàm khi xác nhận
    },
  ]);
};
