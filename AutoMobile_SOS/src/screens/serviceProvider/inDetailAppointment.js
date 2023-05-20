import React, {useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Icon } from 'react-native-elements';
import { Header } from "../../components/feeds/header";
import { listofServices, reportData, MOdalData } from '../../dataset';
import { FlatList } from 'react-native-gesture-handler';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { colors, fontFamily } from "../../globals/utilities/index";
import Geolocation from 'react-native-geolocation-service';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  PROVIDER_DEFAULT,
} from 'react-native-maps';


const InDetailsAppointment = ({navigation,route,}) => {
    const { data } = route.params 

    return (
        <View>
            <Header
                title={"Appointment Details"}
                onPress={() => { navigation.goBack() }}
            />
        <View>
            <FlatList
            data={data}
            ListFooterComponent={<View style={{
                height:responsiveHeight(30)
                }}/>}
            renderItem={({ item, index }) => {
                return(

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
                          <TouchableOpacity
                        onPress={() => { navigation.navigate("AppointmentDetails", { item: item }) }}
                        style={styles.rightButtonStyles}>
                        <Icon
                          name='arrowright'
                          type='antdesign'
                          size={responsiveFontSize(3)}
                          color={'white'}
                        />
                      </TouchableOpacity>
                          </View>
                    </View>
                    </View>

                )
            }}
            />
            </View>    
             
        </View>
    )
}

export default InDetailsAppointment;
const styles = StyleSheet.create({

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
        borderRadius: responsiveWidth(3),
        height: responsiveHeight(44),
        

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
        marginVertical: responsiveHeight(1),
        marginTop: responsiveHeight(21)
      }
})