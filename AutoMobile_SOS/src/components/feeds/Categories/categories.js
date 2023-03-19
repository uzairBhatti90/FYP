
import React from "react"
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions"
import { fontFamily, colors } from "../../../globals/utilities/index"


export const CategoriesCard = (props) => {
    const {
        cateStyle
    } = props

    return (
        <TouchableOpacity style={[styles.cate, cateStyle]}>
            <View style={styles.cateInner}>
                <Text style={styles.cateText}>Categories of Services</Text>

            </View>


        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cateStyle: {
        flex: 1,
        margin: 16,
        alignItems: 'center',
        width: responsiveWidth(20),
        height: responsiveHeight(25),
    },
    cateText: {
        fontSize: 24,
        fontWeight: '600',
        color: 'white',
    },
    cateInner: {
        height: responsiveHeight(25),
        width: responsiveWidth(45),
        marginTop: 50,
        borderRadius: 20,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
})