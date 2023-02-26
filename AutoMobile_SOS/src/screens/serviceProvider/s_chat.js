import React from 'react';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { colors, fontFamily } from "../../globals/utilities/index";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

const S_Chat = (props) => {
  return (
    <View style={styles.container}>
      <Text>Service Provider Chat</Text>

    </View>
  )
};
export default S_Chat




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },


});
