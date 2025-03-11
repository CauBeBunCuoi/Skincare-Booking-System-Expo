import { StyleSheet, View } from "react-native";

export default function DividerUI() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    height: 1.5,
    backgroundColor: "#572F0E",
    width: "80%",
    marginVertical: 10,
  },
});
