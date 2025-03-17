import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";

const CustomerRate = ({ rate }) => {
  return (
    <LinearGradient
      colors={["#4B79F1", "#FF47CB"]} // Gradient xanh đậm
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.rateContainer}
    >
      <View style={styles.rateHeader}>
        <View style={styles.userAvatar}>
          <FontAwesome name="user-circle-o" size={24} color="white" />
        </View>
        <View style={styles.rateInformations}>
          <Text style={styles.customerName}>
            {rate.customerName ? rate.customerName : "Ẩn Danh"}
          </Text>
          <Text style={styles.customerRate}>
            {/* {rate.rate.toFixed(1)}{" "}
            <FontAwesome name="star" size={18} color="gold" /> */}
            {[...Array(Math.floor(rate.rate))].map((_, index) => (
              <FontAwesome key={index} name="star" size={16} color="gold" />
            ))}

            {/* Nếu có phần thập phân, render một nửa sao */}
            {rate.rate % 1 >= 0.5 && (
              <FontAwesome name="star-half-full" size={16} color="gold" />
            )}
          </Text>
        </View>
      </View>
      <View style={styles.rateContentContainer}>
        <Text style={styles.rateContentText}>{rate.feedbackContent}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  rateContainer: {
    width: "90%",
    marginVertical: 4,
    padding: 8,
    backgroundColor: "#8EB69B",
    borderRadius: 8,
  },
  rateHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    backgroundColor: "#F9A80F",
    justifyContent: "center",
    alignItems: "center",
  },
  rateInformations: {
    marginLeft: 8,
  },
  customerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fefefe",
  },
  customerRate: {
    fontSize: 14,
    color: "#fefefe",
    fontWeight: "bold",
  },
  rateContentContainer: {
    padding: 5,
  },
  rateContentText: {
    fontSize: 13,
    color: "#fefefe",
    textAlign: "left",
  },
});
export default CustomerRate;
