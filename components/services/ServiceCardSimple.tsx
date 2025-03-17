import { useNavigation } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { formatLocalHostImageUrl } from "@/app/tool/ImageUrlHelper";

const ServiceCardSimple = ({ service }) => {
  const navigation = useNavigation();

  const handleViewServiceDetail = (service) => {
    navigation.navigate("ServiceDetail", { serviceId: service._id });
  };

  return (
    <TouchableOpacity
      onPress={() => handleViewServiceDetail(service)}
      style={styles.card}
    >
      {/* Ảnh nền */}
      <Image
        source={{ uri: formatLocalHostImageUrl(service.imageUrl) }}
        style={styles.image}
      />

      {/* Gradient để làm mờ từ từ */}
      <LinearGradient
        colors={["transparent", "rgba(0, 0, 0, 0.5)"]}
        style={styles.gradientOverlay}
      />

      {/* Lớp làm mờ */}
      <BlurView intensity={40} style={styles.blurLayer}>
        <View style={styles.cardContent}>
          <Text
            style={styles.serviceName}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {service.name}
          </Text>
          <Text style={styles.price}>{service.fee.toLocaleString()} VND</Text>
        </View>
      </BlurView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 177,
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginRight: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    zIndex: 2,
  },
  blurLayer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 60, // Độ cao của phần bị mờ
    zIndex: 3,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: "hidden",
  },
  cardContent: {
    padding: 10,
    alignItems: "center",
  },
  serviceName: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#fff",
  },
  price: {
    fontSize: 15,
    color: "#F9A80F",
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default ServiceCardSimple;
