import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {},
  container: {
    backgroundColor: "#C1D6B7",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "PostNoBillBold",
    color: "#8EB69B",
    paddingVertical: 20,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: "normal",
    color: "#0B2B26",
    paddingBottom: 5,
    textAlign: "center",
  },
  quizContainer: {
    marginTop: 10,
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
    color: "#44270D",
  },
  quizSubTitle: {
    fontSize: 12,
    paddingTop: 2,
    fontWeight: "normal",
    color: "#0B2B26",
    textAlign: "center",
  },
  quizButton: {
    backgroundColor: "#254039",
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
