import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [userRole, setUserRole] = useState<'parent' | 'child' | null>(null);

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const user = JSON.parse(userData);
          setUserRole(user.role);
        }
      } catch (error) {
        console.error('Error getting user role:', error);
      }
    };

    getUserRole();
  }, []);

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
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/create-profile/page1')}
        >
          <Ionicons name="add-circle-outline" size={40} color="#4B50DC" />
          <Text style={styles.buttonText}>Create a profile</Text>
        </TouchableOpacity>

        {userRole === 'parent' && (
          <TouchableOpacity 
            style={styles.button}
            onPress={() => router.push('/add-child')}
          >
            <Ionicons name="person-add-outline" size={40} color="#4B50DC" />
            <Text style={styles.buttonText}>Add new Child</Text>
          </TouchableOpacity>
        )}
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
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 30,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderWidth: 2,
    borderColor: '#4B50DC',
    borderRadius: 12,
    width: '100%',
    backgroundColor: 'white',
  },
  buttonText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4B50DC',
    fontWeight: '600',
  },
});