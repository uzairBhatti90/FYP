import React from "react";
import { View, Text, StyleSheet} from "react-native"
import { Button } from "react-native-elements";
import { AppButton } from "../../../components/gerenal/appButton";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { colors, fontFamily } from "../../../globals/utilities";
import { TxtInput } from "../../../components/gerenal/txtinput";



const SetupProfile = (props) => {
    return (
        <View style = {styles.container}>
            <Text>Troubleshoot Your Automobile</Text>

            <TxtInput
                    iconName={''}
                    iconType={''}
                    MyStyles={styles.inputStyleView}
                    itsStyle={styles.inputStyle}
                    placeholder="Auto-name"
                    onChangeText={text => setEmail(text)}
                />
    



        </View>

    )
}
export default SetupProfile;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    button: {
        width: responsiveWidth(90),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: responsiveWidth(3),
        height: responsiveHeight(7)
    },
    buttonText: {
        fontSize: responsiveFontSize(2),
        fontFamily: fontFamily.appTextMedium,
        color: colors.white
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
        height: responsiveHeight(6.5)
    },



})