import React from "react";
import { View,StyleSheet, Text } from "react-native";
import { colors } from "../../../globals/utilities/colors";

const Inbox = props => {
    return(
        <View style={styles.container}>
            <Text>Inbox</Text>
        </View>
    )
}
export default Inbox
const styles = StyleSheet.create({
    container:{
        flex:1,
         color: colors.primary,
         justifyContent:"center",
         alignItems:"center"
    }
})
