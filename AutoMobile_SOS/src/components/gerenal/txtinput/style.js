import { Platform, StyleSheet } from 'react-native';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
    colors,
    fontFamily,
} from '../../../globals/utilities/index';

export default StyleSheet.create({
    mainView: {
        width: responsiveWidth(90),
        alignSelf: 'center',
        backgroundColor: colors.grey,
        marginVertical: responsiveHeight(1)
    },
    innerView: {
        paddingHorizontal: responsiveHeight(1),
        flexDirection: 'row',
        paddingLeft: responsiveWidth(3),
        alignItems: 'center',
    },
    titleText: {
        fontSize: responsiveFontSize(1.3),
        color: colors.grey,
        fontFamily: fontFamily.appTextSemiBold,
        paddingLeft: responsiveWidth(2),
    },
    TxtInput: {
        color: colors.grey,
        fontFamily: fontFamily.appTextRegular,
        fontSize: responsiveFontSize(1.7),
        marginLeft: Platform.OS === 'android'? responsiveWidth(2):responsiveWidth(4)
    },
    inputView: {
        flexDirection: 'row',
        alignSelf: "center",

    },
    View: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconStyles:{
        paddingRight: responsiveWidth(3)
    },
    error:{
        color:'red',
        fontSize: responsiveFontSize(1.6),
        fontFamily: fontFamily.appTextMedium,
        marginLeft: responsiveWidth(2),
        padding: 3
    },
    innerIcon:{
        flexDirection:'row',
        alignItems:"center",
        marginLeft: responsiveWidth(3)
    }
});