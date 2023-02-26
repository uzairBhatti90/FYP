import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Text
} from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { RadioBtn } from "../../components/feeds/radioButton";
import { AppButton } from "../../components/gerenal/appButton";
import { TxtInput } from "../../components/gerenal/txtinput";
import { colors, fontFamily, appImages } from "../../globals/utilities";
import { Icon } from "react-native-elements";
import { launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-simple-toast'
import { storage } from '../../services/Backend/firebaseConfig'
import { uriToBlob, downloadImage, saveData, getData, getAllOfCollection } from '../../services/Backend/utility'
import { getCurrentUserId, userSignUp } from '../../services/Backend/auth'


const ProfileRegister = props => {
  const { email } = props.route.params

  const [fullname, setFullName] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  const [image, setImage] = useState('')
  const [nameError, setNameError] = useState('')
  const [mobileError, setMobileError] = useState('')
  const [imageError, setImageError] = useState('')
  const [checked, setChecked] = useState(false)
  const [rider, setRider] = useState(false)
  const [service, setService] = useState('')
  const [riderError, setRiderError] = useState('')
  const [loading, setLoading] = useState(false)
  const [buttonload, setButtonLoad] = useState(false)

  const handlePress = () => {
    navigation.navigate('Login');
  };


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
    setFullName(Name);
  };

  const handleOnChangePhoneNoText = LName => {
    !LName
      ? setMobileError('')
      : LName.length < 10
        ? setMobileError('Atleast 10 characters')
        : setMobileError('');
    setMobileNo(LName);
  };
  const validation = () => {
    !fullname
      ? setNameError('Enter Full Name')
      : fullname.length < 2
        ? setNameError('Atleast 2 characters')
        : setNameError('');
    !mobileNo
      ? setMobileError('Enter Mobile Number')
      : mobileNo.length < 10
        ? setMobileError('Atleast 10 characters')
        : setMobileError('');
    !image
      ? setImageError('Please Select your image')
      : setImageError('')
    if (
      fullname.length > 2 &&
      mobileNo > 10 &&
      service != '' &&
      image != ''
    ) {
      return true
    } else {
      return false
    }
  }
  useEffect(() => {
    data()
  }, [])

  const data = async () => {
    await getAllOfCollection('data')
  }


  const navigation = async () => {
    if (validation()) {
      setButtonLoad(true)
      let uid = await getCurrentUserId()
      let obj = {
        email: email,
        name: 'ghulam Mujtaba',
        mobileNo: mobileNo,
        joinedDate: Date.now(),
        userID: uid,
        category: service,
        image: image,
        verfiy: false
      }
      await saveData('userData', uid, obj).then((data) => {
        console.log(data, "create user Data");
        setButtonLoad(false)
        props.navigation.navigate('Login')
      })
    }
  }

    return (
      <View style={styles.container}>
        <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'} />
        <Image style={styles.imageuri} source={{ uri: 'https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?w=2000' }} />
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
          {/* <View style={{ height: responsiveHeight(10) }} /> */}
          <TxtInput
            iconName={'user'}
            iconType={'antdesign'}
            MyStyles={styles.inputStyleView}
            itsStyle={styles.inputStyle}
            placeholder="Full Name"
            onChangeText={text => handleOnChangeNameText(text)}
            error={nameError}
          />

          <TxtInput
            iconName={'phone'}
            iconType={'feather'}
            MyStyles={styles.inputStyleView}
            itsStyle={styles.inputStyle}
            placeholder="Phone Number"
            keyboardType={'numeric'}
            maxLength={12}
            onChangeText={text => handleOnChangePhoneNoText(text)}
            error={mobileError}
          />
          <View style={styles.radioView}>
            <RadioBtn
              checked={checked}
              onPress={() => {
                setChecked(true)
                setRider(false)
                setService('Provider')
              }}
              title={'Service Provider'}
            />
            <RadioBtn
              checked={rider}
              onPress={() => {
                setChecked(false)
                setRider(true)
              }}
              title={'Rider'}
              myRadioStyle={styles.RiderRadio}
            />
          </View>
        </View>
        <View>
          {service === '' ? (
            <Text style={styles.error}>{'Please Provide your Service'}</Text>
          ) : null}
        </View>
        <AppButton
          activity={buttonload}
          title={'Signup'}
          myStyles={styles.button}
          itsTextstyle={styles.buttonText}
          onPress={() => {
            navigation()
            // props.navigation.navigate('Login')
          }}
        />
      </View >

    )
  }
  export default ProfileRegister


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    wrapper: {
      width: responsiveWidth(90),
      alignSelf: "center",
      marginTop: responsiveHeight(2)
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

    Style: {
      top: responsiveHeight(3),
      alignItems: "center",
      justifyContent: "center"

    },
    imageuri: {
      height: responsiveWidth(60),
      width: responsiveWidth(90),
      marginTop: responsiveHeight(6)
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
    radioView: {
      marginVertical: responsiveHeight(2),
      flexDirection: "row",
    },
    RiderRadio: {
      marginLeft: responsiveWidth(5)
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
  });
