import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {},
  homeBtn: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
    padding: 10,
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  screenTitle: {
    marginVertical: 40,
    fontSize: 40,
    fontFamily: "PostNoBillLight",
    color: "#235347",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  form: {
    padding: 20,
    width: "80%",
    backgroundColor: "rgba(217, 217, 217, 0.22)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  formTitle: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
  },
  formInput: {
    width: "100%",
    marginBottom: 10,
  },
  formInputContent: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "rgba(217, 217, 217, 0.6)",
  },
  phoneContainer: {
    width: "100%",
    borderRadius: 20,
    backgroundColor: "rgba(217, 217, 217, 0.6)",
    paddingVertical: 0, // Cần set 0 vì mặc định PhoneInput có padding
  },
  textContainer: {
    backgroundColor: "transparent",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  textInput: {
    fontSize: 16,
    color: "#333",
    paddingVertical: 0, // Đồng bộ với formInputContent
  },
  flagButton: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  forgotPasswordContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: "black",
    fontSize: 16,
    fontWeight: 600,
    textDecorationLine: "underline",
  },
  signUpContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  signUpBtn: {
    width: "100%",
    padding: 10,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.11)",
    borderWidth: 1,
    borderColor: "#626A5F",
  },

  signUpText: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  oauth2Container: {
    width: "100%",
    alignItems: "center",
    marginBottom: 25,
  },
  oauth2Btn: {
    width: "60%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  registerContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
});
