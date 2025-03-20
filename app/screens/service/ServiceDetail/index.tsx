import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  ImageBackground,
} from "react-native";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { styles } from "./styles";
import { useNavigation } from "expo-router";
import StepWidget from "./Widget/Step";
import SchedulePopup from "./Widget/BookingPopup";
import { publicApi } from "@/app/api/instance/axiosInstance";
import { callApi } from "@/app/api/main/api_call/api";
import { formatLocalHostImageUrl } from "@/app/tool/ImageUrlHelper";
import { FontAwesome5 } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import DividerUI from "@/components/ui/DividerUI";
import { asyncStorage_getByKey } from "@/app/tool/AsyncStorage";
import { loginRequiredAlert } from "@/utils/alert.util";
// const data = {
//   service: {
//     _id: "1abc",
//     serviceTypeId: 1,
//     name: "Microneedling Treatment Process",
//     duration: 2,
//     description:
//       "Tired skin is frustrating, to say the least. No matter the moisturiser, contrary to the cleanser, sometimes tired skin needs a little more help from within rather than topical products. Even deep penetrating skincare products need a helping hand in remodeling the actual cells of our skin rather than oil secretion, so where do we turn when tired skin has got us down? Well, microneedling is a very good place to start.",
//     fee: 1790000,
//     imgUrl:
//       "https://i.pinimg.com/736x/5c/d2/78/5cd27890bf95f98e9657f0dce6e45b39.jpg",
//   },
//   steps: [
//     {
//       _id: 1,
//       serviceId: "1abc",
//       name: "Numbing cream",
//       description: "Some clients may opt for numbing cream, and some may not. ",
//       stepOrder: 1,
//       // imgUrl: "@assets/images/test/serviceSteps/step1.png",
//       imgUrl:
//         "https://www.proaesthetics.co.uk/wp-content/uploads/2019/02/1-768x768.png",
//     },
//     {
//       _id: 2,
//       serviceId: "1abc",
//       name: "Beginning",
//       description:
//         "We wipe away one area of numbing first (in this case, the forehead) and leave the rest intact before we ",
//       stepOrder: 2,
//       imgUrl:
//         "https://www.proaesthetics.co.uk/wp-content/uploads/2019/02/2-768x768.png",
//     },
//     {
//       _id: 3,
//       serviceId: "1abc",
//       name: "Tiny blood droplets",
//       description:
//         "There will be some tidy blood droplets on the skin after treatment, which we wipe away with an antiseptic wipe between treating areas. ",
//       stepOrder: 3,
//       imgUrl:
//         "https://www.proaesthetics.co.uk/wp-content/uploads/2019/02/3-768x768.png",
//     },
//     {
//       _id: 4,
//       serviceId: "1abc",
//       name: "Repeat!",
//       description:
//         "We repeat the sequence of wiping away numbing cream, needling, and wiping away blood droplets until we have treated the whole face or the designated areas. ",
//       stepOrder: 4,
//       imgUrl:
//         "https://www.proaesthetics.co.uk/wp-content/uploads/2019/02/4-768x768.png",
//     },
//     {
//       _id: 5,
//       serviceId: "1abc",
//       name: "Post-treatment soothing masque",
//       description:
//         "After you’ve received your microneedling treatment across all of the treatment areas",
//       stepOrder: 5,
//       imgUrl:
//         "https://www.proaesthetics.co.uk/wp-content/uploads/2019/02/6-768x768.png",
//     },
//     {
//       _id: 6,
//       serviceId: "1abc",
//       name: "Sun protection",
//       description:
//         "Before we conclude your treatment with us at Pro Aesthetics ",
//       stepOrder: 6,
//       imgUrl:
//         "https://www.proaesthetics.co.uk/wp-content/uploads/2019/02/7-768x768.png",
//     },
//   ],
//   skinTypes: [
//     {
//       _id: "1",
//       name: "Oliy",
//     },
//     {
//       _id: "2",
//       name: "Sensitive",
//     },
//     {
//       _id: "3",
//       name: "Normal",
//     },
//   ],
//   skinStatuses: [
//     {
//       _id: "1",
//       name: "Acne-prone",
//     },
//     {
//       _id: "2",
//       name: "Sun-damaged",
//     },
//     {
//       _id: "3",
//       name: "Melasma",
//     },
//   ],
// };

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN").format(amount) + " VND";
};

const ServiceDetailScreen = () => {
  // STATES
  const [loading, setLoading] = useState(true);
  // const [stepCount, setStepCount] = useState(1);
  // const [serviceData, setServiceData] = useState<any>({});

  const [service, setService] = useState(null);
  const [skinStatuses, setSkinStatuses] = useState([]);
  const [skinTypes, setSkinTypes] = useState([]);
  const [steps, setSteps] = useState([]);
  const [therapists, setTherapists] = useState([]);

  // const [skinStatuses, setSkinStatuses] = useState([]);
  // const [skinTypes, setSkinTypes] = useState([]);
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
    setLoading(true);
    setPopupVisible(false);
    setAttributes();
  }, [isFocused]);

  // FUNCTIONS
  const setAttributes = async () => {
    const service = await callApi({
      instance: publicApi,
      method: "get",
      url: `/services/${serviceId}`,
    });
    if (service.success) {
      const serviceData = service.data;
      setService(serviceData.service);
      setSkinStatuses(serviceData.skinStatuses);
      setSkinTypes(serviceData.skinTypes);
      setSteps(serviceData.steps);
      setTherapists(serviceData.therapists);
    }

    setLoading(false);
    navigation.setOptions({ title: `${service.data.service.name}` });
  };

  const handleOpenPopUp = async () => {
    // Check User Login
    const account = await asyncStorage_getByKey("auth");
    if (!account || !account.user) {
      console.log("❌ Không tìm thấy thông tin tài khoản, cần đăng nhập");
      loginRequiredAlert(navigation);
      return;
    }
    setPopupVisible(true);
  };
  const handleClosePopUp = () => {
    setPopupVisible(false);
    // setSelectedTherapist(null);
    // setSelectedDate(null);
  };
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/images/backgrounds/serviceDetails/main.jpg")}
        style={styles.background}
      />
      <ScrollView style={{ flex: 1 }}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <View style={styles.container}>
            <View style={styles.serviceInformationContainer}>
              <Image
                source={{ uri: formatLocalHostImageUrl(service?.imageUrl) }}
                style={styles.serviceInformationImage}
              />
            </View>

            <View style={styles.serviceInformationContent}>
              <View style={styles.infoContainer}>
                <View style={styles.infoHeader}>
                  <FontAwesome5
                    style={{ width: 20, textAlign: "center" }}
                    name="clock"
                    size={16}
                    color="#78787A"
                    regular
                  />
                  <Text style={styles.infoHeaderText}>Duration</Text>
                </View>
                <Text style={styles.infoText}>{service?.duration} hours</Text>
              </View>
              <View style={styles.infoContainer}>
                <View style={styles.infoHeader}>
                  <FontAwesome5
                    style={{ width: 20, textAlign: "center" }}
                    name="notes-medical"
                    size={16}
                    color="#78787A"
                    regular
                  />
                  <Text style={styles.infoHeaderText}>Skin Types</Text>
                </View>
                <View style={styles.infoChipsContainer}>
                  {skinTypes.map((e, index) => (
                    <Text key={index} style={styles.infoChip}>
                      {e.name}
                    </Text>
                  ))}
                </View>
              </View>
              <View style={styles.infoContainer}>
                <View style={styles.infoHeader}>
                  <FontAwesome5
                    style={{ width: 20, textAlign: "center" }}
                    name="notes-medical"
                    size={16}
                    color="#78787A"
                    regular
                  />
                  <Text style={styles.infoHeaderText}>Skin Statuses</Text>
                </View>
                <View style={styles.infoChipsContainer}>
                  {skinStatuses.map((e, index) => (
                    <Text key={index} style={styles.infoChip}>
                      {e.name}
                    </Text>
                  ))}
                </View>
              </View>
              <View style={styles.infoContainer}>
                <View style={styles.infoHeader}>
                  <FontAwesome5
                    style={{ width: 20, textAlign: "center" }}
                    name="money-bill-alt"
                    size={16}
                    color="#78787A"
                    regular
                  />
                  <Text style={styles.infoHeaderText}>Fee</Text>
                </View>
                <Text style={styles.infoFee}>
                  {service?.fee ? `${formatCurrency(service.fee)}` : "N/A"}
                </Text>
              </View>
            </View>

            <View style={styles.serviceDescriptonContainer}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.serviceDescriptonContent}
              >
                {service?.description}
              </Text>
            </View>

            <Text style={styles.stepDescription}>
              Here’s a step-by-step breakdown of the procedure:
            </Text>

            <View style={styles.stepContainer}>
              {steps.map((step, index) => (
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
              screenNavigation={navigation}
              visible={popupVisible}
              service={service}
              therapists={therapists}
              selectedTherapist={selectedTherapist}
              setSelectedTherapist={setSelectedTherapist}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              // handleSelectTherapist={handleSelectTherapist}
              // handleDateChange={handleDateChange}
              onClose={handleClosePopUp}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ServiceDetailScreen;
