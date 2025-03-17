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
        <View style={styles.headerDot}></View>
        <Text style={{ ...styles.title, fontFamily: "PostNoBillBold" }}>
          {serviceGroup.serviceType.name}
        </Text>
      </View>

      <ServiceSimpleCarousel services={serviceGroup.services} />

      <View style={styles.serviceGroupDescriptions}>
        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={styles.serviceGroupDescriptionContent}
        >
          {serviceGroup.serviceType.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "transparent",
    borderRadius: 10,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    gap: 5,
  },
  headerDot: {
    width: 10,
    height: 30,
    backgroundColor: "#6D3B13",
    marginRight: 10,
  },
  title: {
    color: "#6D3B13",
    fontSize: 19,
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
    backgroundColor: "rgba(255, 255, 255, 0.35)",
    borderRadius: 5,
    alignContent: "center",
  },

  serviceGroupDescriptionContent: {
    fontSize: 16,
    padding: 10,
    color: "#000",
    textAlign: "justify",
  },
});

export default ServiceGroup;
