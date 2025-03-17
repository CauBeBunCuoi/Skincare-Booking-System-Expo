import { FlatList, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
const TherapistExperiences = ({ services }) => {
  return (
    <View style={styles.container}>
      {services.map((item, index) => (
        <View key={index} style={styles.content}>
          <MaterialIcons name="medical-services" size={24} color="#F9A80F" />
          <Text style={{ width: "90%" }} numberOfLines={1} ellipsizeMode="tail">
            <Text style={styles.text}>
              {item.experienceYears} years of experience in
            </Text>
            <Text style={styles.textService}> {item.name}</Text>
          </Text>
        </View>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.86)", // Màu trắng với độ trong suốt 70%
    padding: 16,
    borderRadius: 10, // Bo góc
    shadowColor: "#000", // Màu bóng đổ
    shadowOffset: { width: 0, height: 4 }, // Hướng bóng (ngang, dọc)
    shadowOpacity: 0.2, // Độ mờ của bóng
    shadowRadius: 4, // Độ lan của bóng
    elevation: 5, // Bóng cho Android
  },

  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },

  text: {
    marginLeft: 8,
    fontSize: 10,
    fontWeight: 400,
    color: "#F9A80F",
  },
  textService: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#F9A80F",
  },
});
export default TherapistExperiences;
