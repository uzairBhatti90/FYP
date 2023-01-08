
import React from "react"
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions"
import { fontFamily, colors } from "../../../globals/utilities/index"


export const ReportCard = (props) => {
    const {
        repStyle,
        date,
        name,
        price
    } = props

    return (
        <TouchableOpacity style={[styles.rep, repStyle]}>
            <View style={styles.repInner}>
                <Text style={styles.repText}>{date}</Text>
                <View style={styles.nameVidw}>
                    <Text style={styles.nameText}>{name}</Text>
                    <Text style={styles.nameText}>{price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    rep: {
        width: responsiveWidth(90),
        backgroundColor: colors.primary,
        alignSelf: "center",
        marginTop: responsiveHeight(2),
        borderRadius: responsiveWidth(2)
    },
    repInner: {
        width: responsiveWidth(86),
        alignSelf: "center",
        marginVertical: responsiveHeight(1)
    },
    repText: {
        fontFamily: fontFamily.appTextMedium,
        fontSize: responsiveFontSize(1.5),
        color: "white"
    },
    nameText: {
        fontFamily: fontFamily.appTextMedium,
        color: 'white',
        fontSize: responsiveFontSize(2)
    },
    nameVidw: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
})