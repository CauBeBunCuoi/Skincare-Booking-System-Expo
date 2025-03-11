import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { styles } from "./styles";
import { useNavigation } from "expo-router";
import BasicInformations from "./Widget/BasicInformations";
import TimeInformations from "./Widget/TimeInformations";
import ResultPopup from "./Widget/ResultPopup";

const data = {
  booking: {
    _id: "1",
    accountId: "1",
    serviceId: "1",
    bookStatusId: 6,
    bookingDate: "2025-02-24",
    appointmentTime: "2025-02-24T09:22:45.253Z",
    startTime: "2025-02-24T09:22:45.253Z",
    endTime: "2025-02-24T09:22:45.253Z",
    checkInTime: "2025-02-24T09:22:45.253Z",
    checkOutTime: "2025-02-24T09:22:45.253Z",
    isAssigned: false,
    assignedTherapistId: "",
    assignedTherapistFullName: "",
    extraFee: 0,
    totalFee: 1000000,
    hasPaid: false,
    cancelReason: "",
  },
  service: {
    _id: "1",
    serviceTypeId: 1,
    name: "Microneedling Treatment",
    duration: 2,
    description: "string",
    fee: 1000000,
    isDeleted: false,
    imageUrl: "1",
  },
  therapist: {
    _id: "0",
    fullName: "Lucas Turner",
    email: "",
    phoneNumber: 0,
    experienceYears: 0,
    isDeleted: false,
    imageUrl: "",
  },
  bookingStatus: {
    _id: 2,
    name: "Created",
  },
  executionResult: {
    _id: "",
    bookingId: "",
    customerDescription: "lorem ipsum dolor sit amet ...",
    treatmentDescription: "lorem ipsum dolor sit amet ...",
    therapistRecommend: "lorem ipsum dolor sit amet ...",
  },
  feedback: {
    _id: "",
    bookingId: "",
    feedbackContent: "",
    rate: 0,
  },
};

const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};
const formatTime = (timeString) => {
  const date = new Date(timeString);
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // Chuyển 0 giờ thành 12 giờ

  return `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;
};

const BookingDetailScreen = () => {
  // STATES
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({});
  const [isResultShow, setIsResultShow] = useState(false);

  // HOOKS
  const isFocused = useIsFocused();
  const route = useRoute();
  const navigation = useNavigation();

  const { bookingId } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: `Booking Details ID: ${bookingId}` });
    const fetchData = async () => {
      setLoading(true);
      await setAttributes(); // Giả sử đây là hàm gọi API, có thể dùng async/await
      setLoading(false); // Sau khi dữ liệu cập nhật xong thì tắt loading
    };

    fetchData();
  }, [isFocused]);

  // FUNCTIONS
  const setAttributes = async () => {
    // Call API to get booking detail
    // console.log("Chạy API để get booking với id: ", bookingId);
    setBooking(data);
  };

  const handleDeclined = async () => {
    // Call API to decline booking
    console.log("Chạy API để decline booking với id: ", bookingId);
  };

  const handleShowResult = async () => {
    // Call API to get result from therapist
    console.log("Chạy API để get result from therapist với id: ", bookingId);
    setIsResultShow(true);
  };

  return (
    <View style={styles.container}>
      {!loading ? (
        <View
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BasicInformations
            id={booking.booking._id}
            serviceName={booking.service.name}
            totalFee={booking.booking.totalFee}
            bookingStatusId={booking.booking.bookStatusId}
            therapistName={booking.therapist.fullName}
          />

          <TimeInformations
            bookingDate={formatDate(booking.booking.bookingDate)}
            bookingTime={formatTime(booking.booking.appointmentTime)}
            checkInTime={formatTime(booking.booking.checkInTime)}
            bookingStatusId={booking.booking.bookStatusId}
          />

          {booking.booking.bookStatusId === 5 ||
          booking.booking.bookStatusId === 6 ? (
            <TouchableOpacity
              onPress={() => handleShowResult()}
              style={styles.resultButton}
            >
              <Text style={styles.resultText}>Result From Therapist</Text>
            </TouchableOpacity>
          ) : null}

          {booking.booking.bookStatusId < 5 && (
            <TouchableOpacity
              onPress={() => handleDeclined()}
              style={styles.declinedButton}
            >
              <Text style={styles.declinedText}>Declined Booking</Text>
            </TouchableOpacity>
          )}

          <ResultPopup
            bookingId={booking.booking._id}
            serviceName={booking.service.name}
            therapist={booking.therapist}
            executionResult={booking.executionResult}
            isVisible={isResultShow}
            onClose={() => setIsResultShow(false)}
          />
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default BookingDetailScreen;
