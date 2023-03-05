import React from "react";
import { StyleSheet, View } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { colors } from "../../../globals/utilities/index";
import Spinner from 'react-native-spinkit';



export default LoadingComp = props => {
    const {
        loading = false

    } = props

    console.log(loading);
    return (
        <View style={styles.container}>
            {loading === true ? (
                <>
                    {/* <PulseLoader size={responsiveFontSize(10)} color={colors.primary} frequency={1500} /> */}
                    <Spinner type={'Pulse'} color={colors.primary} size={responsiveFontSize(10)} />
                </>
            ) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})