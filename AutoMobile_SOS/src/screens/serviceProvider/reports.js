import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { AppButton } from '../../components/gerenal/appButton';
import { TxtInput } from '../../components/gerenal/txtinput';
import { colors } from '../../globals/utilities';
import { fontFamily } from '../../globals/utilities';
import { Header } from '../../components/feeds/header';
import { getCurrentUserId } from '../../services/Backend/auth'
import { addToArray, getData } from '../../services/Backend/utility'
import Toast from 'react-native-simple-toast'

const Report = ({ navigation, route }) => {
  const { item } = route.params
  const [riderName, setRiderName] = useState('');
  const [automobileName, setAutomobileName] = useState('');
  const [experience, setExperience] = useState('');
  const [Price, setPrice] = useState('');
  const [loading, setLoading] = useState(false)


  const handleSubmit = () => {
    console.log(riderName, automobileName, experience);
  };

  const generateReport = async () => {
    if (riderName.length < 2) {
      Toast.show('Please Enter Rider Name', Toast.LONG)
    } else if (automobileName < 4) {
      Toast.show("Please Enter correct auto registration number", Toast.LONG)
    } else if (experience.length < 2) {
      Toast.show('Please Enter your experience', Toast.LONG)
    } else if (Price.length < 2) {
      Toast.show("Please Enter your Price", Toast.SHORT)
    }
    else {
      setLoading(true)
      let uid = await getCurrentUserId()
      let shopUser = await getData('userData', uid)
      const currentUser = await getData('userData', item.userID)
      let obj = {
        shopData: item.shopData,
        slotTime: item.slotTime,
        slotDate: item.slotDate,
        selectService: item.selectService,
        price: Price,
        automobilenum: automobileName,
        rider: {
          userId: currentUser.userID,
          username: currentUser.name,
          photo: currentUser.image
        },
        createAt: Date.now(),
        report: true

      }
      let obj2 = {
        shopData: item.shopData,
        slotTime: item.slotTime,
        slotDate: item.slotDate,
        selectService: item.selectService,
        price: Price,
        automobilenum: automobileName,
        rider: {
          userId: shopUser.userID,
          username: shopUser.name,
          photo: shopUser.image
        },
        createAt: Date.now(),
        report: true

      }
      await addToArray('Reports', uid, 'arr', obj).then(async () => {
        await addToArray("Reports", currentUser.userID, 'arr', obj2)
      }).then(() => {
        Toast.show("Report Generated", Toast.LONG)
        navigation.navigate('S_Home')
      }).catch(err => console.log(err)).finally(() => setLoading(false))
    }
  }


  return (
    <View style={styles.container}>
      <Header
        onPress={() => props.navigation.goBack()}
        title={'Report'}
      />

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
        placeholder="Automobile Number"
        onChangeText={text => setAutomobileName(text)}
      />
      <TxtInput
        iconName={'work-outline'}
        iconType={'material-icons'}
        MyStyles={styles.inputStyleView}
        itsStyle={styles.inputStyle}
        placeholder="Experience"
        onChangeText={text => setExperience(text)}
      />
      <TxtInput
        iconName={'dollar'}
        iconType={'fontisto'}
        MyStyles={styles.inputStyleView}
        itsStyle={styles.inputStyle}
        placeholder="Price"
        onChangeText={text => setPrice(text)}
      />
      <AppButton
        activity={loading}
        title={'Submit'}
        myStyles={styles.button}
        itsTextstyle={styles.buttonText}
        onPress={() => { generateReport() }}
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
    marginTop: responsiveHeight(2),
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

