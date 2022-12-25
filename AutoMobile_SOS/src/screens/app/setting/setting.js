import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { colors } from "../../../globals/utilities/colors";

const Setting = props => {
    return (
        <View style={styles.container}>
            <Text>Setting</Text>
        </View>
    )
}
export default Setting
const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: colors.primary,
        justifyContent: "center",
        alignItems: "center"
    }
})
