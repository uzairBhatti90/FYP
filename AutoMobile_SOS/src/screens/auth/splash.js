import React, { useEffect } from "react";
import { View, StyleSheet, Text  } from "react-native";


export default function Splash(props) {
    useEffect(()=>{
        navigationScreen()
    },[])

    function navigationScreen() {
        setTimeout(() => {
            props.navigation.navigate('Login')
        }, 3000);
    }
    return (
        <View style={styles.container}>
            <Text style={styles.splashText}>Splash</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red"
    },
    splashText: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})