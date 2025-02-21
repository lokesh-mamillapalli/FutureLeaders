import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const options = [
  'Emotion Management especially Anger',
  'Healthy habits',
  'Chores and responsibilities',
  'Learning challenges',
  'Building/Rebuilding Trust',
  "I haven't decided yet"
];

export default function Page1() {
  const [selected, setSelected] = useState('');

  const handleNext = async () => {
    if (selected) {
      try {
        await AsyncStorage.setItem('profile_leadershipGoal', selected);
        router.push('/create-profile/page2');
      } catch (error) {
        console.error('Error saving selection:', error);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.question}>
          Q1. What is your leadership goal?
        </Text>
        <Text style={styles.subtitle}>
          (Choose the area you want to focus on)
        </Text>

        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.option,
              selected === option && styles.selectedOption
            ]}
            onPress={() => setSelected(option)}
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
          style={[styles.nextButton, !selected && styles.disabledButton]}
          onPress={handleNext}
          disabled={!selected}
        >
          <Text style={styles.nextButtonText}>Next</Text>
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
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    fontStyle: 'italic',
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