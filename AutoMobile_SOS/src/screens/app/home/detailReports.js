import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Header } from '../../../components/feeds/header';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { colors, fontFamily } from "../../../globals/utilities/index";


export default function DetailsReport({ navigation, route }) {
    const { data } = route.params
    console.log(data);
    return (
        <View style={styles.container}>
            <Header
                onPress={() => navigation.goBack()}
                title={'Report Detail'}
            />

            <View>
                <Image style={styles.imageuri} source={{ uri: 'https://img.freepik.com/free-vector/statistical-analysis-man-cartoon-character-with-magnifying-glass-analyzing-data-circular-diagram-with-colorful-segments-statistics-audit-research_335657-2698.jpg?w=740&t=st=1683307619~exp=1683308219~hmac=d9146a94e70af287134b456ae536a1d3a8774aa1af1f918177d65e87a25e27b2' }} />
            </View>

            <View style={styles.wrapper}>
                <View >
                    <Text style={styles.title}>Details</Text>
                </View>

                <View style={styles.carnmae}>
                    <Text style={styles.car}>Provider name</Text>
                    <Text style={styles.carname}>{data.shopData.shop}</Text>
                </View>

                <View style={styles.carnmae}>
                    <Text style={styles.car}>Car Number</Text>
                    <Text style={styles.carname}>{data.automobilenum}</Text>
                </View>

                <View style={styles.carnmae}>
                    <Text style={styles.car}>Date</Text>
                    <Text style={styles.carname}>{data.slotDate}</Text>
                </View>

                <View style={styles.carnmae}>
                    <Text style={styles.car}>Service Name</Text>
                    <Text style={styles.carname}>{data.selectService}</Text>
                </View>

                <View style={styles.carnmae}>
                    <Text style={styles.price}>Rs. {data.price}</Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
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
    title: {
        fontSize: responsiveFontSize(3.5),
        color: 'black',
        alignSelf: "center",
        marginTop: responsiveHeight(2)
    }, wrapper: {
        flex: 1,
        width: responsiveWidth(90),
        height: responsiveHeight(40),
        marginLeft: responsiveHeight(2),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 5,
        backgroundColor: "white",
        borderRadius: responsiveHeight(2),
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(15)
    },
    carnmae: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    car: {
        color: "black",
        fontSize: responsiveFontSize(2),
        marginLeft: responsiveHeight(2),
        marginTop: responsiveHeight(2),
        marginVertical: responsiveHeight(2)
    },
    carname: {
        fontSize: responsiveFontSize(2),
        marginRight: responsiveHeight(4),
        marginTop: responsiveHeight(2)
    },
    price: {
        fontSize: responsiveFontSize(3),
        color: "gray",
        marginTop: responsiveHeight(1),
        marginLeft: responsiveHeight(15)
    },
    imageuri: {
        height: responsiveWidth(60),
        width: responsiveWidth(90),
        marginTop: responsiveHeight(3)
    },

})