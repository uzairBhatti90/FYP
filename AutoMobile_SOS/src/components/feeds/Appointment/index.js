
import React from "react"
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions"
import { fontFamily, colors } from "../../../globals/utilities/index"


export const AppointmentCard = (props) => {
    const {
        appointStyle
    } = props

    return (
        <TouchableOpacity style={[styles.appoint, appointStyle]}>
            <View style={styles.appointInner}>
                <Text style={styles.AppointText}>Appointment</Text>

            </View>


        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    appointStyle: {
        flex: 1,
        margin: 16,
        flexDirection: 'row',
        alignItems: 'center',
        width: responsiveWidth(20),
        height: responsiveHeight(25),

    },

    AppointText: {
        fontSize: 24,
        fontWeight: '600',
        color: 'white',
    },
    appointInner: {
        height: responsiveHeight(25),
        width: responsiveWidth(45),
        marginTop: 50,
        borderRadius: 15,
        paddingTop: 20,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
})