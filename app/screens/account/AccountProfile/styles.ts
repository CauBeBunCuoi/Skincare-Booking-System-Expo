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
  screenTitle: {
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "PostNoBillBold",
    color: "#235347",
    marginTop: 40,
    marginBottom: 20,
  },
  profileContainer: {
    width: w * 0.9,
    padding: 16,
    alignItems: "center",
  },
  informationRow: {
    width: w * 0.8,
    alignItems: "flex-start",
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
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    fontSize: 16,
  },
  totalBookings: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "rgba(217, 217, 217, 0.8)",
    padding: 10,
    borderRadius: 8,
    textAlign: "center",
    marginBottom: 15,
  },
});
