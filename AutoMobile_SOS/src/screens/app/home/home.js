import React, { useState } from 'react';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { AppButton } from "../../../components/gerenal/appButton/index";
import { TxtInput } from "../../../components/gerenal/txtinput/index";
import { colors, fontFamily } from "../../../globals/utilities/index";
import {Picker} from "@react-native-picker/picker"
import {
  View,
  Text,
  image,
  Image,
  StyleSheet,
  TouchableOpacity,
  Icon,
} from "react-native";


const Home = (props) => {
  const [Auto, setAuto] = useState("");
  const [Reg, setReg] = useState("");
  const [Model, setModel] = useState("");
  const [Bike, setBike] = useState("");
  const [Car, setCar] = useState("");
  const [Detail, setDetail] = useState("");
  const [Shop, setShop] = useState("");
  const [Address, setAddress] = useState("");
  const [Specialization, setSpecialize] = useState("");



  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text>
          Rider
        </Text>
         <View style={styles.imageAdd}>
          <TouchableOpacity style={styles.imageVIew} onPress={() => camera()}>
            {image === '' ? (
              <Image style={styles.image} source={appImages.user} />
            ) : (
              <Image style={styles.image2} source={{ uri: image }} />
            )}
          </TouchableOpacity>
          <View style={styles.iconPlus}>
            {image === '' ? (
              <View style={styles.backIcon}>
                <Icon
                  name={"pluscircle"}
                  type="antdesign"
                  size={responsiveFontSize(2.5)}
                  color={colors.primary} tvParallaxProperties={undefined}

                />
              </View>
            ) : (
              <View style={[styles.backIcon, { backgroundColor: colors.primary }]}>
                <Icon
                  name={"edit"}
                  type="material-icon"
                  size={responsiveFontSize(2.2)}
                  color={colors.white}

                />
              </View>
            )}
            </View>
            </View>
            */ for Rider*/
        <TxtInput
          MyStyles={styles.inputStyleView}
          itsStyle={styles.inputStyle}
          placeholder="Auto-name"
          onChangeText={text => setAuto(text)}
        />

       <TxtInput
          MyStyles={styles.inputStyleView}
          itsStyle={styles.inputStyle}
          placeholder="Reg-no"
          onChangeText={text => setReg(text)}
        />

       <TxtInput
          MyStyles={styles.inputStyleView}
          itsStyle={styles.inputStyle}
          placeholder="Model Variant"
          onChangeText={text => setModel(text)}
        />
        
        <Picker
        selectedValue={Car}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setCar(itemValue)}>
        <Picker.Item label="Less than 660cc" value=" 660cc" />
        <Picker.Item label="Equal to 2500cc" value="2500cc" />
        <Picker.Item label="greater than 2500cc" value="2500cc" 
        />
        if (Picker.item == "2500c") {
          <TxtInput
          MyStyles={styles.inputStyleView}
          itsStyle={styles.inputStyle}
          placeholder="Model Detail"
          onChangeText={text => setDetail(text)}
        />   
        }

      </Picker>
      <Picker
        selectedValue={Bike}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setBike(itemValue)}>
        <Picker.Item label="Less than 500cc" value=" 500cc" />
        <Picker.Item label="greater than 500cc" value="500cc" 
        />
        if (Picker.item == "5500c") {
          <TxtInput
          MyStyles={styles.inputStyleView}
          itsStyle={styles.inputStyle}
          placeholder="Model Detail"
          onChangeText={text => setDetail(text)}
        />   
        }

      </Picker>

      <AppButton>
          title={'Submit'}
          myStyles={styles.button}
          itsTextstyle={styles.buttonText}
          onPress={() => { props.navigation.navigate('Home') }}
          </AppButton>

          */ for Service Provider*/
        <TxtInput
          MyStyles={styles.inputStyleView}
          itsStyle={styles.inputStyle}
          placeholder="Shop-Name"
          onChangeText={text => setShop(text)}
        />

       <TxtInput
          MyStyles={styles.inputStyleView}
          itsStyle={styles.inputStyle}
          placeholder="Address"
          onChangeText={text => setAddress(text)}
        />

       <TxtInput
          MyStyles={styles.inputStyleView}
          itsStyle={styles.inputStyle}
          placeholder="Specialization"
          onChangeText={text => setSpecialize(text)}
        />
        
        <Picker
        selectedValue={Car}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setCar(itemValue)}>
        <Picker.Item label=" 660cc" value=" 660cc" />
        <Picker.Item label="greater than 660cc" value="660cc" />
        
        if (Picker.item == "greater than 660c") {
          <TxtInput
          MyStyles={styles.inputStyleView}
          itsStyle={styles.inputStyle}
          placeholder="How much"
          onChangeText={text => setDetail(text)}
        />   
        }

      </Picker>
      <Picker
        selectedValue={Bike}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setBike(itemValue)}>
        <Picker.Item label="70cc" value=" 70cc" />
        <Picker.Item label="greater than 70cc" value="70cc" 
        />
        if (Picker.item == "70c") {
          <TxtInput
          MyStyles={styles.inputStyleView}
          itsStyle={styles.inputStyle}
          placeholder="How much"
          onChangeText={text => setDetail(text)}
        />   
        }

      </Picker>

      <AppButton>
          title={'Submit'}
          myStyles={styles.button}
          itsTextstyle={styles.buttonText}
          onPress={() => { props.navigation.navigate('Home') }}
          </AppButton>

        <AppButton>
          title={'Search nearest spot'}
          myStyles={styles.button}
          itsTextstyle={styles.buttonText}
          onPress={() => { props.navigation.navigate('LocationStackScreens') }}
          </AppButton>
      </View>
    </View>
  )
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    marginTop: responsiveHeight(6),
    width: responsiveWidth(90),
    alignSelf: "center"
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
  imageAdd: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center"
  },
  iconPlus: {
    top: responsiveHeight(3),
    zIndex: 100,
    right: responsiveWidth(6),
    backgroundColor: "white",
    borderRadius: responsiveWidth(7),
    width: responsiveWidth(7),
    height: responsiveWidth(7),
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    height: responsiveWidth(6),
    width: responsiveWidth(6),
    resizeMode: 'contain'
  },
  image2: {
    width: responsiveWidth(22),
    height: responsiveWidth(22),
    borderRadius: responsiveWidth(22),
    // resizeMode: 'contain'
  },
  imageVIew: {
    backgroundColor: "#F1F6FA",
    width: responsiveWidth(22),
    height: responsiveWidth(22),
    borderRadius: responsiveWidth(22),
    alignItems: "center",
    justifyContent: "center"
  },
});
export default Home;
