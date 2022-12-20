import React,{useContext} from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { Icon } from 'react-native-elements';
import { styles } from './style'
import { authContext } from '../../../context/auth/authContext'

export const AppButton = props => {
    const {
        onPress,
        title,
        myStyles,
        iconName,
        iconType,
        itsTextstyle,
        iconColor,
        iconSize,
        disabled,
        BackiconColor,
        BackiconName,
        BackiconSize,
        BackiconType,
        activity = false,
    } = props;
   
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={[styles.container, myStyles]}
            disabled={disabled}>
            {iconName && (
                <View style={styles.IconCon}>
                    <Icon
                        name={iconName}
                        size={iconSize ? iconSize : responsiveFontSize(3.5)}
                        type={iconType}
                        color={iconColor ? iconColor : 'white'}
                    />
                </View>
            )}
            {activity ? (
                <ActivityIndicator size="small" color="white" style={[
                    styles.title,
                    {
                        width: iconName ? responsiveWidth(50) : null,
                        marginVertical: responsiveHeight(1.3)
                    },
                    itsTextstyle,
                ]} />
            ) : (
                <Text
                    style={[
                        styles.title,
                        { width: iconName ? responsiveWidth(50) : null },
                        itsTextstyle,
                    ]}>
                    {title}
                </Text>
            )}
            {BackiconName && (
                <View style={styles.IconCon}>
                    <Icon
                        name={BackiconName}
                        size={BackiconSize ? BackiconSize : responsiveFontSize(3.5)}
                        type={BackiconType}
                        color={BackiconColor ? BackiconColor : 'white'}
                    />
                </View>
            )}
        </TouchableOpacity>
    );
};