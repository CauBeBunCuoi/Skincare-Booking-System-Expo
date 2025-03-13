import { useCallback, useEffect, useState } from "react";
import { BackHandler, Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { styles } from "./styles";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import ServiceGroup from "./Widget/ServiceGroup";
import { useFocusEffect, useNavigation } from "expo-router";
import { callApi } from "@/app/api/main/api_call/api";
import { publicApi } from "@/app/api/instance/axiosInstance";

const serviceTypes = [
  {
    serviceType: {
      _id: 1,
      name: "Acne and Oil Control Treatments",
      description:
        "Acne and Oily Control Treatments refer to a range of skincare methods aimed at managing and reducing acne and excess oil production on the skin. These treatments are designed to address the root causes of acne, such as clogged pores, bacteria, and hormonal imbalances, while also controlling sebum (skin oil) production to prevent further breakouts.",
    },
    services: [
      {
        _id: "1-1",
        serviceTypeId: 1,
        duration: 2,
        name: "Microneedling Skin Rejuvenation",
        description: "Microneedling Skin Rejuvenation",
        fee: 1790000,
        isDeleted: false,
        imageUrl:
          "https://i.pinimg.com/736x/6a/e2/6f/6ae26fef7e48d4ed9ee33af14ec84e2a.jpg",
      },
      {
        _id: "1-2",
        serviceTypeId: 1,
        duration: 2,
        name: "Microneedling Skin Rejuvenation",
        description: "Microneedling Skin Rejuvenation",
        fee: 1790000,
        isDeleted: false,
        imageUrl:
          "https://i.pinimg.com/736x/6a/e2/6f/6ae26fef7e48d4ed9ee33af14ec84e2a.jpg",
      },
      {
        _id: "1-3",
        serviceTypeId: 1,
        duration: 2,
        name: "Microneedling Skin Rejuvenation",
        description: "Microneedling Skin Rejuvenation",
        fee: 1790000,
        isDeleted: false,
        imageUrl:
          "https://i.pinimg.com/736x/6a/e2/6f/6ae26fef7e48d4ed9ee33af14ec84e2a.jpg",
      },
      {
        _id: "1-4",
        serviceTypeId: 1,
        duration: 2,
        name: "Microneedling Skin Rejuvenation",
        description: "Microneedling Skin Rejuvenation",
        fee: 1790000,
        isDeleted: false,
        imageUrl:
          "https://i.pinimg.com/736x/6a/e2/6f/6ae26fef7e48d4ed9ee33af14ec84e2a.jpg",
      },
      {
        _id: "1-5",
        serviceTypeId: 1,
        duration: 2,
        name: "Microneedling Skin Rejuvenation",
        description: "Microneedling Skin Rejuvenation",
        fee: 1790000,
        isDeleted: false,
        imageUrl:
          "https://i.pinimg.com/736x/6a/e2/6f/6ae26fef7e48d4ed9ee33af14ec84e2a.jpg",
      },
      {
        _id: "1-6",
        serviceTypeId: 1,
        duration: 2,
        name: "Microneedling Skin Rejuvenation",
        description: "Microneedling Skin Rejuvenation",
        fee: 1790000,
        isDeleted: false,
        imageUrl:
          "https://i.pinimg.com/736x/6a/e2/6f/6ae26fef7e48d4ed9ee33af14ec84e2a.jpg",
      },
    ],
  },
  {
    serviceType: {
      _id: 2,
      name: "Acne and Oil Control Treatments",
      description:
        "Acne and Oily Control Treatments refer to a range of skincare methods aimed at managing and reducing acne and excess oil production on the skin. These treatments are designed to address the root causes of acne, such as clogged pores, bacteria, and hormonal imbalances, while also controlling sebum (skin oil) production to prevent further breakouts.",
    },
    services: [
      {
        _id: "2-1",
        serviceTypeId: 1,
        duration: 2,
        name: "Microneedling Skin Rejuvenation",
        description: "Microneedling Skin Rejuvenation",
        fee: 1790000,
        isDeleted: false,
        imageUrl:
          "https://i.pinimg.com/736x/6a/e2/6f/6ae26fef7e48d4ed9ee33af14ec84e2a.jpg",
      },
      {
        _id: "2-2",
        serviceTypeId: 1,
        duration: 2,
        name: "Microneedling Skin Rejuvenation",
        description: "Microneedling Skin Rejuvenation",
        fee: 1790000,
        isDeleted: false,
        imageUrl:
          "https://i.pinimg.com/736x/6a/e2/6f/6ae26fef7e48d4ed9ee33af14ec84e2a.jpg",
      },
      {
        _id: "2-3",
        serviceTypeId: 1,
        duration: 2,
        name: "Microneedling Skin Rejuvenation",
        description: "Microneedling Skin Rejuvenation",
        fee: 1790000,
        isDeleted: false,
        imageUrl:
          "https://i.pinimg.com/736x/6a/e2/6f/6ae26fef7e48d4ed9ee33af14ec84e2a.jpg",
      },
      {
        _id: "2-4",
        serviceTypeId: 1,
        duration: 2,
        name: "Microneedling Skin Rejuvenation",
        description: "Microneedling Skin Rejuvenation",
        fee: 1790000,
        isDeleted: false,
        imageUrl:
          "https://i.pinimg.com/736x/6a/e2/6f/6ae26fef7e48d4ed9ee33af14ec84e2a.jpg",
      },
      {
        _id: "2-5",
        serviceTypeId: 1,
        duration: 2,
        name: "Microneedling Skin Rejuvenation",
        description: "Microneedling Skin Rejuvenation",
        fee: 1790000,
        isDeleted: false,
        imageUrl:
          "https://i.pinimg.com/736x/6a/e2/6f/6ae26fef7e48d4ed9ee33af14ec84e2a.jpg",
      },
      {
        _id: "2-6",
        serviceTypeId: 1,
        duration: 2,
        name: "Microneedling Skin Rejuvenation",
        description: "Microneedling Skin Rejuvenation",
        fee: 1790000,
        isDeleted: false,
        imageUrl:
          "https://i.pinimg.com/736x/6a/e2/6f/6ae26fef7e48d4ed9ee33af14ec84e2a.jpg",
      },
    ],
  },
];

const QuizResultScreen = () => {
  // STATES
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);

  // const [skinType, setSkinType] = useState("");
  // const [skinStatus, setSkinStatus] = useState("");
  // const [skinTakeCare, setSkinTakeCare] = useState("");
  // HOOKS
  const isFocused = useIsFocused();
  const route = useRoute();
  const { answers } = route.params || { answers: [] };
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


  const setAttributes = async () => {
    //const result
    const answerIds = answers.map((item) => item.answerId);
    console.log("answerIds", answerIds);
    const result = await callApi({
      instance: publicApi,
      method: "post",
      url: "/quizzes/result",
      data: { selectedQuizOptions: answerIds },
    });

    if (result.success) {
      setServiceTypes(result.data.serviceTypes);
    }

    setLoading(false);
  };



  const handleRequiz = () => {
    //Clear all answers
    navigation.navigate("Quiz");
  };
  const handleHome = () => {
    //Clear all answers
    navigation.navigate("Home");
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          {/* <Text style={styles.userAnswer}>
            Because you have
            <Text style={styles.skinType}> {skinType} </Text>
            type and
            <Text style={styles.skinStatus}> {skinStatus} </Text> skin status,
            you also take care of your skin
            <Text style={styles.skinTakeCare}> {skinTakeCare} </Text>
          </Text> */}
          <Text style={styles.suggestDescription}>
            We suggest that you might be suitable with these Service Groups
          </Text>
        </View>

        <View style={styles.serviceGroups}>
          {serviceTypes.map((item, index) => (
            <View style={styles.serviceGroup} key={item.serviceType._id}>
              <ServiceGroup data={item} />
            </View>
          ))}
        </View>
      </View>


      <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity
          onPress={handleRequiz}
          style={{
            backgroundColor: "#3498db",
            padding: 12,
            borderRadius: 5,
            alignItems: "center",
            marginInline: 10,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            Re-take Quiz
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleHome}
          style={{
            backgroundColor: "#3498db",
            padding: 12,
            borderRadius: 5,
            alignItems: "center",
            marginInline: 10,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            Go to Home
          </Text>
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity
        onPress={handleRequiz}
        style={{
          backgroundColor: "#3498db",
          padding: 12,
          borderRadius: 5,
          alignItems: "center",
          marginBlock: 20,
          marginInline: 20,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
          Re-take Quiz
        </Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

export default QuizResultScreen;
