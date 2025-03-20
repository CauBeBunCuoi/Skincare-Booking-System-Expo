import { useEffect, useState } from "react";
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { styles } from "./styles";
import BookingGroup from "./Widget/BookingGroup";
import { callApi } from "@/app/api/main/api_call/api";
import { loginRequiredApi, publicApi } from "@/app/api/instance/axiosInstance";
import { asyncStorage_getByKey } from "@/app/tool/AsyncStorage";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";
import { loginRequiredAlert } from "@/utils/alert.util";

const data = [
  {
    booking: {
      _id: "1",
      accountId: "1",
      serviceId: "1",
      bookStatusId: 1,
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
      fullName: "",
      email: "",
      phoneNumber: 0,
      experienceYears: 0,
      isDeleted: false,
      imageUrl: "",
    },
    bookingStatus: {
      _id: 1,
      name: "Created",
    },
    executionResult: {
      _id: "",
      bookingId: "",
      customerDescription: "",
      treatmentDescription: "",
      therapistRecommend: "",
    },
    feedback: {
      _id: "",
      bookingId: "",
      feedbackContent: "",
      rate: 0,
    },
  },
  {
    booking: {
      _id: "2",
      accountId: "1",
      serviceId: "2",
      bookStatusId: 2,
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
      _id: "2",
      serviceTypeId: 1,
      name: "Facial Deep Cleaning Treatment",
      duration: 2,
      description: "string",
      fee: 1000000,
      isDeleted: false,
      imageUrl: "2",
    },
    therapist: {
      _id: "0",
      fullName: "",
      email: "",
      phoneNumber: 0,
      experienceYears: 0,
      isDeleted: false,
      imageUrl: "",
    },
    bookingStatus: {
      _id: 2,
      name: "Untherapist",
    },
    executionResult: {
      _id: "",
      bookingId: "",
      customerDescription: "",
      treatmentDescription: "",
      therapistRecommend: "",
    },
    feedback: {
      _id: "",
      bookingId: "",
      feedbackContent: "",
      rate: 0,
    },
  },
  {
    booking: {
      _id: "3",
      accountId: "1",
      serviceId: "3",
      bookStatusId: 3,
      bookingDate: "2025-02-24",
      appointmentTime: "2025-02-24T09:22:45.253Z",
      startTime: "2025-02-24T09:22:45.253Z",
      endTime: "2025-02-24T09:22:45.253Z",
      checkInTime: "2025-02-24T09:22:45.253Z",
      checkOutTime: "2025-02-24T09:22:45.253Z",
      isAssigned: true,
      assignedTherapistId: "1",
      assignedTherapistFullName: "Lucas Turner",
      extraFee: 0,
      totalFee: 1000000,
      hasPaid: false,
      cancelReason: "",
    },
    service: {
      _id: "3",
      serviceTypeId: 1,
      name: "Anti-aging Treatment",
      duration: 2,
      description: "string",
      fee: 1000000,
      isDeleted: false,
      imageUrl: "3",
    },
    therapist: {
      _id: "1",
      fullName: "Lucas Turner",
      email: "lucasturner@gmail.com",
      phoneNumber: 123456789,
      experienceYears: 12,
      isDeleted: false,
      imageUrl: "1",
    },
    bookingStatus: {
      _id: 3,
      name: "IsTherapist",
    },
    executionResult: {
      _id: "",
      bookingId: "",
      customerDescription: "",
      treatmentDescription: "",
      therapistRecommend: "",
    },
    feedback: {
      _id: "",
      bookingId: "",
      feedbackContent: "",
      rate: 0,
    },
  },
  {
    booking: {
      _id: "4",
      accountId: "1",
      serviceId: "4",
      bookStatusId: 4,
      bookingDate: "2025-02-24",
      appointmentTime: "2025-02-24T09:22:45.253Z",
      startTime: "2025-02-24T09:22:45.253Z",
      endTime: "2025-02-24T09:22:45.253Z",
      checkInTime: "2025-02-24T09:22:45.253Z",
      checkOutTime: "2025-02-24T09:22:45.253Z",
      isAssigned: true,
      assignedTherapistId: "1",
      assignedTherapistFullName: "Lucas Turner",
      extraFee: 0,
      totalFee: 1000000,
      hasPaid: false,
      cancelReason: "",
    },
    service: {
      _id: "4",
      serviceTypeId: 1,
      name: "Sun-damaged Treatment",
      duration: 2,
      description: "string",
      fee: 1000000,
      isDeleted: false,
      imageUrl: "4",
    },
    therapist: {
      _id: "1",
      fullName: "Lucas Turner",
      email: "lucasturner@gmail.com",
      phoneNumber: 123456789,
      experienceYears: 12,
      isDeleted: false,
      imageUrl: "1",
    },
    bookingStatus: {
      _id: 4,
      name: "Check-in",
    },
    executionResult: {
      _id: "",
      bookingId: "",
      customerDescription: "",
      treatmentDescription: "",
      therapistRecommend: "",
    },
    feedback: {
      _id: "",
      bookingId: "",
      feedbackContent: "",
      rate: 0,
    },
  },
  {
    booking: {
      _id: "5",
      accountId: "1",
      serviceId: "5",
      bookStatusId: 5,
      bookingDate: "2025-02-24",
      appointmentTime: "2025-02-24T09:22:45.253Z",
      startTime: "2025-02-24T09:22:45.253Z",
      endTime: "2025-02-24T09:22:45.253Z",
      checkInTime: "2025-02-24T09:22:45.253Z",
      checkOutTime: "2025-02-24T09:22:45.253Z",
      isAssigned: true,
      assignedTherapistId: "1",
      assignedTherapistFullName: "Lucas Turner",
      extraFee: 0,
      totalFee: 1000000,
      hasPaid: false,
      cancelReason: "",
    },
    service: {
      _id: "5",
      serviceTypeId: 1,
      name: "Acne Treatment",
      duration: 2,
      description: "string",
      fee: 1000000,
      isDeleted: false,
      imageUrl: "5",
    },
    therapist: {
      _id: "1",
      fullName: "Lucas Turner",
      email: "lucasturner@gmail.com",
      phoneNumber: 123456789,
      experienceYears: 12,
      isDeleted: false,
      imageUrl: "1",
    },
    bookingStatus: {
      _id: 5,
      name: "Treatment Completed",
    },
    executionResult: {
      _id: "1",
      bookingId: "5",
      customerDescription: "Lorem ipsum dolor sit amet",
      treatmentDescription: "Lorem ipsum dolor sit amet",
      therapistRecommend: "Lorem ipsum dolor sit amet",
    },
    feedback: {
      _id: "",
      bookingId: "",
      feedbackContent: "",
      rate: 0,
    },
  },
  {
    booking: {
      _id: "6",
      accountId: "1",
      serviceId: "6",
      bookStatusId: 6,
      bookingDate: "2025-02-24",
      appointmentTime: "2025-02-24T09:22:45.253Z",
      startTime: "2025-02-24T09:22:45.253Z",
      endTime: "2025-02-24T09:22:45.253Z",
      checkInTime: "2025-02-24T09:22:45.253Z",
      checkOutTime: "2025-02-24T09:22:45.253Z",
      isAssigned: true,
      assignedTherapistId: "1",
      assignedTherapistFullName: "Lucas Turner",
      extraFee: 0,
      totalFee: 1000000,
      hasPaid: true,
      cancelReason: "",
    },
    service: {
      _id: "6",
      serviceTypeId: 1,
      name: "Chemical Peel Treatment",
      duration: 2,
      description: "string",
      fee: 1000000,
      isDeleted: false,
      imageUrl: "6",
    },
    therapist: {
      _id: "1",
      fullName: "Lucas Turner",
      email: "lucasturner@gmail.com",
      phoneNumber: 123456789,
      experienceYears: 12,
      isDeleted: false,
      imageUrl: "1",
    },
    bookingStatus: {
      _id: 6,
      name: "Payment Completed",
    },
    executionResult: {
      _id: "2",
      bookingId: "6",
      customerDescription: "Lorem ipsum dolor sit amet",
      treatmentDescription: "Lorem ipsum dolor sit amet",
      therapistRecommend: "Lorem ipsum dolor sit amet",
    },
    feedback: {
      _id: "1",
      bookingId: "6",
      feedbackContent: "The treatment is very good",
      rate: 5,
    },
  },
  {
    booking: {
      _id: "7",
      accountId: "1",
      serviceId: "7",
      bookStatusId: 7,
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
      cancelReason: "Khách bận không tới được, hẹn lần sau",
    },
    service: {
      _id: "7",
      serviceTypeId: 1,
      name: "Laser Skin Resurfacing Treatment",
      duration: 2,
      description: "string",
      fee: 1000000,
      isDeleted: false,
      imageUrl: "7",
    },
    therapist: {
      _id: "1",
      fullName: "Lucas Turner",
      email: "lucasturner@gmail.com",
      phoneNumber: 123456789,
      experienceYears: 12,
      isDeleted: false,
      imageUrl: "1",
    },
    bookingStatus: {
      _id: 7,
      name: "Cancel By Guest",
    },
    executionResult: {
      _id: "",
      bookingId: "",
      customerDescription: "",
      treatmentDescription: "",
      therapistRecommend: "",
    },
    feedback: {
      _id: "",
      bookingId: "",
      feedbackContent: "",
      rate: 0,
    },
  },
  {
    booking: {
      _id: "8",
      accountId: "1",
      serviceId: "8",
      bookStatusId: 8,
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
      cancelReason:
        "Công Ty không thể cung cấp dịch vụ, do bác sĩ bị tiêu chảy",
    },
    service: {
      _id: "8",
      serviceTypeId: 1,
      name: "LED Light Therapy Treatment",
      duration: 2,
      description: "string",
      fee: 1000000,
      isDeleted: false,
      imageUrl: "8",
    },
    therapist: {
      _id: "1",
      fullName: "Lucas Turner",
      email: "lucasturner@gmail.com",
      phoneNumber: 123456789,
      experienceYears: 12,
      isDeleted: false,
      imageUrl: "1",
    },
    bookingStatus: {
      _id: 8,
      name: "Cancel By Company",
    },
    executionResult: {
      _id: "",
      bookingId: "",
      customerDescription: "",
      treatmentDescription: "",
      therapistRecommend: "",
    },
    feedback: {
      _id: "",
      bookingId: "",
      feedbackContent: "",
      rate: 0,
    },
  },
];
const BookingHistoryScreen = () => {
  // STATES
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [showingGroup, setShowingGroup] = useState("comingUpGroup");
  const [comingUpGroup, setComingUpGroup] = useState([]);
  const [completedGroup, setCompletedGroup] = useState([]);
  const [cancelledGroup, setCancelledGroup] = useState([]);
  // HOOKS
  const isFocused = useIsFocused();
  const navigate = useNavigation();
  // useEffect(() => {
  //   setLoading(true);
  //   setAttributes();
  // }, [isFocused]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setShowingGroup("comingUpGroup");
      await setAttributes(); // Giả sử đây là hàm gọi API, có thể dùng async/await
      setLoading(false); // Sau khi dữ liệu cập nhật xong thì tắt loading
    };

    fetchData();
  }, [isFocused]);

  // const setAttributes = async () => {
  //   // CALL API to get booking history
  //   // console.log("Chạy API để get booking history");

  //   const account = await asyncStorage_getByKey("auth");
  //   const user = account.user;
  //   // console.log("user", user);
  //   const bookingHistory = await callApi({
  //     instance: loginRequiredApi,
  //     method: "get",
  //     url: `/bookings/accounts/${user._id}`,
  //   });
  //   if (bookingHistory.success) setBookings(bookingHistory.data.bookings);
  //   else {
  //     console.log("Error", bookingHistory.message);
  //   }
  // };
  const setAttributes = async () => {
    try {
      const account = await asyncStorage_getByKey("auth");
      if (!account || !account.user) {
        console.log("❌ Không tìm thấy thông tin tài khoản, cần đăng nhập");
        loginRequiredAlert(navigate);
      }
      const bookingHistory = await callApi({
        instance: loginRequiredApi,
        method: "get",
        url: `/bookings/accounts/${account.user._id}`,
      });

      if (bookingHistory.success) {
        setBookings(bookingHistory.data.bookings);
      } else {
        console.log("⚠️ API Error:", bookingHistory.message);
      }
    } catch (error) {
      console.log("🚨 Lỗi khi gọi API:", error.message);
    }
  };

  // FUNCTIONS
  useEffect(() => {
    setComingUpGroup(filterGroup(bookings, "comingUp"));
    setCompletedGroup(filterGroup(bookings, "completed"));
    setCancelledGroup(filterGroup(bookings, "cancelled"));
    setLoading(false);
  }, [bookings]);

  // FUNCTIONS
  const filterGroup = (bookingList, name) => {
    const statusGroups = {
      comingUp: [1, 2, 3, 4],
      completed: [5, 6],
      cancelled: [7],
    };

    return bookingList.filter((item) =>
      statusGroups[name]?.includes(item.booking.bookStatusId)
    );
  };

  const checkData = () => {
    console.log("comingUpGroup", comingUpGroup);
    console.log("--------------------------------");
    console.log("completedGroup", completedGroup);
    console.log("--------------------------------");
    console.log("cancelledGroup", cancelledGroup);
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/images/backgrounds/bookingHistory/main.jpg")}
        style={styles.background}
      />
      <View style={styles.container}>
        <Text style={{ ...styles.title, fontFamily: "PostNoBillBold" }}>
          Booking History
        </Text>
        {!loading ? (
          <>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                onPress={() => setShowingGroup("comingUpGroup")}
              >
                <Text
                  style={
                    showingGroup === "comingUpGroup"
                      ? [
                          styles.tabButton,
                          styles.comingUpTab,
                          styles.tabComingActive,
                        ]
                      : [styles.tabButton, styles.comingUpTab]
                  }
                >
                  Coming Up
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowingGroup("completedGroup")}
              >
                <Text
                  style={
                    showingGroup === "completedGroup"
                      ? [
                          styles.tabButton,
                          styles.completedTab,
                          styles.tabCompleteActive,
                        ]
                      : [styles.tabButton, styles.completedTab]
                  }
                >
                  Completed
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowingGroup("cancelledGroup")}
              >
                <Text
                  style={
                    showingGroup === "cancelledGroup"
                      ? [
                          styles.tabButton,
                          styles.cancelledTab,
                          styles.tabCancelActive,
                        ]
                      : [styles.tabButton, styles.cancelledTab]
                  }
                >
                  Cancelled
                </Text>
              </TouchableOpacity>
            </View>
            {showingGroup === "comingUpGroup" && (
              <ScrollView style={styles.bookingList}>
                <BookingGroup group={comingUpGroup} />
              </ScrollView>
            )}
            {showingGroup === "completedGroup" && (
              <ScrollView style={styles.bookingList}>
                <BookingGroup group={completedGroup} />
              </ScrollView>
            )}
            {showingGroup === "cancelledGroup" && (
              <ScrollView style={styles.bookingList}>
                <BookingGroup group={cancelledGroup} />
              </ScrollView>
            )}
          </>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </View>
  );
};

export default BookingHistoryScreen;
