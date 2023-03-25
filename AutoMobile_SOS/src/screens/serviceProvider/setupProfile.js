import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, RadioButton, ScrollView } from "react-native"
import { Button, Icon } from "react-native-elements";
import { AppButton } from "../../../components/gerenal/appButton";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { colors, fontFamily } from "../../globals/utilities";
import { TxtInput } from "../../components/gerenal/txtinput";



const S_SetupProfile = (props) => {
  const [engineCapacity, setEngineCapacity] = useState('800cc');
  const [Auto, setAuto] = useState("");
  const [type, setAutotype] = useState("");
  const [car, setCar] = useState(false)
  const [Bike, setBike] = useState("");
  const [Company, setcompany] = useState("");
  const [flag, setFlag] = useState(false)
  const [engineCapacityValue, setEngineCapacityValue] = useState('');

  const handleEngineCapacityChange = (value) => {
    setEngineCapacity(value);
    setEngineCapacityValue('');
  }
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
          <Text style={styles.textstyle}>Profile Setup</Text>
          <Icon
            name="arrowleft"
            type="ant-design"
            size={responsiveFontSize(2.5)}
            color={colors.primary}
          />
        </View>
      </View>
      <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
      <View style={styles.checkView}>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setFlag(false)}
          >
            <View style={flag === false ? styles.selected : styles.unselected} />
            <Text style={styles.Ctext}>Car</Text>
          </TouchableOpacity><TouchableOpacity
            style={styles.radioButton}
            onPress={() => setFlag(true)}
          >
            <View style={flag === true ? styles.selected : styles.unselected} />
            <Text style={styles.Ctext}>Bikes</Text>
          </TouchableOpacity>
        </View>

        {/* if user have a car, flag will be false */}
        {flag === false ? (
          <>
            <Text style={styles.Carstyle}>Need Information for your Car's Expertise</Text>
            <TxtInput
              iconName={'car'}
              iconType={'fontisto'}
              MyStyles={styles.inputStyleView}
              itsStyle={styles.inputStyle}
              placeholder="Auto-name"
              onChangeText={text => setAuto(text)}
            />
            <TxtInput
              iconName={'car'}
              iconType={'fontisto'}
              MyStyles={styles.inputStyleView}
              itsStyle={styles.inputStyle}
              placeholder="Auto-Company"
              onChangeText={text => setAutotype(text)}
            />
            <Text style={styles.Tstyle}>Engine Capacity:</Text>
            <View style={styles.radioContainer}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setCar(false)}
              >
                <View style={car == false ? styles.selected : styles.unselected} />
                <Text style={styles.Ctext}>660 cc</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setCar(true)}
              >
                <View style={car == true ? styles.selected : styles.unselected} />
                <Text style={styles.Btext}>Above 800 cc</Text>
              </TouchableOpacity>
            </View>
            {car == true && (
              <View>
                <TextInput
                  placeholder="Enter Engine Capacity"
                  value={engineCapacityValue}
                  onChangeText={(value) => setEngineCapacityValue(value)}
                  style={styles.textInput}
                />
              </View>
            )}

          </>
        ) : (
          <>
            <Text style={styles.Carstyle}>Need Information for your Bike's Expertise</Text>
            <TxtInput
              iconName={'bike'}
              iconType={'material-community'}
              MyStyles={styles.inputStyleView}
              itsStyle={styles.inputStyle}
              placeholder="Bike Name"
              onChangeText={text => setAuto(text)}
            />
            <TxtInput
              iconName={'bike'}
              iconType={'material-community'}
              MyStyles={styles.inputStyleView}
              itsStyle={styles.inputStyle}
              placeholder="Auto-Company"
              onChangeText={text => setAutotype(text)}
            />
            <Text style={styles.Tstyle}>Engine Capacity:</Text>
            <View style={styles.radioContainer}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setCar(false)}
              >
                <View style={car == false ? styles.selected : styles.unselected} />
                <Text style={styles.Ctext}>70</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setCar(true)}
              >
                <View style={car == true ? styles.selected : styles.unselected} />
                <Text style={styles.Btext}>above 70 cc</Text>
              </TouchableOpacity>
            </View>
            {car == true && (
              <View>
                <TextInput
                  placeholder="Enter Engine Capacity"
                  value={engineCapacityValue}
                  onChangeText={(value) => setEngineCapacityValue(value)}
                  style={styles.textInput}
                />
              </View>
            )}
          </>
        )}
      </ScrollView>

    </View>

  )
}
export default S_SetupProfile;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  Carstyle: {
    fontSize: responsiveFontSize(3.5),
    marginTop: responsiveHeight(3),
    marginLeft: responsiveHeight(2.5),
    color: 'gray',
  },
  textstyle: {
    fontFamily: fontFamily.appTextMedium,
    fontSize: responsiveFontSize(2),
    color: 'white',
    alignSelf: 'center',
    flexDirection:"row",
    alignItems:"center"

  },
  inputStyleView: {
    width: responsiveWidth(80),
    alignSelf: "center",
    backgroundColor: 'transparent',
    borderBottomWidth: responsiveWidth(0.1)
  },
  inputStyle: {
    width: responsiveWidth(80),
    color: 'black',
    height: responsiveHeight(6.5)
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(2.5),
    marginLeft: responsiveHeight(3.2)
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: responsiveHeight(6)
  },
  selected: {
    width: responsiveWidth(5),
    height: responsiveHeight(2.5),
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.primary
  },
  unselected: {
    width: responsiveWidth(5),
    height: responsiveHeight(2.5),
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  textInput: {
    marginLeft: 25,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    width: responsiveWidth(75),
    marginTop: responsiveHeight(3)
  },
  Tstyle: {
    marginTop: responsiveHeight(3),
    fontSize: responsiveFontSize(2.7),
    justifyContent: "center",
    marginLeft: responsiveHeight(3),
    color: 'grey',
  },
  Ctext: {
    marginLeft: responsiveHeight(0.5),
    fontSize: responsiveFontSize(2),
  },
  Bikestyle: {
    fontSize: responsiveFontSize(3.5),
    marginTop: responsiveHeight(5),
    marginLeft: responsiveHeight(2.5),
    color: 'gray',
  },
  Btext: {
    marginLeft: responsiveHeight(0.5),
    fontSize: responsiveFontSize(2),
  },
  mainHeader: {
    backgroundColor: colors.primary
  },
  innerHeader: {
    marginTop: responsiveHeight(6),
    marginBottom: responsiveHeight(2),
    flexDirection: "row",
    justifyContent: "space-between",
    width: responsiveWidth(90),
    alignSelf: "center",
    alignItems: "center"
  },
  wrapper: {
    width: responsiveWidth(90),
    alignSelf: "center"
  },
  checkView: {
    flexDirection: "row",
    marginTop: responsiveHeight(3),
    alignItems: "center"
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: responsiveHeight(6)
  },
  Ctext: {
    marginLeft: responsiveHeight(1),
    fontSize: responsiveFontSize(2),
  },


  

})