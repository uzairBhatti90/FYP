import React from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import { colors } from "../../../globals/utilities/colors";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'




const Location = props => {
    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                <MapView
                    provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null} // remove if not using Google Maps
                    style={styles.map}
                    region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >
                </MapView>
            </View>
        </View>
    )
}
export default Location
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    }
})
