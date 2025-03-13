import { FlatList, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const TherapistDegree = ({ data } :  {data : any[]}) => {
  return (
    <>
      {data.length > 0 && data.map((item) => (
        <View key={item._id} style={styles.container}>
          <MaterialCommunityIcons
            name="certificate-outline"
            size={24}
            color="white"
          />
          <Text style={styles.text}>{item.description}</Text>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginVertical: 4,
    padding: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4B79F1",
    borderRadius: 8,
  },
  text: {
    paddingHorizontal: 8,
    fontSize: 9,
    fontWeight: "bold",
    color: "#fff",
  },
});
export default TherapistDegree;
