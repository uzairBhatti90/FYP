import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar, Text } from 'react-native';

export default function Splash(props) {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('Login');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'} />

      <Text style={styles.splashText}>{'AutoMobile SOS'}</Text>
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
});
