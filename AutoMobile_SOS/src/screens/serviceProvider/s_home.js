import React, { useState } from 'react';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { colors, fontFamily } from "../../globals/utilities/index";
import { SetupCard } from '../../components/feeds/setUpCard';
import { ReportCard } from '../../components/feeds/reportCard';
import { Icon } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { listofServices, reportData } from '../../dataset';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import style from '../../components/gerenal/txtinput/style';

const S_Home = (props) => {
  const [userName, setUserNAme] = useState('Uzair Bhatti')
  const [serviceData, setServiceData] = useState(listofServices)
  const [report, setReport] = useState(reportData)
  const [AppointmentCard, setAppointmentCard] = useState(AppointmentCard)

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.mainContainer}>
        <View style={styles.Header}>
          <View style={styles.headerInner}>
            <Text style={styles.HeaderText}>{`Welcome! ${userName}`}</Text>
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
                <Image source={{ uri: 'https://randomuser.me/api/portraits/men/11.jpg' }} style={styles.image} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <SetupCard
          title={'Setup Your Profile'}
          onPress={() => { props.navigation.navigate('S_SetupProfile') }}
        />

        <TouchableOpacity style={styles.textView}
          onPress={() => { props.navigation.navigate('CardScreen') }}
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
            ListFooterComponent={
              <View style={styles.flatMainView}>
                <TouchableOpacity onPress={() => { props.navigation.navigate('AddService') }}>
                  <View style={styles.flatListIconView}>
                    <Icon
                      name={'plus'}
                      type={'antdesign'}
                      color={colors.primary}
                      size={responsiveFontSize(3)}
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
                      size={responsiveFontSize(3)}
                    />
                  </View>
                  <Text style={styles.naemText}>{item.name}</Text>
                </View>
              )
            }}

          />

        </View>

        < View>


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
                  />
                )
              }}
            />
          </View>
          <View style={{ height: responsiveHeight(25) }} />
        </View>
      </ScrollView>

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
    width:responsiveWidth(20),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: responsiveWidth(20)
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
    alignSelf: "center"
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
  }
});
export default S_Home;
