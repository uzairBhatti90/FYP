import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  TouchableOpacity
} from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { RadioBtn } from "../../components/feeds/radioButton";
import { AppButton } from "../../components/gerenal/appButton";
import { TxtInput } from "../../components/gerenal/txtinput";
import { colors, fontFamily, appImages } from "../../globals/utilities";
import { Icon } from "react-native-elements";




const ProfileRegister = props => {

  const [fullname, setFullName] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  const [image, setImage] = useState('')
  const [checked, setChecked] = useState(true)
  const [rider, setRider] = useState(false)
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'} />
      <Image style={styles.imageuri} source={{ uri: 'https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?w=2000' }} />
      <View style={styles.wrapper}>
        <View style={styles.imageAdd}>
          <TouchableOpacity style={styles.imageVIew} onPress={() => camera()}>
            {image === '' ? (
              <Image style={styles.image} source={appImages.user} />
            ) : (
              <Image style={styles.image2} source={{ uri: image }} />
            )}
          </TouchableOpacity>
          <View style={styles.iconPlus}>
            {image === '' ? (
              <View style={styles.backIcon}>
                <Icon
                  name={"pluscircle"}
                  type="antdesign"
                  size={responsiveFontSize(2.5)}
                  color={colors.primary} tvParallaxProperties={undefined}

                />
              </View>
            ) : (
              <View style={[styles.backIcon, { backgroundColor: colors.primary }]}>
                <Icon
                  name={"edit"}
                  type="material-icon"
                  size={responsiveFontSize(2.2)}
                  color={colors.white}

                />
              </View>
            )}
          </View>
        </View>
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
        <View style={styles.radioView}>
          <RadioBtn
            checked={checked}
            onPress={() => {
              setChecked(true)
              setRider(false)
            }}
            title={'Service Provider'}
          />
          <RadioBtn
            checked={rider}
            onPress={() => {
              setChecked(!checked)
              setRider(true)
            }}
            title={'Rider'}
            myRadioStyle={styles.RiderRadio}
          />
        </View>
      </View>
      <AppButton
        title={'Signup'}
        myStyles={styles.button}
        itsTextstyle={styles.buttonText}
        onPress={() => props.navigation.navigate('Login')}
      />
    </View>

  )
}
export default ProfileRegister


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
  imageuri: {
    height: responsiveWidth(60),
    width: responsiveWidth(90),
    marginTop: responsiveHeight(6)
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
  radioView: {
    marginVertical: responsiveHeight(2),
    flexDirection: "row",
  },
  RiderRadio: {
    marginLeft: responsiveWidth(5)
  },
  imageAdd: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center"
  },
  iconPlus: {
    top: responsiveHeight(3),
    zIndex: 100,
    right: responsiveWidth(6),
    backgroundColor: "white",
    borderRadius: responsiveWidth(7),
    width: responsiveWidth(7),
    height: responsiveWidth(7),
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    height: responsiveWidth(6),
    width: responsiveWidth(6),
    resizeMode: 'contain'
  },
  image2: {
    width: responsiveWidth(22),
    height: responsiveWidth(22),
    borderRadius: responsiveWidth(22),
    // resizeMode: 'contain'
  },
  imageVIew: {
    backgroundColor: "#F1F6FA",
    width: responsiveWidth(22),
    height: responsiveWidth(22),
    borderRadius: responsiveWidth(22),
    alignItems: "center",
    justifyContent: "center"
  },
});
