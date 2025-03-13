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
import { asyncStorage_getByKey, asyncStorage_initStorage } from "./tool/AsyncStorage";
import { jwtDecode } from "jwt-decode";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2IwYTQxNDQ0Nzg4M2U1ZmE4MGY4YjIiLCJ1c2VybmFtZSI6ImJiIiwiZnVsbE5hbWUiOiJIw6BvIG7DqCIsImVtYWlsIjoiaGFuZ3V5ZW5oYW9vby4yMGFwcmlsQGdtYWlsLmNvbSIsInBob25lTnVtYmVyIjoxMjMxMjMxMjMxMjMsInJvbGVJZCI6MSwiaWF0IjoxNzQxODUwMDQ0LCJleHAiOjE3NDE5MzY0NDR9.YpvJ188YfyuQTvF2N0qloXPKFHi9OfMBMisOzOQhyj_khFKsIu413MPeiBoD7WpZNQ0UJQgGvz_Z4VCZyLLU-3CJoXC3nU4-MXxDlIFQKxpFdP2qt4T4IY8ayFuxwIKdVtDIqM_BllTQRTWRomvKsB9Quob8eHDWotFZSdVxezeZs296xpOJ6bVX-YCWAHxVfG1Hjac6BOmT3ibkG9XLrqi-GNy5Lg8ZUx49UOJPCqpU6FkunHmC7mbDnN5TlP07j4uMDkD1_nHPGp4cXOdXHcLA3ZG967_DrhK05XyxR8jZKksc4o9ECc55nhHfQUteSuR7v7SopPJh39-F4bqpqA"

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });



  useEffect(() => {
    const auth = {
      token: token,
      user: jwtDecode(token)
    }
    asyncStorage_initStorage("auth", auth);
  }, [])

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
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  MainScreen: {
    marginBottom: 70,
  },
});
