import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native'
import React from 'react'
import InstantService from '../../../components/feeds/instantService'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions'
import { colors, fontFamily } from "../../../globals/utilities/index";
import BookingService from '../../../components/feeds/BookingService';
import { Icon } from 'react-native-elements';


const Service = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.Text}> What do you want?</Text>

            <TouchableOpacity>
                <InstantService
                title={"Instant Service"}
                des={"Get your instant service to solve your problem."}
                    onPress={() => { navigation.navigate('Booking') }}
                />
            </TouchableOpacity>

            <TouchableOpacity>
                <InstantService
                title={"Book Service"}
                des={'Book service according to your time and  slot'}
                    onPress={() => {navigation.navigate('ServiceBook')
                    }}
                />
            </TouchableOpacity>

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
        fontSize: responsiveFontSize(3),
        color: 'gray',
        marginLeft: responsiveHeight(9),
        fontWeight: 'bold'
    }


})