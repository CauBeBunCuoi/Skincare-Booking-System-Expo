import { useCallback, useEffect, useState } from "react";
import { BackHandler, Pressable, ScrollView, Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { styles } from "./styles";
import { Divider } from "react-native-paper";
import DividerUI from "@/components/ui/DividerUI";

import TherapistCarousel from "./Widget/TherapistCarousel";
import ServiceGroup from "./Widget/ServiceGroup";
import { isLoaded } from "expo-font";
import { useFocusEffect, useNavigation } from "expo-router";
import { callApi } from "@/app/api/main/api_call/api";
import { publicApi } from "@/app/api/instance/axiosInstance";
import axios from "axios";

// const serviceTypes = [
//   { _id: 1, name: "Dermatological Treatment" },
//   { _id: 2, name: "Aesthetic Dermatology" },
//   { _id: 3, name: "Advanced Skincare" },
//   { _id: 4, name: "Laser and High-Tech Treatment" },
// ];

// const serviceData = [
//   {
//     _id: "1",
//     serviceTypeId: 1,
//     name: "Facial Deep Cleaning",
//     duration: 2,
//     description: "Làm sạch da chuyên sâu, loại bỏ bụi bẩn và bã nhờn.",
//     fee: 1200000,
//     isDeleted: false,
//     imageUrl:
//       "https://i.pinimg.com/736x/a2/25/82/a225826a7b0a871c15e3d0011bc1bfaf.jpg",
//   },
//   {
//     _id: "2",
//     serviceTypeId: 1,
//     name: "Hydrafacial",
//     duration: 2,
//     description: "Dưỡng ẩm và tái tạo da bằng công nghệ tiên tiến.",
//     fee: 790000,
//     isDeleted: false,
//     imageUrl:
//       "https://i.pinimg.com/736x/c7/48/71/c748710e9a9682b542203136314421b9.jpg",
//   },
//   {
//     _id: "3",
//     serviceTypeId: 1,
//     name: "Microdermabrasion",
//     duration: 2,
//     description: "Tẩy tế bào chết và làm sáng da.",
//     fee: 1790000,
//     isDeleted: false,
//     imageUrl:
//       "https://i.pinimg.com/736x/a1/fb/07/a1fb076af804577e4f9fedeaa2483bc1.jpg",
//   },
//   {
//     _id: "4",
//     serviceTypeId: 1,
//     name: "Oxygen Facial",
//     duration: 2,
//     description: "Cung cấp oxy và dưỡng chất giúp da khỏe mạnh.",
//     fee: 5000000,
//     isDeleted: false,
//     imageUrl:
//       "https://i.pinimg.com/736x/78/df/6a/78df6aa2a53b08d9775056b3675fc13f.jpg",
//   },
//   {
//     _id: "5",
//     serviceTypeId: 2,
//     name: "Acne Treatment",
//     duration: 1.5,
//     description: "Trị mụn chuyên sâu giúp giảm viêm và ngăn ngừa mụn tái phát.",
//     fee: 950000,
//     isDeleted: false,
//     imageUrl:
//       "https://i.pinimg.com/736x/52/a2/cf/52a2cf99d4f9c6979afa4f9ce6e877b7.jpg",
//   },
//   {
//     _id: "6",
//     serviceTypeId: 2,
//     name: "Chemical Peel",
//     duration: 1.5,
//     description: "Loại bỏ lớp da chết, giúp da mịn màng và tươi sáng.",
//     fee: 1250000,
//     isDeleted: false,
//     imageUrl:
//       "https://i.pinimg.com/736x/4c/e7/87/4ce787923972db5c00072b4fd541a929.jpg",
//   },
//   {
//     _id: "7",
//     serviceTypeId: 2,
//     name: "LED Light Therapy",
//     duration: 1,
//     description:
//       "Sử dụng ánh sáng LED để cải thiện làn da và điều trị các vấn đề da.",
//     fee: 800000,
//     isDeleted: false,
//     imageUrl:
//       "https://i.pinimg.com/736x/4c/ea/6e/4cea6e7aaf83afb94bb1fe722d8f7b35.jpg",
//   },
//   {
//     _id: "8",
//     serviceTypeId: 2,
//     name: "Microneedling",
//     duration: 2,
//     description: "Kích thích sản sinh collagen và làm trẻ hóa làn da.",
//     fee: 2100000,
//     isDeleted: false,
//     imageUrl:
//       "https://i.pinimg.com/736x/5c/d2/78/5cd27890bf95f98e9657f0dce6e45b39.jpg",
//   },
//   {
//     _id: "9",
//     serviceTypeId: 3,
//     name: "Anti-Aging Facial",
//     duration: 2,
//     description: "Dịch vụ giúp giảm nếp nhăn và làm săn chắc da.",
//     fee: 3500000,
//     isDeleted: false,
//     imageUrl:
//       "https://i.pinimg.com/736x/21/87/d8/2187d8bac7a5b75131f7e81f13b5bc6f.jpg",
//   },
//   {
//     _id: "10",
//     serviceTypeId: 3,
//     name: "Collagen Boost Therapy",
//     duration: 2,
//     description: "Liệu trình kích thích sản sinh collagen tự nhiên cho da.",
//     fee: 2800000,
//     isDeleted: false,
//     imageUrl:
//       "https://i.pinimg.com/736x/b6/38/41/b63841d695f2ee7d6cbd9d9d0049b0d0.jpg",
//   },
//   {
//     _id: "11",
//     serviceTypeId: 3,
//     name: "Radiofrequency Skin Tightening",
//     duration: 1.5,
//     description: "Công nghệ RF giúp nâng cơ và làm săn chắc da.",
//     fee: 3200000,
//     isDeleted: false,
//     imageUrl:
//       "https://i.pinimg.com/736x/40/43/38/4043385f617164ff229dc725dfe3ec2a.jpg",
//   },
//   {
//     _id: "12",
//     serviceTypeId: 3,
//     name: "Stem Cell Facial",
//     duration: 2,
//     description: "Liệu pháp tế bào gốc giúp trẻ hóa làn da từ sâu bên trong.",
//     fee: 4500000,
//     isDeleted: false,
//     imageUrl:
//       "https://i.pinimg.com/736x/a7/af/28/a7af28bd04f42267dce8e1bc7122e57c.jpg",
//   },
//   {
//     _id: "13",
//     serviceTypeId: 4,
//     name: "Brightening Facial",
//     duration: 1.5,
//     description: "Dịch vụ giúp làm sáng da và giảm vết thâm.",
//     fee: 1300000,
//     isDeleted: false,
//     imageUrl:
//       "https://i.pinimg.com/736x/2f/d5/55/2fd555a265af712266ff825946d84c36.jpg",
//   },
//   {
//     _id: "14",
//     serviceTypeId: 4,
//     name: "Vitamin C Infusion",
//     duration: 1.5,
//     description: "Truyền vitamin C giúp da căng bóng và đều màu.",
//     fee: 1600000,
//     isDeleted: false,
//     imageUrl:
//       "https://i.pinimg.com/736x/d3/66/d7/d366d7e0b370db0139571f481b19ed09.jpg",
//   },
//   {
//     _id: "15",
//     serviceTypeId: 4,
//     name: "Gold Facial",
//     duration: 2,
//     description: "Liệu trình sử dụng vàng để tăng độ sáng và trẻ hóa làn da.",
//     fee: 4200000,
//     isDeleted: false,
//     imageUrl:
//       "https://i.pinimg.com/736x/21/f6/ab/21f6ab8003e3710d6b45879d95a09dab.jpg",
//   },
//   {
//     _id: "16",
//     serviceTypeId: 4,
//     name: "Glass Skin Therapy",
//     duration: 2,
//     description: "Liệu trình giúp da mịn màng và căng bóng như gương.",
//     fee: 3700000,
//     isDeleted: false,
//     imageUrl:
//       "https://i.pinimg.com/736x/c5/ca/dc/c5cadc036b8cfc3a4ca015a5dce8b464.jpg",
//   },
// ];

// const therapistData = [
//   {
//     _id: "1",
//     username: "lucasturner",
//     password: "string",
//     phoneNumber: 0,
//     email: "string",
//     roleId: 3,
//     fullName: "Dr. Lucas Turner",
//     isDeleted: false,
//     imageUrl:
//       "https://i.pinimg.com/736x/6c/6e/d7/6c6ed7f4011b7f926b3f1505475aba16.jpg",
//   },
//   {
//     _id: "2",
//     username: "Dr. Emma Johnson",
//     password: "string",
//     phoneNumber: 0,
//     email: "string",
//     roleId: 3,
//     fullName: "Dr. Emma Johnson",
//     isDeleted: false,
//     imageUrl:
//       "https://i.pinimg.com/736x/c9/e0/b5/c9e0b5e45aad1de8e27b25ec6ce3cd27.jpg",
//   },
//   {
//     _id: "3",
//     username: "lucasturner",
//     password: "string",
//     phoneNumber: 0,
//     email: "string",
//     roleId: 3,
//     fullName: "Dr. Sophia Carter",
//     isDeleted: false,
//     imageUrl:
//       "https://i.pinimg.com/736x/46/f0/99/46f0995d8196ee6570045484a62af7fe.jpg",
//   },
//   {
//     _id: "4",
//     username: "lucasturner",
//     password: "string",
//     phoneNumber: 0,
//     email: "string",
//     roleId: 3,
//     fullName: "Dr. Moana Lopez",
//     isDeleted: false,
//     imageUrl:
//       "https://i.pinimg.com/736x/37/6f/28/376f2823cbd225897ced923ef55fa7c1.jpg",
//   },
//   {
//     _id: "5",
//     username: "lucasturner",
//     password: "string",
//     phoneNumber: 0,
//     email: "string",
//     roleId: 3,
//     fullName: "Dr. Lucas Turner",
//     isDeleted: false,
//     imageUrl:
//       "https://i.pinimg.com/736x/6c/6e/d7/6c6ed7f4011b7f926b3f1505475aba16.jpg",
//   },
//   {
//     _id: "6",
//     username: "lucasturner",
//     password: "string",
//     phoneNumber: 0,
//     email: "string",
//     roleId: 3,
//     fullName: "Dr. Lucas Turner",
//     isDeleted: false,
//     imageUrl:
//       "https://i.pinimg.com/736x/6c/6e/d7/6c6ed7f4011b7f926b3f1505475aba16.jpg",
//   },
// ];

const HomeScreen = () => {
  // STATES
  const [loading, setLoading] = useState(true);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [services, setServices] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [serviceGroup1, setServiceGroup1] = useState([]);
  const [serviceGroup2, setServiceGroup2] = useState([]);
  const [serviceGroup3, setServiceGroup3] = useState([]);
  const [serviceGroup4, setServiceGroup4] = useState([]);
  // HOOKS
  const isFocused = useIsFocused();
  const navigation = useNavigation();


  useFocusEffect(
    useCallback(() => {

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        (): boolean => {
          //navigation.goBack();
          return true;
        }
      );

      return () => backHandler.remove();
    }, [])
  );

  useEffect(() => {
    setLoading(true);
    setAttributes();
  }, [isFocused]);

  useEffect(() => {
    if (services.length > 0) {
      setServiceGroup1(filterServicesByType(services, 1));
      setServiceGroup2(filterServicesByType(services, 2));
      setServiceGroup3(filterServicesByType(services, 3));
      setServiceGroup4(filterServicesByType(services, 4));
    }
  }, [services]);
  // FUNCTIONS:
  const filterServicesByType = (services, typeId) => {
    return services
      .filter(
        (service) =>
          service.serviceTypeId === typeId && service.isDeleted === false
      )
      .slice(0, 6);
  };

  const setAttributes = async () => {


    const therapists = await callApi({
      instance: publicApi,
      method: "get",
      url: "/accounts/staffs",
    })
    if (therapists.success) {

      setTherapists(therapists.data.accounts.filter((therapist) => therapist.roleId === 3).slice(0, 4));
    }


    const serviceTypes = await callApi({
      instance: publicApi,
      method: "get",
      url: "/services/service-types",
    })
    // console.log("\n\n\nALO\n\n\n\n");
    if (serviceTypes.success) {
      setServiceTypes(serviceTypes.data.serviceTypes);
    }

    const services = await callApi({
      instance: publicApi,
      method: "get",
      url: "/services",
    })
    if (services.success) {
      setServices(services.data.services);
    }
    setLoading(false);

  };

  const handleNavigateQuiz = () => {
    navigation.navigate("Quiz");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Lumina Derma</Text>
        <Text style={styles.subTitle}>
          Personalized skin therapy designed to nourish, heal, and illuminate
          your natural beauty.
        </Text>
        <View style={styles.quizContainer}>
          <Text style={styles.quizTitle}>
            Struggle In Finding Your Skin Services ?
          </Text>
          <Text style={styles.quizSubTitle}>
            We provide quizzes to help identify the most suitable therapy method
            for you. What are you waiting for? Take it now!
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.quizButton,
              pressed && styles.quizButtonClicked, // Thay đổi màu khi nhấn
            ]}
            onPress={() => handleNavigateQuiz()}
          >
            <Text style={styles.quizButtonContent}>Take Quizzes Now</Text>
          </Pressable>
        </View>

        <DividerUI></DividerUI>

        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <Text style={styles.serviceGroupTitle}>Our Skin Services</Text>
            <ServiceGroup
              serviceType={serviceTypes[0]}
              data={serviceGroup1}
            ></ServiceGroup>
            <ServiceGroup
              serviceType={serviceTypes[1]}
              data={serviceGroup2}
            ></ServiceGroup>
            <ServiceGroup
              serviceType={serviceTypes[2]}
              data={serviceGroup3}
            ></ServiceGroup>
            <ServiceGroup
              serviceType={serviceTypes[3]}
              data={serviceGroup4}
            ></ServiceGroup>

            <DividerUI></DividerUI>

            <Text style={styles.therapistTitle}>
              Our Team of Top-tier Treament Specialist
            </Text>

            <TherapistCarousel data={therapists}></TherapistCarousel>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
