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
  onPress

} from "react-native";
import authContext from '../../context/auth/authContext'
import { getData } from '../../services/Backend/utility';
import Spinner from 'react-native-spinkit';
import { db } from '../../services/Backend/firebaseConfig';



const S_Home = (props) => {
  const AuthContext = useContext(authContext)
  const { data } = AuthContext
  const [user, setUser] = useState({})
  const [serviceData, setServiceData] = useState(listofServices)
  const [report, setReport] = useState(reportData)
  const [AppointmentCard, setAppointmentCard] = useState(AppointmentCard)
  const [loading, setLoading] = useState(true)
  const [modalData, setmodalData] = useState(MOdalData)
  useEffect(() => {
    db.collection('userData').onSnapshot(() => {
      userDataget()
    })
  }, [])

  const userDataget = async () => {
    await getData('userData', data.id).then((data) => {
      console.log(data, "?????>>>");
      setUser(data)

    }).catch(error => {
      console.log(error);
    }).finally(() => setLoading(false))
  }

  const [modalVisible, setModalVisible] = useState(false);

  const handleAccept = () => {
    console.log('User accepted');
    setModalVisible(false);
  }

  const handleCancel = () => {
    console.log('User cancelled');
    setModalVisible(false);
  }


  return (
    <View style={styles.container}>
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
          <View style={styles.Header}>
            <View style={styles.headerInner}>
              <Text style={styles.HeaderText}>{`Welcome! ${user?.name}`}</Text>
              <View style={styles.iconPro}>
                <TouchableOpacity>
                  <Icon
                    name='bell'
                    type='feather'
                    size={responsiveFontSize(3)}
                    color={'black'}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate('')}>
                  <Image source={{ uri: user?.image }} style={styles.image} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {user?.verfiy == false && (
            <SetupCard
              title={'Setup Your Profile'}
              onPress={() => { props.navigation.navigate('S_SetupProfile') }}
            />
          )}

          <View style={styles.modalView}>
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


                              <Image source={{ uri: item.userImage }} style={{
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
                              }}>{item.name}
                              </Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                              <AppButton onPress={handleCancel}
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
                          </View>
                        )
                      }}

                    />
                  </View>

                </View>
              </View>
            </Modal>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={{ marginTop: responsiveHeight(1), marginLeft: responsiveHeight(1) }}>Show Modal</Text>
            </TouchableOpacity>
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


              renderItem={({ item }) => {
                return (
                  <View style={styles.flatMainView}>
                    <View style={styles.flatListIconView}>
                      <Icon
                        name={item.iconName}
                        type={item.iconType}
                        color={colors.primary}
                        size={responsiveFontSize(4)}
                      />
                    </View>
                    <Text style={styles.naemText}>{item.name}</Text>
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
                data={modalData}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.naiViewFlats}>

                      <View style={styles.innerFlatView}>
                      <Image
                        source={{ uri: item.userImage }}
                        style={styles.userImage}
                      />
                      <Text style={{
                        fontSize: responsiveFontSize(2),
                        alignSelf: "center", color: 'black'
                      }}>{item.name}</Text>
              <AppButton
              title={'Chat'}
              myStyles={styles.chatbutton}

              />
                      </View>
                      
                    </View>

                  )

                }}
              />
            </View></View>
          < View style={styles.reportView}>
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

                      Iconname={item.car === true ? 'car-outline' : 'bike'}
                      iconType={'material-community'}
                      carnmae={item.carnmae}
                      carno={item.carno}
                      date={item.date}
                      name={item.name}
                      price={item.price}

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
        </ScrollView>
      )
      }


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
    marginBottom: responsiveHeight(5)
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
    height: responsiveHeight(10),
    width: responsiveWidth(20),
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
    borderRadius: responsiveHeight(2)
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
    width: responsiveWidth(30),
    borderRadius: responsiveWidth(2),
    resizeMode: "contain"
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
    width: responsiveWidth(30),
    marginBottom: responsiveHeight(5),
    marginTop: responsiveHeight(2),
    borderRadius: responsiveHeight(2)
  },
  chatbutton:{
    width: responsiveWidth(20),
    justifyContent:"center"
  },
  innerFlatView:{
    marginBottom:  responsiveHeight(2)
  },
  
});
export default S_Home;
