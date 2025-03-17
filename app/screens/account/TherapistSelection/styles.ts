import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {},
  scrollContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
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
  container: {
    backgroundColor: "transparent",
    alignItems: "center",
  },
  therapistDegree: {
    width: "100%",
  },
  feedbackDescriptionContainer: {
    width: "90%",
    padding: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6, // Android
    marginBottom: 16,
  },
  feedbackDescriptionText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
});
