
import React from "react"
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Icon } from "react-native-elements"
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions"
import { fontFamily, colors } from "../../../globals/utilities/index"


export const Slot = (props) => {
    const {
        time
    } = props

    return (
        <TouchableOpacity style={[styles.rep, ]}>
            <View style={styles.repInner}>
                <Text style = {styles.Time}>{time}</Text>
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    rep: {
        width: responsiveWidth(90),
        backgroundColor: "#ffffff",
        alignSelf: "center",
        marginTop: responsiveHeight(2),
        borderRadius: responsiveWidth(2),
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
    repInner: {
        width: responsiveWidth(86),
        alignSelf: "center",
        marginVertical: responsiveHeight(2),
    },
    Time:{
        fontFamily: fontFamily.appTextMedium,
        color: 'black',
        fontSize: responsiveFontSize(2),
    }


})