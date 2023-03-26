import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, RadioButton } from "react-native"
import { Button, Icon } from "react-native-elements";
import { AppButton } from "../../components/gerenal/appButton";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { colors, fontFamily } from "../../globals/utilities";
import { TxtInput } from "../../components/gerenal/txtinput";
import { Header } from "../../components/feeds/header";




const AddService = (props) => {
    const [Auto, setAuto] = useState("");
    const [Issue, setIssue] = useState("");
    const [Company, setcompany] = useState("");
    const [Address, setaddress] = useState("");

    return (
        <View style={styles.container}>
            <Header
                onPress={() => props.navigation.goBack()}
                title={'Add Service'}
            />
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
                placeholder="Service-name"
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
            <TxtInput
                iconName={''}
                iconType={''}
                MyStyles={styles.inputStyleView}
                itsStyle={styles.inputStyle}
                placeholder="Complete Address"
                onChangeText={text => setaddress(text)}
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
                    title={'Save'}
                    myStyles={styles.button2}
                    itsTextstyle={styles.buttonText}
                />
                <AppButton onPress={() => props.navigation.goBack()}
                    title={'Cancel'}
                    myStyles={styles.button2}
                    itsTextstyle={styles.buttonText}
                />
            </View>
        </View>

    )
}
export default AddService;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    Carstyle: {
        fontSize: responsiveFontSize(3.5),
        marginTop: responsiveHeight(3),
        marginLeft: responsiveHeight(2.5),
        color: 'gray',
    },

    inputStyleView: {
        width: responsiveWidth(80),
        alignSelf: "center",
        backgroundColor: 'transparent',
        borderBottomWidth: responsiveWidth(0.1),
        marginTop: responsiveHeight(1)
    },
    inputStyle: {
        width: responsiveWidth(75),
        color: 'black',
        height: responsiveHeight(6)
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
    button2: {
        width: responsiveWidth(45),
        height: responsiveHeight(6),
        borderTopRightRadius: responsiveWidth(1),
        borderBottomLeftRadius: responsiveWidth(1),
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-start"
    },
    Bview: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: responsiveHeight(5),
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
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
        marginLeft: responsiveHeight(14)
    },
})