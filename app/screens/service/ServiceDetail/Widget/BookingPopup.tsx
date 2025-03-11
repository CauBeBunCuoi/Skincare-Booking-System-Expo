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
} from "react-native";
import DatePicker from "react-native-date-picker";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/FontAwesome";
import { TherapistSelectionScreen } from "@/app/screens/account";
import TherapistSelectionPopup from "./TherapistSelectionPopup";

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
const HourCard = ({ time }: { time: string }) => (
  <View style={styles.hourCard}>
    <Text style={styles.hourText}>{formatSingleTime(time)}</Text>
  </View>
);

// Hàm format giờ
function formatSingleTime(time) {
  let [hour, minute] = time.split(":");
  return `${parseInt(hour)}h${minute}`;
}

const SchedulePopup = ({
  visible,
  serviceName,
  serviceId,
  selectedTherapist,
  selectedDate,
  setSelectedTherapist,
  setSelectedDate,

  onClose,
}: any) => {
  // STATES
  const [isTherapistModalVisible, setTherapistModalVisible] = useState(false);
  // Mảng chính hứng data từ API
  const [schedules, setSchedules] = useState([]);
  const [therapists, setTherapists] = useState([]);

  const [appointmentTime, setAppointmentTime] = useState<string | null>(null);

  // Loading state
  const [isTherapistLoading, setIsTherapistLoading] = useState(true);
  const [isScheduleLoading, setIsScheduleLoading] = useState(true);

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
        // await AsyncStorage.removeItem("selectedTherapist");
        setTherapists([]);
        // setSelectedTherapist(null);
        // setSelectedDate(null);
      };

      cleanup();
    };
  }, []);

  useEffect(() => {
    const loadSelectedTherapist = async () => {
      try {
        setIsTherapistLoading(true);
        await setAttributes(serviceId, "");

        // Gọi API để lấy schedule với therapist random
        // const storedTherapist = await AsyncStorage.getItem("selectedTherapist");
        // if (storedTherapist) {
        //   setSelectedTherapist(JSON.parse(storedTherapist)); // Chuyển JSON về object
        // } else {
        //   setSelectedTherapist(randomTherapist);
        // }
      } catch (error) {
        console.error("Error loading therapist from storage:", error);
      }
    };

    loadSelectedTherapist();
    // setPopupVisible(visible);
  }, [isFocused]);

  // FUNCTIONS

  const setAttributes = async (serviceId, therapistId) => {
    // Gọi API để lấy danh sách therapist, schedules khi chưa có Therapist cụ thể

    // if(therapistId === "") {
    //   setIsTherapistLoading(true);
    //   setIsScheduleLoading(true);
    //   const data = await axios.get("/bookings/services/{serviceId}/schedules");
    //   if(data && data.length > 0) {
    //     await fetchTherapist(data.availableTherapists)
    //     await fetchSchedules(data.schedules)
    //   }
    // }
    // if else(therapistId === "random") {
    //     setIsScheduleLoading(true);
    //     const data = await axios.get("/bookings/services/{serviceId}/schedules");
    //     if(data && data.length > 0) {
    //     await fetchSchedules(data.schedules)
    //     }
    // }
    // else{
    //   setIsScheduleLoading(true);
    //   const data = await axios.get("/booking/services/{serviceId}/accounts/{accountId}/schedules");
    //   if(data && data.length > 0) {
    //     await fetchTherapist(data.schedules)
    //   }
    // }

    const fetchTherapist = async (data) => {
      await setTherapists(data);
      setTherapists((prevTherapists) => [...prevTherapists, randomTherapist]);
      setIsTherapistLoading(false);
    };

    const fetchSchedules = async (data) => {
      setSchedules(data);
      setSelectedDate(data[0]);
      setIsScheduleLoading(false);
    };

    await fetchTherapist(therapistList);
    await fetchSchedules(scheduleList);
    setSelectedTherapist(randomTherapist);
  };

  const handleSelectTherapist = async (selectedTherapist) => {
    try {
      setIsScheduleLoading(true);
      if (selectedTherapist._id === "randomTherapist") {
        setIsAssigned(false);
        await setAttributes(serviceId, "random");
      } else {
        setIsAssigned(true);
        await setAttributes(serviceId, selectedTherapist._id);
      }
      setSelectedTherapist(selectedTherapist);
      setIsConfirmButtonVisible(false);
    } catch (error) {
      console.error("Error saving therapist to storage:", error);
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
    setIsScheduleLoading(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsConfirmButtonVisible(false);
  };
  const handleBooking = (time) => {
    const bookingDetails = {
      serviceId: serviceId,
      appointmentTime: `${selectedDate.date}T${time}Z`,
      isAssigned: isAssigned,
      assignedTherapistId: selectedTherapist._id,
    };
    setAppointmentTime(formatSingleTime(time));
    setFinalBookingDetails(bookingDetails);
    setIsConfirmButtonVisible(true);
  };

  const handleConfirm = () => {
    // GỌI API Ở ĐÂY ĐỂ BOOKING
    console.log("Booking Successfully, Details: ", finalBookingDetails);
    navigation.reset({
      index: 0,
      routes: [{ name: "BOOKING", params: { screen: "BookingHistory" } }],
    });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.popup}>
          <Text style={styles.title}>Booking Services</Text>
          <Text style={styles.serviceName}>{serviceName}</Text>

          {/* SELECT THERAPIST */}
          {!isTherapistLoading ? (
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
                        therapist={selectedTherapist ? selectedTherapist : null}
                        serviceId={serviceId}
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
          {!isScheduleLoading ? (
            <View style={styles.timeSelectContainer}>
              <Text style={{ fontSize: 16, marginBottom: 10 }}>Chọn ngày:</Text>

              {/* Dropdown chọn ngày */}
              <SelectDropdown
                data={schedules}
                defaultValue={selectedDate}
                onSelect={handleDateChange}
                buttonStyle={styles.dropdownButtonStyle}
                buttonTextStyle={styles.dropdownButtonTxtStyle}
                defaultButtonText="Select a date"
                rowStyle={styles.dropdownItemStyle}
                rowTextStyle={styles.dropdownItemTxtStyle}
                renderButton={(selectedItem, isOpened) => (
                  <View style={styles.dropdownButtonStyle}>
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {selectedItem
                        ? selectedItem.date
                        : selectedTherapist?.date || schedules[0].date}
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
                    <Text style={styles.dropdownItemTxtStyle}>{item.date}</Text>
                  </View>
                )}
                buttonTextStyle={{ fontSize: 16 }}
              />

              <Text style={{ fontSize: 16, marginTop: 20 }}>Giờ có sẵn:</Text>

              {/* Hiển thị danh sách giờ tương ứng */}
              {selectedDate && (
                <View style={{ flex: 1, width: "100%" }}>
                  <FlatList
                    data={selectedDate.hours}
                    numColumns={3}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <Pressable onPress={() => handleBooking(item)}>
                        <HourCard time={item} />
                      </Pressable>
                    )}
                  />
                </View>
              )}
            </View>
          ) : (
            <Text>Loading Schedules ...</Text>
          )}

          {isConfirmButtonVisible && (
            <View style={styles.confirmBookingContainer}>
              <View style={styles.bookingInformationsContainer}>
                <Text>This Is Your Booking Details</Text>
                <Text>Service ID: {finalBookingDetails.serviceId}</Text>
                <Text>Appointment Time: {appointmentTime}</Text>
                <Text>Appointment Date: {selectedDate.date}</Text>
                <Text>Therapist: {selectedTherapist.fullName}</Text>
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
    height: 300,
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
    color: "#fff",
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
});

export default SchedulePopup;
