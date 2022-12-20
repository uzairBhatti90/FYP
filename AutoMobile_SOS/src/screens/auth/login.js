import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    StatusBar
} from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { AppButton } from "../../components/gerenal/appButton";
import { TxtInput } from "../../components/gerenal/txtinput";
import { colors, fontFamily } from "../../globals/utilities";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pass, setPass] = useState(true)

    return (
        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'} />
            <Image style={styles.image} source={{ uri: 'https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?w=2000' }} />
            <View style={styles.wrapper}>
                <Text style={styles.loginText}>{'Login'}</Text>
                <TxtInput
                    iconName={'email'}
                    iconType={'entypo'}
                    MyStyles={styles.inputStyleView}
                    itsStyle={styles.inputStyle}
                    placeholder="Email"
                    onChangeText={text => setEmail(text)}
                />
                <TxtInput
                    iconName={'lock'}
                    iconType={'evil-icon'}
                    right={true}
                    PassName={pass === true ? 'eye-off' : "eye"}
                    PassType={'feather'}
                    MyStyles={[styles.inputStyleView, {
                        marginTop: responsiveHeight(2)
                    }]}
                    secureTextEntry={pass}
                    itsStyle={[styles.inputStyle, { width: responsiveWidth(72) }]}
                    placeholder="Password"
                    onPress={() => setPass(!pass)}
                    onChangeText={text => setPassword(text)}
                />
                <TouchableOpacity style={styles.forgotView}>
                    <Text style={styles.forgot_button}
                        onPress={() => props.navigation.navigate('ForgetPass')}
                    >Forgot Password?</Text>
                </TouchableOpacity>
                <AppButton
                    title={'Login'}
                    myStyles={styles.button}
                    itsTextstyle={styles.buttonText}
                    onPress={() => { }}
                />
            </View>
            <View style={styles.dontStyle}>
                <Text style={
                    styles.accountText
                }>New to AutoMobile SOS?
                    <Text style={[styles.accountText, {
                        color: colors.primary
                    }]}
                        onPress={() => props.navigation.navigate('Signup')}
                    >   Signup</Text>
                </Text>
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
    dontStyle: {
        top: 50,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center"
    },
    accountText: {
        color: "black",
        fontSize: responsiveFontSize(1.8),
        fontFamily: fontFamily.appTextRegular
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
    wrapper: {
        width: responsiveWidth(90),
        alignSelf: "center",
        marginTop: responsiveHeight(8),
    },
    forgotView: {
        alignItems: "flex-end",
        marginTop: responsiveHeight(2)
    },
    forgot_button: {
        color: colors.primary
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
    loginText:{
        color: colors.black,
        fontFamily: fontFamily.appTextBold,
        fontSize: responsiveFontSize(2.2)
    }
});
export default Login;
