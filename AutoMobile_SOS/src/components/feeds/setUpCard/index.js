import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, Icon, justifyContent } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { colors, fontFamily } from "../../../globals/utilities";
import style from "../../gerenal/txtinput/style";


export const SetupCard = (props) => {

    const {
        checked = false,
        onPress,
        title,
        cardStyle
    } = props

    return (
        <TouchableOpacity style={[styles.container, cardStyle]}
            activeOpacity={0.8}
            onPress={onPress}
        >
            <View style={styles.innerView}>
                <View style={styles.textView}>
                    <Text style={styles.titleText}>{title}</Text>
                    <View style={styles.iconView}>
                        <Icon
                            name="arrowright"
                            type="antdesign"
                            size={responsiveFontSize(3)}
                            color={colors.black}
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export const LocationCard = (props) => {

    const {
        onPress,
        title,
        locStyle

    } = props

    return (
        <TouchableOpacity style={[styles.loc, locStyle]}
            activeOpacity={1}
            onPress={onPress}>
            <View style={style.innerStyle}>
                <Text style={styles.TxtStyle}>{title}
                    Troubleshoot Your Car</Text>
                <Button style={styles.buttonStyle}>
                    title={'Proceed'}
                </Button>
            </View>

        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        width: responsiveWidth(88),
        backgroundColor: colors.primary,
        borderRadius: responsiveWidth(3)
    },
    innerView: {
        marginVertical: responsiveHeight(1)
    },
    iconView: {
        height: responsiveWidth(10),
        width: responsiveWidth(10),
        borderRadius: responsiveWidth(10),
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 5,
    },
    textView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: responsiveWidth(80),
        alignSelf: "center"
    },
    titleText: {
        color: "white",
        fontFamily: fontFamily.appTextMedium,
        fontSize: responsiveFontSize(2)
    },

    loc: {
        marginTop: 20,
        height: responsiveHeight(30),
        width: responsiveWidth(87),
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 5,
        backgroundColor: colors.primary,
    },
    TxtStyle: {
        fontSize: 24,
        color: colors.white,
    },
    buttonStyle: {
        fontSize: responsiveFontSize(2),
        color: colors.white,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: responsiveWidth(3),
        height: responsiveHeight(7)
    },
    innerStyle: {
        backgroundColor: colors.primary,
        borderRadius: responsiveWidth(5),
        

    },
    innerView: {
        width: responsiveWidth(88),
        backgroundColor: colors.primary,
        

    },
})