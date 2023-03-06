import React, { useState } from "react";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { View, StyleSheet, Text, Image, Button } from "react-native";
import { TxtInput } from "../../../components/gerenal/txtinput";
import { colors, fontFamily, appImages } from "../../../globals/utilities";
import { AppButton } from '../../../components/gerenal/appButton';


const EditProfile = (props) => {
    const [name, setName] = useState("");
    const [NameError, setNameError] = useState('');
    const [AddressError, setAddressError] = useState('');
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.titleView}>
                <Text style={styles.title}>Settings</Text>
                <TxtInput
                    iconName={'user'}
                    iconType={'entypo'}
                    MyStyles={styles.inputStyleView}
                    itsStyle={styles.inputStyle}
                    placeholder="Name"
                    onChangeText={text => handleOnChangeEmailText(text)}
                    error={NameError}
                />

                <TxtInput
                    iconName={'address'}
                    iconType={'entypo'}
                    MyStyles={styles.inputStyleView}
                    itsStyle={styles.inputStyle}
                    placeholder="Address"
                    onChangeText={text => handleOnChangeEmailText(text)}
                    error={AddressError}
                />

                <View style={styles.Bview}>
                    <AppButton
                        title={'Submit'}
                        myStyles={styles.button}
                        itsTextstyle={styles.buttonText}
                    />
                    <AppButton
                        title={'Cancel'}
                        myStyles={styles.button}
                        itsTextstyle={styles.buttonText}
                    />
                    
                </View>

            </View>
        </View>
    )
}
export default EditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: responsiveHeight(30),
        marginTop: responsiveHeight(13),
        marginLeft: responsiveHeight(15)
    },
    wrapper: {
        width: responsiveWidth(90),
        alignSelf: "center",
        marginTop: responsiveHeight(2)
    },
    inputStyleView: {
        width: responsiveWidth(90),
        alignSelf: "center",
        backgroundColor: 'transparent',
        borderBottomWidth: responsiveWidth(0.1)
    },
    inputStyle: {
        width: responsiveWidth(80),
        color: 'black',
        height: responsiveHeight(5.5)
    },
    buttonText: {
        fontSize: responsiveFontSize(2),
        fontFamily: fontFamily.appTextMedium,
        color: colors.white
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
      Bview: {
        flexDirection: "row",
        justifyContent: "space-around"
      },


})