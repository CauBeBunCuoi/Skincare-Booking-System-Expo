import ServiceSimpleCarousel from "@/components/services/ServiceSimpleCarousel";
import { useNavigation } from "expo-router";
import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const ServiceGroup = ({ serviceType, data }) => {
  const services = data;
  const navigation = useNavigation();
  const handleSeeMore = () => {
    navigation.navigate("ServiceList", {
      serviceTypeId: serviceType._id,
      serviceTypeName: serviceType.name,
    });
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={{ ...styles.title }}>{serviceType.name}</Text>
        <TouchableOpacity
          onPress={() => handleSeeMore()}
          style={styles.seeMoreBtn}
        >
          <Text style={styles.seeMoreText}>See More</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách dịch vụ */}
      <ServiceSimpleCarousel services={services} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: 300,
    backgroundColor: "transparent",
    borderRadius: 10,
    marginBottom: 40,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "rgba(245, 222, 179, 0.35)",
    borderRadius: 10,
    width: "70%",
    borderWidth: 2,
    borderColor: "white",
    position: "relative",
  },
  title: {
    color: "#233375",
    fontSize: 16,
    fontWeight: "bold",
  },
  seeMoreBtn: {
    position: "absolute",
    right: 7,
    bottom: 5,
  },
  seeMoreText: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
  },
  card: {
    width: 160,
    height: 200,
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
    height: 100,
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

export default ServiceGroup;
