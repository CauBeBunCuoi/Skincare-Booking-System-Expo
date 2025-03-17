import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {},
  container: {
    alignItems: "center",
    flex: 1,
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
  screenTitle: {
    fontSize: 40,
    color: "#233375",
    fontFamily: "PostNoBillBold",
    marginVertical: 20,
  },
  bookingContainer: {
    width: "90%",
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "rgba(255, 255, 255, 0.28)",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
  },
  stepContainer: {
    marginBottom: 20,
  },
  stepText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    marginBottom: 10,
  },
  dropdownButtonStyle: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownButtonTxtStyle: {
    fontSize: 16,
    color: "#333",
  },
  dropdownButtonArrowStyle: {
    fontSize: 16,
    color: "#333",
  },
  dropdownItemStyle: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  dropdownItemTxtStyle: {
    fontSize: 16,
    color: "#333",
  },
  flatListContainer: {
    width: "90%",
    height: 150, // Giới hạn chiều cao để FlatList không tràn ra ngoài
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  list: {
    flexDirection: "row", // Các item sắp xếp theo hàng ngang
    flexWrap: "wrap", // Cho phép xuống hàng khi hết chiều ngang
    gap: 5,
  },
  hourCard: {
    width: 60,
    height: 40,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#4B79F1",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  selectedHourCard: {
    backgroundColor: "rgba(75, 121, 241, 0.3)",
  },
  hourCardText: {
    fontSize: 10,
    color: "#233375",
  },
  confirmBtn: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "auto",
    borderWidth: 1,
    borderColor: "#fff",
  },
  confirmBtnText: {
    fontSize: 20,
    color: "#fff",
  },
  noHoursContainer: {
    width: "90%",
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
    marginHorizontal: "auto",
  },
  noHoursText: {
    fontSize: 20,
    color: "#4D4A4A",
  },
});
