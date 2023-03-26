import React, { useState } from 'react';
import { NotificationData } from '../../services/dummy/data';
import { colors } from "../../globals/utilities/colors";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { useNavigation } from '@react-navigation/native';
import { fontFamily } from "../../globals/utilities";
import {

    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image
} from "react-native";

const Notification = (props) => {
    
  const [messages, setMessages] = useState()
    const [data, setData] = useState(NotificationData)
    const navigation = useNavigation();
    const renderMessage = ({ item }) => (
        <View style={styles.mainView}>
            <View style={styles.inner}>
                    <View style={styles.list}>
                        <View style={styles.conv}>
                            <View style={styles.innerConv}>
                                <Text style={styles.n_name}>{item.n_name}</Text>
                                <Text style={styles.Time}>{item.time}</Text>
                            </View>
                            <Text style={styles.Message}>{item.Message}</Text>
                        </View>
                    </View>
                </View>
        </View>
    );


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notifications</Text>
            <FlatList
                data={NotificationData}
                renderItem={renderMessage}
                keyExtractor={item => item.id}
            />

        </View>

    )
};

export default Notification;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      message: {
        backgroundColor: '#f2f2f2',
        padding: 10,
        marginBottom: 10,
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
    n_name: {
        fontFamily: fontFamily.appTextSemiBold,
        fontSize: responsiveFontSize(2),
        color: 'black'
    },
    Time: {
        fontFamily: fontFamily.appTextRegular,
        fontSize: responsiveFontSize(1.5),
        color: 'black'
    },
    Message: {
        fontFamily: fontFamily.appTextRegular,
        fontSize: responsiveFontSize(1.5),
        color: 'grey'
    },
    });
