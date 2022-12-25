import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { colors } from "../../../globals/utilities/colors";

const Home = props => {
    return (
        <View style={styles.container}>
            <Text>HOme</Text>
        </View>
    )
}
export default Home
const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: colors.primary,
        justifyContent: "center",
        alignItems: "center"
    }
})
