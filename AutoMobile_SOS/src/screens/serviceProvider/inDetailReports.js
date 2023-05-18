import React from "react";
import { StyleSheet, View, FlatList, Text, ScrollView } from "react-native";
import { Header } from "../../components/feeds/header";
import { ReportCard } from "../../components/feeds/reportCard";


export default function InDetailReports({ navigation, route }) {
    const { data } = route.params
    return (
        <View styles={styles.container}>
            <Header
                title={'Reports'}
                onPress={() => navigation.goBack()}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    data={data}
                    scrollEnabled={false}
                    renderItem={({ item, index }) => (
                        <ReportCard
                            Iconname={item.shopData.shopType === 'Bikes' ? 'bike' : 'car-outline'}
                            iconType={'material-community'}
                            carnmae={item.shopData.shop}
                            carno={item.selectService}
                            name={item.rider.username}
                            date={item.slotDate}
                            price={item.price}


                            onPress={() => {
                                console.log(">>>>>");
                                navigation.navigate('S_ReportDetail', {
                                    data: item
                                })

                            }}
                        />
                    )}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    }
})