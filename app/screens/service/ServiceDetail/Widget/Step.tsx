import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
// import { Image } from "expo-image";
import FastImage from "react-native-fast-image";

const StepWidget = ({ step }) => {
  const isOdd = step.stepOrder % 2 !== 0;
  return (
    <View style={styles.container}>
      {isOdd ? (
        <>
          <View style={styles.leftAlign}>
            <View style={styles.background}>
              <Image
                source={{
                  uri: step.imgUrl,
                }}
                style={styles.image}
                onError={(e) => console.log("Lỗi ảnh:", e.nativeEvent)}
              />
              <View style={styles.textContainer}>
                <Text style={styles.title}>
                  Step {step.stepOrder}: {step.name}
                </Text>
                <Text style={styles.description}>{step.description}</Text>
              </View>
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={styles.rightAlign}>
            <View style={styles.background}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>
                  Step {step.stepOrder}: {step.name}
                </Text>
                <Text style={styles.description}>{step.description}</Text>
              </View>
              <Image
                source={{
                  uri: step.imgUrl,
                }}
                style={{ width: 100, height: 100 }}
                onError={(e) => console.log("Lỗi ảnh:", e.nativeEvent)}
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  leftAlign: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  rightAlign: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  background: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(128,128,128,0.5)",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  container: {
    width: "100%",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
  },
  description: {
    fontSize: 9,
    width: 150,
    textAlign: "left",
  },
});

export default StepWidget;
