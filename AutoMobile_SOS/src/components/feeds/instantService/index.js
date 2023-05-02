import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import { colors, fontFamily } from "../../../globals/utilities/index";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const InstantService = ({ onPress, title, des }) => {
    return (
        <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
            <View style={styles.infoContainer}>
                <Text style={styles.titleText}>{title}</Text>
                <Text style={styles.desText}>{des}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: colors.primary,
        borderRadius: responsiveWidth(3),
        marginTop: responsiveHeight(2),
        width: responsiveWidth(92),
    },
    infoContainer: {
        marginVertical: responsiveHeight(5),
        marginHorizontal: responsiveWidth(2)
    },
    titleText: {
        fontSize: responsiveFontSize(2.5),
        color: 'white',
        fontFamily: fontFamily.appTextExtraBold
    },
    desText: {
        fontSize: responsiveFontSize(2),
        color: 'white',
        marginTop: responsiveHeight(1),
        fontFamily: fontFamily.appTextMedium
    }

});

export default InstantService;