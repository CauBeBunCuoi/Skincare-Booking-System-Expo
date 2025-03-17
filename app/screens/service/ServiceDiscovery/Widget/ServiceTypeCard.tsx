import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
interface ServiceType {
  _id: string;
  name: string;
  description: string;
  servicesCount: number;
}

interface ServiceTypeCardProps {
  serviceType: ServiceType;
}

const w = Dimensions.get("window").width;

const ServiceTypeCard: React.FC<ServiceTypeCardProps> = ({ serviceType }) => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={["#617BE245", "#F9A80F45"]} // Thêm '29' để đặt opacity = 16%
      style={styles.card}
    >
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Image
          source={{
            uri: "https://i.pinimg.com/736x/c7/2e/da/c72eda3a302e17c14e77b17cf8d5bad8.jpg",
          }}
          style={styles.image}
        />
        <View>
          <Text style={styles.title}>{serviceType.name}</Text>
          <Text
            numberOfLines={4}
            ellipsizeMode="tail"
            style={styles.description}
          >
            {serviceType.description}
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <View>
          <Text style={styles.serviceCount}>{serviceType.servicesCount}+</Text>
          <Text style={{ fontSize: 8 }}>Services belong to this group</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("ServiceList", {
              serviceTypeId: serviceType._id,
              serviceTypeName: serviceType.name,
            })
          }
        >
          <Text style={styles.buttonText}>Explore This Service Group</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "95%",
    padding: 16,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  content: {
    marginTop: 10,
    padding: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    width: w * 0.5,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
    paddingLeft: 5,
  },
  description: {
    fontSize: 10,
    color: "white",
    marginBottom: 10,
    width: 250,
    paddingLeft: 5,
    paddingRight: 5,
    textAlign: "left",
  },
  serviceCount: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#F9510F",
  },
  button: {
    backgroundColor: "#617BE2",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default ServiceTypeCard;
