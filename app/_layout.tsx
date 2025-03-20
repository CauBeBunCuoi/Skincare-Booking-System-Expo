import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
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

// const token =
//   "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2IwYTQxNDQ0Nzg4M2U1ZmE4MGY4YjIiLCJ1c2VybmFtZSI6ImJiIiwiZnVsbE5hbWUiOiJIw6BvIG7DqCIsImVtYWlsIjoiaGFuZ3V5ZW5oYW9vby4yMGFwcmlsQGdtYWlsLmNvbSIsInBob25lTnVtYmVyIjoxMjMxMjMxMjMxMjMsInJvbGUiOnsiX2lkIjoxLCJuYW1lIjoiQ3VzdG9tZXIifSwiaWF0IjoxNzQyMjk4NjY3LCJleHAiOjE3NDIzODUwNjd9.HijEZKasrq0pk--NrHJOCPapZUfLbJ4iNQEUpu0hZ9FRsxnR_ttMNsKLOlExOc66VbAlBrfFfxD8GyqQSow1B9i1VbuW2avKMIDZCpQwZeggyLC-QD9cVAmjLrof5XzHwyNY-szHh3kKjTmjy3GQplMJDKh0W4xJrJVFR3waUoSnC1zLMjZZZ8aoOp7iuIRn0nj4ur19IzcSG1SiTk3z0EWipCYiPSlZFMJI7kaS0E4fe9b_C8SHR8KE0EOmZ2RtZw7U6hV-CBD2bmzkTp3cfPvG5kGi9j8UA4t80DqVA0q-hIzTgZGzhLO8jBZNWyRk6P9ENJl0Ikx9Q0fopBKXIQ";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    PostNoBillBold: require("@/assets/fonts/postnobillscolombo-bold.ttf"),
    PostNoBillRegular: require("@/assets/fonts/Post No Bills Colombo.ttf"),
    PostNoBillLight: require("@/assets/fonts/postnobillscolombo-light.ttf"),
    PostNoBillSemiBold: require("@/assets/fonts/postnobillscolombo-semibold.ttf"),
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  // useEffect(() => {
  //   const auth = {
  //     token: token,
  //     user: jwtDecode(token),
  //   };
  //   asyncStorage_initStorage("auth", auth);
  // }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
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
  },
  MainScreen: {
    marginBottom: 70,
  },
});
