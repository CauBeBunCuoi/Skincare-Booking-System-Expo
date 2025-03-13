import { formatLocalHostImageUrl } from "@/app/tool/ImageUrlHelper";
import { useNavigation } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ServiceCardSimple = ({ service }) => {
  const navigation = useNavigation();

  const handleViewServiceDetail = (service) => {
    navigation.navigate("ServiceDetail", { serviceId: service._id });
  };

  

  return (
    <View style={styles.card}>
      <Image source={{ uri: formatLocalHostImageUrl(service.imageUrl) }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.serviceName}>{service.name}</Text>
        <Text style={styles.price}>{service.fee.toLocaleString()} VND</Text>
        <TouchableOpacity onPress={() => handleViewServiceDetail(service)}>
          <Text style={styles.detailText}>Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
    marginRight: 10,
    elevation: 3, // Hiệu ứng đổ bóng trên Android
    shadowColor: "#000", // Hiệu ứng đổ bóng trên iOS
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    width: "100%",
    height: 160,
  },
  cardContent: {
    padding: 10,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "#FF7300",
    fontWeight: "bold",
    marginVertical: 5,
  },
  detailText: {
    color: "#007AFF",
  },
});

export default ServiceCardSimple;
