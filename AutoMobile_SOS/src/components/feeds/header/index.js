import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { colors, fontFamily } from "../../../globals/utilities";
import { Icon } from "react-native-elements";

export function Header({
    title, onPress
}) {
    return (
        <View style={styles.mainHeader}>
            <View style={styles.innerHeader}>
                <TouchableOpacity onPress={onPress}>
                    <Icon
                        name="arrowleft"
                        type="ant-design"
                        size={responsiveFontSize(2.5)}
                        color={'white'}
                    />
                </TouchableOpacity>
                <Text style={styles.textstyle}>{title}s</Text>
                <Icon
                    name="arrowleft"
                    type="ant-design"
                    size={responsiveFontSize(2.5)}
                    color={colors.primary}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainHeader: {
        backgroundColor: colors.primary,
        width: '100%'

    },
    innerHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: responsiveWidth(90),
        alignSelf: "center",
        alignItems: "center",
        marginTop: responsiveHeight(6),
        marginBottom: responsiveHeight(2)
    },
    textstyle: {
        fontFamily: fontFamily.appTextMedium,
        fontSize: responsiveFontSize(2),
        color: 'white'
    }
})