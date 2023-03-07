import React, { useState } from "react";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { View, StyleSheet, Text, Image, Button, TouchableOpacity } from "react-native";
import { TxtInput } from "../../components/gerenal/txtinput";
import { Icon } from "react-native-elements";
import { colors, fontFamily, appImages } from "./../../globals/utilities";
import { AppButton } from '../../components/gerenal/appButton';


const EditProfile = (props) => {
    const [name, setName] = useState("");
    const [phoneNo, setphoneNo] = useState("");
    const [NameError, setNameError] = useState('');
    const [AddressError, setAddressError] = useState('');
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState('')
    const [imageError, setImageError] = useState('')



    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.titleView}>
                <Text style={styles.title}>Edit Profile</Text>
                <View style={styles.wrapper}>
                    {loading === true ? (
                        <ActivityIndicator size={'small'} color={colors.primary} />
                    ) : (
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
                                    <View style={[styles.backIcon, { backgroundColor: colors.primary, borderRadius: responsiveWidth(6) }]}>
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
                    )}
                    {imageError ? <Text style={styles.error}>{imageError}</Text> : null}
                </View>

                <TxtInput
                    iconName={'user'}
                    iconType={'entypo'}
                    MyStyles={styles.inputStyleView}
                    itsStyle={styles.inputStyle}
                    placeholder="Name"
                    onChangeText={text => handleOnChangeEmailText(text)}
                    error={NameError}
                />

                <TxtInput
                    iconName={'address'}
                    iconType={'entypo'}
                    MyStyles={styles.inputStyleView}
                    itsStyle={styles.inputStyle}
                    placeholder="Address"
                    onChangeText={text => handleOnChangeEmailText(text)}
                    error={AddressError}
                />

                <TxtInput
                    iconName={'phone'}
                    iconType={'entypo'}
                    MyStyles={styles.inputStyleView}
                    itsStyle={styles.inputStyle}
                    placeholder="PhoneNO"
                    onChangeText={text => handleOnChangeEmailText(text)}
                    error={AddressError}
                />

                <View style={styles.Bview}>
                    <AppButton
                        title={'Save'}
                        myStyles={styles.button2}
                        itsTextstyle={styles.buttonText}
                    />
                </View>

            </View>
        </View>
    )
}
export default EditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: responsiveHeight(15),
        marginTop: responsiveHeight(13),
        marginLeft: responsiveHeight(15)
    },
    wrapper: {
        width: responsiveWidth(90),
        alignSelf: "center",
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
        height: responsiveHeight(5.5)
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
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
        justifyContent: "space-around"
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
        resizeMode: 'contain'
    },
    imageVIew: {
        backgroundColor: "#F1F6FA",
        width: responsiveWidth(22),
        height: responsiveWidth(22),
        borderRadius: responsiveWidth(22),
        alignItems: "center",
        justifyContent: "center"
    },
    error: {
        color: 'red',
        alignSelf: "center",
        fontFamily: fontFamily.appTextMedium,
        fontSize: responsiveFontSize(1.7)
    }


})