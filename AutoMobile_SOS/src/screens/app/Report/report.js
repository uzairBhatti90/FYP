import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { colors } from 'react-native-elements';

const ReportScreen = () => {
  const [riderName, setRiderName] = useState('');
  const [automobileName, setAutomobileName] = useState('');
  const [serviceProvider, setServiceProvider] = useState('');
  const [experience, setExperience] = useState('');

  const handleSubmit = () => {
    // Send the report to the server here
    console.log(riderName, automobileName, serviceProvider, experience);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Rider Name</Text>
      <TextInput
        style={styles.input}
        value={riderName}
        onChangeText={setRiderName}
      />
      <Text style={styles.label}>Automobile Name</Text>
      <TextInput
        style={styles.input}
        value={automobileName}
        onChangeText={setAutomobileName}
      />
      <Text style={styles.label}>Service Provider</Text>
      <TextInput
        style={styles.input}
        value={serviceProvider}
        onChangeText={setServiceProvider}
      />
      <Text style={styles.label}>Experience</Text>
      <TextInput
        style={styles.input}
        value={experience}
        onChangeText={setExperience}
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

export default ReportScreen;