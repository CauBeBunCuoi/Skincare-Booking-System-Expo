import { formatLocalHostImageUrl } from "@/app/tool/ImageUrlHelper";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const w = Dimensions.get("window").width;
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN").format(amount) + " VND";
};
const ServiceListCard = ({ service, onPress }) => {
  return (
    <View style={styles.card}>
      {/* Hình ảnh dịch vụ */}
      <Image
        style={styles.image}
        source={{ uri: formatLocalHostImageUrl(service.imageUrl) }}
      />

      {/* Nội dung dịch vụ */}
      <LinearGradient
        colors={["#617BE229", "#F9A80F29"]} // Thêm '29' để đặt opacity = 16%
        style={styles.content}
      >
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
          {service.name}
        </Text>
        <Text style={styles.duration}>{service.duration} hours</Text>
        <Text numberOfLines={3} ellipsizeMode="tail" style={styles.description}>
          {service.description}
        </Text>

        {/* Giá và nút đặt lịch */}
        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Price:</Text>
            <Text style={styles.price}>{formatCurrency(service.fee)}</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onPress(service._id)}
          >
            <Text style={styles.buttonText}>Booking Now</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

// **Styles**
const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.28)",
    borderRadius: 15,
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: w * 0.44,
    marginBottom: 20,
  },
  image: {
    width: w * 0.36,
    height: w * 0.3,
    borderRadius: 15,
    margin: 10,
  },
  content: {
    padding: 0,
    paddingVertical: 16,
    paddingHorizontal: 5,
    width: "100%",
    height: w * 0.3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  duration: {
    fontSize: 12,
    color: "white",
    marginBottom: 5,
  },
  description: {
    fontSize: 10,
    height: w * 0.08,
    width: "95%",
    color: "#666",
  },
  footer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 5,
    paddingHorizontal: 5,
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
    fontSize: 10,
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
