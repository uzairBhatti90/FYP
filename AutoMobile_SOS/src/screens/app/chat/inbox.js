import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, FlatList, TextInput, Image } from "react-native";
import { colors } from "../../../globals/utilities/colors";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { IbData } from "../../../services/dummy/data";
import { useNavigation } from '@react-navigation/native';
import { fontFamily } from "../../../globals/utilities";

const Inbox = props => {
    const [data, setData] = useState(IbData)
    const navigation = useNavigation();

    const navigateToChatScreen = (chat) => {
        navigation.navigate('Chat', { chat });
    };

    const renderChatItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigateToChatScreen(item)} style={styles.mainView}>
                <View style={styles.inner}>
                    <View style={styles.list}>
                        <Image source={{ uri: item.userImage }} style={styles.userImage} />
                        {/* <View style={styles.conv}>
                            
                            
                        </View> */}
                        <View style={styles.conv}>
                            <View style={styles.innerConv}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.Time}>{item.time}</Text>
                            </View>
                            <Text style={styles.LastMessage}>{item.lastMessage}</Text>
                        </View>

                    </View>
                    {/*   */}
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
                data={IbData}
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
