import { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { styles } from "./styles";
import { useNavigation } from "expo-router";
import BasicInformations from "./Widget/BasicInformations";
import TimeInformations from "./Widget/TimeInformations";
import ResultPopup from "./Widget/ResultPopup";
import { callApi } from "@/app/api/main/api_call/api";
import { loginRequiredApi } from "@/app/api/instance/axiosInstance";

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

const BookingDetailScreen = () => {
  // STATES
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({});
  const [isResultShow, setIsResultShow] = useState(false);
  const [therapist, setTherapist] = useState(null);
  // HOOKS
  const isFocused = useIsFocused();
  const route = useRoute();
  const navigation = useNavigation();

  const { bookingId } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: `Booking Details` });
    setLoading(true);

    setAttributes();
  }, [isFocused]);

  // FUNCTIONS
  const setAttributes = async () => {
    // Call API to get booking detail
    // console.log("Chạy API để get booking với id: ", bookingId);
    const bookingDetailData = await callApi({
      instance: loginRequiredApi,
      method: "get",
      url: `/bookings/${bookingId}`,
    });
    if (bookingDetailData.success) {
      setBooking(bookingDetailData.data);
      if (bookingDetailData.data.booking.isAssigned === true) {
        await fetchTherapist(
          bookingDetailData.data.booking.assignedTherapistId
        );
      }
    }
    setLoading(false);
  };

  const fetchTherapist = async (therapistId) => {
    const therapistData = await callApi({
      instance: loginRequiredApi,
      method: "get",
      url: `/accounts/${therapistId}`,
    });
    if (therapistData.success) {
      setTherapist(therapistData.data.account);
      console.log(
        "Get Details of Therapist with id: ",
        therapistData.data.account._id
      );
    }
  };

  const handleDeclined = async () => {
    // Call API to decline booking
    const declinedData = await callApi({
      instance: loginRequiredApi,
      method: "post",
      url: `/bookings/${bookingId}/cancel`,
    });
    if (declinedData.success) {
      navigation.goBack();
    }
  };

  const handleShowResult = async () => {
    // Call API to get result from therapist
    // console.log("Chạy API để get result from therapist với id: ", bookingId);
    setIsResultShow(true);
  };

  const handleCloseResult = () => {
    console.log("Đóng popup kết quả");
    setIsResultShow(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/images/backgrounds/bookingDetails/main.jpg")}
        style={styles.background}
      />

      <View style={{ flex: 1 }}>
        {/* Thêm View này */}
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {!loading ? (
            <>
              <View style={{ width: "100%", alignItems: "center" }}>
                <View style={styles.titleContainer}>
                  <Text style={styles.titleContainerText}>Booking Details</Text>
                  <Text style={styles.titleContainerTextId}>
                    #{booking.booking._id}
                  </Text>
                </View>
              </View>
              <View style={{ alignItems: "center", width: "100%" }}>
                <BasicInformations
                  id={booking.booking._id}
                  serviceName={booking.service.name}
                  totalFee={booking.booking.totalFee}
                  bookingStatusId={booking.booking.bookStatusId}
                  bookingDate={booking.booking.bookingDate}
                  therapist={therapist ? therapist : null}
                />

                <TimeInformations
                  appointmentTime={booking.booking.appointmentTime}
                  startTime={booking.booking.startTime}
                  endTime={booking.booking.endTime}
                  bookingStatusId={booking.booking.bookStatusId}
                />

                {booking.booking.bookStatusId === 5 ||
                booking.booking.bookStatusId === 6 ? (
                  <TouchableOpacity
                    onPress={handleShowResult}
                    style={styles.resultButton}
                  >
                    <Text style={styles.resultText}>Result From Therapist</Text>
                  </TouchableOpacity>
                ) : null}

                {booking.booking.bookStatusId < 5 && (
                  <TouchableOpacity
                    onPress={handleDeclined}
                    style={styles.declinedButton}
                  >
                    <Text style={styles.declinedText}>Declined Booking</Text>
                  </TouchableOpacity>
                )}

                {booking.executionResult && (
                  <ResultPopup
                    bookingId={booking.booking._id}
                    serviceName={booking.service.name}
                    therapist={therapist ? therapist : null}
                    executionResult={booking.executionResult}
                    isVisible={isResultShow}
                    onClose={handleCloseResult}
                  />
                )}
              </View>
            </>
          ) : (
            <Text>Loading...</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default BookingDetailScreen;
