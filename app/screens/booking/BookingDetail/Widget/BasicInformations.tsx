import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

interface BasicInformationsProps {
  id: string;
  serviceName: string;
  totalFee: string;
  bookingStatusId: number;
  bookingDate: string;
  therapist: string;
}

const dateFromIsoString = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString();
};

const formatMoney = (amount) => {
  return amount.toLocaleString("vi-VN") + " VND";
};

const BasicInformations: React.FC<BasicInformationsProps> = ({
  id,
  serviceName,
  totalFee,
  bookingStatusId,
  bookingDate,
  therapist,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <FontAwesome5 name="briefcase-medical" size={16} color="black" />
        <Text style={styles.label}> Service Name</Text>
        <Text style={styles.value}>{serviceName}</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.row}>
        <FontAwesome5 name="dollar-sign" size={16} color="black" />
        <Text style={styles.label}> Total Fee</Text>
        <Text style={styles.value}>{formatMoney(totalFee)}</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.row}>
        <FontAwesome5 name="user-md" size={16} color="black" />
        <Text style={styles.label}> Therapist</Text>
        {therapist ? (
          <Text style={styles.value}>{therapist.fullName}</Text>
        ) : (
          <Text style={styles.value}>Not assigned</Text>
        )}
      </View>
      <View style={styles.separator} />

      <View style={styles.row}>
        <FontAwesome5 name="dollar-sign" size={16} color="black" />
        <Text style={styles.label}> Booking Date</Text>
        <Text style={styles.value}>{dateFromIsoString(bookingDate)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    backgroundColor: "rgba(217, 217, 217, 0.8)",
    padding: 15,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  label: {
    flex: 1,
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    marginLeft: 5,
  },
  value: {
    fontSize: 14,
    color: "white",
    fontWeight: "600",
  },
  separator: {
    height: 1,
    backgroundColor: "black",
    opacity: 0.3,
    width: "80%",
    alignSelf: "center",
    marginVertical: 5,
  },
});

export default BasicInformations;
