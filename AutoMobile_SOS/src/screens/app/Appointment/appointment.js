import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { colors } from 'react-native-elements';

const AppointmentScreen = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [issue, setIssue] = useState('');

  const handleSubmit = () => {
    // Send the appointment request to the mechanic here
    console.log(name, phone, vehicle, issue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />
      <Text style={styles.label}>Vehicle</Text>
      <TextInput
        style={styles.input}
        value={vehicle}
        onChangeText={setVehicle}
      />
      <Text style={styles.label}>Issue</Text>
      <TextInput
        style={styles.input}
        value={issue}
        onChangeText={setIssue}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: colors.primary,
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
});

export default AppointmentScreen;