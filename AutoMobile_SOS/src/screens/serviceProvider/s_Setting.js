import React from 'react';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { colors, fontFamily } from "../../globals/utilities/index";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { s_Setting } from './screenName';

const s_Setting = (props) => {
 return (
    <View style={styles.container}>
        <Text>Service Provider Setting</Text>
      
    </View>
  )
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
 

});
export default s_Setting;
