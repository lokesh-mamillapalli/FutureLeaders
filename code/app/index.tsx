import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { ResponseType } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = Platform.select({
  web: 'http://localhost:5000/api',
  default: 'http://192.168.24.240:5000/api',
});

const FB_APP_ID = 'your-facebook-app-id';
const FB_SCHEME = 'your-custom-scheme';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('userData', JSON.stringify(data.user));

      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const redirectUri = AuthSession.makeRedirectUri({
        scheme: FB_SCHEME,
      });

      const authRequest = await AuthSession.startAsync({
        authUrl:
          `https://www.facebook.com/v12.0/dialog/oauth?` +
          `client_id=${FB_APP_ID}` +
          `&redirect_uri=${encodeURIComponent(redirectUri)}` +
          `&response_type=token` +
          `&scope=email,public_profile`,
      });

      if (authRequest.type === 'success') {
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${authRequest.params.access_token}&fields=id,name,email`
        );
        const data = await response.json();

        const backendResponse = await fetch(`${API_URL}/auth/social-auth`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.email,
            name: data.name,
            provider: 'facebook',
            socialId: data.id,
          }),
        });

        const backendData = await backendResponse.json();
        if (!backendResponse.ok) {
          throw new Error(backendData.message);
        }

        await AsyncStorage.setItem('token', backendData.token);
        await AsyncStorage.setItem('userData', JSON.stringify(backendData.user));

        router.replace('/home');
      }
    } catch (error) {
      Alert.alert('Error', 'Facebook login failed');
    }
  };

  const handleAppleLogin = async () => {
    Alert.alert('Coming Soon', 'Apple login will be available soon!');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar style="dark" />
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?q=80&w=2829&auto=format&fit=crop' }}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Welcome Back</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="your@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
              />

              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!isLoading}
              />
            </View>

            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.disabledButton]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.loginButtonText}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Text>
            </TouchableOpacity>

            <View style={styles.linkContainer}>
              <TouchableOpacity onPress={() => router.push('/forgot-password')}>
                <Text style={styles.linkText}>Forgot password?</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/privacy')}>
                <Text style={styles.linkText}>Privacy</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.socialText}>or continue with</Text>

            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity
                style={styles.appleButton}
                onPress={handleAppleLogin}
              >
                <Text style={styles.appleButtonText}>Apple</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.facebookButton}
                onPress={handleFacebookLogin}
              >
                <Text style={styles.facebookButtonText}>Facebook</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => router.push('/signup')}>
              <Text style={styles.signUpText}>
                Don't have an account? Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#4B50DC',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  disabledButton: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 20,
  },
  linkText: {
    color: '#4B50DC',
    fontSize: 16,
  },
  socialText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  appleButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    flex: 0.48,
    alignItems: 'center',
  },
  facebookButton: {
    backgroundColor: '#1877F2',
    padding: 15,
    borderRadius: 8,
    flex: 0.48,
    alignItems: 'center',
  },
  appleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  facebookButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  signUpText: {
    color: '#4B50DC',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});