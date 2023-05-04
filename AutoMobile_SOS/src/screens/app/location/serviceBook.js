import { View, Text, StyleSheet } from 'react-native'
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

const ServiceBook = ({ navigation, route }) => {
    const { shopData } = route.params
    const [date, setDate] = useState('')
    const [slot, setSlotes] = useState("")
    const [loading, setLoading] = useState(false)
    let datesWhitelist = [{
        start: moment(),
        end: moment().add(3, 'days')  // total 4 days enabled
    }];
    let datesBlacklist = [moment().add(1, 'days')]; // 1 day disabled


    const bookService = () => {
        if (date == '') {
            Toast.show("Please Select suitable Date", Toast.LONG)
        } else if (slot == '') {
            Toast.show("Please Select suitable Date", Toast.LONG)
        } else {

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

                    }}

                />
            </View>
            <Text style={styles.slot}> Booking slots</Text>
            <FlatList
                data={slotData}
                renderItem={({ item }) => {
                    return (
                        <Slot
                            time={item.time}
                        />
                    )
                }}
            />
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
    }

})