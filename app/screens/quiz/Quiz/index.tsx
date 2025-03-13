import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { styles } from "./styles";
import Question from "./Widget/Question";
import { useNavigation } from "expo-router";
import { publicApi } from "@/app/api/instance/axiosInstance";
import { callApi } from "@/app/api/main/api_call/api";

const quizzes = [
  {
    quiz: {
      _id: "1",
      content: "What is your skin type?",
    },
    options: [
      {
        _id: "1",
        content: "Oily",
        quizQuestionId: "1",
      },
      {
        _id: "2",
        content: "Dry",
        quizQuestionId: "1",
      },
      {
        _id: "3",
        content: "Combination",
        quizQuestionId: "1",
      },
      {
        _id: "4",
        content: "Sensitive",
        quizQuestionId: "1",
      },
      {
        _id: "5",
        content: "Normal",
        quizQuestionId: "1",
      },
    ],
  },
  {
    quiz: {
      _id: "2",
      content: "What is your skin status?",
    },
    options: [
      {
        _id: "1",
        content: "Normal",
        quizQuestionId: "3",
      },
      {
        _id: "2",
        content: "Acne",
        quizQuestionId: "3",
      },
      {
        _id: "3",
        content: "Aging",
        quizQuestionId: "3",
      },
      {
        _id: "4",
        content: "Pigmentation",
        quizQuestionId: "3",
      },
      {
        _id: "5",
        content: "Other",
        quizQuestionId: "3",
      },
    ],
  },
  {
    quiz: {
      _id: "3",
      content: "How often do you take care of your skin?",
    },
    options: [
      {
        _id: "1",
        content: "Daily",
        quizQuestionId: "2",
      },
      {
        _id: "2",
        content: "Weekly",
        quizQuestionId: "2",
      },
      {
        _id: "3",
        content: "Monthly",
        quizQuestionId: "2",
      },
      {
        _id: "4",
        content: "Yearly",
        quizQuestionId: "2",
      },
      {
        _id: "5",
        content: "Whenever I remember",
        quizQuestionId: "2",
      },
    ],
  },
];

const QuizScreen = () => {
  // STATES
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [quizData, setQuizData] = useState([]);
  // HOOKS
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    setLoading(true);
    setAttributes();
  }, [isFocused]);

  const setAttributes = async () => {

    const questions = await callApi({
      instance: publicApi,
      method: "get",
      url: "/quizzes",
    });
    if (questions.success) {
      setQuizData(questions.data.quizzes);
    }

    // setQuizData(quizzes);
    setLoading(false);
  };

  const handleAnswerSelect = (
    questionId,
    questionContent,
    answerId,
    answerContent
  ) => {
    setAnswers((prev) => {
      const filteredPrev = prev.filter(
        (item) => item.questionId !== questionId
      );
      return [
        ...filteredPrev,
        { questionId, questionContent, answerId, answerContent },
      ];
    });
  };

  const handleSubmit = () => {
    navigation.navigate("QuizResult", { answers });
    console.log("\n\n\n\nanswers", answers);
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      {quizData.map((item) => (
        <Question
          key={item.quiz._id}
          question={{
            _id: item.quiz._id,
            questionContent: item.quiz.content,
            options: item.options,
          }}
          onSelect={handleAnswerSelect}
        />
      ))}

      <TouchableOpacity
        disabled={answers.length === 0}
        onPress={handleSubmit}
        style={{
          backgroundColor: answers.length === 0 ? "grey" : "#3498db",
          padding: 12,
          borderRadius: 5,
          alignItems: "center",
          marginBlock: 20,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
          Submit
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default QuizScreen;
