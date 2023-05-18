import React, { useContext, useEffect, useState } from 'react';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { colors, fontFamily } from "../../globals/utilities/index";
import { SetupCard } from '../../components/feeds/setUpCard';
import { ReportCard } from '../../components/feeds/reportCard';
import { Button, Icon } from 'react-native-elements';
import { AppButton } from '../../components/gerenal/appButton';
import { FlatList } from 'react-native-gesture-handler';
import { listofServices, reportData, MOdalData } from '../../dataset';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Alert,
  PermissionsAndroid,
  Platform

} from "react-native";
import authContext from '../../context/auth/authContext'
import { addToArray, getAllOfCollection, getData, saveData, } from '../../services/Backend/utility';
import { getCurrentUserId } from '../../services/Backend/auth';
import Spinner from 'react-native-spinkit';
import { db } from '../../services/Backend/firebaseConfig';
import moment from 'moment'
import Toast from 'react-native-simple-toast'
import Geolocation from 'react-native-geolocation-service';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  PROVIDER_DEFAULT,
} from 'react-native-maps';


const S_Home = (props) => {
  const AuthContext = useContext(authContext)
  const { data } = AuthContext
  const [user, setUser] = useState({})
  const [serviceData, setServiceData] = useState([])
  const [report, setReport] = useState([])
  const [AppointmentCard, setAppointmentCard] = useState(AppointmentCard)
  const [loading, setLoading] = useState(true)
  const [acceptFlag, setAcceptFlag] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModaldata] = useState([])
  const [chat, setChat] = useState([])
  const [appointment, setAppointment] = useState([])
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    db.collection('userData').onSnapshot(() => {
      userDataget()
    })

    db.collection('InstantService').onSnapshot(() => {
      getRequest()
    })

    db.collection("ServiceProvider").onSnapshot(() => {
      getServices()
    })

    db.collection('Appointment').onSnapshot(() => {
      getAppointment()
    })
    db.collection('Reports').onSnapshot(() => {
      getReports()
    })
  }, [])

  const getReports = async () => {
    let uid = await getCurrentUserId()
    await getData("Reports", uid).then((data) => {
      console.log(data.arr);
      setReport(data.arr)
    })
  }

  const getRequest = async () => {
    await getAllOfCollection('InstantService').then(shopData => {
      const filterData = shopData.filter(e => e?.shopData?.shop_id == data.id)
      setModaldata(filterData)

      if (shopData.instantFlag == true) {
        setModalVisible(true)
      } else {
        Toast.show("NO Request Available", Toast.LONG)
      }
    }).then(async () => {
      const userID = await getCurrentUserId()
      db.collection('Chat')
        .doc(userID)
        .onSnapshot(async function (doc) {
          let chatdata = await getData('Chat', userID)
          if (chatdata == false) {
            setLoading(false)
            setChat([])
          } else {
            let keys = Object.keys(chatdata);
            let arr = [];
            keys.forEach(item => {
              let Array = chatdata[item]
              let userData = Array.filter(val => val.user.userId !== userID)
              let newArr = userData.slice(-1)[0]
              arr.push(newArr)
            })
            setChat(arr)
            setLoading(false)
          }
        })

    })

  }

  const userDataget = async () => {
    await getData('userData', data.id).then((data) => {
      setUser(data)

    }).catch(error => {
      console.log(error);
    }).finally(() => {
      getRequest()
    })
  }

  const getServices = async () => {
    let uid = await getCurrentUserId()
    await getData('ServiceProvider', uid).then((data) => {
      setServiceData(data.arr)
    })
  }
  const getAppointment = async () => {
    const uid = await getCurrentUserId()
    console.log(uid);
    await getData('Appointment', uid).then((data) => {
      setAppointment(data.arr)
      if (data.arr == [] || null || false) {

      } else {
        getCurrentLocation();

      }
    })
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }
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
  const handleCancel = () => {
    setModalVisible(false)
  }

  const handleAccept = async (_user) => {
    console.log(_user.userID);
    setAcceptFlag(true)
    const id = await getCurrentUserId()
    let obj1 = {
      user: {
        id: 1,
        username: _user.name,
        userId: _user.userID,
        photo: _user.userImage
      },
      message: `${user?.name} accept your Instant Service`,
      time: moment(new Date()).format('hh:mm a'),
      timestamp: new Date(),
    }
    let obj2 = {
      user: {
        id: 2,
        username: user?.name,
        userId: user?.userID,
        photo: user?.image,
      },
      message: `You accept the Instant service of ${_user?.name}`,
      time: moment(new Date()).format('hh:mm a'),
      timestamp: new Date(),
    }

    // await saveData('InstantService', user?.id, { instantFlag: false }).then(async () => {
    await addToArray("Chat", id, _user?.userID, obj1).then(async () => {
      console.log('first obj');
      await addToArray("Chat", _user?.userID, id, obj2).then(() => {
        console.log("secondOBj");
      })

    }).then(async () => {
      await saveData("InstantService", data.id, { instantFlag: false })
    }).finally(() => {
      setAcceptFlag(false)
      setModalVisible(false)
    })

  }

  return (
    <View style={styles.container}>
      <View style={styles.Header}>
        <View style={styles.headerInner}>
          <Text style={styles.HeaderText}>{`Welcome! ${user?.name}`}</Text>
          <View style={styles.iconPro}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Notification')}>
              <Icon
                name='bell'
                type='feather'
                size={responsiveFontSize(3)}
                color={'black'}
              />
            </TouchableOpacity>
            <Image source={{ uri: user?.image }} style={styles.image} />
          </View>
        </View>
      </View>
      {loading == true ? (
        <View style={{ alignItems: "center", justifyContent: "center", height: responsiveHeight(100) }}>
          <Spinner
            type="Pulse"
            size={responsiveFontSize(5)}
            color={colors.primary}

          />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.mainContainer}>


          {user?.verfiy == false && (
            <SetupCard
              title={'Setup Your Profile'}
              onPress={() => { props.navigation.navigate('S_SetupProfile') }}
            />
          )}

          <View style={styles.modalView}>
          </View>

          <TouchableOpacity style={styles.textView}
            onPress={() => { props.navigation.navigate('AddService') }}
          >


            <Text style={styles.listText}>{'Add Services'}</Text>
            <Icon
              name='chevron-small-right'
              type='entypo'
              size={responsiveFontSize(3)}
              color={'black'}
            />
          </TouchableOpacity>
          < View style={{
            width: responsiveWidth(90),
            alignSelf: "center",
          }}>

            <FlatList
              data={serviceData}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              ListFooterComponent={
                <View style={styles.flatMainView}>
                  <TouchableOpacity onPress={() => { props.navigation.navigate('AddService') }}>
                    <View style={styles.flatListIconView}>
                      <Icon
                        name={'plus'}
                        type={'antdesign'}
                        color={colors.primary}
                        size={responsiveFontSize(4)}
                      />
                    </View>

                    <Text style={styles.naemText}>{'Add Service'}</Text>
                  </TouchableOpacity>
                </View>

              }
              renderItem={({ item, index }) => {
                const backgroundColors = ['#F5A9BC', '#B4EEB4', '#D8D109'];
                const backgroundColor = backgroundColors[index % backgroundColors.length];

                return (
                  <View style={[styles.flatMainView]}>
                    <View style={[styles.flatListIconView, { backgroundColor }]}>
                    </View>
                    <Text style={styles.naemText}>{item.ServiceType}</Text>
                  </View>
                )
              }}

            />

          </View>
          < View style={styles.reportView}>
            <TouchableOpacity style={styles.textView} onPress={() => { props.navigation.navigate('Report') }}>
              <Text style={styles.listText}>{'Available Chat'}</Text>
              <Icon
                name='chevron-small-right'
                type='entypo'
                size={responsiveFontSize(2.5)}
                color={'black'}
              />
            </TouchableOpacity>
            <View style={{
              width: responsiveWidth(90), alignSelf: "center"
            }}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={chat}
                ListEmptyComponent={
                  <View>
                    <Text>NO Chat Available</Text>
                  </View>
                }
                renderItem={({ item }) => {
                  return (
                    <View style={styles.naiViewFlats}>

                      <View style={styles.innerFlatView}>
                        <Image
                          source={{ uri: item.user.photo }}
                          style={styles.userImage}
                        />
                        <Text style={{
                          fontSize: responsiveFontSize(1.6),
                          color: 'black',
                          marginLeft: responsiveWidth(1),
                          marginTop: 3,
                          fontFamily: fontFamily.appTextMedium
                        }}>{item?.user?.username}</Text>
                        <AppButton
                          title={'Chat'}
                          myStyles={styles.chatbutton}
                          onPress={() => props.navigation.navigate("Chat", { item: item })}
                        />
                      </View>

                    </View>

                  )

                }}
              />
            </View>
          </View>
          <View style={styles.reportView}>
            <TouchableOpacity style={styles.textView} onPress={() => { props.navigation.navigate('Report') }}>
              <Text style={styles.listText}>{'Appointment'}</Text>
              <Icon
                name='chevron-small-right'
                type='entypo'
                size={responsiveFontSize(2.5)}
                color={'black'}
              />
            </TouchableOpacity>
            <View>
              <FlatList
                data={appointment}
                initialNumToRender={3}
                renderItem={({ item, index }) => {

                  return (
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
                      <TouchableOpacity
                        onPress={() => { props.navigation.navigate("AppointmentDetails", { item: item }) }}
                        style={styles.rightButtonStyles}>
                        <Icon
                          name='arrowright'
                          type='antdesign'
                          size={responsiveFontSize(3)}
                          color={'white'}
                        />
                      </TouchableOpacity>
                    </View>
                  )
                }}
              />
            </View>

          </View>
          <View style={styles.reportView}>
            <TouchableOpacity style={styles.textView} onPress={() => { props.navigation.navigate('Report') }}>
              <Text style={styles.listText}>{'Reports'}</Text>
              <Icon
                name='chevron-small-right'
                type='entypo'
                size={responsiveFontSize(2.5)}
                color={'black'}
              />
            </TouchableOpacity>
            <View>
              <FlatList

                data={report}
                renderItem={({ item }) => {

                  return (
                    <ReportCard

                      Iconname={item.shopData.shopType === 'Bikes' ? 'bike' : 'car-outline'}
                      iconType={'material-community'}
                      carnmae={item.rider.username}
                      carno={item.automobilenum}
                      date={item.slotDate}
                      name={item.shopData.shop}
                      price={`Rs. ${item.price}`}

                      onPress={() => {
                        console.log(">>>>>");
                        props.navigation.navigate('S_ReportDetail', {
                          data: item
                        })

                      }}
                    />
                  )
                }}
              />
            </View>

          </View>
          <View style={{ height: responsiveHeight(20) }} />
        </ScrollView>
      )
      }
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}

      >
        <View style={styles.modalInner}>
          <View style={styles.modalVisible}>
            <View>

              <FlatList
                data={modalData}
                renderItem={({ item }) => {
                  return (
                    <View>
                      <View style={{ flexDirection: "row" }} >
                        <Image source={{ uri: item?.userData.userImage }} style={{
                          height: responsiveWidth(12),
                          width: responsiveWidth(12),
                          borderRadius: responsiveWidth(10),
                          backgroundColor: "red",
                          marginTop: responsiveHeight(2)
                        }} />
                        <Text style={{
                          fontSize: responsiveFontSize(2.5),
                          marginLeft: responsiveHeight(1),
                          fontWeight: "bold",
                          marginTop: responsiveHeight(2.8)
                        }}>{item?.userData?.name}
                        </Text>
                      </View>
                      {item.instantFlag === true ? (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                          <AppButton onPress={() => handleAccept(item.userData)}
                            activity={acceptFlag}
                            title={'Accept'}
                            myStyles={styles.button}
                            itsTextstyle={styles.buttonText}
                          />
                          <AppButton onPress={handleCancel}
                            title={'Cancel'}
                            myStyles={styles.button2}
                            itsTextstyle={styles.buttonText}
                          />
                        </View>
                      ) : (
                        <Text>You Accept the Instant Request </Text>
                      )}
                    </View>
                  )
                }}

              />
            </View>

          </View>
        </View>
      </Modal>
    </View >

  )
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    marginTop: responsiveHeight(6),
    width: responsiveWidth(90),
    alignSelf: "center"
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
  button: {
    width: responsiveWidth(90),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: responsiveWidth(3),
    height: responsiveHeight(7),
    marginBottom: responsiveHeight(1)
  },
  buttonText: {
    fontSize: responsiveFontSize(2),
    fontFamily: fontFamily.appTextMedium,
    color: colors.white
  },
  imageAdd: {
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
    // resizeMode: 'contain'
  },
  imageVIew: {
    backgroundColor: "#F1F6FA",
    width: responsiveWidth(22),
    height: responsiveWidth(22),
    borderRadius: responsiveWidth(22),
    alignItems: "center",
    justifyContent: "center"
  },
  Header: {
    height: responsiveHeight(6),
    marginTop: responsiveHeight(6),
    width: responsiveWidth(90),
    alignSelf: "center",
    marginBottom: responsiveHeight(2)
  },
  HeaderText: {
    fontFamily: fontFamily.appTextMedium,
    fontSize: responsiveFontSize(2),
    color: "black"
  },
  iconView: {
    backgroundColor: "rgba(1, 180, 154, 0.5)",
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: responsiveWidth(2)
  },
  headerInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  mainContainer: {
    paddingTop: responsiveHeight(2)
  },
  listText: {
    fontFamily: fontFamily.appTextMedium,
    fontSize: responsiveFontSize(1.8),
    color: "black"
  },
  textView: {
    width: responsiveWidth(90),
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
    marginTop: responsiveHeight(2)
  },
  image: {
    width: responsiveWidth(12),
    height: responsiveWidth(12),
    borderRadius: responsiveWidth(15)
  },
  flatListIconView: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
    backgroundColor: "white",
    height: responsiveWidth(18),
    width: responsiveWidth(18),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: responsiveWidth(20),
    textAlign: "center"
  },
  flatMainView: {
    width: responsiveWidth(18),
    marginRight: responsiveWidth(3),
    marginVertical: responsiveHeight(2),
    marginLeft: responsiveWidth(1),

  },
  naemText: {
    fontFamily: fontFamily.appTextMedium,
    color: 'black',
    fontSize: responsiveFontSize(1.5),
    marginTop: responsiveHeight(1),
    alignSelf: "center",
    textAlign: "center"
  },
  txtView: {
    width: responsiveWidth(90),
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
    marginTop: responsiveHeight(2)
  },
  listTxt: {
    fontFamily: fontFamily.appTextMedium,
    fontSize: responsiveFontSize(1.8),
    color: "black"
  },
  mainloc: {
    width: responsiveWidth(90),
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: 'white',
    color: 'black',
    marginTop: responsiveHeight(2)
  },
  TextLoc: {
    fontFamily: fontFamily.appTextMedium,
    fontSize: responsiveFontSize(1.8),
    color: 'black'
  },
  iconPro: {
    flexDirection: "row",
    width: responsiveWidth(22),
    justifyContent: "space-between",
    alignItems: "center"
  },
  modalView: {
    flex: 1,
    width: responsiveWidth(90),
    height: responsiveHeight(20),
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
    marginTop: 2
  },
  modalInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalVisible: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: responsiveWidth(90),
    height: responsiveHeight(60),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
    backgroundColor: "white",
  },
  acceptModal: {
    color: colors.primary,
    marginTop: 10,
    marginLeft: responsiveHeight(2),
    fontSize: responsiveFontSize(2)
  },
  cancel: {
    color: 'gray',
    marginTop: 10,
    marginRight: responsiveHeight(5),
    fontSize: responsiveFontSize(2),
  },
  button: {
    width: responsiveWidth(30),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: responsiveWidth(3),
    height: responsiveHeight(6),
    marginLeft: responsiveHeight(2),
  },
  buttonText: {
    fontSize: responsiveFontSize(1.75),
    fontFamily: fontFamily.appTextMedium,
    color: colors.white
  },
  button2: {
    width: responsiveWidth(30),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: responsiveWidth(3),
    height: responsiveHeight(6),
    marginRight: responsiveHeight(2),
    backgroundColor: "gray",
  },
  dModal: {
    width: responsiveWidth(90),
    height: responsiveHeight(30),
    backgroundColor: 'red',
    marginLeft: responsiveHeight(2),
    borderRadius: responsiveHeight(2),
    marginTop: responsiveHeight(2)
  },
  userImage: {
    height: responsiveHeight(15),
    width: responsiveWidth(35),
    borderTopRightRadius: responsiveWidth(2),
    borderTopLeftRadius: responsiveWidth(2),
    // resizeMode: "contain"
  },
  naiViewFlats: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
    backgroundColor: "white",
    marginLeft: responsiveWidth(2.5),
    width: responsiveWidth(35),
    marginBottom: responsiveHeight(5),
    marginTop: responsiveHeight(2),
    borderRadius: responsiveHeight(2),
    marginRight: responsiveWidth(1)
  },
  chatbutton: {
    width: responsiveWidth(20),
    justifyContent: "center"
  },
  innerFlatView: {
    marginBottom: responsiveHeight(2)
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
  rightButtonStyles: {
    width: responsiveWidth(12),
    height: responsiveWidth(12),
    borderRadius: responsiveWidth(12),
    backgroundColor: colors.primary,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: responsiveHeight(1)
  }

});
export default S_Home;
