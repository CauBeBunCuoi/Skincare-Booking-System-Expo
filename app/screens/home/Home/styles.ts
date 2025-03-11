import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {},
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "Inter_700Bold",
    color: "#8EB69B",
    paddingVertical: 20,
  },
  subTitle: {
    fontSize: 12,
    fontWeight: "normal",
    fontFamily: "Inter_400Regular",
    color: "#0B2B26",
    paddingHorizontal: 10,
    textAlign: "center",
  },
  quizContainer: {
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000", // Màu bóng (iOS)
    shadowOffset: { width: 0, height: 4 }, // Độ lệch bóng
    shadowOpacity: 0.3, // Độ mờ bóng
    shadowRadius: 4, // Bán kính bóng
    elevation: 8, // Độ cao (tạo bóng trên Android)
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  quizTitle: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Inter_700Bold",
    color: "#8EB69B",
  },
  quizSubTitle: {
    fontSize: 12,
    fontWeight: "normal",
    fontFamily: "Inter_400Regular",
    color: "#0B2B26",
  },
  quizButton: {
    backgroundColor: "#8EB69B",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  quizButtonClicked: {
    backgroundColor: "#568565",
  },
  quizButtonContent: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  serviceGroupTitle: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Inter_400Regular",
    color: "#0B2B26",
  },
  therapistTitle: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Inter_400Regular",
    color: "#4A290E",
    paddingBottom: 10,
  },
});
