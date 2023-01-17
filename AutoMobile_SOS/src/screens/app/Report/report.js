import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { AppButton } from '../../../components/gerenal/appButton';
import { TxtInput } from '../../../components/gerenal/txtinput';
import { colors } from '../../../globals/utilities';
import { fontFamily } from '../../../globals/utilities';

const ReportScreen = () => {
  const [riderName, setRiderName] = useState('');
  const [automobileName, setAutomobileName] = useState('');
  const [serviceProvider, setServiceProvider] = useState('');
  const [experience, setExperience] = useState('');

  const handleSubmit = () => {
    console.log(riderName, automobileName, serviceProvider, experience);
  };

  return (
    <View style={styles.container}>
      <Text style= {styles.Tstyle}>Report</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
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
Tstyle:{
  fontSize:  responsiveFontSize(3.7),
  color: 'gray',
  alignItems:'center',
  marginTop: responsiveHeight(5),
  marginLeft: responsiveHeight(15)



}
});

export default ReportScreen;