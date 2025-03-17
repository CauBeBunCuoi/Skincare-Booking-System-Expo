import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {},
  container: {
    flex: 1,
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
    fontWeight: "bold",
    color: "white",
    paddingVertical: 20,
  },
  serviceCount: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#F9A80F",
    padding: 10,
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
  filterInfo: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  filterInfoText: {
    paddingHorizontal: 10,
    marginBottom: 10,
    paddingVertical: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#5468B7",
    borderRadius: 10,
  },
});
