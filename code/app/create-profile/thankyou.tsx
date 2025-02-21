import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ThankYou() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <View style={styles.iconContainer}>
            <Ionicons name="home" size={24} color="#333" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.iconContainer}>
            <Ionicons name="search" size={24} color="#333" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Thank you for sharing</Text>
        <Text style={styles.message}>
          You're in good hands. We are not born with instruction manuals. We all lead ourselves to some extent. We think we know what we want.
        </Text>
        <Text style={styles.submessage}>
          Future leaders aims to create long-term results through habit and behavior change, not by imposing too many rules and regulations.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/home')}
        >
          <Text style={styles.buttonText}>Continue to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  iconContainer: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: '#444',
    textAlign: 'center',
  },
  submessage: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 40,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#4B50DC',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});