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
  Button,
} from "react-native";

const ServiceGroup = ({ data }) => {
  const serviceGroup = data || null;
  const navigation = useNavigation();

  const handleViewServiceDetail = (service) => {
    if (service && service._id) {
      const id = service._id;
      navigation.navigate("ServiceDetail", { serviceId: id });
    } else {
      console.log("Service ID is missing");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{serviceGroup.serviceType.name}</Text>
      </View>

      <ServiceSimpleCarousel services={serviceGroup.services} />

      <View style={styles.serviceGroupDescriptions}>
        <Text style={styles.serviceGroupDescriptionContent}>
          {serviceGroup.serviceType.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: 500,
    backgroundColor: "transparent",
    borderRadius: 10,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#254039",
    borderRadius: 5,
  },
  title: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  seeMoreBtn: {
    borderWidth: 1,
    borderColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  seeMoreText: {
    color: "#fff",
    fontSize: 14,
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

  serviceGroupDescriptions: {
    marginTop: 5,
    padding: 3,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 5,
    alignContent: "center",
  },

  serviceGroupDescriptionContent: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },
});

export default ServiceGroup;
