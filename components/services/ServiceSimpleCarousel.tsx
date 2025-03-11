import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import ServiceCardSimple from "./ServiceCardSimple";

const ServiceSimpleCarousel = ({ services }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={services}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <ServiceCardSimple service={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ServiceSimpleCarousel;
