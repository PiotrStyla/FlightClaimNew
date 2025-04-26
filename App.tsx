import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
// Import Firebase services directly
import { app, auth, db, storage } from './src/services/firebase';

export default function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [firebaseStatus, setFirebaseStatus] = useState('Checking Firebase status...');

  // Initialize the app when it first loads with improved validation
  useEffect(() => {
    const checkFirebase = async () => {
      try {
        // Check if Firebase config has been set up
        const firebaseConfig = app?.options;
        
        if (!firebaseConfig || !firebaseConfig.apiKey || firebaseConfig.apiKey === 'undefined') {
          const errorMessage = 'Firebase configuration is missing or invalid';
          console.error(errorMessage, firebaseConfig);
          setError(errorMessage);
          setFirebaseStatus(errorMessage);
          return;
        }
        
        // Log actual Firebase configuration (without sensitive data)
        console.log('Firebase initialized with project:', firebaseConfig.projectId);
        setFirebaseStatus('Firebase successfully initialized!');
        setIsInitialized(true);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error('Firebase verification error:', err);
        setError(errorMessage);
        setFirebaseStatus(`Firebase error: ${errorMessage}`);
      }
    };
    
    checkFirebase();
  }, []);

  // Loading state
  if (!isInitialized && !error) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Initializing FlightDelay App...</Text>
      </SafeAreaView>
    );
  }

  // Error state
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorBox}>
          <Text style={styles.errorTitle}>Initialization Error</Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Success state
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>FlightDelay App</Text>
          <Text style={styles.subtitle}>New Clean Version</Text>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Firebase Status</Text>
            <View style={styles.statusBox}>
              <Text style={[
                styles.statusText, 
                firebaseStatus.includes('success') ? styles.successText : styles.pendingText
              ]}>
                {firebaseStatus}
              </Text>
              {!firebaseStatus.includes('success') && (
                <TouchableOpacity 
                  style={styles.configButton}
                  onPress={() => {
                    alert('To configure Firebase:\n1. Open the .env file\n2. Add your Firebase project details\n3. Restart the app');
                  }}
                >
                  <Text style={styles.configButtonText}>How to Configure Firebase</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Features Coming Soon</Text>
            <View style={styles.featureList}>
              <Text style={styles.featureItem}>• User Authentication</Text>
              <Text style={styles.featureItem}>• Document Upload</Text>
              <Text style={styles.featureItem}>• Flight Status Tracking</Text>
              <Text style={styles.featureItem}>• Compensation Claims</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 12,
  },
  statusBox: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 14,
    textAlign: 'center',
  },
  successText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  pendingText: {
    color: '#FF9800',
  },
  featureList: {
    gap: 8,
  },
  featureItem: {
    fontSize: 14,
    color: '#424242',
    paddingVertical: 4,
  },
  configButton: {
    backgroundColor: '#2196F3',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 12,
    alignSelf: 'center',
  },
  configButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
