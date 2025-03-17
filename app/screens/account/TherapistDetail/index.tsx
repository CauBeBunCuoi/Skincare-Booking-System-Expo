import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { styles } from "./styles";
import { useNavigation } from "expo-router";
import TherapistInformation from "./Widget/TherapistInformation";
import { ScrollView } from "react-native";
import TherapistDegree from "./Widget/TherapistDegree";
import TherapistExperiences from "./Widget/TherapistExperiences";
import DividerUI from "@/components/ui/DividerUI";
import ServiceCardSimple from "@/components/services/ServiceCardSimple";
import ServiceSimpleCarousel from "@/components/services/ServiceSimpleCarousel";
import { callApi } from "@/app/api/main/api_call/api";
import { publicApi } from "@/app/api/instance/axiosInstance";
import { ImageBackground } from "react-native";

// const data = {
//   therapist: {
//     _id: "123",
//     username: "lucasturner",
//     password: "1234567890",
//     phoneNumber: 123456789,
//     email: "lucasturner@gmail.com",
//     roleId: 3,
//     fullName: "Lucas Turner",
//   },
//   analyzing: {
//     avgRate: 4.9,
//     totalBooking: 5370,
//     totalCustomer: 1200,
//   },
//   services: [
//     {
//       _id: "1",
//       accountId: "123",
//       serviceId: "1",
//       name: "Deep Tissue",
//       fee: 1790000,
//       experienceYears: 12,
//     },
//     {
//       _id: "2",
//       accountId: "123",
//       serviceId: "2",
//       name: "Facial Detox",
//       fee: 800000,
//       experienceYears: 9,
//     },
//     {
//       _id: "3",
//       accountId: "123",
//       serviceId: "3",
//       name: "Microdermabrasion",
//       fee: 1200000,
//       experienceYears: 7,
//     },
//   ],
//   backgrounds: [
//     {
//       _id: "1",
//       accountId: "123",
//       description: "#Master's degree in Dermatology",
//     },
//     {
//       _id: "2",
//       accountId: "123",
//       description:
//         "@Sắc đẹp không chỉ đến từ những gì bạn thoa lên da, mà còn từ cách bạn chăm sóc tâm hồn mình.",
//     },
//     {
//       _id: "3",
//       accountId: "123",
//       description:
//         "#Master's truyền thống của Pháp, giúp tôi hiểu rõ hơn về làn da và cách chăm sóc da.",
//     },
//     {
//       _id: "4",
//       accountId: "123",
//       description: `Winner of the "Best Skincare Specialist" award in 2022`,
//     },
//   ],
//   feedbackRates: [
//     {
//       _id: "1",
//       bookingId: "16",
//       customerName: "John Doe",
//       feedbackContent:
//         "Dr. Lucas Turner is truly amazing! I had microneedling done for my acne scars, and the results have been incredible. My skin looks smoother, more even-toned, and radiant. The procedure was well-explained, and the clinic was extremely professional. Highly recommend!",
//       rate: 5,
//     },
//     {
//       _id: "2",
//       bookingId: "153",
//       customerName: "Jonathan Lucious",
//       feedbackContent:
//         "Dr. Lucas Turner is truly amazing! I had microneedling done for my acne scars, and the results have been incredible. My skin looks smoother, more even-toned, and radiant. The procedure was well-explained, and the clinic was extremely professional. Highly recommend!",
//       rate: 5,
//     },
//   ],
// };

const TherapistDetailScreen = () => {
  // STATES
  const [loading, setLoading] = useState(true);
  const [therapist, setTherapist] = useState(null);
  const [analyzing, setAnalyzing] = useState(null);
  const [services, setServices] = useState([]);
  const [backgrounds, setBackgrounds] = useState([]);
  const [feedbackRates, setFeedbackRates] = useState([]);

  // HOOKS
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();
  const { therapistId, therapistName } = route.params || {};

  useEffect(() => {
    navigation.setOptions({ title: `${therapistName}` });
    setLoading(true);
    setAttributes();
  }, [isFocused]);

  // FUNCTIONS
  const setAttributes = async () => {
    console.log("Therapist ID: ", therapistId);
    const therapistData = await callApi({
      instance: publicApi,
      method: "get",
      url: `/accounts/${therapistId}/therapist-detail`,
    });
    if (therapistData.success) {
      setTherapist(therapistData.data.therapist);
      setAnalyzing(therapistData.data.analyzing);
      setServices(therapistData.data.services);
      setBackgrounds(therapistData.data.backgrounds);
      setFeedbackRates(therapistData.data.feedbackRates);
    }
    setLoading(false);
  };

  const extractTherapistInfo = (backgrounds): any[] => {
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
      <ScrollView style={styles.scrollContainer}>
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
              isSelection={false}
            />
            <TherapistDegree data={extractTherapistInfo(backgrounds)} />
            <TherapistExperiences services={services} />
            <DividerUI />
            <View style={styles.servicesContainer}>
              <Text style={styles.servicesTitle}>
                What does this Therapist do ?
              </Text>
              <ServiceSimpleCarousel services={services} />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default TherapistDetailScreen;
