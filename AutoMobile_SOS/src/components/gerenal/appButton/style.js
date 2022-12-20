import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import { colors } from '../../../globals/utilities';
import { fontFamily } from '../../../globals/utilities';

export const styles = {
    container: {
        marginTop: responsiveHeight(2),
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: responsiveWidth(7),
        backgroundColor: colors.primary,
        width: responsiveWidth(70),
        // justifyContent: 'space-between',

    },
    title: {
        color: 'white',
        fontSize: responsiveFontSize(1.8),
        fontFamily: fontFamily.appTextRegular,
        alignSelf: 'center',
        marginVertical: responsiveHeight(0.8),
        justifyContent: 'center',
        alignItems: "center"
    },
    IconCon: {
        width: responsiveWidth(10),
        marginLeft: responsiveWidth(3),
    },
}