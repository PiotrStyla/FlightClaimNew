import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import 'react-native-reanimated';

// Import firebase and bootstrap
import '../src/polyfills';
import { initializeApp } from '../src/bootstrap';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isFirebaseInitialized, setIsFirebaseInitialized] = useState(false);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Initialize Firebase
  useEffect(() => {
    try {
      const firebaseServices = initializeApp();
      console.log('Firebase services initialized:', Object.keys(firebaseServices));
      setIsFirebaseInitialized(true);
    } catch (err) {
      console.error('Failed to initialize Firebase:', err);
      setFirebaseError(err instanceof Error ? err.message : 'Unknown error');
    }
  }, []);

  useEffect(() => {
    if (loaded && isFirebaseInitialized) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isFirebaseInitialized]);

  // Show loading screen while fonts are loading and Firebase is initializing
  if (!loaded || (!isFirebaseInitialized && !firebaseError)) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Initializing FlightDelay App...</Text>
      </View>
    );
  }

  // Show error screen if Firebase initialization failed
  if (firebaseError) {
    return (
      <View style={styles.container}>
        <View style={styles.errorBox}>
          <Text style={styles.errorTitle}>Firebase Initialization Error</Text>
          <Text style={styles.errorText}>{firebaseError}</Text>
        </View>
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#2196F3',
  },
  errorBox: {
    backgroundColor: '#FFEBEE',
    padding: 20,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
    width: '100%',
    maxWidth: 400,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 14,
    color: '#616161',
    lineHeight: 20,
  },
});
