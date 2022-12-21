import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  RadioButton
} from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { AppButton } from "../../components/gerenal/appButton";
import { TxtInput } from "../../components/gerenal/txtinput";
import { colors, fontFamily } from "../../globals/utilities";

const ProfileRegister = (props) => {

  const [fullname, setFullName] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  const [checked, setChecked] = useState('')

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'} />
      <Image style={styles.image} source={{ uri: 'https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?w=2000' }} />



      <TxtInput
        iconName={'user'}
        iconType={'antdesign'}
        MyStyles={styles.inputStyleView}
        itsStyle={styles.inputStyle}
        placeholder="Full Name"
        onChangeText={text => setFullName(text)}
      />

      <TxtInput
        iconName={'phone'}
        iconType={'feather'}
        MyStyles={styles.inputStyleView}
        itsStyle={styles.inputStyle}
        placeholder="Phone Number"
        keyboardType={'numeric'}
        maxLength={12}
        onChangeText={text => setMobileNo(text)}
      />

      <RadioButton
        value="Service Provider"
        status={checked === 'service' ? 'checked' : 'unchecked'}
        onPress={() => setChecked('service')}
      />

      <RadioButton
        value="Rider"
        status={checked === 'Rider' ? 'checked' : 'unchecked'}
        onPress={() => setChecked('Rider')}
      />

      <RadioButton
        value="Driver"
        status={checked === 'Driver' ? 'checked' : 'unchecked'}
        onPress={() => setChecked('Driver')}
      />

      <AppButton
        title={'Continue'}
        myStyles={styles.button}
        itsTextstyle={styles.buttonText}
        onPress={() => props.navigation.navigate('Login')}
      />
    </View>


  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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
    color: 'black'
  },

  Style: {
    top: responsiveHeight(3),
    alignItems: "center",
    justifyContent: "center"

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
});

export default ProfileRegister