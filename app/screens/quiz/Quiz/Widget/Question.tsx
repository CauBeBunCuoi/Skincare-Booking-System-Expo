import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { RadioButton } from "react-native-paper"; // Thêm RadioButton từ react-native-paper

const Question = ({ question, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option._id); // Sử dụng _id thay vì id
    onSelect(
      question._id,
      question.questionContent,
      option._id,
      option.content
    );
  };

  return (
    <View style={{ padding: 16, borderBottomWidth: 1, borderColor: "#ddd" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        {question.questionContent}
      </Text>

      {question.options.map((option) => (
        <TouchableOpacity
          key={`${question._id}-${option._id}`} // Dùng combination của _id
          onPress={() => handleSelect(option)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <RadioButton
            value={option._id}
            status={selectedOption === option._id ? "checked" : "unchecked"} // So sánh _id của option
            onPress={() => handleSelect(option)}
          />
          <Text style={{ marginLeft: 8, fontSize: 16 }}>{option.content}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Question;
