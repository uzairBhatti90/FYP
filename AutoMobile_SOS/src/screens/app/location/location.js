import React, {useEffect, useState} from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  PermissionsAndroid,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {colors} from '../../../globals/utilities/index';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  PROVIDER_DEFAULT,
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Spinner from 'react-native-spinkit';

const Location = () => {
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
        {enableHighAccuracy: true, timeout: 15000},
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
      />
      <View style={styles.container2}>
        {longitude != '' && latitude != '' ? (
          <>
            <MapView
              provider={
                Platform.OS === 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE
              }
              style={styles.map}
              zoomEnabled={true}
              maxZoomLevel={10}
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
    </View>
  );
};
export default Location;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
});
