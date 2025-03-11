import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {},
  container: {},
  resultButton: {
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    borderRadius: 10,
    height: 50,
    borderColor: "rgb(133, 133, 133)",
    borderWidth: 3,
    backgroundColor: "rgba(133, 133, 133, 0.1)",
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "rgb(133, 133, 133)",
  },
  declinedButton: {
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    borderRadius: 10,
    height: 50,
    borderColor: "rgb(248, 2, 2)",
    borderWidth: 3,
    backgroundColor: "rgba(248, 2, 2, 0.25)",
  },
  declinedText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "rgb(248, 2, 2)",
  },
});
