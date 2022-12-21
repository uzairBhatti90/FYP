import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions";
import { colors, fontFamily } from "../../../globals/utilities";


export const RadioBtn = (props) => {

    const {
        checked = false,
        onPress,
        title,
        myRadioStyle
    } = props

    return (
        <View style={[styles.container,myRadioStyle]}>
            <TouchableOpacity style={styles.iconView} onPress={onPress}>
                {checked === true ? (
                    <Icon
                        name="radio-btn-active"
                        type="fontisto"
                        size={responsiveFontSize(3)}
                        color={colors.primary}
                    />
                ) : (
                    <Icon
                        name="radio-btn-passive"
                        type="fontisto"
                        size={responsiveFontSize(3)}
                        color={colors.primary}
                    />
                )}
            </TouchableOpacity>
            <Text style={styles.titleText}>{title}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    iconView: {
        alignSelf: "flex-start"
    },
    titleText: {
        fontSize: responsiveFontSize(1.6),
        fontFamily: fontFamily.appTextMedium,
        color:'grey',
        marginLeft: responsiveWidth(2)
    },
    container:{
        flexDirection:"row",
        alignItems:"center"
    }
})