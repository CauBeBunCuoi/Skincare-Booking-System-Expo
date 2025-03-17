import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {},
  container: {
    backgroundColor: "transparent",
    padding: 16,
    flex: 1,
    alignItems: "center",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  serviceInformationContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 }, // Bóng đổ xuống dưới
    shadowOpacity: 0.3, // Độ mờ của bóng
    shadowRadius: 6, // Độ lan của bóng
    elevation: 5, // Bóng trên Android
    backgroundColor: "black", // Quan trọng! Nếu không có background thì shadow sẽ không hiện
    borderRadius: 10, // Bo góc để bóng không vuông
    overflow: "hidden", // Đảm bảo bóng tròn theo hình
  },
  serviceInformationImage: {
    borderRadius: 10,
    width: "100%",
    height: 200,
  },
  serviceInformationContent: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: 10,
    marginVertical: 10,
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 }, // Bóng đổ xuống dưới
    shadowOpacity: 0.3, // Độ mờ của bóng
    shadowRadius: 6, // Độ lan của bóng
    elevation: 5, // Bóng trên Android
    borderRadius: 10, // Bo góc để bóng không vuông
    overflow: "hidden", // Đảm bảo bóng tròn theo hình
  },

  serviceText: {
    fontSize: 10,
    marginRight: 2,
  },

  serviceDescriptonContainer: {
    padding: 16,
    marginTop: 10,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 10,
    border: "1px solid rgba(254, 254, 254, 0.1)",
  },

  serviceDescriptonContent: {
    textAlign: "justify",
    fontFamily: "Montserrat",
    fontWeight: "bold",
  },

  stepDescription: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#6D3B13",
  },

  stepContainer: {
    width: "100%",
  },

  button: {
    backgroundColor: "rgba(1, 122, 243, 1)",
    padding: 10,
    marginBottom: 50,
    borderRadius: 10,
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  buttonContent: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "100%",
  },

  infoHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  infoHeaderText: {
    fontSize: 17,
    fontWeight: "light",
    color: "#78787A",
    paddingLeft: 5,
  },
  infoText: {
    fontSize: 17,
  },
  infoChipsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  infoChip: {
    backgroundColor: "white",
    paddingVertical: 2, // Tăng khoảng cách theo chiều dọc
    paddingHorizontal: 5, // Tăng khoảng cách theo chiều ngang
    borderRadius: 20, // Bo góc mạnh hơn để giống chip
    borderWidth: 1, // Độ dày viền
    borderColor: "black", // Màu viền
    borderStyle: "solid", // Kiểu viền
    alignSelf: "center", // Canh giữa nếu cần
    fontSize: 8,
  },
  infoFee: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#F9A80F",
  },
});
