import React, { useEffect, useState } from 'react';
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
import { Header } from '../../components/feeds/header'
import { getCurrentUserId } from '../../services/Backend/auth'
import { db } from '../../services/Backend/firebaseConfig'
import { getData } from '../../services/Backend/utility'
import moment from 'moment'

const Notification = (props) => {

    const [messages, setMessages] = useState()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        db.collection('Notfication').onSnapshot(() => {
            getNotification()
        })
    }, [])

    const getNotification = async () => {
        const uid = await getCurrentUserId()
        await getData('Notification', uid).then((e) => {
            console.log(e.notifi);
            setData(e.notifi)
            setLoading(false)
        })
    }


    const renderMessage = ({ item, index }) => (
        <>
            <View style={styles.mainView}>
                <View style={styles.inner}>
                    <View style={styles.list}>
                        <View style={styles.conv}>
                            <View style={styles.innerConv}>
                                <Text style={styles.n_name}>{item.username}</Text>
                                <Text style={styles.Time}>{moment(item.time).format('hh:mm')}</Text>
                            </View>
                            <Text style={styles.Message}>{item.title}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.line} />
        </>
    );


    return (
        <View style={styles.container}>
            <Header
                title={'Notification'}
                onPress={() => props.navigation.goBack()}
            />
            <View style={styles.wrapper}>
                <FlatList
                    ListEmptyComponent={
                        <View>
                            <Text style={styles.no}>No Notification right now!</Text>
                        </View>
                    }
                    data={data}
                    renderItem={renderMessage}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    )
};

export default Notification;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "black",
        marginTop: responsiveHeight(3)

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
        justifyContent: "space-between",
    },
    conv: {
        width: responsiveWidth(90)
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
    wrapper: {
        width: responsiveWidth(90),
        alignSelf: "center"
    },
    no: {
        fontFamily: fontFamily.appTextMedium,
        fontSize: responsiveFontSize(2),
        color: "black",
        alignSelf: "center",
        marginTop: responsiveHeight(3)
    }
});
