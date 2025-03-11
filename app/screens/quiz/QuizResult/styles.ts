import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
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
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#8EB69B",
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
    marginTop: 10,
    paddingHorizontal: 10,
  },
  serviceGroup: {
    paddingVertical: 10,
  },
});
