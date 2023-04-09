import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import { colors, fontFamily } from "../../../globals/utilities/index";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const InstantService = ({onPress,title, des}) => {
    return (
        <TouchableOpacity style={styles.cardContainer}  onPress={onPress}>

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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 1,
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 10,
        marginTop: responsiveHeight(5),
        height: responsiveHeight(25)
    },
    infoContainer: {
        flex: 1,
        padding: 10,
    },
    titleText: {
        fontSize: responsiveFontSize(3),
        color: 'white',
        marginTop: responsiveHeight(2.5),
        fontWeight:'bold'    
    },
    desText:{
        fontSize: responsiveFontSize(2.5),
        color: 'white',
        marginTop: responsiveHeight(2.5) 
    }

});

export default InstantService;