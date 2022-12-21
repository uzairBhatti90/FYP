import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, Signup, Splash, ForgetPass, ProfileRegister } from "../screens/auth/screenName";

const AuthStack = createStackNavigator()

const Auth = () => {
    return (
        <AuthStack.Navigator 
        screenOptions={{ headerShown:  false}}
        initialRouteName='Splash'
        >
            <AuthStack.Screen name="Login" component={Login} />
            <AuthStack.Screen name="Signup" component={Signup} />
            <AuthStack.Screen name="Splash" component={Splash} />
            <AuthStack.Screen name="ForgetPass" component={ForgetPass} />
            <AuthStack.Screen name="ProfileRegister" component={ProfileRegister} />
            
        </AuthStack.Navigator>
    )
}

export default Auth