import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar
} from "react-native";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log('>>>>>>Signup');
  return (
    <View style={styles.container}>
      {/* <Image style={styles.image} source={require("./assets/log2.png")} /> */}

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Full Name."
          placeholderTextColor="#003f5c"
        />
      </View>
     
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Phone no."
          placeholderTextColor="#003f5c"
        />
      </View>

      <View style={styles.Style}>
        <Text style={
          styles.accountText
        }>Already have an account?
          <Text style={[styles.accountText, {
            color: "#7fffd4",
          }]}
            onPress={() => props.navigation.navigate('Login')}
          >   Login</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff5ee",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 23
  },

  image: {
    marginBottom: 40,
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
    marginTop: 40,
    marginBottom: 30,
  },

  SignupBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#7fffd4",
  },
  Style: {
    position: "absolute",
    bottom: 30,
    alignItems: "center",
    justifyContent: "center"

  },
  accountText: {
    color: "black",
    fontSize: 17,
    fontWeight: "400"
  }
});
export default Signup;
