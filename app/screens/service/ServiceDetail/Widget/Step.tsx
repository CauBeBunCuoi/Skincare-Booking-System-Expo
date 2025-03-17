import { formatLocalHostImageUrl } from "@/app/tool/ImageUrlHelper";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
// import { Image } from "expo-image";
import FastImage from "react-native-fast-image";
import { Dimensions } from "react-native";
const w = Dimensions.get("window").width;
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
                  uri: formatLocalHostImageUrl(step.imageUrl),
                }}
                style={styles.image}
                onError={(e) => console.log("Lỗi ảnh:", e.nativeEvent)}
              />
              <View style={styles.textContainer}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.title}
                >
                  Step {step.stepOrder}: {step.name}
                </Text>
                <Text
                  numberOfLines={7}
                  ellipsizeMode="tail"
                  style={styles.description}
                >
                  {step.description}
                </Text>
              </View>
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={styles.rightAlign}>
            <View style={styles.background}>
              <View style={styles.textContainer}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.title}
                >
                  Step {step.stepOrder}: {step.name}
                </Text>
                <Text
                  numberOfLines={7}
                  ellipsizeMode="tail"
                  style={styles.description}
                >
                  {step.description}
                </Text>
              </View>
              <Image
                source={{
                  uri: formatLocalHostImageUrl(step.imageUrl),
                }}
                style={styles.image}
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
    width: "90%",
    height: w * 0.25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.28)",
    marginVertical: 5,
    borderRadius: 10,
  },
  container: {
    width: "100%",
  },
  image: {
    width: w * 0.25,
    height: w * 0.25,
    borderRadius: 5,
  },
  textContainer: {
    height: w * 0.25,
    padding: 5,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    width: w * 0.5,
  },
  description: {
    fontSize: 9,
    flex: 1,
    textAlign: "left",
    width: w * 0.55,
  },
});

export default StepWidget;
