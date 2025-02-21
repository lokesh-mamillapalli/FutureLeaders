import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="home" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="add-child" />
        <Stack.Screen name="create-profile" />
        <Stack.Screen name="privacy" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}