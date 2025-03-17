import { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { styles } from "./styles";
import TherapistInformation from "../../service/ServiceDetail/Widget/TherapistInformation";
import TherapistDegree from "../../service/ServiceDetail/Widget/TherapistDegree";
import TherapistExperiences from "../../service/ServiceDetail/Widget/TherapistExperiences";
import { Divider } from "react-native-paper";
import DividerUI from "@/components/ui/DividerUI";
import CustomerRate from "../../service/ServiceDetail/Widget/CustomerRate";

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

const TherapistSelectionScreen = () => {
  // STATES
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState(null);
  // HOOKS
  const isFocused = useIsFocused();

  useEffect(() => {
    setLoading(true);
    setService(data.services[0]);
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
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/images/backgrounds/therapist/main.jpg")}
        style={styles.background}
      />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <Text>Therapist Selection Screen</Text>
          <TherapistInformation data={data} isSelection={true} />
          <TherapistDegree data={otherBackgrounds} />
          <TherapistExperiences services={data.services} />

          <DividerUI />

          <View style={styles.feedbackDescriptionContainer}>
            <Text style={styles.feedbackDescriptionText}>
              Rating From User About Doing{" "}
              <Text style={{ color: "red" }}>
                {service ? service.name : "Unknown Service"}
              </Text>{" "}
              With
              <Text style={{ color: "red" }}>
                {" "}
                Dr.{data.therapist.fullName}
              </Text>
            </Text>
          </View>

          <View style={{ width: "100%", alignItems: "center" }}>
            {data.feedbackRates.map((feedbackRate) => (
              <CustomerRate key={feedbackRate._id} rate={feedbackRate} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TherapistSelectionScreen;
