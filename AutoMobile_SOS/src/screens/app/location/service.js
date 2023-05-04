import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native'
import React from 'react'
import InstantService from '../../../components/feeds/instantService'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions'
import { colors, fontFamily } from "../../../globals/utilities/index";
import BookingService from '../../../components/feeds/BookingService';
import { Icon } from 'react-native-elements';


const Service = ({ navigation, route }) => {
    const { data } = route.params



    return (
        <View style={styles.container}>
            <View style={styles.textView}>
                <Text style={styles.Text}> What do you want?</Text>

            </View>
            <View style={styles.wrapper}>
                <InstantService
                    title={"Instant Service"}
                    des={"Get your instant service to solve your problem."}
                    onPress={() => {
                        navigation.navigate('Booking', {
                            shopData: data
                        })
                    }}
                />

                <InstantService
                    title={"Book Service"}
                    des={'Book service according to your time & slot.'}
                    onPress={() => {
                        navigation.navigate('ServiceBook', {
                            shopData: data
                        })
                    }}
                />
            </View>

        </View>
    )
}

export default Service

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    Text: {
        marginTop: responsiveHeight(8),
        fontSize: responsiveFontSize(2.5),
        color: colors.primary,
        fontFamily: fontFamily.appTextMedium
    },
    textView: {
        width: responsiveWidth(96),
        alignSelf: "center"
    },
    wrapper: {
        width: responsiveWidth(93),
        alignSelf: "center"
    }

})