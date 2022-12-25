import React from "react";
import { View,StyleSheet, Text } from "react-native";
import { colors } from "../../../globals/utilities/colors";

const Location = props => {
    return(
        <View style={styles.container}>
            <Text>Location</Text>
        </View>
    )
}
export default Location
const styles = StyleSheet.create({
    container:{
        flex:1,
         color: colors.primary,
         justifyContent:"center",
         alignItems:"center"
    }
})
