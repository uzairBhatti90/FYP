import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from 'react-native-elements';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';

const AppointmentCard = ({ date, time, title }) => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.infoContainer}>
            <Text style={styles.titleText}>Find Yourself</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: colors.primary,
        borderRadius: responsiveWidth(3),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 1,
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 10,
    },
    infoContainer: {
        flex: 1,
        padding: 10,
    },
    titleText: {
        fontSize: 20,
        fontSize: responsiveFontSize(3),
        color: 'white',
    },
});

export default AppointmentCard;