import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import DividerUI from "@/components/ui/DividerUI";
import TherapistInformation from "./TherapistInformation";
import TherapistDegree from "./TherapistDegree";
import TherapistExperiences from "./TherapistExperiences";
import CustomerRate from "./CustomerRate";
import { callApi } from "@/app/api/main/api_call/api";
import { publicApi } from "@/app/api/instance/axiosInstance";

const data = {
  therapist: {
    _id: "123",
    username: "lucasturner",
    password: "1234567890",
    phoneNumber: 123456789,
    email: "lucasturner@gmail.com",
    roleId: 3,
    fullName: "Lucas Turner",
  },
  analyzing: {
    avgRate: 4.9,
    totalBooking: 5370,
    totalCustomer: 1200,
  },
  services: [
    {
      _id: "1",
      accountId: "123",
      serviceId: "1",
      name: "Microneedling Skin Rejuvenation",
      fee: 1790000,
      experienceYears: 12,
    },
  ],
  backgrounds: [
    {
      _id: "1",
      accountId: "123",
      description: "#Master's degree in Dermatology",
    },
    {
      _id: "2",
      accountId: "123",
      description:
        "@Sắc đẹp không chỉ đến từ những gì bạn thoa lên da, mà còn từ cách bạn chăm sóc tâm hồn mình.",
    },
    {
      _id: "3",
      accountId: "123",
      description:
        "Certified Esthetician with advanced training in anti-aging treatments.",
    },
    {
      _id: "4",
      accountId: "123",
      description: `Winner of the "Best Skincare Specialist" award in 2022`,
    },
  ],
  feedbackRates: [
    {
      _id: "1",
      bookingId: "16",
      customerName: "John Doe",
      feedbackContent:
        "Dr. Lucas Turner is truly amazing! I had microneedling done for my acne scars, and the results have been incredible. My skin looks smoother, more even-toned, and radiant. The procedure was well-explained, and the clinic was extremely professional. Highly recommend!",
      rate: 5,
    },
    {
      _id: "2",
      bookingId: "153",
      customerName: "Jonathan Lucious",
      feedbackContent:
        "Dr. Lucas Turner is truly amazing! I had microneedling done for my acne scars, and the results have been incredible. My skin looks smoother, more even-toned, and radiant. The procedure was well-explained, and the clinic was extremely professional. Highly recommend!",
      rate: 5,
    },
  ],
};

const TherapistSelectionPopup = ({ therapistId, serviceId }) => {
  // STATES
  const [loading, setLoading] = useState(true);
  const [therapist, setTherapist] = useState(null);
  const [service, setService] = useState(null);
  const [feedbackRates, setFeedbackRates] = useState([]);
  const [backgrounds, setBackgrounds] = useState([]);
  const [analyzing, setAnalyzing] = useState(null);

  // HOOKS
  const isFocused = useIsFocused();

  useEffect(() => {
    setLoading(true);

    setAttributes();
  }, [isFocused]);

  const setAttributes = async () => {
    const therapistSelection = await callApi({
      instance: publicApi,
      method: "get",
      url: `/accounts/${therapistId}/therapist-selection`,
    });
    if (therapistSelection.success) {
      setTherapist(therapistSelection.data.therapist);
      setFeedbackRates(therapistSelection.data.feedbackRates);
      setBackgrounds(therapistSelection.data.backgrounds);
      setService(data.services[0]);
      setAnalyzing(therapistSelection.data.analyzing);
    }

    setLoading(false);
  };

  const extractTherapistInfo = (backgrounds) => {
    const otherBackgrounds = backgrounds.filter(
      (item) =>
        !item.description.startsWith("#") && !item.description.includes("@")
    );
    return otherBackgrounds;
  };

  // const { otherBackgrounds } = extractTherapistInfo(data);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/images/backgrounds/therapist/main.jpg")}
        style={styles.background}
      />
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
        keyboardShouldPersistTaps="handled"
      >
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <View style={styles.container}>
            <TherapistInformation
              data={{
                therapist,
                analyzing,
                backgrounds,
              }}
              isSelection={true}
            />
            <TherapistDegree data={extractTherapistInfo(backgrounds)} />
            <TherapistExperiences services={data.services} />

            <DividerUI />

            <View style={{ width: "100%", alignItems: "center" }}>
              {feedbackRates.map((feedbackRate) => (
                <CustomerRate key={feedbackRate._id} rate={feedbackRate} />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {},
  scrollContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  background: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  scrollContent: {
    paddingBottom: 20, // Để tránh nội dung bị che khuất
  },
  therapistDegree: {
    width: "100%",
  },
  feedbackDescriptionContainer: {
    width: "90%",
    padding: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6, // Android
    marginBottom: 16,
  },
  feedbackDescriptionText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
});
export default TherapistSelectionPopup;
