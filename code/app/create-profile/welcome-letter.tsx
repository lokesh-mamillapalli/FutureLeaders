import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeLetter() {
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

  const ParentLetter = () => (
    <View style={styles.letterContainer}>
      <Text style={styles.title}>A Letter to Grownups</Text>
      <Text style={styles.paragraph}>Hello!</Text>
      <Text style={styles.paragraph}>
        As a parent, student, and working professional, I've come to realize that anger can be one of the biggest challenges affecting harmony at home, school, and the workplace. Many of us—children and adults alike—find ourselves stuck in cycles of frustration, especially during transitions like coming home from school or work, tackling homework, playing video games, or settling in for bedtime.
      </Text>
      <Text style={styles.paragraph}>
        Our goal with this app is to help families and individuals better understand and manage anger in a healthy way. By using this app, you'll have the opportunity to connect with your children and support them in developing self-awareness and emotional regulation.
      </Text>
      <Text style={styles.paragraph}>
        I encourage you to partner with your child or, if they are 13 or older, allow them to explore the app independently. As you navigate the activities together, approach the experience with curiosity rather than judgment—think of yourself as a detective uncovering clues about what triggers anger and how to respond constructively. Share experiences, reflect on emotions, and collaborate on strategies to manage anger effectively.
      </Text>
      <Text style={styles.paragraph}>
        Throughout this journey, we'll explore topics such as anger triggers, habits, and response patterns. We'll focus on shifting from reacting to responding, improving communication, and fostering self-awareness. Additionally, we'll emphasize kindness—both toward ourselves and others—along with gratitude and empathy.
      </Text>
      <Text style={styles.paragraph}>
        A little about me: I am a mom of two young boys, a part-time college student pursuing my doctorate, and a professional in the IT industry. Like you, I'm on this journey of learning and growth, and I hope this app becomes a valuable resource for you and your family.
      </Text>
      <Text style={styles.paragraph}>
        I'd love to hear your feedback as we work together to build a supportive community.
      </Text>
      <Text style={styles.paragraph}>Thank you for joining us!</Text>
      <Text style={styles.signature}>Best regards,{'\n'}Aparna</Text>
    </View>
  );

  const ChildLetter = () => (
    <View style={styles.letterContainer}>
      <Text style={styles.title}>A Letter to Kids</Text>
      <Text style={styles.paragraph}>Hello!</Text>
      <Text style={styles.paragraph}>
        Anger can feel really powerful—especially when things feel out of control or scary. It's a tough feeling, and sometimes, it makes us do or say things we don't really mean. Maybe you've broken something important, yelled at a friend, or hurt someone's feelings—only to feel bad afterward. If that sounds familiar, I want you to know something important: you are not alone.
      </Text>
      <Text style={styles.paragraph}>
        This app is here to help you understand your anger in a new way. Instead of letting anger take over, let's get curious about it! What's really happening when you feel angry? What thoughts pop into your mind? What can you do differently next time? You'll discover new habits that can help you stay in control of what you say and do—so you can feel better, not worse, after tough moments.
      </Text>
      <Text style={styles.paragraph}>
        Let's explore this together! If you want, invite a parent or teacher to join you on this journey. They might have some great ideas to help, and most importantly, they care about you and want to support you.
      </Text>
      <Text style={styles.paragraph}>
        My two boys are also learning how to handle their big feelings, just like you. I hope that, together, we can all find ways to feel happier and safer, even when life gets hard.
      </Text>
      <Text style={styles.paragraph}>You got this!</Text>
      <Text style={styles.signature}>With care,{'\n'}Aparna</Text>
    </View>
  );

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
      <ScrollView style={styles.scrollView}>
        {userRole === 'parent' && <ParentLetter />}
        {userRole === 'child' && <ChildLetter />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
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
  letterContainer: {
    padding: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    color: '#444',
  },
  signature: {
    fontSize: 16,
    marginTop: 20,
    fontStyle: 'italic',
    color: '#666',
  },
});