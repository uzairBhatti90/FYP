import React, { useContext, useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, PermissionsAndroid } from "react-native"
import { Button, Icon } from "react-native-elements";
import { AppButton } from "../../components/gerenal/appButton";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { colors, fontFamily } from "../../globals/utilities";
import { TxtInput } from "../../components/gerenal/txtinput";
import authContext from '../../context/auth/authContext'
import Toast from 'react-native-simple-toast'
import { saveData } from "../../services/Backend/utility";
import RBSheet from "react-native-raw-bottom-sheet";
import MapView, {
    PROVIDER_GOOGLE,
    Marker,
    PROVIDER_DEFAULT,
} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Spinner from 'react-native-spinkit';
import Geocoder from 'react-native-geocoding';
import uuid from 'react-native-uuid';
import { Header } from "../../components/feeds/header";
const AddService = (props) => {
    const AuthContext = useContext(authContext)
    const { data } = AuthContext
    const [Auto, setAuto] = useState("");
    const [issue, setIssue] = useState("");
    const [company, setcompany] = useState("");
    const [address, setaddress] = useState("");
    const [laoding, setLoading] = useState(false)
    const [mapLoading, setMapLoading] = useState(true);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    Geocoder.init('AIzaSyABpx4ZgqeykN4AWQE0Dm_RD3W2NkCfthM')



    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const rbsheet = useRef()

    async function handleServiceProvider() {
        if (issue.length == 0) {
            Toast.show("Please Enter Your Service", Toast.SHORT)
        } else if (issue.length < 2) {
            Toast.show("Service name must be greather than 2 alphabets.", Toast.SHORT)
        } else if (company.length == 0) {
            Toast.show("Please Enter Your Company Name", Toast.SHORT)
        } else if (company.length < 2) {
            Toast.show("Company name must be greather than 2 alphabets.", Toast.SHORT)
        }
        if (address.length == 0) {
            Toast.show("Please Enter Your Address", Toast.SHORT)
        } else if (address.length < 2) {
            Toast.show("Address must be greather than 2 alphabets.", Toast.SHORT)
        }
        else if (region == {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
        ) {
            Toast.show("Please Select Your current Location", Toast.LONG)
        }
        else {
            setLoading(true)
            let uid = await uuid.v4()
            await saveData('ServiceProvider', uid, {
                Service: issue,
                CompanyName: company,
                address: address,
                locationProvider: region,
                userId: data.id,

            }).catch(error => console.log(error))
                .finally(() => setLoading(false))
        }
    }
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
                    setMapLoading(false);
                },
                error => {
                    console.log(error.code, error.message);
                    setMapLoading(false);
                },
                { enableHighAccuracy: true, timeout: 15000 },
            );
        } catch (error) {
            console.log(error);
        }
    };


    const handleMarkerDrag = e => {
        console.log(e.nativeEvent, "DRaagggggg");
        setRegion(e.nativeEvent.coordinate)
        // setMarkerPosition(e.nativeEvent.coordinate);
    };


    function handleLocation() {
        rbsheet.current.close()
    }

    return (
        <View style={styles.container}>
            <Header
                onPress={() => props.navigation.goBack()}
                title={'Add Service'}
            />
            <TxtInput
                iconName={''}
                iconType={''}
                MyStyles={styles.inputStyleView}
                itsStyle={styles.inputStyle}
                placeholder="Auto-name"
                onChangeText={text => setAuto(text)}
            />
            <TxtInput
                iconName={''}
                iconType={''}
                MyStyles={styles.inputStyleView}
                itsStyle={styles.inputStyle}
                placeholder="Service-name"
                onChangeText={text => setIssue(text)}
            />
            <TxtInput
                iconName={''}
                iconType={''}
                MyStyles={styles.inputStyleView}
                itsStyle={styles.inputStyle}
                placeholder="Company-name"
                onChangeText={text => setcompany(text)}
            />
            <TxtInput
                iconName={''}
                iconType={''}
                MyStyles={styles.inputStyleView}
                itsStyle={styles.inputStyle}
                placeholder="Complete Address"
                onChangeText={text => setaddress(text)}
            />

            <View style={styles.dontStyle}>
                <Text style={
                    styles.accountText
                }>Add your Company Location
                    <Text style={[styles.accountText, {
                        color: colors.primary
                    }]}
                        onPress={() => rbsheet?.current.open()}
                    >   Location</Text>
                </Text>
            </View>
            <View style={styles.Bview}>
                <AppButton
                    title={'Save'}
                    myStyles={styles.button2}
                    itsTextstyle={styles.buttonText}
                    onPress={() => handleServiceProvider()}
                    activity={laoding}
                />
                <AppButton onPress={() => props.navigation.goBack()}
                    title={'Cancel'}
                    myStyles={styles.button2}
                    itsTextstyle={styles.buttonText}
                />
            </View>
            <RBSheet
                ref={rbsheet}
                animationType={'fade'}
                closeOnDragDown={false}
                height={responsiveHeight(90)}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: "rgba(0,0,0,0.3)",
                    },
                    container: {
                        borderTopRightRadius: responsiveWidth(7),
                        borderTopLeftRadius: responsiveWidth(7),
                        elevation: 2,
                        backgroundColor: '#fff',
                    },
                }}
            >
                <View>
                    {longitude != '' && latitude != '' ? (
                        <View style={styles.container2}>
                            <Text style={styles.selectText}>Select Your Location</Text>
                            <View style={styles.mainView}>
                                <MapView
                                    provider={
                                        Platform.OS === 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE
                                    }
                                    style={styles.map}
                                    zoomEnabled={true}
                                    maxZoomLevel={50}
                                    initialRegion={region}>
                                    <Marker key={1} coordinate={region} draggable={true} onDragEnd={handleMarkerDrag} />
                                </MapView>
                            </View>
                            <AppButton
                                title={'Submit'}
                                onPress={() => handleLocation()}
                                myStyles={styles.buttonSubmit}
                            />
                        </View>
                    ) : (
                        <Spinner
                            type="Pulse"
                            size={responsiveFontSize(5)}
                            color={colors.PROVIDER_DEFAULT}
                        />
                    )}
                </View>

            </RBSheet>
        </View>

    )
}
export default AddService;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    Carstyle: {
        fontSize: responsiveFontSize(3.5),
        marginTop: responsiveHeight(3),
        marginLeft: responsiveHeight(2.5),
        color: 'gray',
    },

    inputStyleView: {
        width: responsiveWidth(90),
        alignSelf: "center",
        backgroundColor: 'transparent',
        borderWidth: responsiveWidth(0.1),
        marginTop: responsiveHeight(1),
        borderRadius: responsiveWidth(2)
    },
    inputStyle: {
        width: responsiveWidth(80),
        color: 'black',
        height: responsiveHeight(6),
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
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    dontStyle: {
        top: 50,
        alignItems: 'flex-end',
        alignSelf: 'center',
        width: responsiveWidth(90),
    },
    accountText: {
        color: "black",
        fontSize: responsiveFontSize(1.5),
        fontFamily: fontFamily.appTextRegular,
        marginBottom: responsiveHeight(3),
    },
    mainHeader: {
        backgroundColor: colors.primary,
        marginBottom: responsiveHeight(2),

    },
    innerHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: responsiveWidth(100),
        alignSelf: "center",
        alignItems: "center"
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    container2: {
        width: '100%'
    },
    mainView: {
        width: '100%',
        height: responsiveHeight(70),
        marginTop: responsiveHeight(2)
    },
    selectText: {
        marginLeft: responsiveWidth(3),
        marginTop: responsiveHeight(3),
        color: 'black',
        fontFamily: fontFamily.appTextMedium
    },
    buttonSubmit: {
        width: responsiveWidth(90),
        height: responsiveHeight(6),
        justifyContent: "center",
        borderRadius: responsiveWidth(2)
    }
})