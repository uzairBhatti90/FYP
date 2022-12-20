import React, { useState } from "react";
import {
    StatusBar,
    Text,
    View,
    StyleSheet,
    TextInput, 
    TouchableOpacity

   
} from "react-native";

const ForgetPass = (props ) => {
    const [email,setEmail] = useState('')
    const [pass,setPassword] = useState('')
    return (
        <View style={styles.container}>
            {/* <Image style={styles.image} source={require("./assets/log2.png")} /> */}
            <Text>Forget Password</Text>

            <StatusBar style="auto" />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="New Password."
                    placeholderTextColor="#003f5c"
                    onChangeText={(password) => setEmail(password)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Confirm password."
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>

          
            <TouchableOpacity>
                <Text style={styles.forgot_button}
                >Forgot Password</Text>
            </TouchableOpacity>
     
           
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    inputView: {
        backgroundColor: "#7fffd4",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    forgot_button: {
        height: 30,
        marginBottom: 30,
       
    },


});

  export default ForgetPass;