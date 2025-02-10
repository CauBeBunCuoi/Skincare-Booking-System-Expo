import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { BottomNavBar } from "@/components/navigator/BottomNavBar";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HomeScreen } from "../screens/home";
import { AccountProfileScreen, TherapistDetailScreen, TherapistSelectionScreen } from "../screens/account";
import { ServiceDetailScreen, ServiceDiscoveryScreen, ServiceListScreen } from "../screens/service";
import { BookingDetailScreen, BookingHistoryScreen } from "../screens/booking";
import { LoginScreen, RegisterScreen } from "../screens/auth";
import { QuizResultScreen, QuizScreen } from "../screens/quiz";


// Home Stack
const HomeStack = createNativeStackNavigator();
const HomeStackScreen = ({ navigation }) => {
    useFocusEffect(
        useCallback(() => {
            navigation.navigate('HOME', { screen: 'Home' });
            return () => { };
        }, [])
    );
    return (
        <HomeStack.Navigator
            id={null}
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
        >
            <HomeStack.Screen name="Home" component={HomeScreen} />
            <HomeStack.Screen name="TherapistDetail" component={TherapistDetailScreen} />
            <HomeStack.Screen name="TherapistSelection" component={TherapistSelectionScreen} />

            <HomeStack.Screen name="ServiceList" component={ServiceListScreen} />
            <HomeStack.Screen name="ServiceDetail" component={ServiceDetailScreen} />

            <HomeStack.Screen name="BookingDetail" component={BookingDetailScreen} />

            <HomeStack.Screen name="Quiz" component={QuizScreen} />
            <HomeStack.Screen name="QuizResult" component={QuizResultScreen} options={{ gestureEnabled: false }} />



        </HomeStack.Navigator>
    );

};

// Services Stack
const ServicesStack = createNativeStackNavigator();
const ServicesStackScreen = ({ navigation }) => {
    useFocusEffect(
        useCallback(() => {
            navigation.navigate('SERVICES', { screen: 'ServiceDiscovery' });
            return () => { };
        }, [])
    );
    return (
        <ServicesStack.Navigator
            id={null}
            initialRouteName="ServiceDiscovery"
            screenOptions={{ headerShown: false }}
        >
            <ServicesStack.Screen name="ServiceDiscovery" component={ServiceDiscoveryScreen} />
            <ServicesStack.Screen name="ServiceList" component={ServiceListScreen} />
            <ServicesStack.Screen name="ServiceDetail" component={ServiceDetailScreen} />

            <ServicesStack.Screen name="TherapistSelection" component={TherapistSelectionScreen} />

            <ServicesStack.Screen name="BookingDetail" component={BookingDetailScreen} />

        </ServicesStack.Navigator>
    );

};

// Booking Stack
const BookingStack = createNativeStackNavigator();
const BookingStackScreen = ({ navigation }) => {
    useFocusEffect(
        useCallback(() => {
            navigation.navigate('BOOKING', { screen: 'BookingHistory' });
            return () => { };
        }, [])
    );
    return (
        <BookingStack.Navigator
            id={null}
            initialRouteName="BookingHistory"
            screenOptions={{ headerShown: false }}
        >
            <BookingStack.Screen name="BookingHistory" component={BookingHistoryScreen} />
            <BookingStack.Screen name="BookingDetail" component={BookingDetailScreen} />

        </BookingStack.Navigator>
    );

};

// Profile Stack
const ProfileStack = createNativeStackNavigator();
const ProfileStackScreen = ({ navigation }) => {
    useFocusEffect(
        useCallback(() => {
            navigation.navigate('PROFILE', { screen: 'Profile' });
            return () => { };
        }, [])
    );
    return (
        <ProfileStack.Navigator
            id={null}
            initialRouteName="AccountProfile"
            screenOptions={{ headerShown: false }}
        >
            <ProfileStack.Screen name="AccountProfile" component={AccountProfileScreen} />

        </ProfileStack.Navigator>
    );

};

// Auth Stack
const AuthStack = createNativeStackNavigator();
const AuthStackScreen = ({ navigation }) => {
    useFocusEffect(
        useCallback(() => {
            navigation.navigate('AUTH', { screen: 'Login' });
            return () => { };
        }, [])
    );
    return (
        <AuthStack.Navigator
            id={null}
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
        >
            <AuthStack.Screen name="Login" component={LoginScreen} options={{ gestureEnabled: false }} />
            <AuthStack.Screen name="Register" component={RegisterScreen} />

        </AuthStack.Navigator>
    );

};


const BottomNavigation = createBottomTabNavigator();
const hiddenBottomNavBarScreens = [
    'ServiceList',
    'ServiceDetail',
    'TherapistSelection',
    'TherapistDetail',
    'BookingDetail',
    'Quiz',
    'QuizResult',
    'Login',
    'Register',
];
export const AppBottomNavigation = () => {
    return (

        <BottomNavigation.Navigator
            id={null}
            screenOptions={{
                headerShown: false,
            }}
            tabBar={(props) => <BottomNavBar {...props} hiddenBottomNavBarScreens={hiddenBottomNavBarScreens} />}
        >
            <BottomNavigation.Screen
                name="HOME"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => {
                        return <Icon name="home" size={size} color={color} />;
                    },
                    tabBarShowLabel: true,
                }}
            />
            <BottomNavigation.Screen
                name="SERVICES"
                component={ServicesStackScreen}
                options={{
                    tabBarLabel: 'Services Discovery',
                    tabBarIcon: ({ color, size }) => {
                        return <Icon name="briefcase" size={size} color={color} />;
                    },
                    tabBarShowLabel: true,
                }}
            />
            <BottomNavigation.Screen
                name="BOOKING"
                component={BookingStackScreen}
                options={{
                    tabBarLabel: 'Booking History',
                    tabBarIcon: ({ color, size }) => {
                        return <Icon name="calendar" size={size} color={color} />;
                    },
                    tabBarShowLabel: true,
                }}
            />
            <BottomNavigation.Screen
                name="PROFILE"
                component={ProfileStackScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => {
                        return <Icon name="account" size={size} color={color} />;
                    },
                    tabBarShowLabel: true,
                }}
            />
            <BottomNavigation.Screen
                name="AUTH"
                component={AuthStackScreen}
                options={{
                    tabBarLabel: 'Auth',
                    tabBarIcon: ({ color, size }) => {
                        return <Icon name="key" size={size} color={color} />;
                    },
                    tabBarShowLabel: false,
                }}
            />


        </BottomNavigation.Navigator>

    );
};




