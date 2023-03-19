import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from 'react-native-elements';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const AppointmentCard = ({ date, time, title }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{date}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.timeText}>{time}</Text>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: responsiveWidth(3),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 1,
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 10,
  },
  dateContainer: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dateText: {
    color: 'Black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
    padding: 10,
  },
  timeText: {
    fontSize: 16,
    color: 'white',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default AppointmentCard;