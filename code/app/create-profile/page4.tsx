import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const options = [
  'Social Relationships - Peers',
  'Social Relationships - Authority figures',
  'Building trust - especially broken relationships',
  'Managing conflicts',
  'Flexibility and Time Management',
  'Giving and receiving feedback',
  'Active Listening',
  'Self Awareness',
  'Decision making',
  'Growth Mindset',
  'Anger Management',
  'Continuous learning'
];

export default function Page4() {
  const [selected, setSelected] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = async () => {
    if (!selected) return;

    setIsSubmitting(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const leadershipGoal = await AsyncStorage.getItem('profile_leadershipGoal');
      const gender = await AsyncStorage.getItem('profile_gender');
      const ageGroup = await AsyncStorage.getItem('profile_ageGroup');

      if (!token) {
        throw new Error('Not authenticated');
      }

      const response = await fetch('http://192.168.24.240:5000/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          focusArea: selected,
          leadershipGoal,
          gender,
          ageGroup
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save profile');
      }

      // Clear profile data from storage after successful submission
      await Promise.all([
        AsyncStorage.removeItem('profile_leadershipGoal'),
        AsyncStorage.removeItem('profile_gender'),
        AsyncStorage.removeItem('profile_ageGroup')
      ]);

      router.push('/create-profile/welcome-letter');
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert(
        'Error',
        error.message || 'Failed to save profile. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.question}>
          Q4. What area(s) do you want to focus on in your leadership journey?
        </Text>

        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.option,
              selected === option && styles.selectedOption
            ]}
            onPress={() => setSelected(option)}
            disabled={isSubmitting}
          >
            <Text style={[
              styles.optionText,
              selected === option && styles.selectedOptionText
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[
            styles.nextButton,
            (!selected || isSubmitting) && styles.disabledButton
          ]}
          onPress={handleNext}
          disabled={!selected || isSubmitting}
        >
          <Text style={styles.nextButtonText}>
            {isSubmitting ? 'Saving...' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    paddingTop: 40,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
  },
  option: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  selectedOption: {
    borderColor: '#4B50DC',
    backgroundColor: '#4B50DC',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: '#fff',
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#4B50DC',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});