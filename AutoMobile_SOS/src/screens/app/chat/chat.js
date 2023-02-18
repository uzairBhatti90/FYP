import React, { useState, useEffect, useRoute } from "react";
import { View, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, FlatList, TextInput, Image } from "react-native";
import { colors } from "../../../globals/utilities/colors";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";


const Chat = ({ route }) => {
    const { chat } = route.params;

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([

        { id: 1, message: 'Hi there!', sentByMe: true },
        { id: 2, message: 'Hello!', sentByMe: false },
        { id: 3, message: 'How are you doing?', sentByMe: true },
        { id: 4, message: 'I am doing great. Thanks for asking!', sentByMe: false },
    ]);

    const sendMessage = () => {
        if (message.trim() !== '') {
            const newMessage = { id: messages.length + 1, message: message, sentByMe: true };
            setMessages([...messages, newMessage]);
            setMessage('');
        }
    };

    useEffect(() => {
        // Scroll to bottom when new messages are added
        flatListRef.current.scrollToEnd({ animated: true });
    }, [messages]);

    const flatListRef = React.createRef();
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <View style={styles.messagesContainer}>
                <View style={styles.Header}>
                <Image source={{ uri: chat.userImage }} style={styles.userImage} />
                <Text style={styles.name}>{chat.name}</Text>
                </View>
                <Text style={styles.mess}>Chat messages go here</Text>
                <FlatList
                    ref={flatListRef}
                    style={styles.messagesList}
                    data={messages}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={[styles.message, item.sentByMe ? styles.sentMessage : styles.receivedMessage]}>
                            <Text style={styles.messageText}>{item.message}</Text>
                        </View>
                    )}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message"
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}
export default Chat
const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        width: responsiveWidth(100),
        height: responsiveHeight(100),

    },
    Header:{
        flexDirection: "row"
    },
    messagesContainer: {
        flex: 1,
        marginTop: responsiveHeight(2),
    },
    mess: {
        marginTop: responsiveHeight(4),
        fontWeight: "bold"

    },
    messagesList: {
        flex: 1,
        padding: 16,

    },
    message: {
        padding: 8,
        borderRadius: 8,
        marginBottom: 8,
        maxWidth: '80%',
        marginTop: responsiveHeight(3)
    },
    receivedMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#ddd',
    },
    sentMessage: {
        alignSelf: 'flex-end',
        backgroundColor: colors.primary,
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    input: {
        flex: 1,
        padding: 8,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        marginRight: 8,
    },
    sendButton: {
        backgroundColor: colors.primary,
        padding: 8,
        borderRadius: 8,
    },
    sendButtonText: {
        color: 'black',
        fontSize: 16,
    },
    userImage: {
        height: responsiveHeight(6),
        width: responsiveWidth(8),
        marginTop: responsiveHeight(8),
        borderRadius: responsiveHeight(2)
    },
    name: {
        fontSize: responsiveFontSize(2.3),
        fontWeight: 'bold',
        marginBottom: responsiveHeight(4),
        marginLeft: responsiveHeight(1),
        marginTop: responsiveHeight(10)
    },

})
