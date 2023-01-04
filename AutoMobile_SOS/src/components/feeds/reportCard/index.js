
import React from "react"
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions"
import { fontFamily, colors } from "../../../globals/utilities/index"


export const ReportCard = (props) => {
    const {
        repStyle
    } = props

    return (
        <TouchableOpacity style={[styles.rep, repStyle]}>
            <View style={styles.repInner}>
                <Text style={styles.repText}>report</Text>

            </View>


        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    repStyle: {
        flex: 1,
        margin: 16,
        alignItems: 'center',
        width: responsiveWidth(20),
        height: responsiveHeight(25),

    },

    repText: {
        fontSize: 24,
        fontWeight: '600',
        color: 'white',
    },
    repInner: {
        height: responsiveHeight(25),
        width: responsiveWidth(45),
        marginTop: 50,
        borderRadius: 15,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
})