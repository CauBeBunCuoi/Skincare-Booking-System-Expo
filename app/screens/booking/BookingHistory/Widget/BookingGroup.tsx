import { Text, View } from "react-native";
import BookingCard from "./BookingCard";

const BookingGroup = ({ group }) => {
  if (!Array.isArray(group)) {
    console.error("BookingGroup received an invalid group:", group);
    return <Text>Lỗi dữ liệu</Text>; // hoặc render fallback UI
  }

  return (
    <View style={{ width: "100%" }}>
      {group.map((item, index) => (
        <BookingCard key={index} item={item} />
      ))}
    </View>
  );
};

export default BookingGroup;
