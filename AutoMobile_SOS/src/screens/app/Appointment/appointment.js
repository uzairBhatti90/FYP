import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { colors } from 'react-native-elements';
import { fontFamily } from '../../../globals/utilities';
import { TxtInput } from "../../../components/gerenal/txtinput";
import { AppButton } from '../../../components/gerenal/appButton';
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth, responsiveWidth, } from 'react-native-responsive-dimensions';

const NotificationBox = ({ name, phone,vehicle }) => {
  return (
    <View style={styles.notificationBox}>
      <Text style={styles.notificationText}>Name: {name}</Text>
      <Text style={styles.notificationText}>Phone: {phone}</Text>
      <Text style={styles.notificationText}>Vehicle: {vehicle}</Text>
    </View>
  );
};
const AppointmentScreen = (props) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [issue, setIssue] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = () => {
    console.log(name, phone, vehicle, issue);
  };
  const handleFormSubmit = () => {
    setShowNotification(true);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Appointment</Text>
      <TxtInput
        iconName={'rename-box'}
        iconType={'material community'}
        MyStyles={styles.inputStyleView}
        itsStyle={styles.inputStyle}
        placeholder="Name"
        onChangeText={text => setName(text)}
      />
      <TxtInput
        iconName={'phone'}
        iconType={'ant design'}
        MyStyles={styles.inputStyleView}
        itsStyle={styles.inputStyle}
        placeholder="Phone"
        onChangeText={text => setPhone(text)}
      />
      <TxtInput
        iconName={'automobile'}
        iconType={'font-awesome'}
        MyStyles={styles.inputStyleView}
        itsStyle={styles.inputStyle}
        placeholder="Vehicle-name"
        onChangeText={text => setVehicle(text)}
      />
      <TxtInput
        iconName={'report-problem'}
        iconType={'material-icon'}
        MyStyles={styles.inputStyleView}
        itsStyle={styles.inputStyle}
        placeholder="Issue"
        onChangeText={text => setIssue(text)}
      />
      <View style={styles.textAreaContainer} >
        <TextInput
          style={styles.textArea}
          underlineColorAndroid="transparent"
          placeholder="Type what happens"
          placeholderTextColor="grey"
          numberOfLines={10}
          multiline={true}
        />
      </View>
      <View style={styles.Bview}>
        <AppButton
          title={'Submit'}
          myStyles={styles.button}
          itsTextstyle={styles.buttonText}
          onPress={() => { props.navigation.navigate('Home') }}
        />
        <AppButton
          title={'Cancel'}
          myStyles={styles.button}
          itsTextstyle={styles.buttonText}
          onPress={() => { props.navigation.navigate('Home') }}
        />
        {showNotification && (
          <NotificationBox
            name={name}
            phone={phone}
            vehicle={vehicle}
          />
        )}
      </View>
    </View>
  );
};

export default AppointmentScreen;


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
  textAreaContainer: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 5
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start"
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
  textStyle: {
    textAlign: 'center',
    fontSize: responsiveFontSize(3),
    color: 'gray',
    marginTop: responsiveHeight(3),
  },
  buttonText: {
    fontSize: responsiveFontSize(2),
    fontFamily: fontFamily.appTextMedium,
    color: colors.white
  },
  button: {
    width: responsiveWidth(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: responsiveWidth(3),
    height: responsiveHeight(7),
    marginTop: responsiveHeight(6),
    marginRight: responsiveHeight(3)
  },
  Bview: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  notificationBox: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  notificationText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },

});
