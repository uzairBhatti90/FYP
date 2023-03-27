import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, RadioButton, ScrollView, PermissionsAndroid, Platform } from "react-native"
import { Button, Icon } from "react-native-elements";
import { AppButton } from "../../components/gerenal/appButton";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { colors, fontFamily } from "../../globals/utilities";
import { TxtInput } from "../../components/gerenal/txtinput";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  PROVIDER_DEFAULT,
} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Spinner from 'react-native-spinkit';



const S_SetupProfile = (props) => {
  const [engineCapacity, setEngineCapacity] = useState('800cc');
  const [Auto, setAuto] = useState("");
  const [type, setAutotype] = useState("");
  const [car, setCar] = useState(false)
  const [Bike, setBike] = useState("");
  const [Company, setcompany] = useState("");
  const [flag, setFlag] = useState(false)
  const [engineCapacityValue, setEngineCapacityValue] = useState('');
  const [shopName, setShopName] = useState('');


  const [permission, setPermission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    getCurrentLocation();
  }, []);
  const getCurrentLocation = async () => {
    try {
      if (Platform.OS === 'ios') {
        await Geolocation.requestAuthorization('whenInUse');
      }

      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      }
      return Geolocation.getCurrentPosition(
        async position => {
          console.log(position);
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setRegion({
            ...region,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLoading(false);
        },
        error => {
          console.log(error.code, error.message);
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 15000 },
      );
    } catch (error) {
      console.log(error);
    }
  };

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
        <View style={styles.container2}>
          {longitude != '' && latitude != '' ? (
            <>
              <MapView
                provider={
                  Platform.OS === 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE
                }
                style={styles.map}
                zoomEnabled={true}
                maxZoomLevel={50}
                initialRegion={region}>
                <Marker key={1} coordinate={region} />
              </MapView>
            </>
          ) : (
            <Spinner
              type="Pulse"
              size={responsiveFontSize(5)}
              color={colors.PROVIDER_DEFAULT}
            />
          )}
        </View>
        <View style={styles.input}>
          <TxtInput
            iconName={'drive-file-rename-outline'}
            iconType={'material-icon'}
            MyStyles={styles.inputStyleView}
            itsStyle={styles.inputStyle}
            placeholder="Shop-name"
            onChangeText={text => setShopName(text)}
          />
        </View>

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


        <AppButton
          title={'Save'}
          myStyles={styles.button}
          itsTextstyle={styles.buttonText}
          onPress={() => { props.navigation.navigate('App') }}
        />
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
    flexDirection: "row",
    alignItems: "center"

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
    alignSelf: "center",
  },
  checkView: {
    flexDirection: "row",
    marginTop: responsiveHeight(3),
    alignItems: "center",
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: responsiveHeight(16)
  },
  Ctext: {
    marginLeft: responsiveHeight(1),
    fontSize: responsiveFontSize(2),
  },
  container2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: responsiveWidth(90),
    height: responsiveHeight(40),
    marginTop: responsiveHeight(1)
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  iconView: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: responsiveWidth(15),
    position: 'absolute',
    top: responsiveHeight(8),
    height: responsiveWidth(10),
    justifyContent: 'center',
    borderBottomRightRadius: responsiveWidth(5),
    borderTopRightRadius: responsiveWidth(5),
    zIndex: 1,
    left: 0,
  },
  inputStyleView: {
    width: responsiveWidth(90),
    marginTop: responsiveHeight(15),
    alignSelf: "center",
    backgroundColor: 'transparent',
    borderBottomWidth: responsiveWidth(0.1)
  },
  inputStyle: {
    width: responsiveWidth(84),
    color: 'black',
    height: responsiveHeight(5.5)
  },
  input: {
    marginTop: responsiveHeight(28)
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
})