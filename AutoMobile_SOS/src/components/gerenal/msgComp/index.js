// import moment from 'moment';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';
// import { mdscale, vtscale } from "../../Service/PixelRatio";
import { vtscale, mdscale } from '../../../globals/utilities/pixilratio/index';
import { colors } from '../../../globals/utilities/colors';
import { fontFamily } from '../../../globals/utilities/fonts';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const MsgComponent = (props) => {
    const { colors } = useTheme();
    const { sender, item } = props;

    // style components
    const styles = StyleSheet.create({
        masBox: {
            alignSelf: 'flex-end',
            marginHorizontal: 10,
            minWidth: mdscale(80),
            maxWidth: '80%',
            paddingHorizontal: mdscale(10),
            marginVertical: mdscale(5),
            padding: mdscale(7),
            borderRadius: responsiveWidth(8),
        },
        time: {
            alignSelf: 'flex-end',
        },
        timeText: {
            fontFamily: fontFamily.gilroyMedium,
            fontSize: mdscale(10),
            borderWidth: 1,
        },
        dayview: {
            alignSelf: 'center',
            height: vtscale(30),
            width: 100,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: COLORS.white,
            borderRadius: 30,
            marginTop: mdscale(10),
        },
        left: {
            // borderBottomColor: COLORS.darksky,
            left: 2,
            bottom: 10,
            transform: [{ rotate: '0deg' }],
        },
        right: {
            borderBottomColor: 'green',
            right: 2,
            // top:0,
            bottom: 5,
            transform: [{ rotate: '103deg' }],
        },
    });

    return (
        <Pressable style={{ marginVertical: mdscale(5) }}>
            <View
                style={{
                    alignSelf: item.user.id === 1 ? 'flex-end' : 'flex-start',
                }}
            >
                {item.user.id === 1 ? (
                    <View
                        style={[
                            styles.time,
                            {
                                // flexDirection: "row",
                                alignSelf: 'flex-start',
                                // borderWidth:1,
                                // backgroundColor: sender ? '#C9C9C9' : '#DADADA'
                            },
                        ]}
                    >
                        <Text
                            style={{
                                paddingLeft: mdscale(5),
                                paddingBottom: mdscale(4),
                                color: colors.blackfont,
                                color: item.user.id === 1 ? '#BCC1C4' : '#BCC1C4',
                            }}
                        >
                            {item.time}
                        </Text>
                    </View>
                ) : null}
                {item.user.id === 2 ? (
                    <View
                        style={[
                            styles.time,
                            {
                                // flexDirection: "row",
                                alignSelf: 'flex-end',
                                // borderWidth:1,
                                // backgroundColor: sender ? '#C9C9C9' : '#DADADA'
                            },
                        ]}
                    >
                        <Text
                            style={{
                                paddingLeft: mdscale(2),
                                paddingBottom: mdscale(4),
                                color: sender ? '#BCC1C4' : '#BCC1C4',
                            }}
                        >
                            {item.time}
                        </Text>
                    </View>
                ) : null}
                <View
                    style={[
                        styles.masBox,
                        {
                            backgroundColor: item.user.id === 1 ? '#63566c' : '#fff',
                        },
                    ]}
                >
                    <Text
                        style={{
                            paddingLeft: mdscale(5),
                            fontFamily: fontFamily.gilroyMedium,
                            color: item.user.id === 1 ? "white" : 'black',
                            fontSize: mdscale(14),
                            paddingVertical: mdscale(5),
                        }}
                    >
                        {item.message}
                    </Text>
                </View>



            </View>
        </Pressable>
    );
};

export default MsgComponent;
