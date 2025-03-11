import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const w = Dimensions.get("window").width;
export const styles = StyleSheet.create({
  header: {},
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    paddingVertical: 10,
    fontWeight: "bold",
  },
  tabContainer: {
    width: w,
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    paddingVertical: 10,
  },
  tabButton: {
    padding: 10,
    borderRadius: 10,
    width: w / 4,
    alignItems: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  comingUpTab: {
    backgroundColor: "#5F89AF",
  },
  completedTab: {
    backgroundColor: "#28413B",
  },
  cancelledTab: {
    backgroundColor: "#A51723",
  },
  tabActive: {
    color: "#F9A80F",
  },
  bookingList: {
    width: w,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});
