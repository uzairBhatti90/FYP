import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text, Switch, TouchableOpacity, Image, FlatList } from "react-native";
import { responsiveHeight, responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions";
import { colors, fontFamily } from "../../globals/utilities/index";
import { getData } from '../../services/Backend/utility'
import authContext from '../../context/auth/authContext'
import LoadingComp from "../../components/gerenal/loadingComp";
import { settingData } from "../../services/dummy/data";
import { Icon } from "react-native-elements";
import { AppButton } from '../../components/gerenal/appButton'
import AsyncStorage from "@react-native-async-storage/async-storage";




const s_Setting = props => {
  const AuthContext = useContext(authContext)
  const { data, logout } = AuthContext
  console.log(data.id);
  const [UData, setUData] = useState({})
  const [loading, setLoading] = useState(true)
  const [setData, setSetData] = useState(settingData)

  useEffect(() => {
    userData()
  }, [])

  function signout() {
    logout({ id: data.id, category: data.category });
    AsyncStorage.clear().then(() => {
      props.navigation.navigate('Login')
    })
  }

  async function userData() {
    await getData('userData', data.id).then(data => {
      console.log(data);
      setUData(data)
    }).catch(error => {
      console.log(error);
    }).finally(() => {
      setLoading(false)
    })
  }
  return (
    
    <View style={styles.container}>

      {loading === true ? (
        <LoadingComp
          loading={loading}
        />
      ) : (
        <>
          {/* Profile */}
          <View>
            <View style={styles.innerVIew}>
              <Image source={{ uri: UData.image }} style={styles.image} />
              <View style={styles.nmaeView}>
                <Text style={styles.nameText}>{UData.name}</Text>
                <Text style={styles.emailText}>{UData.email}</Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.editText}
                    onPress={() => { props.navigation.navigate('EditProfile') }}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* content */}
          <View style={styles.wrapper}>
            <View style={styles.genSetting}>
              <Text style={styles.geText}>{"General Settings"}</Text>
            </View>
            <View>
              <FlatList
                data={setData}
                renderItem={({ item }) => {
                  return (
                    <View>
                      <TouchableOpacity style={styles.titleView2}>
                        <Text style={styles.title2}>{item.title}</Text>
                        <Icon
                          name={'chevron-right'}
                          type={'entypo'}
                          color={'#000'}
                          size={responsiveFontSize(2.5)}
                        />
                      </TouchableOpacity>
                    </View>
                  )
                }}
              />
            </View>
            <AppButton
              title={'Log Out'}
              myStyles={styles.button2}
              itsTextstyle={styles.buttonText}
              onPress={() => signout()}
            />
          </View>
        </>
      )}

    </View>
  )
}
export default s_Setting

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
},
title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: responsiveHeight(30),
},
settingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
},
settingOptionLabel: {
    fontSize: 18,
},
button: {
    backgroundColor: colors.primary,
    borderRadius: responsiveWidth(5),
    alignItems: 'center',
    marginTop: responsiveHeight(1),
    height: responsiveHeight(5),
    justifyContent: "center",
    width: responsiveWidth(40)
},
buttonText: {
    color: '#fff',
    fontWeight: 'bold',
},
title: {
    fontSize: responsiveFontSize(2.2),
    color: colors.black,
    fontFamily: fontFamily.appTextSemiBold
},
titleView: {
    paddingTop: responsiveHeight(6),
    paddingBottom: responsiveWidth(2),
    alignItems: "center"
},
image: {
    width: responsiveWidth(30),
    height: responsiveWidth(30),
    borderRadius: responsiveWidth(30),
    marginTop: responsiveHeight(6)
},
innerVIew: {
    width: responsiveWidth(90),
    alignSelf: 'center',
    alignItems: 'center'
},
nmaeView: {
    marginTop: responsiveHeight(2),
    alignItems: "center"
},
nameText: {
    fontFamily: fontFamily.appTextSemiBold,
    fontSize: responsiveFontSize(2),
    color: 'black'
},
editText: {
    fontFamily: fontFamily.appTextMedium,
    fontSize: responsiveFontSize(1.8),
    color: 'white'
},
emailText: {
    fontFamily: fontFamily.appTextRegular,
    fontSize: responsiveFontSize(1.7),
    color: "black"
},
genSetting: {
    marginTop: responsiveHeight(5)
},
wrapper: {
    width: responsiveWidth(90),
    alignSelf: "center"
},
geText: {
    fontFamily: fontFamily.appTextSemiBold,
    fontSize: responsiveFontSize(2),
    color: "black"
},
titleView2: {
    width: responsiveWidth(90),
    alignSelf: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: responsiveHeight(2),
    alignItems: "center"
},
title2: {
    fontFamily: fontFamily.appTextMedium,
    fontSize: responsiveFontSize(1.8),
    color: "black"
},
button2: {
    width: responsiveWidth(45),
    height: responsiveHeight(6),
    borderTopRightRadius: responsiveWidth(1),
    borderBottomLeftRadius: responsiveWidth(1),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start"
}
})
