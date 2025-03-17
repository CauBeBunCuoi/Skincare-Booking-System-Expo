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
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 40,
    paddingTop: 40,
    color: "white",
    fontWeight: "bold",
  },
  tabContainer: {
    width: w,
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 20,
  },
  tabButton: {
    padding: 10,
    borderRadius: 10,
    width: w / 4,
    alignItems: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    fontFamily: "PostNoBillBold",
    textAlign: "center",
  },
  comingUpTab: {
    backgroundColor: "rgba(75,121, 241, 0.2)",
    borderWidth: 1,
    borderColor: "#5468B7",
  },
  completedTab: {
    backgroundColor: "rgba(119,149, 113, 0.2)",
    borderWidth: 1,
    borderColor: "#779571",
  },
  cancelledTab: {
    backgroundColor: "rgba(243,39, 39, 0.2)",
    borderWidth: 1,
    borderColor: "#F32727",
  },
  tabActive: {
    color: "#F9A80F",
  },
  tabComingActive: {
    color: "#5468B7",
  },
  tabCompleteActive: {
    color: "#C1D6B7",
  },
  tabCancelActive: {
    color: "#F32727",
  },
  bookingList: {
    width: w,
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 90,
  },
});
