import React, { useState, useContext } from "react";
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
import { colors, fontFamily, Validations } from "../../globals/utilities";
import { getCurrentUserId, signInWithEmail } from "../../services/Backend/auth";
import { getData } from "../../services/Backend/utility";
import Rnauth from "@react-native-firebase/auth";
import Toast from 'react-native-simple-toast'
import authContext from '../../context/auth/authContext'
import { _storeData } from "../../services/Backend/AsyncFuncs";
const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pass, setPass] = useState(true)
    const [EmailError, setEmailError] = useState('')
    const [loading, setLoading] = useState(false)
    const [PasswordError, setpasswordError] = useState('')
    const AuthContext = useContext(authContext)
    const { addAuth } = AuthContext


    const handleEmail = (email) => {
        !email
            ? setEmailError('Please Enter Email')
            : !Validations.validateEmail(email)
                ? setEmailError('Email format is invalid')
                : setEmailError('');
        setEmail(email);
    }

    const handlePass = (pass) => {
        !pass
            ? setpasswordError('Please enter password')
            : pass.length < 6
                ? setpasswordError('Atleast 6 characters')
                : setpasswordError('');
        setPassword(pass);
    }

    const validations = () => {
        !email
            ? setEmailError('Enter Your Email')
            : !Validations.validateEmail(email)
                ? setEmailError('Email format is invalid')
                : setEmailError('');
        !password
            ? setpasswordError('Enter Your Password')
            : password.length < 6
                ? setpasswordError('Atleast 6 characters')
                : setpasswordError('');

        if (
            Validations.validateEmail(email) &&
            password.length > 6
        ) {
            return true;
        } else {
            return false;
        }
    };

    const navigation = async () => {
        setLoading(true)
        if (validations()) {
            Rnauth().signInWithEmailAndPassword(email, password).then(async user => {
                console.log(user, ">>>>>");
                if (user != {}) {
                    let uid = await getCurrentUserId()
                    console.log(uid);
                    await getData('userData', uid).then(async data => {
                        console.log(data, ".....<<<<");
                        if (data.category == 'Provider') {
                            const { category, userID } = data
                            addAuth(userID, category)
                            _storeData('userData', JSON.stringify({ userID, category }))
                            Toast.show('Login Successfully', Toast.LONG)
                            props.navigation.navigate('Provider')
                        } else if (data.category == 'Rider') {
                            const { category, userID } = data
                            console.log(category, userID);
                            addAuth(userID, category)

                            _storeData('userData', JSON.stringify({ userID, category }))
                            Toast.show('Login Successfully', Toast.LONG)
                            props.navigation.navigate('App')
                        }
                    })
                }
            }).catch(error => {
                console.log(error.code, ">>>>>");
                if (error.code === 'auth/user-not-found') {
                    Toast.show("Incorrect Email", Toast.LONG)
                } else if (error.code === 'auth/wrong-password') {

                    Toast.show("Incorrect Password", Toast.LONG)
                }
            }).finally(() => setLoading(false))
        }
    }


    return (
        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'} />
            <Image style={styles.image} source={{ uri: 'https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?w=2000' }} />
            <View style={styles.wrapper}>
                <Text style={styles.loginText}>{'Login'}</Text>
                <TxtInput
                    iconName={'email'}
                    iconType={'fontisto'}
                    MyStyles={styles.inputStyleView}
                    itsStyle={styles.inputStyle}
                    placeholder="Email"
                    onChangeText={text => handleEmail(text)}
                    error={EmailError}
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
                    placeholder="Pass"
                    onPress={() => setPass(!pass)}
                    onChangeText={text => handlePass(text)}
                    error={PasswordError}
                />
                <TouchableOpacity style={styles.forgotView}>
                    <Text style={styles.forgot_button}
                        onPress={() => props.navigation.navigate('ForgetPass')}
                    >Forgot Password?</Text>
                </TouchableOpacity>
                <AppButton
                    activity={loading}
                    title={'Login'}
                    myStyles={styles.button}
                    itsTextstyle={styles.buttonText}
                    onPress={() => { navigation() }}
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
        marginTop: responsiveHeight(6),
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
        color: 'black',
        height: responsiveHeight(5.5)
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
    loginText: {
        color: colors.black,
        fontFamily: fontFamily.appTextBold,
        fontSize: responsiveFontSize(2.2)
    }
});
export default Login;
