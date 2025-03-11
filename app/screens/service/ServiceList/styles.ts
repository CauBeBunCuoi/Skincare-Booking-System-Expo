import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {},
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#8EB69B",
    paddingVertical: 20,
  },
  serviceTypeName: {
    fontSize: 28,
    fontWeight: "900",
    color: "#F9A80F",
    paddingHorizontal: 10,
    textAlign: "center",
    paddingBottom: 20,
  },
  filterContainer: {
    width: "95%",
    paddingVertical: 16,
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 5,
  },
});
