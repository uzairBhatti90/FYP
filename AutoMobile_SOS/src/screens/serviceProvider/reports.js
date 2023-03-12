import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { AppButton } from '../../components/gerenal/appButton';
import { TxtInput } from '../../components/gerenal/txtinput';
import { colors } from '../../globals/utilities';
import { Button, Icon } from "react-native-elements";
import { fontFamily } from '../../globals/utilities';

const Report = () => {
  const [riderName, setRiderName] = useState('');
  const [automobileName, setAutomobileName] = useState('');
  const [serviceProvider, setServiceProvider] = useState('');
  const [experience, setExperience] = useState('');

  const handleSubmit = () => {
    console.log(riderName, automobileName, serviceProvider, experience);
  };

  return (
    <View style={styles.container}>
            <View style={styles.mainHeader}>
        <View style={styles.innerHeader}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Icon
              name="arrowleft"
              type="ant-design"
              size={responsiveFontSize(2.5)}
              color={'white'}
            />
          </TouchableOpacity>
      <Text style= {styles.Tstyle}>Report</Text>
      <Icon
            name="arrowleft"
            type="ant-design"
            size={responsiveFontSize(2.5)}
            color={colors.primary}
          />
        </View>
      </View>
      <TxtInput
        iconName={'drive-file-rename-outline'}
        iconType={'material-icon'}
        MyStyles={styles.inputStyleView}
        itsStyle={styles.inputStyle}
        placeholder="Rider-name"
        onChangeText={text => setRiderName(text)}
      />
      <TxtInput
        iconName={'automobile'}
        iconType={'font-awesome'}
        MyStyles={styles.inputStyleView}
        itsStyle={styles.inputStyle}
        placeholder="Automobile-name"
        onChangeText={text => setAutomobileName(text)}
      />
      <TxtInput
        iconName={'person'}
        iconType={'ionicons'}
        MyStyles={styles.inputStyleView}
        itsStyle={styles.inputStyle}
        placeholder="Service Provider-name"
        onChangeText={text => setServiceProvider(text)}
      />
      <TxtInput
        iconName={'work-outline'}
        iconType={'material-icons'}
        MyStyles={styles.inputStyleView}
        itsStyle={styles.inputStyle}
        placeholder="Experience"
        onChangeText={text => setExperience(text)}
      />
      <AppButton
        title={'Submit'}
        myStyles={styles.button}
        itsTextstyle={styles.buttonText}
        onPress={() => { props.navigation.navigate('App') }}
      />    
      </View>
  );
};
export default Report;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: responsiveWidth(100),
   
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    
  },
  inputStyleView: {
    width: responsiveWidth(90),
    marginTop:responsiveHeight(2),
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
Tstyle:{
  fontFamily: fontFamily.appTextMedium,
  fontSize:  responsiveFontSize(2),
  color: 'white',
  alignItems:'center',
  marginTop: responsiveHeight(3),
  marginLeft: responsiveHeight(15),
  marginRight: responsiveHeight(15)
},
mainHeader: {
  backgroundColor: colors.primary,
  marginBottom: responsiveHeight(5)
},
innerHeader: {
  marginTop: responsiveHeight(3),
  marginBottom: responsiveHeight(1),
  flexDirection: "row",
  justifyContent: "space-between",
  width: responsiveWidth(90),
  alignSelf: "center",
  alignItems: "center"
},
});

