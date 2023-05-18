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
import { getCurrentUserId } from "../../services/Backend/auth";
import { addToArray, getData } from "../../services/Backend/utility";
import { db } from "../../services/Backend/firebaseConfig";
import MsgComponent from "../../components/gerenal/msgComp";

const S_Chat = ({ route, navigation }) => {
    const { item } = route.params;
    // console.log(item, ">>>>>>>>>>>");

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const focusfordb = navigation.addListener('focus', async () => {
            db.collection("Chat").onSnapshot(() => {
                getMessages()
            })
        })
        return focusfordb
    }, [navigation])
    const getMessages = async () => {
        const uid = await getCurrentUserId();
        db.collection('Chat')
            .doc(uid)
            .onSnapshot(async function (doc) {
                await getData('Chat', item.user.userId, uid).then(async (messages) => {

                    if (messages != [] || false) {
                        // console.log({ messages }, "array of message");
                        setMessages(messages.reverse());
                    } else {
                        console.log('No message');
                    }
                });
            });
    };



    return (
        <View style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : null}>
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
                            <Image source={{ uri: item.user.photo }} style={styles.avatar} />
                            <View style={styles.mainName}>
                                <Text style={styles.name}>{item.user.username}</Text>
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
                <FlatList
                    style={{ width: '100%', height: responsiveHeight(80) }}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyInbox}>No Messages Found!!!</Text>
                    )}
                    data={messages}
                    extraData={messages}
                    keyExtractor={(item, index) => index}
                    inverted={messages.length == 0 ? false : true}
                    renderItem={({ item }) => {
                        return <MsgComponent item={item} />;
                    }}
                />
                <View style={styles.inputView}>
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder='type a message'
                            style={styles.textInputinner}
                            value={message}
                            onChangeText={(val) => {
                                setMessage(val);
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={async () => {
                            if (message !== '') {
                                let myID = await getCurrentUserId();
                                const currentUser = await getData('userData', myID);
                                let obj1 = {
                                    user: {
                                        id: 1,
                                        username: item.user.username,
                                        userId: item.user.userId,
                                        photo: item.user.photo,
                                    },
                                    message: message,
                                    time: moment(new Date()).format('hh:mm a'),
                                    timestamp: new Date(),
                                };
                                let obj2 = {
                                    user: {
                                        id: 2,
                                        username: currentUser.name,
                                        userId: currentUser.userID,
                                        photo: currentUser.image,
                                    },
                                    message: message,
                                    time: moment(new Date()).format('hh:mm a'),
                                    timestamp: new Date(),
                                };
                                await addToArray('Chat', myID, item.user.userId, obj1);
                                await addToArray('Chat', item.user.userId, myID, obj2).then(() => {
                                    setMessage('');
                                });
                            }
                        }}
                        style={styles.sendBtn}
                    >
                        <Image source={appImages.send} style={styles.sendIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
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
    },
    inputView: {
        backgroundColor: 'white',
        // height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: responsiveHeight(2),
        justifyContent: 'space-between',
        // marginHorizontal: responsiveWidth(5),
        paddingHorizontal: responsiveWidth(4),
        width: responsiveWidth(100),
    },
    emptyInbox: {
        alignSelf: 'center',
        marginTop: 40,
        fontSize: responsiveFontSize(2),
        color: colors.shadowfont,
    },
    textInput: {
        width: responsiveWidth(75),
        alignSelf: 'center',
        marginTop: responsiveHeight(0.5),
        borderRadius: responsiveWidth(10),
        backgroundColor: 'white',
        // height:responsiveHeight(7)
    },
    textInputinner: {
        width: responsiveWidth(70),
        paddingVertical: responsiveHeight(2),
        paddingLeft: responsiveWidth(6),
        color: 'black',
        fontFamily: fontFamily.appTextRegular,
    },
    sendBtn: {
        backgroundColor: colors.primary,
        borderRadius: responsiveWidth(13 / 2),
        alignItems: 'center',
        justifyContent: 'center',
        width: responsiveWidth(13),
        height: responsiveWidth(13),
    },
    sendIcon: { height: responsiveWidth(5), width: responsiveWidth(5), },
})
