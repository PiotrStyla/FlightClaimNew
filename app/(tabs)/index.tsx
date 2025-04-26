import { StyleSheet, View, Text, ScrollView, SafeAreaView, Linking, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';

// Import Firebase services but handle errors gracefully
let app: any, auth: any, db: any, storage: any;
try {
  const firebaseServices = require('../../src/services/firebase');
  app = firebaseServices.app;
  auth = firebaseServices.auth;
  db = firebaseServices.db;
  storage = firebaseServices.storage;
} catch (error) {
  console.error('Failed to import Firebase services:', error);
}

export default function HomeScreen() {
  const [firebaseStatus, setFirebaseStatus] = useState<string>('Checking Firebase status...');
  
  useEffect(() => {
    // Check Firebase connection status
    if (app && auth && db && storage) {
      setFirebaseStatus('Firebase successfully initialized!');
    } else {
      setFirebaseStatus('Firebase connection issue detected');
    }
    
    console.log('Firebase app instance:', app ? 'Available' : 'Not available');
    console.log('Auth service:', auth ? 'Available' : 'Not available');
    console.log('Firestore service:', db ? 'Available' : 'Not available');
    console.log('Storage service:', storage ? 'Available' : 'Not available');
  }, []);

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
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
