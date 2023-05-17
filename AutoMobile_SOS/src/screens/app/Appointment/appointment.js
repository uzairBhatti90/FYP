import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, PermissionsAndroid, FlatList, Platform } from 'react-native';
import { Button, Icon, } from "react-native-elements";
import { fontFamily, colors } from '../../../globals/utilities';
import { TxtInput } from "../../../components/gerenal/txtinput";
import { AppButton } from '../../../components/gerenal/appButton';
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth, responsiveWidth, } from 'react-native-responsive-dimensions';
import { Header } from '../../../components/feeds/header'
import { getCurrentUserId } from '../../../services/Backend/auth';
import { getData } from '../../../services/Backend/utility';
import { db } from '../../../services/Backend/firebaseConfig';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  PROVIDER_DEFAULT,
} from 'react-native-maps';
import Spinner from 'react-native-spinkit';
import Geolocation from 'react-native-geolocation-service';

const AppointmentScreen = (props) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });


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

  useEffect(() => {
    db.collection("Appointment").onSnapshot(() => {
      getAppointment()
    })
  }, [])


  const getAppointment = async () => {
    const uid = await getCurrentUserId()
    console.log(uid);
    await getData('Appointment', uid).then((data) => {
      console.log(data.arr);
      setData(data.arr)
      if (data.arr == [] || null || false) {

      } else {
        getCurrentLocation();

      }
    })
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <>
          <Spinner
            type="Pulse"
            size={responsiveFontSize(5)}
            color={colors.PROVIDER_DEFAULT}
            style={{
              alignSelf: 'center'
            }}
          />
        </>
      ) : (
        <>
          <Header
            title={'Appointment'}
            onPress={() => { props.navigation.goBack() }}
          />
          <View>
            <FlatList
              data={data}
              renderItem={({ item, index }) => {
                return (
                  <>
                    <View style={styles.mainView}>
                      <View style={styles.innerView}>
                        <Text style={styles.app}>Appointment with:  <Text style={styles.shopText}>{item.shopData.shop}</Text></Text>
                        <Text style={[styles.app, { marginTop: 5 }]}>Selected Service:  <Text style={styles.shopText}>{item.selectService}</Text></Text>
                        <Text style={[styles.shopText, { marginTop: 5 }]}>{item.slotDate}</Text>
                        <Text style={[styles.shopText, { marginTop: 5 }]}>{item.slotTime}</Text>
                        <View style={styles.mapView}>
                          <MapView
                            provider={
                              Platform.OS === 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE
                            }
                            loadingEnabled
                            style={styles.map}
                            zoomEnabled={true}
                            maxZoomLevel={50}
                            initialRegion={{
                              latitude: item?.shopData?.latitude,
                              longitude: item?.shopData?.longitude,
                              latitudeDelta: 0.0922,
                              longitudeDelta: 0.0421,
                            }}

                          >
                            <Marker
                              key={index}
                              coordinate={{ latitude: item?.shopData?.latitude, longitude: item?.shopData?.longitude }}
                              title={item?.shopData?.shop}
                              description={item?.shopData?.shopType}
                            />

                          </MapView>
                        </View>
                      </View>
                    </View>
                  </>
                )
              }}
            />
          </View></>
      )
      }
    </View >
  );
};

export default AppointmentScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: responsiveWidth(100)
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: responsiveHeight(10)
  },
  textAreaContainer: {
    borderColor: "gray",
    borderWidth: 1,
    width: responsiveWidth(90),
    marginLeft: responsiveHeight(2.5)

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
    fontFamily: fontFamily.appTextMedium,
    fontSize: responsiveFontSize(2),
    color: 'white',

  },
  Btext: {
    marginLeft: responsiveHeight(0.5),
    fontSize: responsiveFontSize(2),
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
    marginTop: responsiveHeight(5),
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
  mainHeader: {
    backgroundColor: colors.primary,
    marginBottom: responsiveHeight(2)
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
  mainView: {
    width: responsiveWidth(90),
    alignSelf: "center",
    marginVertical: responsiveHeight(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    backgroundColor: 'white',
    borderRadius: responsiveWidth(3)
  },
  innerView: {
    marginVertical: responsiveHeight(1),
    width: responsiveWidth(80),
    alignSelf: "center"
  },
  shopText: {
    fontFamily: fontFamily.appTextMedium,
    fontSize: responsiveFontSize(1.8),
    color: "black"
  },
  app: {
    fontFamily: fontFamily.appTextRegular,
    fontSize: responsiveFontSize(1.6),
    color: "grey"
  },
  mapView: {
    width: responsiveWidth(80),
    alignSelf: "center",
    height: responsiveHeight(20),
    marginTop: responsiveHeight(1),
    borderRadius: responsiveWidth(3)
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
