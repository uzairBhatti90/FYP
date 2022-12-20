import React, { useState } from "react";
import {
    StatusBar,
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image

} from "react-native";
import { responsiveWidth, responsiveHeight, responsiveFontSize } from "react-native-responsive-dimensions";
import { TxtInput } from "../../components/gerenal/txtinput";
import { AppButton } from "../../components/gerenal/appButton";
import { colors, fontFamily} from "../../globals/utilities";

const ForgetPass = (props) => {
    const [email, setEmail] = useState('')
    const [pass, setPassword] = useState('')
    return (
        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'} />
            <Image style={styles.image} source={{ uri: 'https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?w=2000' }} />
            <View style={styles.wrapper}>
                <Text style={styles.loginText}>{'Forgot Password'}</Text>
                <Text style={styles.wrText}>{"Don't worry! It happens. Please Enter your Email associated with your account."}</Text>
                <TxtInput
                    iconName={'email'}
                    iconType={'entypo'}
                    MyStyles={styles.inputStyleView}
                    itsStyle={styles.inputStyle}
                    placeholder="Email"
                    onChangeText={text => setEmail(text)}
                />
                 <AppButton
                    title={'Submit'}
                    myStyles={styles.button}
                    itsTextstyle={styles.buttonText}
                    onPress={() => { props.navigation.navigate('Login')}}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",

    },
    image: {
        height: responsiveWidth(60),
        width: responsiveWidth(90),
        marginTop: responsiveHeight(6)
    },
    wrapper: {
        width: responsiveWidth(90),
        alignSelf: "center",
        marginTop: responsiveHeight(3)
    },
    inputStyleView: {
        width: responsiveWidth(90),
        alignSelf: "center",
        backgroundColor: 'transparent',
        borderBottomWidth: responsiveWidth(0.1)
    },
    inputStyle: {
        width: responsiveWidth(80),
        color: 'black'
    },
    loginText:{
        color: colors.black,
        fontFamily: fontFamily.appTextBold,
        fontSize: responsiveFontSize(2.2)
    },
    wrText:{
        fontFamily: fontFamily.appTextRegular,
        fontSize: responsiveFontSize(1.5),
        color:'black',
        marginVertical: responsiveHeight(1),
        lineHeight:responsiveFontSize(2.6)
    },
    button: {
        width: responsiveWidth(90),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: responsiveWidth(3),
        height: responsiveHeight(7),
        marginTop: responsiveHeight(6)
    },
    buttonText: {
        fontSize: responsiveFontSize(2),
        fontFamily: fontFamily.appTextMedium,
        color: colors.white
    },

});

export default ForgetPass;