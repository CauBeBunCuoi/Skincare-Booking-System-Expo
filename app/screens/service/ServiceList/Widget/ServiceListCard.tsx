import { formatLocalHostImageUrl } from "@/app/tool/ImageUrlHelper";
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const ServiceListCard = ({ service, onPress }) => {
  return (
    <View style={styles.card}>
      {/* Hình ảnh dịch vụ */}
      <Image style={styles.image} source={{ uri: formatLocalHostImageUrl(service.imageUrl) }} />

      {/* Nội dung dịch vụ */}
      <View style={styles.content}>
        <Text style={styles.title}>{service.name}</Text>
        <Text style={styles.duration}>{service.duration} hours</Text>
        <Text style={styles.description}>{service.description}</Text>

        {/* Giá và nút đặt lịch */}
        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Price:</Text>
            <Text style={styles.price}>{service.fee} VND</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onPress(service._id)}
          >
            <Text style={styles.buttonText}>Booking Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// **Styles**
const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: 180,
    marginBottom: 20,
    padding: 16,
  },
  image: {
    width: 150,
    height: 117,
  },
  content: {
    padding: 0,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  duration: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  description: {
    fontSize: 10,
    color: "#666",
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 5,
  },
  priceContainer: {
    alignItems: "flex-start",
  },
  priceLabel: {
    fontSize: 12,
    color: "#666",
  },
  price: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#FFA500",
  },
  button: {
    backgroundColor: "#6C63FF",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ServiceListCard;
