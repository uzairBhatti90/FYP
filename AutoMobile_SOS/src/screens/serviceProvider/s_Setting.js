import React, { useState } from "react";
import { View, StyleSheet, Text, Switch, TouchableOpacity } from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { colors } from "../../../globals/utilities/colors";


const SettingOption = ({ label, value, onValueChange }) => {
  return (
    <View style={styles.settingOption}>
      <Text style={styles.settingOptionLabel}>{label}</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
};

const s_Setting = props => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleDarkModeToggle = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <SettingOption
        label="Enable Notifications"
        value={notificationsEnabled}
        onValueChange={handleNotificationsToggle}
      />
      <SettingOption
        label="Dark Mode"
        value={darkModeEnabled}
        onValueChange={handleDarkModeToggle}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}
export default s_Setting

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: responsiveHeight(30),
  },
  settingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  settingOptionLabel: {
    fontSize: 18,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})
