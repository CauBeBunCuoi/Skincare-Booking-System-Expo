import React from 'react';
import { View, StyleSheet } from 'react-native';

import { CommonActions } from '@react-navigation/native';
import { Text, BottomNavigation, TouchableRipple } from 'react-native-paper';


export function BottomNavBar({ hiddenBottomNavBarScreens, navigation, state, descriptors, insets }) {
    const navState = navigation.getState();

    let currentRoute = navState.routes[navState.index];

    while (currentRoute.state?.index !== undefined) {
        currentRoute = currentRoute.state.routes[currentRoute.state.index];
    }


    const shouldHideBottomBar = hiddenBottomNavBarScreens.includes(currentRoute.name);

    if (shouldHideBottomBar) {
        return null; 
    }

    return (
        <BottomNavigation.Bar
            style={styles.container}
            navigationState={state}
            safeAreaInsets={insets}
            renderTouchable={({ key, ...props }) => {
                if (descriptors[key].options.tabBarShowLabel) {
                    return (<TouchableRipple key={key} {...props} />)
                }
                return null
            }
            }
            onTabPress={({ route, preventDefault }) => {
                const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                });

                if (event.defaultPrevented) {
                    preventDefault();
                } else {
                    navigation.dispatch({
                        ...CommonActions.navigate(route.name, route.params),
                        target: state.key,
                    });
                }
            }}
            renderIcon={({ route, focused, color }) => {
                const { options } = descriptors[route.key];
                if (options.tabBarIcon) {
                    return options.tabBarIcon({ focused, color, size: 20 });
                }
                return null;
            }}
            getLabelText={({ route }) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.title;
                return label;
            }}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        height: 70,
    },
});

