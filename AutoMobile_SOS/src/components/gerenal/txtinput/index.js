import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import {
    responsiveFontSize,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import styles from './style';
import { fontFamily, colors } from '../../../globals/utilities';

export const TxtInput = ({
    title,
    placeholder,
    onChangeText,
    MyStyles,
    value,
    itsStyle,
    iconName,
    iconType,
    error,
    iconStyles,
    iconSize,
    keyboardType,
    imageName,
    iconColor = '#2F2E41',
    apply = false,
    secureTextEntry,
    onPress,
    maxLength,
    onchange,
    numofline,
    err,
    PassName,
    PassType,
    right = false,
    left = false,
    multiline,
    editable = true,
    ...otherProps
}) => {
    return (
        <View style={[styles.mainView, MyStyles]}>
            <View style={styles.View}>
                <View style={styles.innerIcon}>
                    <Icon
                    name={iconName}
                    type={iconType}
                    size={responsiveFontSize(2.5)}
                    color={iconColor}
                    />
                    
                    <View style={styles.inputView}>
                        <TextInput
                            editable={editable}
                            placeholder={placeholder}
                            style={[styles.TxtInput, itsStyle]}
                            onChange={onchange}
                            onChangeText={onChangeText}
                            placeholderTextColor="#ccc"
                            keyboardType={keyboardType}
                            secureTextEntry={secureTextEntry}
                            maxLength={maxLength}
                            numberOfLines={numofline}
                            multiline={multiline}
                            value={value}
                            {...otherProps}
                        />
                    </View>
                </View>

                {PassName && right && (
                    <TouchableOpacity onPress={onPress} style={{marginLeft: responsiveWidth(2)}}>
                        <Icon
                            style={[iconStyles, styles.iconStyles]}
                            name={PassName}
                            type={PassType}
                            color={colors.primary}
                            size={iconSize ? iconSize : responsiveFontSize(2.5)}
                        />
                    </TouchableOpacity>
                )}
            </View>
            {error?(
                <Text style={styles.error}>{error}</Text>
            ):null}
        </View>
    );
};