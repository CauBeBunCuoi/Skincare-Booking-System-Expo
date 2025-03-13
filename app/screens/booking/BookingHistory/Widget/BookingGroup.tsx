import { Text, View } from "react-native";
import BookingCard from "./BookingCard";

// format của group cần sort lại theo createdAt của booking:
// {
//   "booking": {
//       "_id": "67b0406a1d3b85d05e9f88d3",
//       "serviceId": "67af5c651d3b85d05e9f88a2",
//       "bookStatusId": 3,
//       "bookingDate": "2025-02-16T12:00:00.000Z",
//       "appointmentTime": "2025-02-16T12:00:00.000Z",
//       "startTime": "2025-02-16T12:00:00.000Z",
//       "endTime": "2025-02-16T13:00:00.000Z",
//       "checkInTime": null,
//       "checkOutTime": null,
//       "isAssigned": true,
//       "assignedTherapistId": "67b09c974b0a70299990bfb5",
//       "extraFee": 0,
//       "totalFee": 1000000,
//       "hasPaid": false,
//       "cancelReason": null,
//       "createdAt": "2025-02-16T11:30:00.000Z",
//       "updatedAt": "2025-02-16T11:30:00.000Z",
//       "__v": 0,
//       "accountId": "67b0a414447883e5fa80f8b2"
//   },
//   "service": {
//       "_id": "67af5c651d3b85d05e9f88a2",
//       "serviceTypeId": 1,
//       "name": "Điều trị sẹo rỗ",
//       "duration": 3,
//       "description": "Điều trị và làm đầy sẹo rỗ.",
//       "fee": 1000000,
//       "isDeleted": false,
//       "updatedAt": "2025-02-21T14:04:25.392Z",
//       "imageUrl": "http://localhost:8002/public/images/services/67af5c651d3b85d05e9f88a2/main.jpg"
//   },
//   "therapist": {
//       "_id": "67b09c974b0a70299990bfb5",
//       "fullName": "Bác sĩ đây nè",
//       "email": "hanguyenhaoo.20april@gmail.com",
//       "phoneNumber": 123123123123,
//       "imageUrl": "http://localhost:8002/public/images/accounts/67b09c974b0a70299990bfb5/main.jpg",
//       "isDeleted": false
//   },
//   "bookingStatus": {
//       "_id": 3,
//       "name": "Đã Có Điều Trị Viên"
//   },
//   "executionResult": null,
//   "feedback": {
//       "_id": "67b30b01f64269114217d039",
//       "bookingId": "67b0406a1d3b85d05e9f88d3",
//       "feedbackContent": "dịch vụ như cặc",
//       "rate": 3,
//       "createdAt": "2025-02-17T10:10:09.122Z",
//       "updatedAt": "2025-02-17T10:10:09.122Z",
//       "__v": 0
//   }
// },

const sortByCreatedAt = (group) => {
  return group.sort((a, b) => {
    return new Date(b.booking.createdAt) - new Date(a.booking.createdAt);
  });
}

const BookingGroup = ({ group }) => {
  if (!Array.isArray(group)) {
    console.error("BookingGroup received an invalid group:", group);
    return <Text>Lỗi dữ liệu</Text>; // hoặc render fallback UI
  }

  return (
    <View style={{ width: "100%" }}>
      {sortByCreatedAt(group).map((item, index) => (
        <BookingCard key={index} item={item} />
      ))}

    </View>
  );
};

export default BookingGroup;
