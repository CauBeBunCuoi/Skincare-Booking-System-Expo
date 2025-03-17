import { formatLocalHostImageUrl } from "@/app/tool/ImageUrlHelper";
import { useNavigation } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native";

const images = {
  "1": require("@/assets/images/bookingHistory/1.jpg"),
  "2": require("@/assets/images/bookingHistory/2.jpg"),
  "3": require("@/assets/images/bookingHistory/3.jpg"),
  "4": require("@/assets/images/bookingHistory/4.jpg"),
  "5": require("@/assets/images/bookingHistory/5.jpg"),
  "6": require("@/assets/images/bookingHistory/6.jpg"),
  "7": require("@/assets/images/bookingHistory/7.jpg"),
  "8": require("@/assets/images/bookingHistory/8.jpg"),
};

function formatDate(input) {
  const date = new Date(input); // Chuyển chuỗi thành Date object

  if (isNaN(date.getTime())) return "Invalid date format"; // Kiểm tra lỗi

  const day = String(date.getDate()).padStart(2, "0"); // Lấy ngày (DD)
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Lấy tháng (MM)
  const year = date.getFullYear(); // Lấy năm (YYYY)

  return `${day}/${month}/${year}`;
}

const formatTime = (timeString) => {
  const date = new Date(timeString);
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // Chuyển 0 giờ thành 12 giờ

  return `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;
};

const formatMoney = (amount) => {
  return amount.toLocaleString("vi-VN") + " VND";
};

const getUrl = (imgId) =>
  images[imgId] || require("@/assets/images/test/cat1.jpg");

const BookingCard = ({ item }) => {
  const navigation = useNavigation();

  const handleDetails = (id) => {
    console.log("Details of booking with id: ", id);
    navigation.navigate("BookingDetail", { bookingId: id });
  };
  return (
    <TouchableOpacity
      onPress={() => handleDetails(item.booking._id)}
      style={styles.container}
    >
      <Image
        source={{
          uri: formatLocalHostImageUrl(item.service.imageUrl),
        }}
        style={{
          width: 150,
          height: 150,
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
        }}
      />
      <View style={styles.bookingInformationsContainer}>
        <Text style={styles.idText}>{item.service.name}</Text>
        <View style={styles.singleRowInformation}>
          <Text style={styles.headerInformationText}>Date:</Text>
          <Text style={styles.contentInformationText}>
            {formatTime(item.booking.appointmentTime)} -{" "}
            {formatDate(item.booking.appointmentTime)}
          </Text>
        </View>
        <View style={styles.singleRowInformation}>
          <Text style={styles.headerInformationText}>Check-in Time:</Text>
          <Text style={styles.contentInformationText}>
            {formatTime(item.booking.checkInTime)}
          </Text>
        </View>
        <View style={styles.singleRowInformation}>
          <Text style={styles.headerInformationText}>Total Fee:</Text>
          <Text style={styles.contentInformationFee}>
            {formatMoney(item.booking.totalFee)}
          </Text>
        </View>
        {item.therapist ? (
          <View style={styles.singleRowInformation}>
            <Text style={styles.headerInformationText}>Therapist:</Text>
            <Text style={styles.contentInformationText}>
              {item.therapist.fullName}
            </Text>
          </View>
        ) : (
          <View style={styles.singleRowInformation}>
            <Text style={styles.headerInformationText}>Therapist:</Text>
            <Text style={styles.contentInformationTextNotYet}>
              Not Assigned Yet
            </Text>
          </View>
        )}
        {item.bookingStatus._id <= 4 && (
          <Text style={styles.noteText}>(Will Happens Soon !)</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 150,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "rgba(217, 217, 217, 0.5)",
    marginBottom: 10,
    borderRadius: 20,
  },
  bookingInformationsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start",
    paddingLeft: 2,
  },
  singleRowInformation: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "77%",
  },
  headerInformationText: {
    fontWeight: "bold",
    fontSize: 11,
    color: "#D9D9D9",
  },
  contentInformationText: {
    fontWeight: "bold",
    fontSize: 11,
    color: "black",
  },
  contentInformationFee: {
    fontWeight: 800,
    fontSize: 11,
    color: "#F9A80F",
  },
  contentInformationTextNotYet: {
    fontWeight: 800,
    fontSize: 11,
    color: "white",
  },
  idText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  normalText: {
    fontSize: 10,
  },
  noteText: {
    fontSize: 9,
    fontStyle: "italic",
    color: "red",
  },
});
export default BookingCard;
