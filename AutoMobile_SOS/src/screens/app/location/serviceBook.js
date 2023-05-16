import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Header } from "../../../components/feeds/header";
import { colors } from '../../../globals/utilities';
import { Button, Icon } from "react-native-elements";
import { fontFamily } from '../../../globals/utilities';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import CalendarStrip from "react-native-calendar-strip"
import moment from 'moment';
import { color } from 'react-native-elements/dist/helpers';
import { Slot } from '../../../components/feeds/Slot';
import dataset, { slotData } from '../../../dataset/index'
import { FlatList } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast'
import { AppButton } from '../../../components/gerenal/appButton';
import { getCurrentUserId } from '../../../services/Backend/auth'
import { addToArray, getData, saveData } from '../../../services/Backend/utility'

const ServiceBook = ({ navigation, route }) => {
    const { shopData } = route.params
    console.log(shopData);
    const [data, setData] = useState(slotData)
    const [date, setDate] = useState('')
    const [slot, setSlotes] = useState("")
    const [loading, setLoading] = useState(false)
    let datesWhitelist = [{
        start: moment(),
        end: moment().add(6, 'days')  // total 4 days enabled
    }];
    let datesBlacklist = [moment().add(0, 'days'), moment().add(3, "days")]; // 1 day disabled


    const bookService = async () => {

        if (date == '') {
            Toast.show("Please Select suitable Date", Toast.LONG)
        } else if (slot == '') {
            Toast.show("Please Select suitable Slot", Toast.LONG)
        } else {
            const uid = await getCurrentUserId()
            const userData = await getData('userData', uid)
            let obj = {
                shop_id: shopData.shop_id,
                shopname: shopData.shop,
                user: {
                    userID: userData.userID,
                    username: userData.name,
                    photo: userData.image
                },
                slotTime: slot,
                slotDate: date
            }
            navigation.navigate('SelectService', {
                data: obj,
                shopData
            })
        }
    }


    return (
        <View style={styles.container}>
            <Header
                onPress={() => navigation.goBack()}
                title={'Book Service'}
            />
            <View style={styles.calenderMainVIew}>
                <CalendarStrip
                    calendarAnimation={{ type: 'sequence', duration: 30 }}
                    daySelectionAnimation={{ type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white' }}
                    style={{ height: 100, paddingTop: 20, paddingBottom: 10, marginTop: responsiveHeight(1) }}
                    calendarHeaderStyle={{ color: 'white' }}
                    calendarColor={colors.primary}
                    dateNumberStyle={{ color: 'white' }}
                    dateNameStyle={{ color: 'white' }}
                    highlightDateNumberStyle={{ color: 'white' }}
                    highlightDateNameStyle={{ color: 'white' }}
                    disabledDateNameStyle={{ color: 'grey' }}
                    disabledDateNumberStyle={{ color: 'grey' }}
                    datesWhitelist={datesWhitelist}
                    datesBlacklist={datesBlacklist}
                    iconContainer={{ flex: 0.1 }}
                    onDateSelected={(item) => {
                        console.log(item);
                        setDate(item)
                    }}

                />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.slot}> Booking slots</Text>
                <FlatList
                    scrollEnabled={false}
                    data={data}
                    renderItem={({ item, index }) => {
                        return (
                            <Slot
                                time={item.time}
                                flag={item.flag}
                                onPress={() => {
                                    let arr = [...data]
                                    arr.map((_item, _index) => {
                                        if (index === _index) {
                                            _item['flag'] = true
                                        } else {
                                            _item['flag'] = false
                                        }
                                    })
                                    setData(arr)
                                    setSlotes(item)
                                    // setGenderID(item.genderid)
                                }}
                            />
                        )
                    }}
                />
                <AppButton
                    title="Book Service"
                    myStyles={styles.button}
                    onPress={() => bookService()}
                />
                <View style={{ height: responsiveHeight(20) }} />
            </ScrollView>
        </View>
    )
}

export default ServiceBook

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: responsiveWidth(100),

    },
    calenderMainVIew: {
        width: responsiveWidth(100),
        height: responsiveHeight(18),

    },
    slot: {
        fontSize: responsiveFontSize(3),
        fontWeight: 'bold',
        color: 'black',
        marginLeft: responsiveHeight(2)
    },
    button: {
        width: responsiveWidth(90),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: responsiveWidth(3),
        height: responsiveHeight(7)
    },

})