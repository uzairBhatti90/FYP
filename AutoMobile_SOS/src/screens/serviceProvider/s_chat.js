import React from 'react';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { colors, fontFamily } from "../../globals/utilities/index";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { s_chat } from './screenName';

const s_chat = (props) => {
 return (
    <View style={styles.container}>
        <Text>Service Provider Chat</Text>
      
    </View>
  )
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
 

});
export default s_chat;
