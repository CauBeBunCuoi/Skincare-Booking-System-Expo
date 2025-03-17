import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  FlatList,
  Button,
  Pressable,
  Alert,
} from "react-native";
import DatePicker from "react-native-date-picker";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/FontAwesome";
import { TherapistSelectionScreen } from "@/app/screens/account";
import TherapistSelectionPopup from "./TherapistSelectionPopup";
import { callApi } from "@/app/api/main/api_call/api";
import { loginRequiredApi, publicApi } from "@/app/api/instance/axiosInstance";
import { FontAwesome5 } from "@expo/vector-icons";

const scheduleList = [
  {
    date: "2025-02-19",
    hours: [
      "08:00:00",
      "09:00:00",
      "10:00:00",
      "11:00:00",
      "13:00:00",
      "14:00:00",
      "15:00:00",
      "16:00:00",
    ],
  },
  {
    date: "2025-02-20",
    hours: ["08:00:00", "9:00:00", "10:00:00", "13:00:00"],
  },
  { date: "2025-02-21", hours: ["9:00:00", "14:00:00", "15:00:00"] },
  { date: "2025-02-22", hours: ["9:00:00", "10:00:00", "11:00:00"] },
  { date: "2025-02-23", hours: ["13:00:00", "14:00:00", "15:00:00"] },
  { date: "2025-02-24", hours: ["9:00:00", "10:00:00", "11:00:00"] },
  { date: "2025-02-25", hours: ["9:00:00", "10:00:00", "11:00:00"] },
];

const therapistList = [
  {
    _id: "1",
    username: "lucasturner",
    password: "1234567890",
    phoneNumber: 8968936363,
    email: "lucasturner@gmail.com",
    roleId: 3,
    fullName: "Lucas Turner",
    isDeleted: true,
  },
  {
    _id: "2",
    username: "lucasturner",
    password: "1234567890",
    phoneNumber: 8968936363,
    email: "lucasturner@gmail.com",
    roleId: 3,
    fullName: "John Smith",
    isDeleted: true,
  },
  {
    _id: "3",
    username: "lucasturner",
    password: "1234567890",
    phoneNumber: 8968936363,
    email: "lucasturner@gmail.com",
    roleId: 3,
    fullName: "Evelline Turner",
    isDeleted: true,
  },
  {
    _id: "4",
    username: "lucasturner",
    password: "1234567890",
    phoneNumber: 8968936363,
    email: "lucasturner@gmail.com",
    roleId: 3,
    fullName: "Dominic Anderson",
    isDeleted: true,
  },
  {
    _id: "5",
    username: "lucasturner",
    password: "1234567890",
    phoneNumber: 8968936363,
    email: "lucasturner@gmail.com",
    roleId: 3,
    fullName: "Anzectio Chris",
    isDeleted: true,
  },
];

const randomTherapist = {
  _id: "randomTherapist",
  username: "randomTherapist",
  password: "123456",
  phoneNumber: 0,
  email: ".",
  roleId: 3,
  fullName: "Picking By Company",
  isDeleted: false,
};

// Component hiển thị mỗi giờ
const HourCard = ({
  selectedTime,
  time,
}: {
  time: string;
  selectedTime: string;
}) => {
  return (
    <View style={selectedTime == time ? styles.hourSelected : styles.hourCard}>
      <Text style={styles.hourText}>{formatSingleTime(time)}</Text>
    </View>
  );
};

// Hàm format giờ
function formatSingleTime(time) {
  let [hour, minute] = time.split(":");
  return `${parseInt(hour)}h${minute}`;
}

const SchedulePopup = ({
  visible,
  service,
  selectedTherapist,
  setSelectedTherapist,

  selectedDate,
  setSelectedDate,

  onClose,
}: any) => {
  // STATES
  const [isTherapistModalVisible, setTherapistModalVisible] = useState(false);
  // Mảng chính hứng data từ API
  const [schedules, setSchedules] = useState([]);
  const [therapists, setTherapists] = useState([]);

  const [appointmentTime, setAppointmentTime] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Control Visible state
  const [isConfirmButtonVisible, setIsConfirmButtonVisible] = useState(false);

  // Informations cho final booking details
  const [isAssigned, setIsAssigned] = useState(false);
  const [finalBookingDetails, setFinalBookingDetails] = useState(null);

  // HOOKS
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    return () => {
      const cleanup = async () => {
        setTherapists([]);
      };

      cleanup();
    };
  }, []);

  useEffect(() => {
    const loadSelectedTherapist = async () => {
      try {
        setIsLoading(true);
        await setAttributes("randomTherapist");
      } catch (error) {
        console.error(error.message);
      }
    };

    loadSelectedTherapist();
    // setPopupVisible(visible);
  }, [isFocused]);

  // FUNCTIONS

  const setAttributes = async (therapistId) => {
    // Gọi API để lấy danh sách therapist, schedules khi chưa có Therapist cụ thể
    setIsLoading(true);
    if (therapistId === "randomTherapist") {
      const fetchSchedules = await callApi({
        instance: publicApi,
        method: "get",
        url: `/bookings/services/${service._id}/schedules`,
      });
      if (fetchSchedules.success) {
        const therapists = fetchSchedules.data.availableTherapists;
        setTherapists([...therapists, randomTherapist]);
        setSchedules(fetchSchedules.data.schedules);
        setSelectedDate(fetchSchedules.data.schedules[0]);
        setSelectedTherapist(randomTherapist);
      }
    } else {
      const fetchSchedules = await callApi({
        instance: publicApi,
        method: "get",
        url: `/bookings/services/${service._id}/accounts/${therapistId}/schedules`,
      });
      if (fetchSchedules.success) {
        const therapists = fetchSchedules.data.availableTherapists;
        setTherapists([...therapists, randomTherapist]);
        setSchedules(fetchSchedules.data.schedules);
        setSelectedDate(fetchSchedules.data.schedules[0]);
      }
    }
    setIsLoading(false);
  };

  const handleSelectTherapist = async (selectedTherapist) => {
    try {
      await setAttributes(selectedTherapist._id);

      setSelectedTherapist(selectedTherapist);
      setSelectedTime(null);
      setIsConfirmButtonVisible(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const openTherapistModal = async (selectedItem) => {
    await handleSelectTherapist(selectedItem);
    if (selectedItem._id !== "randomTherapist") {
      setTherapistModalVisible(true);
    }
  };
  const closeTherapistModal = () => {
    setTherapistModalVisible(false);
    setIsLoading(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setIsConfirmButtonVisible(false);
  };
  const handleBooking = (time) => {
    setSelectedTime(time);
    const bookingDetails = {
      serviceId: service._id,
      appointmentTime: `${selectedDate.date}T${time}Z`,
      isAssigned: selectedTherapist._id === "randomTherapist" ? false : true,
      assignedTherapistId: selectedTherapist._id,
    };
    setAppointmentTime(formatSingleTime(time));
    setFinalBookingDetails(bookingDetails);
    setIsConfirmButtonVisible(true);
  };

  const handleConfirm = async () => {
    // GỌI API Ở ĐÂY ĐỂ BOOKING
    console.log("Booking Successfully, Details: ", finalBookingDetails);
    finalBookingDetails.isAssigned =
      selectedTherapist._id === "randomTherapist" ? false : true;
    finalBookingDetails.assignedTherapistId =
      selectedTherapist._id === "randomTherapist"
        ? null
        : selectedTherapist._id;
    const book = await callApi({
      instance: loginRequiredApi,
      method: "post",
      url: "/bookings",
      data: finalBookingDetails,
    });
    if (book.success) {
      navigation.reset({
        index: 0,
        routes: [{ name: "BOOKING", params: { screen: "BookingHistory" } }],
      });
      onClose();
    } else {
      Alert.alert("Booking Failed", "Please try again later", [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
        },
      ]);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.popup}>
          <Text style={styles.title}>Booking Services</Text>
          <Text style={styles.serviceName}>{service.name}</Text>

          {/* SELECT THERAPIST */}
          {!isLoading ? (
            <>
              <View style={styles.therapistSelectContainer}>
                <Text style={styles.therapistSelectTitle}>
                  Select Specific Therapist
                </Text>
                <Text style={styles.therapistSelectDescription}>
                  (This is optional, if you don't choose anyone. We will do it
                  for you)
                </Text>

                <SelectDropdown
                  data={therapists}
                  onSelect={openTherapistModal}
                  disabled={therapists.length > 1 ? false : true}
                  buttonStyle={styles.dropdownButtonStyle}
                  buttonTextStyle={styles.dropdownButtonTxtStyle}
                  defaultButtonText="Select a therapist"
                  rowStyle={styles.dropdownItemStyle}
                  rowTextStyle={styles.dropdownItemTxtStyle}
                  renderButton={(selectedItem, isOpened) => (
                    <View style={styles.dropdownButtonStyle}>
                      <Text style={styles.dropdownButtonTxtStyle}>
                        {selectedItem
                          ? selectedItem.fullName
                          : selectedTherapist?.fullName || "Picking By Company"}
                      </Text>
                      <Icon
                        name={isOpened ? "chevron-up" : "chevron-down"}
                        style={styles.dropdownButtonArrowStyle}
                      />
                    </View>
                  )}
                  renderItem={(item, index, isSelected) => (
                    <View
                      style={[
                        styles.dropdownItemStyle,
                        isSelected && { backgroundColor: "#D2D9DF" },
                      ]}
                    >
                      <Text style={styles.dropdownItemTxtStyle}>
                        {item.fullName}
                      </Text>
                    </View>
                  )}
                />
              </View>

              <Modal
                visible={isTherapistModalVisible}
                transparent={true}
                animationType="slide"
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <ScrollView
                      style={{ flex: 1, width: "100%" }}
                      contentContainerStyle={{ flexGrow: 1 }}
                      keyboardShouldPersistTaps="handled"
                    >
                      <TherapistSelectionPopup
                        therapistId={
                          selectedTherapist ? selectedTherapist._id : null
                        }
                        serviceId={service._id}
                      />
                    </ScrollView>

                    {/* Nút đóng popup */}
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={closeTherapistModal}
                    >
                      <Text style={styles.closeButtonText}>Đóng</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </>
          ) : (
            <Text>Therapist Loaded ...</Text>
          )}

          {/* RENDER AVAILABLE DATE */}
          {!isLoading ? (
            <View style={styles.timeSelectContainer}>
              <Text style={{ fontSize: 16, marginBottom: 10 }}>Chọn ngày:</Text>

              {/* Dropdown chọn ngày */}
              <SelectDropdown
                data={schedules}
                defaultValue={selectedDate}
                disabled={schedules.length === 0}
                onSelect={handleDateChange}
                buttonStyle={styles.dropdownButtonStyle}
                buttonTextStyle={styles.dropdownButtonTxtStyle}
                defaultButtonText="Select a date"
                rowStyle={styles.dropdownItemStyle}
                rowTextStyle={styles.dropdownItemTxtStyle}
                renderButton={(selectedItem, isOpened) => {
                  // console.log("Selected Date: ", selectedItem);
                  return (
                    <View style={styles.dropdownButtonStyle}>
                      <Text style={styles.dropdownButtonTxtStyle}>
                        {schedules.length > 0
                          ? schedules[0].date
                          : "No available date"}
                      </Text>
                      <Icon
                        name={isOpened ? "chevron-up" : "chevron-down"}
                        style={styles.dropdownButtonArrowStyle}
                      />
                    </View>
                  );
                }}
                renderItem={(item, index, isSelected) => (
                  <View
                    style={[
                      styles.dropdownItemStyle,
                      isSelected && { backgroundColor: "#D2D9DF" },
                    ]}
                  >
                    <Text style={styles.dropdownItemTxtStyle}>{item.date}</Text>
                  </View>
                )}
                buttonTextStyle={{ fontSize: 16 }}
              />

              <Text style={{ fontSize: 16, marginTop: 20 }}>
                Giờ có sẵn:{" "}
                {schedules.length > 0 ? "" : "Không có lịch hẹn nào"}
              </Text>

              {/* Hiển thị danh sách giờ tương ứng */}
              {selectedDate ? (
                <View style={{ width: "100%" }}>
                  <FlatList
                    data={selectedDate.hours}
                    numColumns={3}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <Pressable onPress={() => handleBooking(item)}>
                        <HourCard selectedTime={selectedTime} time={item} />
                      </Pressable>
                    )}
                  />
                </View>
              ) : (
                <View style={styles.noDateContainer}>
                  <FontAwesome5 name="sad-tear" size={40} color="#555" />
                  <Text style={styles.noDateText}>No available date</Text>
                </View>
              )}
            </View>
          ) : (
            <Text>Loading Schedules ...</Text>
          )}

          {isConfirmButtonVisible && (
            <View style={styles.confirmBookingContainer}>
              <View style={styles.bookingInformationsContainer}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontStyle: "italic",
                    color: "#5468B7",
                  }}
                >
                  This Is Your Booking Details
                </Text>
                <Text>
                  <Text style={{ fontWeight: "bold" }}>Appointment Time:</Text>{" "}
                  {appointmentTime}
                </Text>

                <Text>
                  <Text style={{ fontWeight: "bold" }}>Appointment Date:</Text>{" "}
                  {selectedDate?.date}
                </Text>
                <Text>
                  <Text style={{ fontWeight: "bold" }}>Therapist:</Text>{" "}
                  {selectedTherapist.fullName}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm}
              >
                <Text style={styles.closeText}>Confirm Booking</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Nút đóng popup */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// ** Styles **
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popup: {
    backgroundColor: "#fff",
    width: "90%",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  serviceName: {
    fontSize: 15,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  therapistSelectContainer: {
    padding: 5,
    marginVertical: 10,
    width: "100%",
    alignItems: "flex-start",
  },
  therapistSelectTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#233375",
  },
  therapistSelectDescription: {
    fontSize: 8,
    fontWeight: "light",
    fontStyle: "italic",
    marginBottom: 4,
  },
  timeSelectContainer: {
    padding: 5,
    marginVertical: 10,
    width: "100%",
    alignItems: "flex-start",
  },
  dateButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#3498db",
    marginBottom: 15,
  },
  dateText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  hourList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 10,
  },
  hourSelected: {
    flex: 1,
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 5,
    margin: 5,
    minWidth: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  hourCard: {
    flex: 1,
    backgroundColor: "#f1c40f",
    padding: 15,
    borderRadius: 5,
    margin: 5,
    minWidth: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  hourText: {
    color: "black",
    fontWeight: "bold",
  },
  noHours: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#555",
    marginTop: 10,
  },
  gridContainer: {
    width: "100%",
    justifyContent: "center", // Căn giữa nội dung
    paddingHorizontal: 10, // Tạo khoảng cách với viền
  },
  gridItem: {
    flex: 1, // Giúp mỗi item chiếm đủ không gian
    margin: 5, // Khoảng cách giữa các item
    alignItems: "center", // Canh giữa nội dung
  },
  closeButton: {
    marginTop: 15,
    padding: 12,
    backgroundColor: "#e74c3c",
    borderRadius: 8,
  },
  confirmButton: {
    marginTop: 15,
    padding: 12,
    backgroundColor: "#4B79F1",
    borderRadius: 8,
  },
  closeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  dropdownButtonStyle: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownButtonTxtStyle: {
    fontSize: 16,
    color: "#333",
  },
  dropdownButtonArrowStyle: {
    fontSize: 16,
    color: "#333",
  },
  dropdownItemStyle: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  dropdownItemTxtStyle: {
    fontSize: 16,
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Làm mờ nền
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    height: "80%", // Đặt chiều cao giới hạn
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  confirmBookingContainer: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  bookingInformationsContainer: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    backgroundColor: "rgba(128, 128, 128, 0.3)",
    borderRadius: 8,
  },
  noDateContainer: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  noDateText: {
    fontSize: 20,
    color: "#555",
    fontWeight: "bold",
  },
});

export default SchedulePopup;
