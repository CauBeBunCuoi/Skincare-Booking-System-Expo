import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { styles } from "./styles";
import ServiceTypeCard from "./Widget/ServiceTypeCard";
import { ScrollView } from "react-native-gesture-handler";
import ServiceTypeGroups from "./Widget/ServiceTypeGroups";

const data = [
  {
    _id: 1,
    name: "Dermatological Treatment",
    description:
      "Dermatological Treatment focuses on diagnosing and treating skin conditions, including acne, eczema, and pigmentation, using medical-grade procedures for healthier, clearer skin.",
    serviceCounts: 12,
  },
  {
    _id: 2,
    name: "Aesthetic Dermatology",
    description:
      "Aesthetic Dermatology enhances skin appearance through advanced treatments like anti-aging therapies, laser resurfacing, and skin rejuvenation for a youthful, radiant look.",
    serviceCounts: 12,
  },
  {
    _id: 3,
    name: "Advanced Skincare",
    description:
      "Advanced Skincare combines cutting-edge treatments and high-performance products to deeply nourish, repair, and protect the skin for a healthier, more radiant complexion.",
    serviceCounts: 25,
  },
  {
    _id: 4,
    name: "Laser and High-Tech Treatment",
    description:
      "Laser and High-Tech Treatments use advanced technology to target skin concerns like wrinkles, pigmentation, and acne, promoting a smoother, clearer, and more youthful complexion.",
    serviceCounts: 10,
  },
];
const ServiceDiscoveryScreen = () => {
  // STATES
  const [loading, setLoading] = useState(true);
  const [serviceTypes, setServiceTypes] = useState([]);

  // HOOKS
  const isFocused = useIsFocused();

  useEffect(() => {
    setLoading(true);
    setAttributes();
  }, [isFocused]);

  // FUNCTIONS
  const setAttributes = async () => {
    // Call API to get service types
    // console.log("Chạy API để get service types");
    setTimeout(() => {
      setServiceTypes(data);
      setLoading(false);
    }, 3000);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Services</Text>
        <Text style={styles.subTitle}>All Of Our Services</Text>
        <Text style={styles.titleDescription}>
          Our company offers a wide range of advanced skin treatment services,
          utilizing cutting-edge technologies to deliver exceptional results.
          With a commitment to innovation and excellence, we provide
          personalized solutions for all skin types, ensuring safe, effective,
          and transformative care. Experience the future of skincare with our
          expert team and state-of-the-art treatments.
        </Text>
        {loading ? (
          <Text style={{ marginVertical: 10 }}>Loading...</Text>
        ) : (
          <ServiceTypeGroups serviceTypes={serviceTypes} />
        )}
      </View>
    </ScrollView>
  );
};

export default ServiceDiscoveryScreen;
