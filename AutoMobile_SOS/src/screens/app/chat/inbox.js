import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Text, TouchableOpacity, FlatList, TextInput, Image } from "react-native";
import { colors } from "../../../globals/utilities/colors";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { IbData } from "../../../services/dummy/data";
import { useNavigation } from '@react-navigation/native';
import { fontFamily } from "../../../globals/utilities";
import { getCurrentUserId } from "../../../services/Backend/auth";
import { db } from "../../../services/Backend/firebaseConfig";
import { getData } from "../../../services/Backend/utility";


const Inbox = props => {
    const [data, setData] = useState([])
    const navigation = useNavigation();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true)

    const navigateToChatScreen = (item) => {
        navigation.navigate('Chat', { item });
    };

    useEffect(() => {
        getChats()
    }, [])

    const getChats = async () => {
        const userID = await getCurrentUserId()

        db.collection('Chat')
            .doc(userID)
            .onSnapshot(async function (doc) {
                let chatData = await getData('Chat', userID)
                if (chatData == false) {
                    setLoading(false)
                    setData([])
                } else {
                    let keys = Object.keys(chatData)
                    let arr = []
                    keys.forEach(item => {
                        let Array = chatData[item]
                        let userData = Array.filter(val => val.user.userId !== userID)
                        let newArr = userData.slice(-1)[0]
                        arr.push(newArr)
                    })
                    setData(arr)
                    setLoading(false)
                }
            })
    }


    const renderChatItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigateToChatScreen(item)} style={styles.mainView}>
                <View style={styles.inner}>
                    <View style={styles.list}>
                        <Image source={{ uri: item.user.photo }} style={styles.userImage} />
                        <View style={styles.conv}>
                            <View style={styles.innerConv}>
                                <Text style={styles.name}>{item.user.username}</Text>
                                <Text style={styles.Time}>{item.time}</Text>
                            </View>
                            <Text style={styles.LastMessage}>{item.message}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };


    return (
        <View style={styles.container}>
            {/*Header*/}
            <View style={styles.titleView}>
                <Text style={styles.title}>Inbox</Text>
            </View>
            {/*FlatList*/}
            <FlatList
                data={data}
                renderItem={renderChatItem}
                keyExtractor={item => item.id}
            />

        </View>
    )
}
export default Inbox
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        fontSize: responsiveFontSize(2.2),
        color: colors.black,
        fontFamily: fontFamily.appTextSemiBold
    },
    titleView: {
        paddingTop: responsiveHeight(6),
        paddingBottom: responsiveWidth(2),
        alignItems: "center"
    },
    mainView: {
        width: responsiveWidth(90),
        alignSelf: "center"
    },
    userImage: {
        width: responsiveWidth(15),
        height: responsiveWidth(15),
        borderRadius: responsiveWidth(15)
    },
    inner: {
        marginVertical: responsiveHeight(1)
    },
    list: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    conv: {
        width: responsiveWidth(70)
    },
    innerConv: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    name: {
        fontFamily: fontFamily.appTextSemiBold,
        fontSize: responsiveFontSize(2),
        color: 'black'
    },
    Time: {
        fontFamily: fontFamily.appTextRegular,
        fontSize: responsiveFontSize(1.5),
        color: 'black'
    },
    LastMessage: {
        fontFamily: fontFamily.appTextRegular,
        fontSize: responsiveFontSize(1.5),
        color: 'grey'
    }
})
