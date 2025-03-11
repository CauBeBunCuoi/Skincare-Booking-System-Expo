import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const h = Dimensions.get("window").height;
const w = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  header: {},
  container: {
    flex: 1,
    alignItems: "center",
  },
  screenTitle: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: "#235347",
    marginVertical: 20,
  },
  profileContainer: {
    height: h * 0.6,
    width: w * 0.9,
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  signOutButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    backgroundColor: "rgba(255, 0, 0, 0.6)",
    borderRadius: 5,
    marginVertical: 20,
  },
  signOutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  totalBookings: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#EAEAEA",
    padding: 10,
    borderRadius: 8,
    textAlign: "center",
    marginBottom: 15,
  },
});
