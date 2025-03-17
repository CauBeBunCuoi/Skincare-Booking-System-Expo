import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
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
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  userAnswer: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
  },
  suggestDescription: {
    paddingTop: 10,
    width: "100%",
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  skinType: {
    color: "#0B2B26",
    fontWeight: "bold",
  },
  skinStatus: {
    color: "#0B2B26",
    fontWeight: "bold",
  },
  skinTakeCare: {
    color: "#0B2B26",
    fontWeight: "bold",
  },
  serviceGroups: {
    paddingHorizontal: 10,
  },
  serviceGroup: {
    paddingTop: 5,
    marginBottom: 30,
    height: 350,
  },
});
