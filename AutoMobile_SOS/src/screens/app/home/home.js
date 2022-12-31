import React, { Component, useState } from 'react';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { AppButton } from '../../../components/gerenal/appButton/index';
import { TxtInput } from "../../../components/gerenal/txtinput/index";
import { colors, fontFamily } from '../../../globals/utilities/index';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";

const Home = props => {
  const [Auto, setAuto] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text>
          Rider
        </Text>
        <TxtInput
          MyStyles={styles.inputStyleView}
          itsStyle={styles.inputStyle}
          placeholder="Auto-name"
          onChangeText={text => setAuto(text)}
        />
       

        <AppButton
          title={'Search nearest spot'}
          myStyles={styles.button}
          itsTextstyle={styles.buttonText}
          onPress={() => { props.navigation.navigate('LocationStackScreens') }}
        />
      
      </View>
    </View>
  )
};

export default Home;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    marginTop: responsiveHeight(6),
    width: responsiveWidth(90),
    alignSelf: "center"
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

