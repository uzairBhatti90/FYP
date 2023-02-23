import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, RadioButton } from "react-native"
import { Button } from "react-native-elements";
import { AppButton } from "../../../components/gerenal/appButton";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { colors, fontFamily } from "../../../globals/utilities";
import { TxtInput } from "../../../components/gerenal/txtinput";



const CardScreen = (props) => {
    const [Auto, setAuto] = useState("");
    const [Issue, setIssue] = useState("");
    const [Company, setcompany] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.textstyle}>Get Services</Text>
            <TxtInput
                iconName={''}
                iconType={''}
                MyStyles={styles.inputStyleView}
                itsStyle={styles.inputStyle}
                placeholder="Auto-name"
                onChangeText={text => setAuto(text)}
            />




            <TxtInput
                iconName={''}
                iconType={''}
                MyStyles={styles.inputStyleView}
                itsStyle={styles.inputStyle}
                placeholder="Issue"
                onChangeText={text => setIssue(text)}
            />
            <TxtInput
                iconName={''}
                iconType={''}
                MyStyles={styles.inputStyleView}
                itsStyle={styles.inputStyle}
                placeholder="Company-name"
                onChangeText={text => setcompany(text)}
            />
            <View style={styles.dontStyle}>
                <Text style={
                    styles.accountText
                }>Nearest Service Provider
                    <Text style={[styles.accountText, {
                        color: colors.primary
                    }]}
                        onPress={() => props.navigation.navigate('Location')}
                    >   Location</Text>
                </Text>
            </View>
            <View style={styles.Bview}>
             <AppButton
                    title={'Submit'}
                    myStyles={styles.button}
                    itsTextstyle={styles.buttonText}
                    onPress={() => { props.navigation.navigate('Home')}}
                />
                <AppButton
                    title={'Cancel'}
                    myStyles={styles.button}
                    itsTextstyle={styles.buttonText}
                    onPress={() => { props.navigation.navigate('Home')}}
                />
            </View>

        </View>

    )
}
export default CardScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    Carstyle: {
        fontSize: responsiveFontSize(3.5),
        marginTop: responsiveHeight(3),
        marginLeft: responsiveHeight(2.5),
        color: 'gray',
    },
    textstyle: {
        marginTop: responsiveHeight(10),
        fontSize: responsiveFontSize(3.5),
        color: 'black',
        alignSelf: 'center',
    },
    inputStyleView: {
        width: responsiveWidth(80),
        alignSelf: "center",
        backgroundColor: 'transparent',
        borderBottomWidth: responsiveWidth(0.1)
    },
    inputStyle: {
        width: responsiveWidth(80),
        color: 'black',
        height: responsiveHeight(6.5)
    },

    textInput: {
        marginLeft: 25,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 5,
        width: responsiveWidth(75),
        marginTop: responsiveHeight(3)
    },
    Tstyle: {
        marginTop: responsiveHeight(3),
        fontSize: responsiveFontSize(2.7),
        justifyContent: "center",
        marginLeft: responsiveHeight(3),
        color: 'grey',
    },
    Ctext: {
        marginLeft: responsiveHeight(0.5),
        fontSize: responsiveFontSize(2),
    },
    Bikestyle: {
        fontSize: responsiveFontSize(3.5),
        marginTop: responsiveHeight(5),
        marginLeft: responsiveHeight(2.5),
        color: 'gray',
    },
    Btext: {
        marginLeft: responsiveHeight(0.5),
        fontSize: responsiveFontSize(2),
    },
    button: {
        width: responsiveWidth(40),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: responsiveWidth(3),
        height: responsiveHeight(7),
        marginTop: responsiveHeight(6), 
        marginRight: responsiveHeight(3)
    },
    buttonText: {
        fontSize: responsiveFontSize(2),
        fontFamily: fontFamily.appTextMedium,
        color: colors.white
    },
    Bview:{
        flexDirection:"row",
        justifyContent:"space-around"
    },
    dontStyle: {
        top: 50,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center"
    },
    accountText: {
        color: "black",
        fontSize: responsiveFontSize(1.8),
        fontFamily: fontFamily.appTextRegular,
        marginBottom: responsiveHeight(3),
        marginLeft:  responsiveHeight(14)
    },



})