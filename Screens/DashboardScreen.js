import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DashboardScreen = ({ route }) => {
  const { username, email } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {username}</Text>
      <Text style={styles.subtitle}>Email: {email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
  },
});

export default DashboardScreen;
