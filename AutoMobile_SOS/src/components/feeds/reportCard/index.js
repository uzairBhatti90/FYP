
import React from "react"
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Icon } from "react-native-elements"
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions"
import { fontFamily, colors } from "../../../globals/utilities/index"


export const ReportCard = (props) => {
    const {
        repStyle,
        date,
        name,
        price,
        iconType,
        Iconname,
        carno,
        carnmae,
        onPress
    } = props

    return (
        <TouchableOpacity style={[styles.rep, repStyle]} onPress={onPress}>

            <View style={styles.repInner}>
                <View style={styles.repICon}>
                    <View style={styles.carDetails}>
                        <View style={styles.iconView}>
                            <Icon name={Iconname} size={responsiveFontSize(4)} type={iconType} color={colors.primary} />
                        </View>
                        <View style={{ width: responsiveWidth(65) }}>
                            <Text style={styles.nameText}>{carnmae}</Text>
                            <Text style={styles.nametext}>{carno}</Text>
                        </View>

                    </View>

                </View>
                <View style={styles.manView}>
                    <Text style={styles.nametext}>Rider</Text>
                    <Text style={styles.nameText}>{name}</Text>
                </View>
                <View style={styles.manView}>
                    <Text style={styles.nametext}>Date</Text>
                    <Text style={styles.nameText}>{date}</Text>
                </View>
                <View style={styles.manView}>
                    <Text style={styles.nametext}>Price</Text>
                    <Text style={styles.nameText}>{price}</Text>
                </View>

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
    repText: {
        fontFamily: fontFamily.appTextMedium,
        fontSize: responsiveFontSize(1.5),
        color: "black",
        marginBottom: responsiveHeight(2)

    },
    nameText: {
        fontFamily: fontFamily.appTextMedium,
        color: 'black',
        fontSize: responsiveFontSize(2),
    },
    // nameVidw: {
    //     flexDirection: "row",
    //     justifyContent: "space-between",
    //     alignItems: "center"
    // },
    manView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    iconView: {
        width: responsiveWidth(15),
        height: responsiveWidth(15),
        borderRadius: responsiveWidth(15),
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        alignItems: "center",
        justifyContent: "center",

    },
    repICon: {
        marginVertical: responsiveHeight(1)
    },
    carDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    nametext: {
        color: "#d4d8d6",
        fontFamily: fontFamily.appTextMedium,
        fontSize: responsiveFontSize(1.5),
    }
})