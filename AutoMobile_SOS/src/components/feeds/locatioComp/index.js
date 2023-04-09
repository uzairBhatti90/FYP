import React from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { fontFamily } from "../../../globals/utilities";


export function LocationComp({
    shopName,
    type,
    onPress
}) {
    return (
        <TouchableOpacity style={styles.mainView} onPress={onPress}>
            <View style={styles.inner}>
                <View style={styles.imageView}>
                    <Image
                        style={styles.imageIcon}
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPhXw72ZwDlEO1Uc7O2Z-69oGoNIvcBJsHPg&usqp=CAU' }} />
                </View>
                <View>
                    <Text style={styles.name}>{shopName}</Text>
                    <Text style={styles.type}>{type}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    mainView: {
        width: responsiveWidth(40),
        marginRight: responsiveWidth(3),
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        borderRadius: responsiveWidth(3),
        marginBottom: 5,
        marginLeft: responsiveWidth(1)
    },
    inner: {
        marginVertical: responsiveHeight(2),
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: responsiveWidth(1)
    },
    imageIcon: {
        width: responsiveWidth(12),
        height: responsiveWidth(12),
    },
    name: {
        fontFamily: fontFamily.appTextMedium,
        fontSize: responsiveFontSize(1.6),
        color: 'black'
    },
    type: {
        fontFamily: fontFamily.appTextRegular,
        fontSize: responsiveFontSize(1.4),
        color: 'grey'
    }
})