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
      name: "Deep Tissue",
      fee: 1790000,
      experienceYears: 12,
    },
    {
      _id: "2",
      accountId: "123",
      serviceId: "2",
      name: "Facial Detox",
      fee: 800000,
      experienceYears: 9,
    },
    {
      _id: "3",
      accountId: "123",
      serviceId: "3",
      name: "Microdermabrasion",
      fee: 1200000,
      experienceYears: 7,
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

const TherapistDetailScreen = () => {
  // STATES
  const [loading, setLoading] = useState(true);
  // HOOKS
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();
  const { therapistId, therapistName } = route.params || {};

  useEffect(() => {
    navigation.setOptions({ title: `${therapistName}` });
    setLoading(true);
    // setAttributes();
  }, [isFocused]);

  const extractTherapistInfo = (data) => {
    const otherBackgrounds = data.backgrounds.filter(
      (item) =>
        !item.description.startsWith("#") && !item.description.includes("@")
    );
    return {
      otherBackgrounds,
    };
  };

  const { otherBackgrounds } = extractTherapistInfo(data);

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <TherapistInformation data={data} isSelection={false} />
        <TherapistDegree data={otherBackgrounds} />
        <TherapistExperiences services={data.services} />
        <DividerUI />
        <View style={styles.servicesContainer}>
          <Text style={styles.servicesTitle}>
            What does this Therapist do ?
          </Text>
          <ServiceSimpleCarousel services={data.services} />
        </View>
      </View>
    </ScrollView>
  );
};

export default TherapistDetailScreen;
