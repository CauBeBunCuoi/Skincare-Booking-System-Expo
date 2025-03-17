import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { styles } from "./styles";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/FontAwesome";
import { callApi } from "@/app/api/main/api_call/api";
import { loginRequiredApi, publicApi } from "@/app/api/instance/axiosInstance";
import { useFocusEffect, useNavigation } from "expo-router";

const serviceTypes = [
  {
    _id: 1,
    name: "Điều trị da liễu",
    description: "Loại điều trị chuyên sâu cho các vấn đề da liễu.",
  },
  {
    _id: 2,
    name: "Da liễu thẩm mỹ",
    description: "Điều trị da liễu thẩm mỹ nhằm cải thiện vẻ ngoài của da.",
  },
  {
    _id: 3,
    name: "Chăm sóc da nâng cao",
    description:
      "Chăm sóc da nâng cao với các sản phẩm và liệu trình tiên tiến.",
  },
  {
    _id: 4,
    name: "Điều trị bằng laser và công nghệ cao",
    description:
      "Các phương pháp điều trị bằng laser và công nghệ cao cho làn da.",
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

const QuickBookingScreen = () => {
  // STATES
  const [servicesLoading, setServiceLoading] = useState(true);
  const [therapistLoading, setTherapistLoading] = useState(true);
  const [scheduleLoading, setScheduleLoading] = useState(true);
  const [showConfirmBtn, setShowConfirmBtn] = useState(false);
  const [firstTime, setFirstTime] = useState(true);

  const [therapists, setTherapists] = useState(null);
  const [services, setServices] = useState(null);
  const [schedules, setSchedules] = useState([]);

  const [isAssigned, setIsAssigned] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedServiceType, setSelectedServiceType] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedTherapist, setSelectedTherapist] = useState(null);

  // Thêm State này
  // HOOKS
  const isFocused = useIsFocused();
  const navigate = useNavigation();
  // useEffect(() => {}, [isFocused]);

  useFocusEffect(
    useCallback(() => {
      console.log("Resetting state...");
      // Reset state khi vào lại màn hình
      setServiceLoading(true);
      setTherapistLoading(true);
      setScheduleLoading(true);
      setSelectedDate(null);
      setFirstTime(true);
      setSelectedServiceType(null);
      setSelectedService(null);
      setSelectedTherapist(null);
      setShowConfirmBtn(false);
      setTherapists(null);
      setServices(null);
      setSchedules([]);
      setIsAssigned(false);
      console.log("selectedServiceType:", selectedServiceType);
      return () => {
        // Cleanup khi rời khỏi màn hình (nếu cần)
      };
    }, [])
  );

  // FUNCTIONS
  const handleSelectServiceType = async (item) => {
    setFirstTime(false);
    setSelectedServiceType(item);
    setSelectedService(null);
    setSelectedTherapist(null);
    setServiceLoading(true);
    setTherapistLoading(true);
    setScheduleLoading(true);
    setSelectedDate(null);
    setSelectedTime(null);
    setShowConfirmBtn(false);
    //CALL API TO GET SERVICES
    const response = await callApi({
      instance: publicApi,
      method: "post",
      url: `/services/filters`,
      data: {
        serviceTypeId: item._id,
        skinTypes: [],
        skinStatuses: [],
      },
    });

    if (response.success) {
      setServices(response.data.services);
      setServiceLoading(false);
    } else {
      console.log("\n\n\nError: ", response.message.content);
    }
  };

  const handleSelectService = async (item) => {
    setSelectedService(item);
    setTherapistLoading(true);
    setScheduleLoading(true);
    setSelectedDate(null);
    setSelectedTime(null);
    setShowConfirmBtn(false);
    //CALL API TO GET THERAPISTS
    const response = await callApi({
      instance: publicApi,
      method: "get",
      url: `/services/${item._id}`,
    });

    if (response.success) {
      setTherapists([randomTherapist, ...response.data.therapists]);
      setTherapistLoading(false);
    } else {
      console.log("\n\n\nError: ", response.message.content);
    }
  };

  const handleSelectTherapist = async (item) => {
    setSelectedTherapist(item);
    setScheduleLoading(true);
    setSelectedDate(null);
    setSelectedTime(null);
    setShowConfirmBtn(false);
    //CALL API TO GET SCHEDULES
    if (item._id === "randomTherapist") {
      setIsAssigned(false);
      const response = await callApi({
        instance: publicApi,
        method: "get",
        url: `/bookings/services/${selectedService._id}/schedules`,
      });
      if (response.success) {
        setSchedules(response.data.schedules);
        setScheduleLoading(false);
      } else {
        console.log("\n\n\nError: ", response.message.content);
      }
    } else {
      setIsAssigned(true);
      const response = await callApi({
        instance: publicApi,
        method: "get",
        url: `/bookings/services/${selectedService._id}/accounts/${item._id}/schedules`,
      });
      if (response.success) {
        setSchedules(response.data.schedules);
        setScheduleLoading(false);
      } else {
        console.log("\n\n\nError: ", response.message.content);
      }
    }
  };

  const handleSelectDate = (item) => {
    setSelectedDate(item);
    setShowConfirmBtn(false);
  };

  const handleSelectedTime = (item) => {
    setSelectedTime(item);
    setShowConfirmBtn(true);
  };

  const handleConfirmBooking = async () => {
    const booking = {
      serviceId: selectedService._id,
      appointmentTime: `${selectedDate.date}T${selectedTime}Z`,
      isAssigned: isAssigned,
      assignedTherapistId:
        selectedTherapist._id === "randomTherapist"
          ? null
          : selectedTherapist._id,
    };

    console.log("Service ID:", selectedService._id);
    console.log("Therapist ID:", selectedTherapist._id);

    const book = await callApi({
      instance: loginRequiredApi,
      method: "post",
      url: "/bookings",
      data: booking,
    });

    if (book.success) {
      navigate.reset({
        index: 0,
        routes: [{ name: "BOOKING", params: { screen: "BookingHistory" } }],
      });
    } else {
      console.log("Booking failed: ", book.data.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/images/backgrounds/booking/main.jpg")}
        style={styles.background}
      />

      <View style={styles.container}>
        {/* Thêm View này */}
        <Text style={styles.screenTitle}>Booking</Text>
        <View style={styles.bookingContainer}>
          <View style={styles.stepContainer}>
            <Text style={styles.stepText}>1. Loại dịch vụ bạn mong muốn ?</Text>
            <SelectDropdown
              data={serviceTypes}
              onSelect={handleSelectServiceType}
              buttonStyle={styles.dropdownButtonStyle}
              buttonTextStyle={styles.dropdownButtonTxtStyle}
              rowStyle={styles.dropdownItemStyle}
              defaultButtonText="Select a Service Type"
              rowTextStyle={styles.dropdownItemTxtStyle}
              renderButton={(selectedServiceType, isOpened) => (
                <View style={styles.dropdownButtonStyle}>
                  {firstTime ? (
                    <Text style={styles.dropdownButtonTxtStyle}>
                      Select a Service Type
                    </Text>
                  ) : (
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {selectedServiceType
                        ? selectedServiceType.name
                        : "Select a Service Type"}
                    </Text>
                  )}
                  <Icon
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    style={styles.dropdownButtonArrowStyle}
                  />
                </View>
              )}
              renderItem={(item, index, isSelected) => (
                <View
                  key={item._id}
                  style={[
                    styles.dropdownItemStyle,
                    isSelected && { backgroundColor: "#D2D9DF" },
                  ]}
                >
                  <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
                </View>
              )}
            />
          </View>

          {!servicesLoading && (
            <View style={styles.stepContainer}>
              <Text style={styles.stepText}>
                2. Dịch vụ cụ thể bạn mong muốn ?
              </Text>
              <SelectDropdown
                data={services}
                onSelect={handleSelectService}
                buttonStyle={styles.dropdownButtonStyle}
                buttonTextStyle={styles.dropdownButtonTxtStyle}
                rowStyle={styles.dropdownItemStyle}
                rowTextStyle={styles.dropdownItemTxtStyle}
                renderButton={(selectedService, isOpened) => (
                  <View style={styles.dropdownButtonStyle}>
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {selectedService
                        ? selectedService.name
                        : "Select a Service"}
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
                    <Text key={index} style={styles.dropdownItemTxtStyle}>
                      {item.name}
                    </Text>
                  </View>
                )}
              />
            </View>
          )}

          {!therapistLoading && (
            <View style={styles.stepContainer}>
              <Text style={styles.stepText}>
                3. Bạn muốn Điều trị viên nào thực hiện giúp bạn ?
              </Text>
              <SelectDropdown
                data={therapists}
                onSelect={handleSelectTherapist}
                buttonStyle={styles.dropdownButtonStyle}
                buttonTextStyle={styles.dropdownButtonTxtStyle}
                rowStyle={styles.dropdownItemStyle}
                rowTextStyle={styles.dropdownItemTxtStyle}
                renderButton={(selectedService, isOpened) => (
                  <View style={styles.dropdownButtonStyle}>
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {selectedService
                        ? selectedService.fullName
                        : "Select a Therapist"}
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
                    <Text key={index} style={styles.dropdownItemTxtStyle}>
                      {item.fullName}
                    </Text>
                  </View>
                )}
              />
            </View>
          )}

          {!scheduleLoading && (
            <View style={styles.stepContainer}>
              <Text style={styles.stepText}>
                4. Chọn ngày bạn muốn đặt lịch
              </Text>
              {schedules.length > 0 ? (
                <SelectDropdown
                  data={schedules}
                  onSelect={handleSelectDate}
                  buttonStyle={styles.dropdownButtonStyle}
                  buttonTextStyle={styles.dropdownButtonTxtStyle}
                  rowStyle={styles.dropdownItemStyle}
                  rowTextStyle={styles.dropdownItemTxtStyle}
                  renderButton={(selectedDate, isOpened) => (
                    <View style={styles.dropdownButtonStyle}>
                      <Text style={styles.dropdownButtonTxtStyle}>
                        {selectedDate ? selectedDate.date : "Select a Date"}
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
                      <Text key={index} style={styles.dropdownItemTxtStyle}>
                        {item.date}
                      </Text>
                    </View>
                  )}
                />
              ) : (
                <View style={styles.noHoursContainer}>
                  <Text style={styles.noHoursText}>No available date</Text>
                </View>
              )}
            </View>
          )}

          {selectedDate && (
            <>
              {selectedDate.hours.length > 0 ? (
                <View style={styles.flatListContainer}>
                  <FlatList
                    data={selectedDate.hours}
                    keyExtractor={(item) => item}
                    numColumns={2} // Chia thành 2 hàng
                    contentContainerStyle={styles.list}
                    showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={[
                          styles.hourCard,
                          selectedTime === item && styles.selectedHourCard,
                        ]}
                        onPress={() => handleSelectedTime(item)}
                      >
                        <Text style={styles.hourCardText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              ) : (
                <View style={styles.noHoursContainer}>
                  <Text style={styles.noHoursText}>No available time</Text>
                </View>
              )}
            </>
          )}

          {showConfirmBtn && (
            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={() => handleConfirmBooking()}
            >
              <Text style={styles.confirmBtnText}>Confirm</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default QuickBookingScreen;
