import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, FlatList, Button } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { formatLocalHostImageUrl } from "@/app/tool/ImageUrlHelper";

const TherapistInformation = ({ data, isSelection }) => {
  const { therapist, analyzing, backgrounds } = data;

  // Tách therapistDegree từ backgrounds
  const extractTherapistInfo = (data) => {
    const therapistDegreeObj = data.backgrounds.find((item) =>
      item.description.startsWith("#")
    );
    const therapistQuoteObj = data.backgrounds.find((item) =>
      item.description.includes("@")
    );

    return {
      therapistDegree: therapistDegreeObj
        ? therapistDegreeObj.description.replace("#", "").trim()
        : "",
      therapistQuote: therapistQuoteObj
        ? therapistQuoteObj.description.replace("@", "").trim()
        : "",
    };
  };

  const { therapistDegree, therapistQuote } = extractTherapistInfo(data);
  // Tách quote từ backgrounds

  const handleBooking = () => {
    console.log("Book therapist: ", therapist.fullName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{
            uri: formatLocalHostImageUrl(therapist.imageUrl),
          }}
          style={styles.image}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{therapist.fullName}</Text>
          <Text style={styles.degree}>{therapistDegree}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{analyzing.avgRate.toFixed(1)}</Text>

            {/* Render số sao */}
            {[...Array(Math.floor(analyzing.avgRate))].map((_, index) => (
              <FontAwesome key={index} name="star" size={16} color="gold" />
            ))}

            {/* Nếu có phần thập phân, render một nửa sao */}
            {analyzing.avgRate % 1 >= 0.5 && (
              <FontAwesome name="star-half-full" size={16} color="gold" />
            )}
          </View>

          <Text style={styles.description}>{therapistQuote}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6, // Android
    marginBottom: 16,
  },
  card: {
    flexDirection: "row",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  infoContainer: {
    height: 120,
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  degree: {
    fontSize: 8,
    color: "gray",
    marginBottom: 4,
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 4,
  },
  description: {
    fontSize: 8,
    color: "gray",
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  stats: {
    fontSize: 18,
    fontWeight: "bold",
  },
  label: {
    fontSize: 14,
    color: "gray",
  },
});

export default TherapistInformation;
