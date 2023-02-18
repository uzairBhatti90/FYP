import React, { useEffect, useState } from "react";
import {
    Home,
    Location,
    Inbox,
    Setting,
    SetupProfile,
    ReportScreen,
    Chat
} from "../screens/app/screenName";
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
    BottomTabBarProps,
    createBottomTabNavigator,
    BottomTabBar as RNBottomTabBar,
} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, Image, Platform, } from "react-native";
import { colors, fontFamily } from '../globals/utilities/index'
import { Icon } from "react-native-elements";
import AppointmentScreen from "../screens/app/Appointment/appointment";


const tabBarHeight = responsiveHeight(8);
const HomeStack = createStackNavigator(); //DashBoard screen
const LocationStack = createStackNavigator(); //Department screen
const ReportStack = createStackNavigator();
const AppointmentStack = createStackNavigator();
const ChatStack = createStackNavigator(); //events screen
const SettingStack = createStackNavigator(); //user screen
const MainTab = createBottomTabNavigator();
const MainApp = createStackNavigator()
const renderTabBar = (props) => {
    return (
        <View style={styles.bottomTabBarContainer}>
            {Platform.OS === 'ios' ? (
                <>
                    <View
                        style={{
                            backgroundColor: 'white',
                            height: responsiveHeight(4),
                            width: responsiveWidth(50),
                            position: 'absolute',
                            bottom: 0,
                        }}
                    />
                    <View
                        style={{
                            backgroundColor: 'red',
                            height: responsiveHeight(4),
                            width: responsiveWidth(50),
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                        }}
                    />
                </>
            ) : null}
            <RNBottomTabBar {...props} />
        </View>
    );
};


const HomeStackScreens = () => {
    return (
        <HomeStack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={'Home'}
        >
            <HomeStack.Screen name={'Home'} component={Home} />
            <HomeStack.Screen name={'SetupProfile'} component={SetupProfile} />
        </HomeStack.Navigator>
    );
};
const LocationStackScreens = () => {
    return (
        <LocationStack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={'Location'}
        >
            <LocationStack.Screen name={'Location'} component={Location} />
        </LocationStack.Navigator>
    );
};
const ChatStackScreens = () => {
    return (
        <ChatStack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={'Inbox'}
        >
            <ChatStack.Screen name="Inbox" component={Inbox} />
        </ChatStack.Navigator>
    );
};
const SettingStackScreens = () => {
    return (
        <SettingStack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={'Setting'}
        >
            <SettingStack.Screen name={'Setting'} component={Setting} />
        </SettingStack.Navigator>
    );
};



const MainTabScreens = props => {
    return (
        <MainTab.Navigator
            tabBar={renderTabBar}

            screenOptions={{
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: 'white',
                    width: responsiveWidth(100),
                    alignSelf: 'center',
                    height: tabBarHeight,
                    borderTopRightRadius: responsiveWidth(6),
                    borderTopLeftRadius: responsiveWidth(6),
                    position: 'absolute',
                    bottom: 0,
                    paddingTop: Platform.OS === 'android' ? responsiveHeight(0.5) : responsiveHeight(1.5),
                },
            }}
            initialRouteName={'HomeStackScreens'}>
            <MainTab.Screen
                name={'HomeStackScreens'}
                component={HomeStackScreens}
                options={props => ({
                    unmountOnBlur: true,
                    tabBarLabel: 'Sale',
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <View
                                style={
                                    styles.tabIconContainer
                                }>
                                <Icon
                                    name="home"
                                    type="antdesign"
                                    size={responsiveFontSize(3)}
                                    color={focused ? colors.primary : colors.black}
                                />
                                <Text
                                    style={{
                                        marginTop: responsiveHeight(0.5),
                                        color: focused ? colors.primary : colors.black,
                                        fontSize: responsiveFontSize(1.2),
                                        textAlign: 'center',
                                        fontFamily: fontFamily.appTextRegular
                                    }}>
                                    Home
                                </Text>
                            </View>
                        );
                    },
                })}
            />
            <MainTab.Screen
                name={'LocationStackScreens'}
                component={LocationStackScreens}
                options={props => ({
                    unmountOnBlur: true,
                    tabBarLabel: 'Events',
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <View style={styles.tabIconContainer}>
                                <Icon
                                    name="location-outline"
                                    type="ionicon"
                                    size={responsiveFontSize(3)}
                                    color={focused ? colors.primary : colors.black}
                                />
                                <Text
                                    style={{
                                        color: focused ? colors.primary : colors.black,
                                        fontSize: responsiveFontSize(1.2),
                                        textAlign: 'center',
                                        fontFamily: fontFamily.appTextRegular,
                                        marginTop: responsiveHeight(0.4)
                                    }}>
                                    Locations
                                </Text>
                            </View>
                        );
                    },
                })}
            />
            <MainTab.Screen
                name={'ChatStackScreens'}
                component={ChatStackScreens}
                options={props => ({
                    unmountOnBlur: true,
                    tabBarLabel: 'Events',
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <View style={styles.tabIconContainer}>
                                <Icon
                                    name="chatbox-ellipses-outline"
                                    type="ionicon"
                                    size={responsiveFontSize(3)}
                                    color={focused ? colors.primary : colors.black}
                                />
                                <Text
                                    style={{
                                        color: focused ? colors.primary : colors.black,
                                        fontSize: responsiveFontSize(1.2),
                                        textAlign: 'center',
                                        fontFamily: fontFamily.appTextRegular,
                                        marginTop: responsiveHeight(0.4)
                                    }}>
                                    Chat
                                </Text>
                            </View>
                        );
                    },
                })}
            />
            <MainTab.Screen
                name={'SettingStackScreens'}
                component={SettingStackScreens}
                options={() => ({
                    unmountOnBlur: true,
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <View style={styles.tabIconContainer}>
                                <Icon
                                    name="settings"
                                    type="feather"
                                    size={responsiveFontSize(3)}
                                    color={focused ? colors.primary : colors.black}
                                />
                                <Text
                                    style={{
                                        color: focused ? colors.primary : colors.black,
                                        fontSize: responsiveFontSize(1.2),
                                        textAlign: 'center',
                                        fontFamily: fontFamily.appTextRegular,
                                        marginTop: responsiveHeight(0.5)
                                    }}>
                                    Setting
                                </Text>
                            </View>
                        );
                    },
                })}
            />

        </MainTab.Navigator>
    );
};
const App = () => {
    return (
        <MainApp.Navigator
            screenOptions={{ headerShown: false, animationEnabled: true }}
            initialRouteName={'Main'}>
            < MainApp.Screen name={'Main'} component={MainTabScreens} />
            < MainApp.Screen name={'ReportScreen'} component={ReportScreen} />
            < MainApp.Screen name={'Location'} component={Location} />
            < MainApp.Screen name={'AppointmentScreen'} component={AppointmentScreen} />
            <MainApp.Screen name="Chat" component={Chat} />

        </MainApp.Navigator>
    );
};
export default App;



const styles = StyleSheet.create({
    bottomTabBarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    navigator: {
        borderTopWidth: 0,
        backgroundColor: 'transparent',
        elevation: 24,
        height:
            Platform.OS === 'android' ? responsiveHeight(7) : responsiveHeight(9),
    },
    tabIconContainer: {
        alignItems: 'center',
        width: responsiveWidth(25)
    },
})