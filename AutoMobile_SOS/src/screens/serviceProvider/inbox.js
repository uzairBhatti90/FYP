import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, FlatList, TextInput, Image } from "react-native";
import { colors } from "../../globals/utilities/colors";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { IbData } from "../../services/dummy/data";
import { useNavigation } from '@react-navigation/native';

const Inbox = props => {
    const [data, setData] = useState(IbData)
    const navigation = useNavigation();

    const navigateToChatScreen = (S_Chat) => {
        navigation.navigate('S_Chat', { S_Chat });
    };

    const renderChatItem = ({ item  }) => {
        return (
            <TouchableOpacity onPress={() => navigateToChatScreen(item)}>
                <View style={styles.conversation}>
                    <View style={styles.list}>
                        <Image source={{ uri: item.userImage }} style={styles.userImage} />
                        <View style={styles.conv}>
                            <Text style={styles.name}>{item.name}</Text>
                        </View>
                        <Text style={styles.LastMessage}>{item.LastMessage}</Text>
                    </View>
                    <Text style={styles.Time}>{item.time}</Text>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <View style={styles.container}>
            {/*Header*/}
            <Text style={styles.title}>Inbox</Text>
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
        color: colors.primary,
        justifyContent: "center",
        alignItems: "center",
    },
    list: {
        flexDirection: "row",
    },
    title: {
        fontSize: responsiveFontSize(5),
        color: colors.primary,
        marginTop: responsiveHeight(5),
        marginBottom: responsiveHeight(5),
    },
    conv: {
        flexDirection: "row",

    },
    conversation: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: colors.primary,
        marginRight: responsiveHeight(20),
        width: responsiveWidth(100)
    },
    userImage: {
        height: responsiveHeight(6),
        width: responsiveWidth(9),
        borderRadius: responsiveWidth(5),
        borderRadius: responsiveHeight(4),
        marginLeft: responsiveHeight(3),
        marginTop:responsiveHeight(2.5)
    },
    name: {
        fontSize: responsiveFontSize(2.3),
        fontWeight: 'bold',
        marginBottom: 4,
        marginLeft: responsiveHeight(1),
        marginTop:responsiveHeight(5)
    },
    LastMessage: {
        fontSize: responsiveFontSize(2),
        color: colors.primary,
        marginLeft: responsiveHeight(7),
        alignItems: 'flex-end'


    },
    Time: {
        fontSize: responsiveFontSize(1.75),
        color: colors.primary,
        marginLeft: responsiveHeight(40),
    },

})
