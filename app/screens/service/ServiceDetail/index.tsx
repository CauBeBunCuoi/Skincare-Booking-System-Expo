import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { styles } from "./styles";
import { useNavigation } from "expo-router";
import StepWidget from "./Widget/Step";
import SchedulePopup from "./Widget/BookingPopup";

const data = {
  service: {
    _id: "1abc",
    serviceTypeId: 1,
    name: "Microneedling Treatment Process",
    duration: 2,
    description:
      "Tired skin is frustrating, to say the least. No matter the moisturiser, contrary to the cleanser, sometimes tired skin needs a little more help from within rather than topical products. Even deep penetrating skincare products need a helping hand in remodeling the actual cells of our skin rather than oil secretion, so where do we turn when tired skin has got us down? Well, microneedling is a very good place to start.",
    fee: 1790000,
    imgUrl:
      "https://i.pinimg.com/736x/5c/d2/78/5cd27890bf95f98e9657f0dce6e45b39.jpg",
  },
  steps: [
    {
      _id: 1,
      serviceId: "1abc",
      name: "Numbing cream",
      description: "Some clients may opt for numbing cream, and some may not. ",
      stepOrder: 1,
      // imgUrl: "@assets/images/test/serviceSteps/step1.png",
      imgUrl:
        "https://www.proaesthetics.co.uk/wp-content/uploads/2019/02/1-768x768.png",
    },
    {
      _id: 2,
      serviceId: "1abc",
      name: "Beginning",
      description:
        "We wipe away one area of numbing first (in this case, the forehead) and leave the rest intact before we ",
      stepOrder: 2,
      imgUrl:
        "https://www.proaesthetics.co.uk/wp-content/uploads/2019/02/2-768x768.png",
    },
    {
      _id: 3,
      serviceId: "1abc",
      name: "Tiny blood droplets",
      description:
        "There will be some tidy blood droplets on the skin after treatment, which we wipe away with an antiseptic wipe between treating areas. ",
      stepOrder: 3,
      imgUrl:
        "https://www.proaesthetics.co.uk/wp-content/uploads/2019/02/3-768x768.png",
    },
    {
      _id: 4,
      serviceId: "1abc",
      name: "Repeat!",
      description:
        "We repeat the sequence of wiping away numbing cream, needling, and wiping away blood droplets until we have treated the whole face or the designated areas. ",
      stepOrder: 4,
      imgUrl:
        "https://www.proaesthetics.co.uk/wp-content/uploads/2019/02/4-768x768.png",
    },
    {
      _id: 5,
      serviceId: "1abc",
      name: "Post-treatment soothing masque",
      description:
        "After you’ve received your microneedling treatment across all of the treatment areas",
      stepOrder: 5,
      imgUrl:
        "https://www.proaesthetics.co.uk/wp-content/uploads/2019/02/6-768x768.png",
    },
    {
      _id: 6,
      serviceId: "1abc",
      name: "Sun protection",
      description:
        "Before we conclude your treatment with us at Pro Aesthetics ",
      stepOrder: 6,
      imgUrl:
        "https://www.proaesthetics.co.uk/wp-content/uploads/2019/02/7-768x768.png",
    },
  ],
  skinTypes: [
    {
      _id: "1",
      name: "Oliy",
    },
    {
      _id: "2",
      name: "Sensitive",
    },
    {
      _id: "3",
      name: "Normal",
    },
  ],
  skinStatuses: [
    {
      _id: "1",
      name: "Acne-prone",
    },
    {
      _id: "2",
      name: "Sun-damaged",
    },
    {
      _id: "3",
      name: "Melasma",
    },
  ],
};

const ServiceDetailScreen = () => {
  // STATES
  const [loading, setLoading] = useState(true);
  const [stepCount, setStepCount] = useState(1);
  const [serviceData, setServiceData] = useState({});
  const [skinStatuses, setSkinStatuses] = useState([]);
  const [skinTypes, setSkinTypes] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState({});
  // HOOKS
  const isFocused = useIsFocused();
  const route = useRoute();
  const navigation = useNavigation();

  const { serviceId } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: `Service ID: ${serviceId}` });
    setLoading(true);
    setPopupVisible(false);
    setAttributes();
  }, [isFocused]);

  useEffect(() => {
    if (serviceData?.skinStatuses) {
      setSkinStatuses(
        serviceData.skinStatuses.map((skinStatus) => skinStatus.name)
      );
    }
    if (serviceData?.skinTypes) {
      // Đổi từ skinType -> skinTypes (đúng với data mẫu)
      setSkinTypes(serviceData.skinTypes.map((skinType) => skinType.name));
    }
  }, [serviceData]);

  // FUNCTIONS
  const setAttributes = async () => {
    // Call API to get service detail
    // console.log("Chạy API để get service với id: ", serviceId);
    setTimeout(() => {
      setServiceData(data);
      setLoading(false);
    }, 3000);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

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

  const handleOpenPopUp = () => {
    setPopupVisible(true);
  };
  const handleClosePopUp = () => {
    setPopupVisible(false);
    // setSelectedTherapist(null);
    // setSelectedDate(null);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.serviceInformationContainer}>
          <Image
            source={{ uri: serviceData?.service?.imgUrl }}
            style={styles.serviceInformationImage}
          />

          <View style={styles.serviceInformationContent}>
            <View style={styles.serviceInformationContent}>
              <Text style={styles.serviceText}>
                Duration: {serviceData?.service?.duration} hours
              </Text>
              <Text style={styles.serviceText}>
                Skin Type: {skinTypes.join(", ")}
              </Text>
              <Text style={styles.serviceText}>
                Skin Status: {skinStatuses.join(", ")}
              </Text>
              <Text style={styles.serviceText}>
                Fee:{" "}
                {serviceData?.service?.fee
                  ? `${serviceData.service.fee} VND`
                  : "N/A"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.serviceDescriptonContainer}>
          <Text style={styles.serviceDescriptonContent}>
            {serviceData?.service?.description}
          </Text>
        </View>

        <Text style={styles.stepDescription}>
          Here’s a step-by-step breakdown of the procedure:
        </Text>

        <View style={styles.stepContainer}>
          {serviceData.steps.map((step, index) => (
            <StepWidget key={step._id} step={step} />
          ))}
        </View>

        <Pressable style={styles.button} onPress={() => handleOpenPopUp()}>
          <Text style={styles.buttonContent}>
            {" "}
            I Want To Book This Service{" "}
          </Text>
        </Pressable>

        <SchedulePopup
          visible={popupVisible}
          serviceName={serviceData.service.name}
          serviceId={serviceId}
          selectedTherapist={selectedTherapist}
          setSelectedTherapist={setSelectedTherapist}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          // handleSelectTherapist={handleSelectTherapist}
          // handleDateChange={handleDateChange}
          onClose={handleClosePopUp}
        />
      </View>
    </ScrollView>
  );
};

export default ServiceDetailScreen;
