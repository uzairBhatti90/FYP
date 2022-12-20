import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Auth from "./auth";

const AppStack = createStackNavigator()

const Apps = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator
                screenOptions={{ headerShown: false, animationEnabled: false }}
                initialRouteName={'Auth'}
            >
                <AppStack.Screen name="Auth" component={Auth} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default Apps