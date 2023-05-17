import React from "react";
import { StatusBar, StyleSheet, View, Text } from "react-native";
import { Header } from "../../components/feeds/header";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import MapView, {
    PROVIDER_GOOGLE,
    Marker,
    PROVIDER_DEFAULT,
} from 'react-native-maps';
import { fontFamily } from "../../globals/utilities";
import { AppButton } from "../../components/gerenal/appButton";



export default function AppointmentDetails({ navigation, route }) {
    const { item } = route.params
    console.log(item);
    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={'dark-content'}
                translucent={true}
                backgroundColor={'transparent'}
            />
            <Header
                title={"Appointment Details"}
                onPress={() => { navigation.goBack() }}
            />
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
                    }}>
                    <Marker
                        key={1}
                        coordinate={{ latitude: item?.shopData?.latitude, longitude: item?.shopData?.longitude }}
                        title={item?.shopData?.shop}
                        description={item?.shopData?.shopType}
                    />

                </MapView>
            </View>
            <View style={styles.wrapper}>
                <View >
                    <Text style={styles.title}>Details</Text>
                </View>
                <View style={styles.carnmae}>
                    <Text style={styles.car}>Shop name</Text>
                    <Text style={styles.carname}>{item?.shopData.shop}</Text>
                </View>
                <View style={styles.carnmae}>
                    <Text style={styles.car}>Selected Service</Text>
                    <Text style={styles.carname}>{item?.selectService}</Text>
                </View>

                <View style={styles.carnmae}>
                    <Text style={styles.car}>Date</Text>
                    <Text style={styles.carname}>{item?.slotDate}</Text>
                </View>

                <View style={styles.carnmae}>
                    <Text style={styles.car}>Slot Time</Text>
                    <Text style={styles.carname}>{item.slotTime}</Text>
                </View>
                <AppButton
                    title={'Generate Report'}
                    myStyles={styles.button}
                    onPress={() => { navigation.navigate('Report', { item }) }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    mapView: {
        width: '100%',
        height: responsiveHeight(30),
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    wrapper: {
        flex: 1,
        width: responsiveWidth(90),
        height: responsiveHeight(40),
        marginLeft: responsiveHeight(2),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 5,
        backgroundColor: "white",
        borderRadius: responsiveHeight(2),
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(15)
    },
    carnmae: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    car: {
        color: "black",
        fontSize: responsiveFontSize(2),
        marginLeft: responsiveHeight(2),
        marginTop: responsiveHeight(2),
        marginVertical: responsiveHeight(2)
    },
    carname: {
        fontSize: responsiveFontSize(2),
        marginRight: responsiveHeight(4),
        marginTop: responsiveHeight(2)
    },
    price: {
        fontSize: responsiveFontSize(3),
        color: "gray",
        marginTop: responsiveHeight(1),
        marginLeft: responsiveHeight(15)
    },
    title: {
        fontSize: responsiveFontSize(2),
        color: 'black',
        alignSelf: "center",
        marginTop: responsiveHeight(2),
        fontFamily: fontFamily.appTextMedium
    },
    button: {
        borderRadius: responsiveWidth(2),
        width: responsiveWidth(80),
        height: responsiveHeight(6),
        justifyContent: "center"
    }
})