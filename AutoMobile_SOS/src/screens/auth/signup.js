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
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { TxtInput } from "../../components/gerenal/txtinput";
import { AppButton } from "../../components/gerenal/appButton";
import { colors, fontFamily, Validations } from "../../globals/utilities/index";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState('')
  const [EmailError, setEmailError] = useState('');
  const [PasswordError, setpasswordError] = useState('');
  const [confPasswordError, setConfpasswordError] = useState('');
  const [pass, setPass] = useState(true)



  const handleOnChangeEmailText = email => {
    !email
      ? setEmailError('Please Enter Email')
      : !Validations.validateEmail(email)
        ? setEmailError('Email format is invalid')
        : setEmailError('');
    setEmail(email);
  };
  const handleOnChangePasswordText = password => {
    !password
      ? setpasswordError('Please enter password')
      : password.length < 6
        ? setpasswordError('Atleast 6 characters')
        : setpasswordError('');
    setPassword(password);
  };

  const handleonConfirmPassword = confPass => {
    !confPass
      ? setConfPass('Please Enter Confirm Password')
      : confPass.length < 6
        ? setConfpasswordError('confirm Password must be 6 characters')
        : confPass != password
          ? setConfpasswordError('Password must be same')
          : setConfpasswordError('')
    setConfPass(confPass)
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
    !confPass
      ? setConfpasswordError('Enter Confrim Password')
      : confPass !== password
        ? setConfpasswordError('Password must be same')
        : setConfpasswordError('')
    if (

      Validations.validateEmail(email) &&
<<<<<<< HEAD
      confPass == password
=======
      password.length > 6 &&
      confPass === password
>>>>>>> 5538ae8955c710f5004dd7093a07a60f095276af
    ) {
      return true;
    } else {
      return false;
    }
  };
  const navigation = () => {
    if (validations()) {
      props.navigation.navigate('ProfileRegister', { email: email, password: password,})
    }

  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'} />
      <Image style={styles.image} source={{ uri: 'https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?w=2000' }} />
      <View style={styles.wrapper}>
        <Text style={styles.Signup}>{'Signup'}</Text>

        <TxtInput
          iconName={'email'}
          iconType={'entypo'}
          MyStyles={styles.inputStyleView}
          itsStyle={styles.inputStyle}
          placeholder="Email"
          onChangeText={text => handleOnChangeEmailText(text)}
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
          placeholder="Password"
          onPress={() => setPass(!pass)}
          onChangeText={text => handleOnChangePasswordText(text)}
          error={PasswordError}
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
          placeholder=" Confrim Password"
          onPress={() => setPass(!pass)}
          onChangeText={text => handleonConfirmPassword(text)}
          error={confPasswordError}
        />
        <AppButton
          title={'Continue'}
          myStyles={styles.button}
          itsTextstyle={styles.buttonText}
          onPress={() => navigation()}
        />
      </View>

      <View style={styles.Style}>
        <Text style={
          styles.accountText
        }>Already have an account?
          <Text style={[styles.accountText, {
            color: colors.primary,
            fontFamily: fontFamily.appTextMedium
          }]}
            onPress={() => props.navigation.navigate('Login')}
          >   Login</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  image: {
    height: responsiveWidth(60),
    width: responsiveWidth(90),
    marginTop: responsiveHeight(6)
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

  SignupBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#7fffd4",
  },
  Style: {
    top: responsiveHeight(3),
    alignItems: "center",
    justifyContent: "center"

  },
  accountText: {
    color: "black",
    fontSize: responsiveFontSize(1.8),
    fontFamily: fontFamily.appTextRegular
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
  Signup: {
    color: colors.black,
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(2.2)
  }
});
export default Signup;
