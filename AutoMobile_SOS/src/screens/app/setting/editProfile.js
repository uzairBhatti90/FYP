import React, { useContext, useState } from "react";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { View, StyleSheet, Text, Image, Button, TouchableOpacity, ActivityIndicator } from "react-native";
import { TxtInput } from "../../../components/gerenal/txtinput";
import { Icon } from "react-native-elements";
import { colors, fontFamily, appImages } from "../../../globals/utilities";
import { AppButton } from "../../../components/gerenal/appButton";
import { uriToBlob, downloadImage, saveData, getData, getAllOfCollection } from '../../../services/Backend/utility'
import authContext from '../../../context/auth/authContext'
import { launchImageLibrary } from 'react-native-image-picker';
import { storage } from "../../../services/Backend/firebaseConfig";
import Toast from 'react-native-simple-toast'

const EditProfile = (props) => {
    const { userData } = props.route.params
    console.log(userData);
    const AuthContext = useContext(authContext)
    const { data } = AuthContext
    const [name, setName] = useState(userData.name);
    const [phoneNo, setphoneNo] = useState(userData.mobileNo);
    const [address, setAddress] = useState(userData.address ? userData.address : '')
    const [NameError, setNameError] = useState('');
    const [mobileError, setMobileError] = useState('')
    const [AddressError, setAddressError] = useState('');
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(userData.image)
    const [imageError, setImageError] = useState('')
    const [activity, setActivity] = useState(false)

    function camera() {
        var options = {
            title: 'Insurance Documents',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                let mess = response.assets;
                mess.map(item => {
                    console.info(item);
                    SaveImagetodb(item);
                });
            }
        });
    }

    const SaveImagetodb = async res => {
        setLoading(true);
        const profileImageResponse = res;
        console.log('helooo::', res);
        var today = new Date();
        var mili = today.getMilliseconds();
        let kk = Date.parse(today);
        kk = kk + mili;
        let response = profileImageResponse;
        let Img = response.uri;
        let imagePath = response.fileName + kk;
        let file = await uriToBlob(Img);
        console.log('>>info::', file);

        // console.log('>>>>>>>>>.', file);
        const uploadTask = storage.ref(`Profile/${imagePath}`).put(file);
        uploadTask.on(
            'state_changed',
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                );
                if (progress == 100) {
                }
            },
            error => {
                console.log('error 1', error);
                setLoading(false)
                Toast.show('SomeThing went wrong', Toast.TOP)
            },
            async () => {
                await downloadImage('Profile', imagePath).then(async uri => {
                    if (uri) {
                        console.log({ uri });
                        setImage(uri);
                        Toast.show('Picture Uploaded', Toast.LONG)
                        setLoading(false);
                    }
                }).catch(err => {
                    console.log(err, "error in uploading");
                })
            },
        );
    };

    const handleOnChangeNameText = Name => {
        !Name
            ? setNameError('')
            : Name.length < 2
                ? setNameError('Atleast 2 characters')
                : setNameError('');
        setName(Name);
    };
    const handleOnChangeAddressText = Name => {
        !Name
            ? setAddressError('')
            : Name.length < 2
                ? setAddressError('Atleast 2 characters')
                : setAddressError('');
        setAddress(Name);
    };
    const handleOnChangePhoneNoText = LName => {
        !LName
            ? setMobileError('')
            : LName.length < 10
                ? setMobileError('Atleast 10 characters')
                : setMobileError('');
        setphoneNo(LName);
    };

    const validation = () => {
        !name
            ? setNameError('Enter Full Name')
            : name.length < 2
                ? setNameError('Atleast 2 characters')
                : setNameError('');
        !phoneNo
            ? setMobileError('Enter Mobile Number')
            : phoneNo.length < 10
                ? setMobileError('Atleast 10 characters')
                : setMobileError('');
        !image
            ? setImageError('Please Select your image')
            : setImageError('')
        !address
            ? setAddressError("Please Enter your Address")
            : setAddressError('')
        if (
            name.length > 2 &&
            phoneNo > 10 &&
            address.length > 2 &&
            image != ''
        ) {
            return true
        } else {
            return false
        }
    }

    const navigation = async () => {
        setActivity(true)
        if (validation()) {
            await saveData('userData', data.id, {
                name: name,
                address: address,
                image: image,
                mobileNo: phoneNo
            }).then(() => {
                setActivity(false)
                props.navigation.goBack()
            }).catch(error => {
                console.log(error, ">>>Edit Profile Error");
                setActivity(false)
            })
        }
    }
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
                <View style={{ height: responsiveHeight(5) }} />
                <TxtInput
                    iconName={'user'}
                    iconType={'entypo'}
                    MyStyles={styles.inputStyleView}
                    itsStyle={styles.inputStyle}
                    placeholder="Name"
                    value={name}
                    onChangeText={text => handleOnChangeNameText(text)}
                    error={NameError}
                />

                <TxtInput
                    iconName={'address'}
                    iconType={'entypo'}
                    MyStyles={styles.inputStyleView}
                    itsStyle={styles.inputStyle}
                    placeholder="Address"
                    value={address}
                    onChangeText={text => handleOnChangeAddressText(text)}
                    error={AddressError}
                />

                <TxtInput
                    iconName={'phone'}
                    iconType={'entypo'}
                    MyStyles={styles.inputStyleView}
                    itsStyle={styles.inputStyle}
                    placeholder="PhoneNO"
                    value={phoneNo}
                    onChangeText={text => handleOnChangePhoneNoText(text)}
                    error={mobileError}
                />

                <View style={styles.Bview}>
                    <AppButton
                        title={'Save'}
                        myStyles={styles.button2}
                        itsTextstyle={styles.buttonText}
                        activity={activity}
                        onPress={() => navigation()}
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
        fontSize: responsiveFontSize(3),
        fontFamily: fontFamily.appTextSemiBold,
        color: 'black'
    },
    titleView: {
        marginTop: responsiveHeight(6),
        marginBottom: responsiveHeight(2),
        justifyContent: "center",
        alignItems: "center"
    },
    wrapper: {
        width: responsiveWidth(90),
        alignSelf: "center",
        marginTop: responsiveHeight(4)
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