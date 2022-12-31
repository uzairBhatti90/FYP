import React, {Component, usestate} from 'react';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { AppButton } from "../../components/gerenal/appButton";
import { TxtInput } from "../../components/gerenal/txtinput";
import { colors, fontFamily } from "../../globals/utilities";
import {
View,
Text,
Button,
TouchableOpacity,
}from "react-native";


const Home = props => {
  const [Auto, setAuto] = useState("");
    return (
        <View>
          <Text>
            Rider
          </Text>

          <AppButton
                    title={'Search nearest spot'}
                    myStyles={styles.button}
                    itsTextstyle={styles.buttonText}
                    onPress={() => { props.navigation.navigate('Location')}}
                />
                 <TxtInput
                    MyStyles={styles.inputStyleView}
                    itsStyle={styles.inputStyle}
                    placeholder="Auto-name"
                    onChangeText={text => setAuto(text)}
                />
        </View>
  )
};

export default Home;


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#fff",
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

