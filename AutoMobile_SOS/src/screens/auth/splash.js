import React, { useEffect, useContext, useState } from 'react';
import { View, StyleSheet, StatusBar, Text, Image } from 'react-native';
import authContext from '../../context/auth/authContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsiveWidth } from 'react-native-responsive-dimensions'

export default function Splash({ navigation }) {
  const [session, setSession] = useState(false)
  const AuthContext = useContext(authContext)
  const { addAuth } = AuthContext

  useEffect(() => {
    setTimeout(() => {
      checkUser()
    }, 3000);
  }, [])

  const checkUser = async () => {
    try {
      const value = await AsyncStorage.getItem('userData')
      if (value == null) {
        navigation.navigate("Login")
      } else {
        setSession(true)
        const { userID, category } = JSON.parse(value)
        if (category == 'Provider') {
          addAuth(userID, category)
          navigation.navigate('Provider')
        } else if (category == 'Rider') {
          addAuth(userID, category)
          navigation.navigate('App')
        }
        // addAuth(userID, category)
        // console.log(userID, category);
      }

    } catch (error) {
      alert(error)
    }
  }


  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'} />

      <Image
        source={require('../../res/images/logo.jpeg')}
        style={styles.Image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: "center",
    alignItems: "center"

  },
  splashText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "black"
  },
  Image: {
    width: responsiveWidth(80),
    height: responsiveWidth(80)
  }
});
