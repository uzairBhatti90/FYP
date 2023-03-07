import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, FlatList, TextInput, Image } from "react-native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import {
    GiftedChat,
    Bubble,
    Actions,
    InputToolbar,
    Send,
} from 'react-native-gifted-chat';
import { appImages, fontFamily, colors } from "../../globals/utilities/index";
import { Icon } from 'react-native-elements'
import Entypo from 'react-native-vector-icons/Entypo'
import moment from 'moment'

const S_Chat = ({route, navigation}) => {
    const {S_Chat} = route.params;
    console.log(S_Chat, ">>>>>>>>>>>");

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    function renderActions(props) {
        return (
            <>
                <Actions
                    {...props}
                    onPressActionButton={() => console.log(">>>>>>")}

                    icon={() => (
                        <View

                            style={{
                                width: responsiveWidth(8),
                                height: responsiveWidth(8),
                                alignItems: 'center',
                                justifyContent: 'center',
                                // backgroundColor: colors.job,
                                borderRadius: responsiveWidth(9),
                                marginLeft: responsiveWidth(1),
                                alignSelf: 'center',
                                marginTop: responsiveHeight(0.5)
                            }}>
                            <Entypo
                                name={'attachment'}
                                size={responsiveFontSize(2.2)}
                                color={'grey'}
                                style={{ alignSelf: 'center' }}
                            />
                        </View>
                    )}
                />
            </>
        );
    }

    const renderBubble = props => {
        // if(){}
        return (
            <View style={styles.mainBuuble}>
                <Text
                    style={
                        props.currentMessage.user._id === 1
                            ? styles.messageTime
                            : styles.messageTime2
                    }>
                    {/* {moment(item.createdAt, "HH:mm").format("LT")} */}
                    {S_Chat.time}
                </Text>
                <Bubble
                    {...props}
                    timeTextStyle={{
                        right: { color: 'white', fontFamily: fontFamily.appTextRegular },
                        left: { color: 'white', fontFamily: fontFamily.appTextRegular },
                    }}
                    wrapperStyle={{
                        left: {
                            backgroundColor: 'white',
                            borderBottomLeftRadius: responsiveWidth(2),
                            borderBottomRightRadius: responsiveWidth(5),
                            borderTopLeftRadius: responsiveWidth(2),
                            borderTopRightRadius: responsiveWidth(1),
                            padding: 4,
                        },
                        right: {
                            borderBottomLeftRadius: responsiveWidth(5),
                            borderBottomRightRadius: responsiveWidth(2),
                            borderTopLeftRadius: responsiveWidth(1),
                            borderTopRightRadius: responsiveWidth(1),
                            padding: 4,
                            backgroundColor: colors.primary,
                        },
                    }}
                    textStyle={{
                        left: {
                            color: 'black',
                            fontFamily: fontFamily.appTextRegular,
                            fontSize: responsiveFontSize(1.7)
                        },
                        right: {
                            color: '#fff',
                            fontFamily: fontFamily.appTextRegular,
                            fontSize: responsiveFontSize(1.7)
                        },
                    }}
                />
            </View>
        );
    };

    const customInputToolbar = props => {
        return (
            <InputToolbar
                {...props}
                primaryStyle={{
                    width: '90%',
                    backgroundColor: 'white',
                    alignSelf: 'center',
                    borderRadius: responsiveWidth(6),
                    alignItems: 'center',
                    bottom: responsiveHeight(-2)
                }}
                containerStyle={{
                    backgroundColor: 'transparent',
                    borderTopColor: 'transparent',
                    bottom: responsiveHeight(0.5),
                    // paddingBottom: responsiveHeight(1)
                }}
                accessoryStyle={{
                }}
            />
        );
    };

    const rendersend = props => {
        return (
            <Send {...props}>
                <View style={{
                    height: responsiveWidth(9),
                    width: responsiveWidth(9),
                    borderRadius: responsiveWidth(9),
                    backgroundColor: colors.primary,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: responsiveHeight(1),
                    marginRight: responsiveWidth(2)
                }}
                >
                    <Icon
                        name="send"
                        type="feather"
                        size={responsiveFontSize(2.4)}
                        color={'white'}
                    />
                </View>
            </Send>
        );
    };


    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])



    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <View style={styles.messagesContainer}>
            <View style={styles.mainHeader}>
                <View style={styles.innerHeader}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon
                            name={'arrowleft'}
                            type={'antdesign'}
                            color={'#000'}
                            size={responsiveFontSize(2.5)}
                        />
                    </TouchableOpacity>
                    <View style={styles.nameView}>
                        <Image source={{ uri: S_Chat.userImage }} style={styles.avatar} />
                        <View style={styles.mainName}>
                            <Text style={styles.name}>{S_Chat.name}</Text>
                        </View>
                    </View>
                    <Icon
                        name={'arrowleft'}
                        type={'antdesign'}
                        color={'#fff'}
                        size={responsiveFontSize(2.5)}
                    />
                </View>
            </View>
            <View style={{
                height: responsiveHeight(90),
                marginTop: responsiveHeight(-2),
            }}>
                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                    renderInputToolbar={customInputToolbar}
                    showAvatarForEveryMessage={true}
                    scrollToBottom
                    infiniteScroll={true}
                    renderUsernameOnMessage={true}
                    renderBubble={renderBubble}
                    placeholder={'Write a message'}
                    renderSend={rendersend}
                    alwaysShowSend
                    // renderActions={renderActions}
                    textInputStyle={{ color: '#000', marginTop: 
                    Platform.OS === 'android' ? responsiveHeight(1) : responsiveHeight(1.5) }}
                />
            </View>
            </View>
        </KeyboardAvoidingView>
    )
}
export default S_Chat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.grey,
    },
    mainHeader: {
        width: '100%',
        alignSelf: "center",
    },
    innerHeader: {
        marginTop: responsiveHeight(6),
        marginBottom: responsiveHeight(2),
        width: responsiveWidth(90),
        alignSelf: 'center',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center"
    },
    name: {
        color: '#000',
        fontFamily: fontFamily.appTextMedium,
        fontSize: responsiveFontSize(2.2),
    },
    nameView: {
        width: responsiveWidth(65),
        flexDirection: "row",
        alignItems: "center"
    },
    avatar: {
        height: responsiveWidth(12),
        width: responsiveWidth(12),
        borderRadius: responsiveWidth(15)
    },
    mainName: {
        marginLeft: responsiveWidth(3)
    }
})
