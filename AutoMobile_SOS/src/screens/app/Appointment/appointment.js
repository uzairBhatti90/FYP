import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { colors } from 'react-native-elements';
import { fontFamily } from '../../../globals/utilities';
import { TxtInput } from "../../../components/gerenal/txtinput";
import { AppButton } from '../../../components/gerenal/appButton';
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth, responsiveWidth, } from 'react-native-responsive-dimensions';

const NotificationBox = ({ name, phone, vehicle }) => {
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
        iconName={'person'}
        iconType={'ion-icons'}
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
          placeholder="What happens"
          placeholderTextColor="grey"
          numberOfLines={10}
          multiline={true}
        />
      </View>
      <View style={styles.Bview}>
        <AppButton
          title={'Save'}
          myStyles={styles.button2}
          itsTextstyle={styles.buttonText}
        />
        <AppButton
          title={'Cancel'}
          myStyles={styles.button2}
          itsTextstyle={styles.buttonText}
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
    marginTop: responsiveHeight(10)
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
    marginTop: responsiveHeight(10),
    marginBottom: responsiveHeight(3)
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button2: {
    width: responsiveWidth(45),
    height: responsiveHeight(6),
    borderTopRightRadius: responsiveWidth(1),
    borderBottomLeftRadius: responsiveWidth(1),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start"
  },
  Bview: {
    flexDirection: "row",
    justifyContent: "space-around",
    justifyContent: 'space-between',
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
