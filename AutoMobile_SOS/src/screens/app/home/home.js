import React, { useState } from 'react';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
// import { AppButton } from "../../../components/gerenal/appButton/index";
// import { TxtInput } from "../../../components/gerenal/txtinput/index";
import { colors, fontFamily } from "../../../globals/utilities/index";
import {
  View,
  Text,
  image,
  Image,
  StyleSheet,
  TouchableOpacity,
  Icon,
} from "react-native";
import { LocationCard, SetupCard } from '../../../components/feeds/setUpCard';
import { ReportCard } from '../../../components/feeds/reportCard/index';
import { AppointmentCard } from '../../../components/feeds/Appointment';
import { CategoriesCard } from '../../../components/feeds/Categories/categories';

const Home = (props) => {
  const [option, setOption] = useState('Rider')



  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <SetupCard
          title={'Setup Your Profile'}
          onPress={() => { props.navigation.navigate('SetupProfile') }}
        />
        {/*  <View style={styles.imageAdd}>
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


        <AppButton
          title={'Submit'}
          myStyles={styles.button}
          itsTextstyle={styles.buttonText}
          onPress={() => { props.navigation.navigate('Home') }} />



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
        />*/}
        <LocationCard

          onPress={() => { props.navigation.navigate('LocationStackScreens') }} />
        <ReportCard
          onPress={() => props.navigation.navigate('ReportStackScreens')}
        />
        <AppointmentCard
          onPress={() => props.navigation.navigate('AppointmentStackScreens')}

        />
        <CategoriesCard />

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
