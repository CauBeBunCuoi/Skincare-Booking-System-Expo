import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import { formatLocalHostImageUrl } from "@/app/tool/ImageUrlHelper";

interface Therapist {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  experiencesYear: number;
  isDeleted: boolean;
  imageUrl: string;
}

interface ExecutionResult {
  _id: string;
  bookingId: string;
  customerDescription: string;
  treatmentDescription: string;
  therapistRecommend: string;
}

interface ResultPopupProps {
  bookingId: string;
  serviceName: string;
  therapist: Therapist;
  executionResult: ExecutionResult;
  isVisible: boolean;
  onClose: () => void;
}

const ResultPopup: React.FC<ResultPopupProps> = ({
  bookingId,
  serviceName,
  therapist,
  executionResult,
  isVisible,
  onClose,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
    >
      <View style={styles.container}>
        {/* Nút đóng */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>

        {/* Thông tin Therapist */}
        <View style={styles.therapistInfo}>
          <Image
            source={{
              uri : therapist ?  formatLocalHostImageUrl(therapist.imageUrl) : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
            }}
            style={styles.avatar}
          />
          <View>
            {therapist ? (
              <Text style={styles.name}>{therapist.fullName}</Text>
            ) : (
              <Text style={styles.name}>Not assigned</Text>
            )}
            {/* <Text style={styles.name}>{therapist.fullName}</Text> */}
            <Text style={styles.bookingId}>Booking: #{bookingId}</Text>
            <Text style={styles.serviceTitle}>{serviceName}</Text>
          </View>
        </View>

        {/* Nội dung kết quả */}
        <ScrollView style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>👤 Customer Description</Text>
            <Text style={styles.cardText}>
              {executionResult.customerDescription}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>🩺 Treatment Description</Text>
            <Text style={styles.cardText}>
              {executionResult.treatmentDescription}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>⭐ Therapist Recommend</Text>
            <Text style={styles.cardText}>
              {executionResult.therapistRecommend}
            </Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  therapistInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bookingId: {
    color: "#888",
  },
  serviceTitle: {
    color: "#FFA500",
    fontWeight: "bold",
  },
  content: {
    width: "100%",
  },
  card: {
    backgroundColor: "#F3F3F3",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 5,
  },
  cardText: {
    fontSize: 14,
    color: "#555",
  },
});

export default ResultPopup;
