import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {},
  container: {
    padding: 16,
    flex: 1,
    alignItems: "center",
  },
  serviceInformationContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  serviceInformationImage: {
    borderRadius: 10,
    width: 200,
    height: 200,
  },
  serviceInformationContent: {
    paddingHorizontal: 10,
    height: 180,
    width: 160,
    display: "flex",
    justifyContent: "space-around",
  },

  serviceText: {
    fontSize: 10,
    marginRight: 2,
  },

  serviceDescriptonContainer: {
    padding: 16,
    marginTop: 10,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 10,
    border: "1px solid rgba(254, 254, 254, 0.1)",
  },

  serviceDescriptonContent: {
    textAlign: "justify",
  },

  stepDescription: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },

  stepContainer: {
    width: "100%",
  },

  button: {
    backgroundColor: "rgba(1, 122, 243, 1)",
    padding: 10,
    marginBottom: 50,
    borderRadius: 10,
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  buttonContent: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
});
