import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  header: {},
  container: {
    padding: 16,
    backgroundColor: "transparent",
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
  },
  servicesContainer: {
    width: "90%",
    alignItems: "flex-start",
  },
  servicesTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F1B686",
    marginBottom: 10,
  },
});
