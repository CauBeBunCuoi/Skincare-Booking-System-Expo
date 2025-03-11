import { useEffect, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { styles } from "./styles";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import ServiceGroup from "./Widget/ServiceGroup";
import { useNavigation } from "expo-router";

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
  const [skinType, setSkinType] = useState("");
  const [skinStatus, setSkinStatus] = useState("");
  const [skinTakeCare, setSkinTakeCare] = useState("");
  // HOOKS
  const isFocused = useIsFocused();
  const route = useRoute();
  const { answers } = route.params || { answers: [] };
  const navigation = useNavigation();
  useEffect(() => {
    setLoading(true);
    setAttributes();
  }, [isFocused]);

  useEffect(() => {
    setSkinType(getAnswerContent("1"));
    setSkinStatus(getAnswerContent("2"));
    setSkinTakeCare(getAnswerContent("3"));
    setLoading(false);
  }, [selectedAnswers]);

  const setAttributes = async () => {
    setSelectedAnswers(answers);
  };

  const getAnswerContent = (questionId) => {
    const answer = selectedAnswers.find(
      (item) => item.questionId === questionId
    );
    return answer ? answer.answerContent : "Not answered";
  };

  const handleRequiz = () => {
    //Clear all answers
    navigation.navigate("Quiz");
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.userAnswer}>
            Because you have
            <Text style={styles.skinType}> {skinType} </Text>
            type and
            <Text style={styles.skinStatus}> {skinStatus} </Text> skin status,
            you also take care of your skin
            <Text style={styles.skinTakeCare}> {skinTakeCare} </Text>
          </Text>
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
      <Button
        title="Re-take Quiz"
        onPress={() => {
          handleRequiz();
        }}
      />
    </ScrollView>
  );
};

export default QuizResultScreen;
