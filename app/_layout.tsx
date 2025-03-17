import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  useRoute,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useNavigation } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "react-native-gesture-handler";

import { useColorScheme } from "@/hooks/useColorScheme";
import { PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBottomNavigation } from "./navigation/App.navigation";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HomeIcon from "@/components/homeIcon/homeIcon";
import {
  asyncStorage_getByKey,
  asyncStorage_initStorage,
} from "./tool/AsyncStorage";
import { jwtDecode } from "jwt-decode";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2IwYTQxNDQ0Nzg4M2U1ZmE4MGY4YjIiLCJ1c2VybmFtZSI6ImJiIiwiZnVsbE5hbWUiOiJIw6BvIG7DqCIsImVtYWlsIjoiaGFuZ3V5ZW5oYW9vby4yMGFwcmlsQGdtYWlsLmNvbSIsInBob25lTnVtYmVyIjoxMjMxMjMxMjMxMjMsInJvbGVJZCI6MSwiaWF0IjoxNzQyMTk4ODIzLCJleHAiOjE3NDIyODUyMjN9.LA95gBqklqzGe99V39YV_JoJIdjJtdQcdf_EtWHXZ02LHIKzXcSN8cwbBKKxxfDe3uYbFu3I2GFh0QMEd4XD17Hrg6ooyLJCCxtZTbqnVHSl395GJ98b7_WGlFaUl_OFze9zmnoScNnJnjOlBVnNY-q8cD9Fafgo4w_9DoxZPjqnyC_sLJVRdqnUl_0S-Guyzq2d1EQH6ye3_4AXltQfuzD-H5mWp0z3XIpxhP4W_3OeH5v1mMurz4NrBhiNjpuGVdQw3s_gSLD_3mq-L51F28nz4yhEVZvKbsU9appwEvN43MyyEnGKoPEOF3BBWZhBfv9KpQQB8hR9ReGZHJRUVA";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    PostNoBillBold: require("@/assets/fonts/postnobillscolombo-bold.ttf"),
    PostNoBillRegular: require("@/assets/fonts/Post No Bills Colombo.ttf"),
    PostNoBillLight: require("@/assets/fonts/postnobillscolombo-light.ttf"),
    PostNoBillSemiBold: require("@/assets/fonts/postnobillscolombo-semibold.ttf"),
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    const auth = {
      token: token,
      user: jwtDecode(token),
    };
    asyncStorage_initStorage("auth", auth);
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    //   <Stack>
    //     <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    //     <Stack.Screen name="+not-found" />
    //   </Stack>
    //   <StatusBar style="auto" />
    // </ThemeProvider>

    // <PaperProvider>
    //   <SafeAreaView style={layoutStyles.AndroidSafeArea}>
    //     <AppBottomNavigation />
    //   </SafeAreaView>
    // </PaperProvider>

    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Bọc vào đây */}
      <PaperProvider>
        <SafeAreaView style={layoutStyles.AndroidSafeArea}>
          <AppBottomNavigation />
        </SafeAreaView>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

const layoutStyles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    fontFamily: "PostNoBillBold",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  MainScreen: {
    marginBottom: 70,
  },
});
