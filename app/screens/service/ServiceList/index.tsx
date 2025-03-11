import { useEffect, useState } from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { styles } from "./styles";
import ServiceListCard from "./Widget/ServiceListCard";
import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";
import { useNavigation } from "expo-router";
import { MultiSelect, Dropdown } from "react-native-element-dropdown";

const w = Dimensions.get("window").width;

const servicesData = [
  {
    _id: "1",
    serviceTypeId: 1,
    name: "Facial Deep Cleaning",
    duration: 2,
    description: "Làm sạch da chuyên sâu, loại bỏ bụi bẩn và bã nhờn.",
    fee: 1200000,
    isDeleted: false,
    imageUrl:
      "https://i.pinimg.com/736x/a2/25/82/a225826a7b0a871c15e3d0011bc1bfaf.jpg",
  },
  {
    _id: "2",
    serviceTypeId: 1,
    name: "Hydrafacial",
    duration: 2,
    description: "Dưỡng ẩm và tái tạo da bằng công nghệ tiên tiến.",
    fee: 790000,
    isDeleted: false,
    imageUrl:
      "https://i.pinimg.com/736x/c7/48/71/c748710e9a9682b542203136314421b9.jpg",
  },
  {
    _id: "3",
    serviceTypeId: 1,
    name: "Microdermabrasion",
    duration: 2,
    description: "Tẩy tế bào chết và làm sáng da.",
    fee: 1790000,
    isDeleted: false,
    imageUrl:
      "https://i.pinimg.com/736x/a1/fb/07/a1fb076af804577e4f9fedeaa2483bc1.jpg",
  },
  {
    _id: "4",
    serviceTypeId: 1,
    name: "Oxygen Facial",
    duration: 2,
    description: "Cung cấp oxy và dưỡng chất giúp da khỏe mạnh.",
    fee: 5000000,
    isDeleted: false,
    imageUrl:
      "https://i.pinimg.com/736x/78/df/6a/78df6aa2a53b08d9775056b3675fc13f.jpg",
  },
  {
    _id: "5",
    serviceTypeId: 2,
    name: "Acne Treatment",
    duration: 1.5,
    description: "Trị mụn chuyên sâu giúp giảm viêm và ngăn ngừa mụn tái phát.",
    fee: 950000,
    isDeleted: false,
    imageUrl:
      "https://i.pinimg.com/736x/52/a2/cf/52a2cf99d4f9c6979afa4f9ce6e877b7.jpg",
  },
  {
    _id: "6",
    serviceTypeId: 2,
    name: "Chemical Peel",
    duration: 1.5,
    description: "Loại bỏ lớp da chết, giúp da mịn màng và tươi sáng.",
    fee: 1250000,
    isDeleted: false,
    imageUrl:
      "https://i.pinimg.com/736x/4c/e7/87/4ce787923972db5c00072b4fd541a929.jpg",
  },
  {
    _id: "7",
    serviceTypeId: 2,
    name: "LED Light Therapy",
    duration: 1,
    description:
      "Sử dụng ánh sáng LED để cải thiện làn da và điều trị các vấn đề da.",
    fee: 800000,
    isDeleted: false,
    imageUrl:
      "https://i.pinimg.com/736x/4c/ea/6e/4cea6e7aaf83afb94bb1fe722d8f7b35.jpg",
  },
  {
    _id: "8",
    serviceTypeId: 2,
    name: "Microneedling",
    duration: 2,
    description: "Kích thích sản sinh collagen và làm trẻ hóa làn da.",
    fee: 2100000,
    isDeleted: false,
    imageUrl:
      "https://i.pinimg.com/736x/5c/d2/78/5cd27890bf95f98e9657f0dce6e45b39.jpg",
  },
  {
    _id: "9",
    serviceTypeId: 3,
    name: "Anti-Aging Facial",
    duration: 2,
    description: "Dịch vụ giúp giảm nếp nhăn và làm săn chắc da.",
    fee: 3500000,
    isDeleted: false,
    imageUrl:
      "https://i.pinimg.com/736x/21/87/d8/2187d8bac7a5b75131f7e81f13b5bc6f.jpg",
  },
  {
    _id: "10",
    serviceTypeId: 3,
    name: "Collagen Boost Therapy",
    duration: 2,
    description: "Liệu trình kích thích sản sinh collagen tự nhiên cho da.",
    fee: 2800000,
    isDeleted: false,
    imageUrl:
      "https://i.pinimg.com/736x/b6/38/41/b63841d695f2ee7d6cbd9d9d0049b0d0.jpg",
  },
  {
    _id: "11",
    serviceTypeId: 3,
    name: "Radiofrequency Skin Tightening",
    duration: 1.5,
    description: "Công nghệ RF giúp nâng cơ và làm săn chắc da.",
    fee: 3200000,
    isDeleted: false,
    imageUrl:
      "https://i.pinimg.com/736x/40/43/38/4043385f617164ff229dc725dfe3ec2a.jpg",
  },
  {
    _id: "12",
    serviceTypeId: 3,
    name: "Stem Cell Facial",
    duration: 2,
    description: "Liệu pháp tế bào gốc giúp trẻ hóa làn da từ sâu bên trong.",
    fee: 4500000,
    isDeleted: false,
    imageUrl:
      "https://i.pinimg.com/736x/a7/af/28/a7af28bd04f42267dce8e1bc7122e57c.jpg",
  },
  {
    _id: "13",
    serviceTypeId: 4,
    name: "Brightening Facial",
    duration: 1.5,
    description: "Dịch vụ giúp làm sáng da và giảm vết thâm.",
    fee: 1300000,
    isDeleted: false,
    imageUrl:
      "https://i.pinimg.com/736x/2f/d5/55/2fd555a265af712266ff825946d84c36.jpg",
  },
  {
    _id: "14",
    serviceTypeId: 4,
    name: "Vitamin C Infusion",
    duration: 1.5,
    description: "Truyền vitamin C giúp da căng bóng và đều màu.",
    fee: 1600000,
    isDeleted: false,
    imageUrl:
      "https://i.pinimg.com/736x/d3/66/d7/d366d7e0b370db0139571f481b19ed09.jpg",
  },
  {
    _id: "15",
    serviceTypeId: 4,
    name: "Gold Facial",
    duration: 2,
    description: "Liệu trình sử dụng vàng để tăng độ sáng và trẻ hóa làn da.",
    fee: 4200000,
    isDeleted: false,
    imageUrl:
      "https://i.pinimg.com/736x/21/f6/ab/21f6ab8003e3710d6b45879d95a09dab.jpg",
  },
  {
    _id: "16",
    serviceTypeId: 4,
    name: "Glass Skin Therapy",
    duration: 2,
    description: "Liệu trình giúp da mịn màng và căng bóng như gương.",
    fee: 3700000,
    isDeleted: false,
    imageUrl:
      "https://i.pinimg.com/736x/c5/ca/dc/c5cadc036b8cfc3a4ca015a5dce8b464.jpg",
  },
];

const skinStatusesData = [
  {
    _id: 1,
    name: "Normal",
  },
  {
    _id: 2,
    name: "Acne",
  },
  {
    _id: 3,
    name: "Aging",
  },
  {
    _id: 4,
    name: "Pigmentation",
  },
  {
    _id: 5,
    name: "Other",
  },
];

const skinTypesData = [
  {
    _id: 1,
    name: "Oily",
  },
  {
    _id: 2,
    name: "Sensitive",
  },
  {
    _id: 3,
    name: "Dry",
  },
  {
    _id: 4,
    name: "Combination",
  },
  {
    _id: 5,
    name: "Normal",
  },
];

// DATA CHẾ ĐỘ SORT CỦA SCREEN, KHÔNG XÓA
const sortTypes = [
  { id: 1, name: "Price: Low to High" },
  { id: 2, name: "Price: High to Low" },
  { id: 3, name: "Duration: Short to Long" },
  { id: 4, name: "Duration: Long to Short" },
];

const ServiceListScreen = () => {
  // STATES
  const [loading, setLoading] = useState(true);
  const [skinTypes, setSkinTypes] = useState([]);
  const [skinStatuses, setSkinStatuses] = useState([]);
  const [services, setServices] = useState([]);
  const [filterSkinStatus, setFilterSkinStatus] = useState([]);
  const [filterSkinType, setFilterSkinType] = useState([]);
  const [sortType, setSortType] = useState("");
  // HOOKS
  const isFocused = useIsFocused();
  const route = useRoute();
  const navigation = useNavigation();
  const { typeId, typeName } = route.params;

  useEffect(() => {
    const cleanUp = () => {
      setFilterSkinStatus([]);
      setFilterSkinType([]);
    };
    cleanUp();
  }, []);

  useEffect(() => {
    setLoading(true);
    setAttributes(typeId, filterSkinStatus, filterSkinType);
  }, [isFocused]);

  // FUNCTIONS
  const setAttributes = async (serviceTypeId, skinType, skinStatus) => {
    setLoading(true);
    setTimeout(() => {
      // CALL API ĐỂ LẤY SERVICES DỰA VÀO serviceTypeId, skinTypes, skinStatuses
      setServices(servicesData);
      setSkinStatuses(skinStatusesData);
      setSkinTypes(skinTypesData);
      setLoading(false);
    }, 50);
  };

  const handleServiceDetail = (serviceId) => {
    navigation.navigate("ServiceDetail", { serviceId });
  };

  const handleSelectSkinStatus = async (items) => {
    setFilterSkinStatus(items);
    if (serviceType) {
      await setAttributes(typeId, filterSkinType, items);
    }
  };

  const handleSelectSkinTypes = async (items) => {
    setFilterSkinType(items);
    if (serviceType) {
      await setAttributes(typeId, items, filterSkinStatus);
    }
  };

  const sortServices = (sortId) => {
    let sortedServices = [...services];
    switch (sortId) {
      case 1:
        sortedServices.sort((a, b) => a.fee - b.fee);
        break;
      case 2:
        sortedServices.sort((a, b) => b.fee - a.fee);
        break;
      case 3:
        sortedServices.sort((a, b) => a.duration - b.duration);
        break;
      case 4:
        sortedServices.sort((a, b) => b.duration - a.duration);
        break;
      default:
        break;
    }
    setServices(sortedServices);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Service Group</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text style={styles.serviceTypeName}>{typeName}</Text>
          <View style={styles.filterContainer}>
            <MultiSelect
              data={skinStatuses}
              labelField="name"
              valueField="_id"
              value={filterSkinStatus}
              onChange={(items) => handleSelectSkinStatus(items)}
              placeholder="Chọn trạng thái da"
              search={false}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 10,
                borderRadius: 5,
                width: w / 2,
              }}
            />
            <MultiSelect
              data={skinTypes}
              labelField="name"
              valueField="_id"
              value={filterSkinType}
              onChange={(items) => handleSelectSkinTypes(items)}
              placeholder="Chọn loại da"
              search={false}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 10,
                borderRadius: 5,
                width: w / 2,
              }}
            />
            <Dropdown
              data={sortTypes}
              labelField="name"
              valueField="id"
              placeholder="Select sorting option"
              value={sortType}
              onChange={(item) => {
                setSortType(item.id);
                sortServices(item.id);
              }}
              style={{
                borderWidth: 1,
                borderColor: "gray",
                padding: 15,
                borderRadius: 5,
                width: w / 1.8,
              }}
            />
          </View>
          <View style={{ width: w / 1.1, flex: 1 }}>
            <FlatList
              data={services}
              keyExtractor={(item) => item._id}
              numColumns={2} // Hiển thị 2 cột
              columnWrapperStyle={{ justifyContent: "space-between" }} // Căn chỉnh item
              renderItem={({ item }) => (
                <ServiceListCard onPress={handleServiceDetail} service={item} />
              )}
              showsVerticalScrollIndicator={false} // Ẩn thanh cuộn
            />
          </View>
        </>
      )}
    </View>
  );
};

export default ServiceListScreen;
