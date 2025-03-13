// import React, { useEffect, useRef, useState } from "react";
// import {
//   FlatList,
//   Image,
//   Text,
//   View,
//   StyleSheet,
//   SafeAreaView,
//   Dimensions,
//   Pressable,
// } from "react-native";
// import { Card } from "react-native-paper";
// import CustomCarousel from "carousel-with-pagination-rn";
// import { useSharedValue } from "react-native-reanimated";
// import Carousel, {
//   ICarouselInstance,
//   Pagination,
// } from "react-native-reanimated-carousel";
// import { useNavigation } from "expo-router";

// const width = Dimensions.get("window").width;

// const TherapistCarousel = ({ data }) => {
//   // STATE
//   const [dataTherapist, setDataTherapist] = useState([]);

//   // HOOKS
//   const ref = useRef<ICarouselInstance | null>(null);

//   const progress = useSharedValue<number>(0);
//   const navigation = useNavigation();

//   useEffect(() => {
//     setDataTherapist(data);
//   }, [data]);

//   // FUNCTIONS
//   const onPressPagination = (index: number) => {
//     if (ref.current) {
//       ref.current.scrollTo({
//         count: index - progress.value,
//         animated: true,
//       });
//     } else {
//       console.warn("ref.current is undefined");
//     }
//   };

//   const handleViewTherapistDetail = (item) => {
//     navigation.navigate("TherapistDetail", {
//       therapistId: item._id,
//       therapistName: item.fullName,
//     });
//   };

//   return (
//     <SafeAreaView>
//       <View>
//         {/* <Carousel
//           ref={ref}
//           style={{
//             alignItems: "center",
//           }}
//           width={width}
//           height={210}
//           data={dataTherapist}
//           onProgressChange={progress}
//           loop={true}
//           overscrollEnabled={false}
//           renderItem={({ item }) => (
//             <View style={styles.container}>
//               <Pressable
//                 onPress={() => handleViewTherapistDetail(item)}
//                 style={styles.card}
//               >
//                 <Image source={{ uri: item.imageUrl }} style={styles.image} />
//                 <View style={styles.content}>
//                   <Text style={styles.title}>{item.fullName}</Text>
//                 </View>
//               </Pressable>
//             </View>
//           )}
//         /> */}
//         <Carousel
//           ref={(carouselRef) => {
//             if (carouselRef) ref.current = carouselRef;
//           }}
//           width={width} // Sử dụng toàn bộ chiều rộng màn hình
//           height={210}
//           data={dataTherapist}
//           loop={true}
//           overscrollEnabled={false}
//           pagingEnabled={true} // Bật phân trang
//           snapEnabled={true} // Bật snapping
//           autoPlay={false}
//           mode="parallax"
//           modeConfig={{
//             parallaxScrollingScale: 1,
//             parallaxAdjacentItemScale: 0.9,
//           }}
//           renderItem={({ index }) => {
//             // Mỗi trang chứa 3 item
//             const startIndex = index * 3;
//             const items = dataTherapist.slice(startIndex, startIndex + 3);

//             return (
//               <View style={styles.rowContainer}>
//                 {items.map((item, i) => (
//                   <View key={i} style={styles.cardContainer}>
//                     <Pressable
//                       onPress={() => handleViewTherapistDetail(item)}
//                       style={styles.card}
//                     >
//                       <Image
//                         source={{ uri: item.imageUrl }}
//                         style={styles.image}
//                       />
//                       <View style={styles.content}>
//                         <Text style={styles.title}>{item.fullName}</Text>
//                       </View>
//                     </Pressable>
//                   </View>
//                 ))}
//               </View>
//             );
//           }}
//         />

//         <Pagination.Basic
//           progress={progress}
//           data={dataTherapist}
//           dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
//           containerStyle={{ gap: 5, marginTop: 10 }}
//           onPress={onPressPagination}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   // container: {
//   //   flex: 1,
//   //   width: width,
//   //   display: "flex",
//   //   justifyContent: "center",
//   //   alignItems: "center",
//   // },
//   // card: {
//   //   width: width / 3 - 20, // Trừ đi khoảng margin để không bị dính
//   //   backgroundColor: "#fff",
//   //   borderRadius: 10,
//   //   shadowColor: "#000",
//   //   shadowOffset: { width: 0, height: 4 },
//   //   shadowOpacity: 0.3,
//   //   shadowRadius: 4,
//   //   elevation: 8,
//   //   padding: 10,
//   // },
//   // image: {
//   //   width: "100%",
//   //   height: 100,
//   //   borderRadius: 10,
//   // },
//   // content: {
//   //   marginTop: 10,
//   //   alignItems: "center",
//   // },
//   // title: {
//   //   fontSize: 12,
//   //   fontWeight: "bold",
//   //   color: "#333",
//   // },
//   rowContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between", // Đảm bảo căn đều 3 items
//     width: width, // Đảm bảo đúng chiều rộng màn hình
//   },
//   cardContainer: {
//     width: width / 3.5, // Chia đúng 3 phần
//     alignItems: "center",
//   },
//   card: {
//     width: "100%",
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 8,
//     padding: 10,
//   },
//   image: {
//     width: "100%",
//     height: 100,
//     borderRadius: 10,
//   },
//   content: {
//     marginTop: 10,
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   description: {
//     fontSize: 10,
//     fontWeight: "400",
//     color: "#333",
//   },
// });

// export default TherapistCarousel;

import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Pressable,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { useNavigation } from "expo-router";
import { formatLocalHostImageUrl } from "@/app/tool/ImageUrlHelper";

const width = Dimensions.get("window").width;

const TherapistCarousel = ({ data }) => {
  // STATES
  const [dataTherapist, setDataTherapist] = useState([]);
  const [groupedData, setGroupedData] = useState([]);

  // HOOKS
  const ref = useRef<ICarouselInstance | null>(null);
  const progress = useSharedValue<number>(0);
  const navigation = useNavigation();

  useEffect(() => {
    if (data.length > 0) {
      setDataTherapist(data);

      // Chia dữ liệu thành từng nhóm 3 phần tử
      let tempArray = [];
      for (let i = 0; i < data.length; i += 3) {
        tempArray.push(data.slice(i, i + 3));
      }
      setGroupedData(tempArray);
    }
  }, [data]);

  // FUNCTIONS
  const onPressPagination = (index: number) => {
    if (ref.current) {
      ref.current.scrollTo({
        count: index - progress.value,
        animated: true,
      });
    } else {
      console.warn("ref.current is undefined");
    }
  };

  const handleViewTherapistDetail = (item) => {
    navigation.navigate("TherapistDetail", {
      therapistId: item._id as any,
      therapistName: item?.fullName as any,
    });
  };

  return (
    <SafeAreaView>
      <View>
        <Carousel
          ref={(carouselRef) => {
            if (carouselRef) ref.current = carouselRef;
          }}
          width={width}
          height={210}
          data={groupedData} // Dữ liệu đã chia nhóm
          loop={true}
          overscrollEnabled={false}
          pagingEnabled={true}
          snapEnabled={true}
          autoPlay={false}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxAdjacentItemScale: 0.9,
          }}
          renderItem={({ item }) => (
            <View style={styles.rowContainer}>
              {item.map((therapist, i) => (
                <View key={i} style={styles.cardContainer}>
                  <Pressable
                    onPress={() => handleViewTherapistDetail(therapist)}
                    style={styles.card}
                  >
                    <Image
                      source={{ uri: formatLocalHostImageUrl(therapist.imageUrl)}}
                      style={styles.image}
                    />
                    <View style={styles.content}>
                      <Text style={styles.title}>{therapist.fullName}</Text>
                    </View>
                  </Pressable>
                </View>
              ))}
            </View>
          )}
        />

        <Pagination.Basic
          progress={progress}
          data={groupedData}
          dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
          containerStyle={{ gap: 5, marginTop: 10 }}
          onPress={onPressPagination}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width,
  },
  cardContainer: {
    width: width / 3.5,
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    padding: 10,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  content: {
    marginTop: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
});

export default TherapistCarousel;
