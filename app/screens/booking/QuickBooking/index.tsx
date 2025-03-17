import { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { styles } from "./styles";



const QuickBookingScreen = () => {
  // STATES
  const [loading, setLoading] = useState(true);
  // HOOKS
  const isFocused = useIsFocused();

  useEffect(() => {
    setLoading(true);

    setAttributes();
  }, [isFocused]);

  // FUNCTIONS
  const setAttributes = async () => {
    // Call API 
    setLoading(false);
  };


  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/images/backgrounds/bookingDetails/main.jpg")}
        style={styles.background}
      />

      <View style={{ flex: 1 }}>
        {/* Thêm View này */}
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {!loading ? (
            <>
              
            </>
          ) : (
            <Text>Loading...</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default QuickBookingScreen;
