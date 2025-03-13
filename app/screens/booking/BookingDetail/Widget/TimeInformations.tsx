import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Dimensions } from "react-native";

const w = Dimensions.get("window").width;
const statusMap: {
  [key: number]: { label: string; color: string; bgColor: string };
} = {
  1: {
    label: "Up Coming",
    color: "#5F89AF",
    bgColor: "rgba(27, 128, 223, 0.2)",
  },
  2: {
    label: "Up Coming",
    color: "#5F89AF",
    bgColor: "rgba(27, 128, 223, 0.2)",
  },
  3: {
    label: "Up Coming",
    color: "#5F89AF",
    bgColor: "rgba(27, 128, 223, 0.2)",
  },
  4: {
    label: "Up Coming",
    color: "#5F89AF",
    bgColor: "rgba(27, 128, 223, 0.2)",
  },
  5: {
    label: "Completed",
    color: "rgb(15, 117, 47)",
    bgColor: "rgba(27, 217, 87, 0.2)",
  },
  6: {
    label: "Completed",
    color: "rgb(15, 117, 47)",
    bgColor: "rgba(27, 217, 87, 0.2)",
  },
  7: {
    label: "Cancelled",
    color: "rgba(220, 16, 16, 1)",
    bgColor: "rgba(220, 16, 16, 0.2)",
  },
  8: {
    label: "Cancelled",
    color: "rgba(220, 16, 16, 1)",
    bgColor: "rgba(220, 16, 16, 0.2)",
  },
};

const dateFromIsoString = (isoString) => {
  const date = new Date(isoString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

const timeFromIsoString = (timeString) => {
  const date = new Date(timeString);
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // Chuyển 0 giờ thành 12 giờ

  return `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;
};

const TimeInformations = ({
  appointmentTime,
  startTime,
  endTime,
  bookingTime,
  bookingStatusId,
}) => {
  const status = statusMap[bookingStatusId] || {
    label: "Unknown",
    color: "#000000",
  };

  return (
    <ImageBackground
      source={require("@/assets/images/bookingBackground.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Appointment Date</Text>
          <Text style={styles.value}>{dateFromIsoString(appointmentTime)}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Start Time</Text>
          <Text style={styles.value}>{timeFromIsoString(startTime)}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>End Time</Text>
          <Text style={styles.value}>{timeFromIsoString(endTime)}</Text>
        </View>
        <View
          style={[
            styles.statusBox,
            { borderColor: status.color, backgroundColor: status.bgColor },
          ]}
        >
          <Text style={[styles.statusText, { color: status.color }]}>
            {status.label}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    resizeMode: "cover",
    justifyContent: "center",
    padding: 20,
    borderRadius: 10,
    width: w / 1.11,
    height: w / 1.11,
  },
  container: {
    position: "absolute",
    width: w / 1.11,
    height: w / 1.11,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 20,
  },
  infoBox: {
    backgroundColor: "rgba(217, 217, 217, 0.8)",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  statusBox: {
    marginTop: 10,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
  },
  statusText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default TimeInformations;
