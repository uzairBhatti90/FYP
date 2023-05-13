import React, { useContext, useEffect, useState } from 'react';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { colors, fontFamily } from "../../../globals/utilities/index";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SetupCard } from '../../../components/feeds/setUpCard';
import { ReportCard } from '../../../components/feeds/reportCard/index';
import { Icon } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { listofServices, reportData } from '../../../dataset';
import authContext from '../../../context/auth/authContext'
import { getData } from '../../../services/Backend/utility'
import Spinner from 'react-native-spinkit';
import { db } from '../../../services/Backend/firebaseConfig';

const Home = (props) => {
  const AuthContext = useContext(authContext)
  const { data } = AuthContext
  console.log(data.id);
  const [option, setOption] = useState('Rider')
  // const [userName, setUserNAme] = useState('Uzair Bhatti')
  const [serviceData, setServiceData] = useState(listofServices)
  const [report, setReport] = useState(reportData)
  const [AppointmentCard, setAppointmentCard] = useState(AppointmentCard)
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    db.collection('userData').onSnapshot(() => {
      userDataget()

    }
    )
  }, [])

  async function userDataget() {
    await getData('userData', data.id).then(data => {
      console.log(data);
      setUser(data)
    }).catch(error => error).finally(() => setLoading(false))
  }

  return (
    <View style={styles.container}>
      {
        loading === true ? (
          <View style={{ alignItems: "center", justifyContent: "center", height: responsiveHeight(100) }}>
            <Spinner
              type="Pulse"
              size={responsiveFontSize(5)}
              color={colors.primary}
            />
          </View>
        ) : (
          <>
            <View style={styles.Header}>
              <View style={styles.headerInner}>
                <Text style={styles.HeaderText}>{`Welcome! ${user?.name}`}</Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('SettingStackScreens')}>
                  <Image source={{ uri: user?.image }} style={styles.image} />
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.mainContainer}>
              {user.verfiy == false && (
                <SetupCard
                  title={'Setup Your Profile'}
                  onPress={() => { props.navigation.navigate('SetupProfile') }}
                />
              )}
              <TouchableOpacity style={styles.textView}
                onPress={() => { props.navigation.navigate('CardScreen') }}
              >
                <Text style={styles.listText}>{'Services'}</Text>
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
                  scrollEnabled={false}
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
              <View style={styles.Apploc}>
                <TouchableOpacity style={styles.txtView} onPress={() => { props.navigation.navigate('AppointmentScreen') }}>
                  <Text style={styles.listTxt}>{'Appointment'}</Text>
                  <Icon
                    name='human-greeting'
                    type='material-community'
                    size={responsiveFontSize(4)}
                    color={colors.primary}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.mainloc} onPress={() => { props.navigation.navigate('Location') }}>
                  <Text style={styles.TextLoc}>{'Find Yourself'}</Text>
                  <Icon
                    name='location'
                    type='octicon'
                    size={responsiveFontSize(4)}
                    color={colors.primary}
                  />
                </TouchableOpacity>

              </View>
              <TouchableOpacity style={styles.textView} onPress={() => { props.navigation.navigate('ReportScreen') }}>
                <Text style={styles.listText}>{'Reports'}</Text>
                {/*  */}
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
                        name={item.name}
                        date={item.date}
                        price={item.price}

                        
                      onPress={() => {
                        console.log(">>>>>");
                        props.navigation.navigate('R_ReportDetail',{
                          data: item
                        })
                        
                      }}
                      />
                    )
                  }}
                />
              </View>
              <View style={{ height: responsiveHeight(25) }} />
            </ScrollView></>
        )
      }
    </View>
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
    height: responsiveHeight(7)
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
    alignSelf: "center"
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
    marginTop: responsiveHeight(2),

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
  },
  flatMainView: {
    width: responsiveWidth(18),
    marginRight: responsiveWidth(3),
    marginVertical: responsiveHeight(2),
    marginLeft: responsiveWidth(1),
    // backgroundColor:'red'
  },
  naemText: {
    fontFamily: fontFamily.appTextMedium,
    color: 'black',
    fontSize: responsiveFontSize(1.5),
    marginTop: responsiveHeight(1),
    alignSelf: "center"
  },
  txtView: {
    width: responsiveWidth(40),
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
    marginTop: responsiveHeight(2),
    height: responsiveWidth(20),
    backgroundColor: "#ffffff",
    borderRadius: responsiveWidth(2),
    marginLeft: responsiveHeight(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginBottom: responsiveHeight(1)

  },
  listTxt: {
    fontFamily: fontFamily.appTextMedium,
    fontSize: responsiveFontSize(1.8),
    color: colors.primary,
    marginLeft: responsiveHeight(1)
  },
  mainloc: {
    width: responsiveWidth(40),
    height: responsiveWidth(25),
    alignSelf: "center",
    alignItems: "center",
    color: 'black',
    marginTop: responsiveHeight(2),
    borderRadius: responsiveWidth(2),
    backgroundColor: "#ffffff",
    marginRight: responsiveHeight(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    marginBottom: responsiveHeight(1)
  },
  TextLoc: {
    fontFamily: fontFamily.appTextMedium,
    fontSize: responsiveFontSize(1.8),
    color: colors.primary,
    marginTop: responsiveHeight(2)
  },
  Apploc: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

});
export default Home;
