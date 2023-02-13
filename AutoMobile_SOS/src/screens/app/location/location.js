import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Platform, PermissionsAndroid, ActivityIndicator } from "react-native";
import { colors } from "../../../globals/utilities/colors";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';



const Location = () => {
    const [longitude, setLongitude] = useState();
    const [latitude, setLatitude] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getCurrentLocation();
    }, []);

    const getCurrentLocation = async () => {
        try {
            if (Platform.OS === "ios") {
                await Geolocation.requestAuthorization("whenInUse");
            }

            if (Platform.OS === "android") {
                await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );
            }
            return Geolocation.getCurrentPosition(
                async (position) => {
                    console.log(position);
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    setLoading(false);
                },
                (error) => {
                    console.log(error.code, error.message);
                    setLoading(false)
                },
                { enableHighAccuracy: true, timeout: 15000 }
            );
        } catch (error) {
            throw new Error(error);

        }
    };


    return (
        <View style={styles.container}>

            <View style={styles.mapContainer}>
                {loading ? (
                    <ActivityIndicator size={'large'} color={colors.primary} />
                ) : (
                    <MapView
                        style={styles.map}
                        zoomEnabled={true}
                        maxZoomLevel={10}
                        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null}
                        initialRegion={{
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker coordinate={{
                        longitude: longitude,
                        latitude: latitude
                    }} />
                    </MapView>
                )}
            </View>
        </View>
    )
}


export default Location;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
        color: colors.primary,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    mapContainer: {
        // ...StyleSheet.absoluteFillObject,
        height: responsiveHeight(100),
        width: responsiveWidth(100),
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

});
