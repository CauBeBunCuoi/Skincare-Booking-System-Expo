import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {},
  container: {
    padding: 16,
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
  subTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#F9A80F",
    paddingHorizontal: 10,
    textAlign: "center",
  },
  titleDescription: {
    fontSize: 12,
    fontWeight: "normal",
    color: "black",
    marginTop: 20,
    paddingHorizontal: 10,
    textAlign: "center",
  },
});
