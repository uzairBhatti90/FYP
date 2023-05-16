import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import { Header } from '../../../components/feeds/header'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { fontFamily, colors } from "../../../globals/utilities";
import { addToArray, getAllOfCollection, getData } from "../../../services/Backend/utility";
import { db } from "../../../services/Backend/firebaseConfig";
import { getCurrentUserId } from "../../../services/Backend/auth";
import { AppButton } from "../../../components/gerenal/appButton";
import Toast from 'react-native-simple-toast'
import moment from "moment";


export default function SelectService({ navigation, route }) {
    const { shopData, data } = route.params
    const [serviceData, setServiceData] = useState([])
    const [selectedService, setSelectedService] = useState('')
    const [loading, setLoading] = useState(false)

    console.log(data, ">>>>>>>>");


    useEffect(() => {
        db.collection("SericeProvider").onSnapshot(() => {
            getServices()
        })
    }, [])

    const getServices = async () => {
        const uid = await getCurrentUserId()
        await getData('ServiceProvider', shopData.shop_id).then(data => {
            console.log(data.arr);
            setServiceData(data.arr)
        })
    }


    const select = async () => {
        console.log(">>>>>>");
        if (selectedService == '') {
            Toast.show('Select your service', Toast.LONG)
        } else {
            setLoading(true)
            const uid = await getCurrentUserId()
            let obj = {
                selectService: selectedService,
                shopData: shopData,
                createdAt: Date.now(),
                slotTime: data?.slotTime.time,
                slotDate: moment(data?.slotDate).format('DD-MM-YYYY'),
                userID: uid
            }
            console.log(obj);

            await addToArray('Appointment', shopData.shop_id, uid, obj).then(async () => {
                await addToArray('Appointment', uid, shopData.shop_id, obj)
            }).then(async () => {
                const currentUser = await getData("userData", uid)
                await addToArray("Notification", shopData.shop_id, 'notifi', {
                    title: `${currentUser.name} booked your service ${selectedService} on ${moment(data?.slotDate).format('DD-MM-YYYY')}`,
                    time: Date.now(),
                    username: currentUser.name,
                    userid: currentUser.userID,
                }).then(async () => {
                    addToArray("Notification", uid, 'notifi', {
                        title: `${selectedService} booked from service provider ${shopData.shop} on ${moment(data?.slotDate).format('DD-MM-YYYY')}`,
                        time: Date.now(),
                        username: shopData.shop,
                        userid: shopData.shop_id,
                    })
                })
            })
                .finally(() => {
                    setLoading(false)
                    Toast.show("Booking Successfully", Toast.LONG)
                    navigation.navigate('HomeStackScreens', {
                        screen: 'S_Home'
                    })
                })

        }

    }


    return (
        <View style={styles.container}>
            <Header
                title={'Select Your Service'}
                onPress={() => navigation.goBack()}
            />
            <View style={styles.wrapper}>
                <Text style={styles.serviceText}>{`Service offer from ${shopData.shop}`}</Text>
                <View style={styles.flatView}>
                    <FlatList
                        data={serviceData}
                        numColumns={2}
                        ListEmptyComponent={
                            <View>
                                <Text style={styles.serviceText}>No Service Available</Text>
                            </View>
                        }
                        renderItem={({ item, index }) => {
                            const backgroundColors = ['#F5A9BC', '#B4EEB4', '#D8D109'];
                            const backgroundColor = backgroundColors[index % backgroundColors.length];
                            return (
                                <TouchableOpacity style={item.flag == true ? styles.select : styles.mainView}
                                    onPress={() => {
                                        let arr = [...serviceData]
                                        arr.map((_item, _index) => {
                                            if (index === _index) {
                                                _item['flag'] = true
                                            } else {
                                                _item['flag'] = false
                                            }
                                        })
                                        setServiceData(arr)
                                        setSelectedService(item.ServiceType)
                                    }}
                                >
                                    <View style={[styles.innerFlatView, { backgroundColor }]}>
                                    </View>
                                    <Text style={styles.serviceText2}>{item.ServiceType}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>

            </View>
            <AppButton
                title={'Submit Your Booking'}
                myStyles={styles.button}
                onPress={() => select()}
                activity={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    wrapper: {
        width: responsiveWidth(90),
        alignSelf: "center",
        marginTop: responsiveHeight(2)
    },
    serviceText: {
        fontFamily: fontFamily.appTextMedium,
        fontSize: responsiveFontSize(2),
        color: 'black'
    },
    mainView: {
        width: responsiveWidth(40),
        marginTop: responsiveHeight(2),
        marginRight: responsiveWidth(5),
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        backgroundColor: 'white',
        borderRadius: responsiveWidth(3),
        marginLeft: 3,
        marginBottom: 5
    },
    select: {
        width: responsiveWidth(40),
        marginTop: responsiveHeight(2),
        marginRight: responsiveWidth(5),
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        backgroundColor: colors.primary,
        borderRadius: responsiveWidth(3),
        marginLeft: 3,
        marginBottom: 5
    },
    innerFlatView: {
        height: responsiveHeight(10),
        width: responsiveWidth(30),
        borderRadius: responsiveWidth(3),
        marginVertical: 10
    },
    serviceText2: {
        fontFamily: fontFamily.appTextMedium,
        fontSize: responsiveFontSize(1.8),
        color: 'black'
    },
    button: {
        width: responsiveWidth(90),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: responsiveWidth(3),
        height: responsiveHeight(7),
        position: "absolute",
        bottom: responsiveHeight(4)
    },
})