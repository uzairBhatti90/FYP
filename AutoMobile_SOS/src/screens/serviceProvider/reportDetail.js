import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";
import { AppButton } from '../../components/gerenal/appButton';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { colors, fontFamily } from "../../globals/utilities/index";


const S_ReportDetail = (props) => {
    const { data } = props.route.params
    return (
        <View style={styles.container}>
            <View style={styles.mainHeader}>
                <View style={styles.innerHeader}></View>
                {/*Header*/}
                <View style={styles.titleView}>
                    <Text style={styles.title}>Report Details</Text>
                </View>
                <View>
                    <Image style={styles.image} source={{ uri: 'https://www.freepik.com/free-vector/statistical-analysis-man-cartoon-character-with-magnifying-glass-analyzing-data-circular-diagram-with-colorful-segments-statistics-audit-research_12083252.htm' }} />
                </View>

            </View>
        </View>
    )
}

export default S_ReportDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        fontSize: responsiveFontSize(2.2),
        color: colors.white,
        fontFamily: fontFamily.appTextSemiBold
    },
    titleView: {
        paddingTop: responsiveHeight(6),
        paddingBottom: responsiveWidth(2),
        alignItems: "center"
    },
    mainHeader: {
        backgroundColor: colors.primary,
        marginBottom: responsiveHeight(2),

    },
    innerHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: responsiveWidth(100),
        alignSelf: "center",
        alignItems: "center"
    },
    image: {
        height: responsiveWidth(60),
        width: responsiveWidth(90),
        marginTop: responsiveHeight(6)
    },
})
