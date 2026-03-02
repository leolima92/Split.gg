import React from 'react';
import { SQLiteProvider } from 'expo-sqlite';
import { SafeAreaView, StatusBar } from 'react-native';
import { initializeDatabase } from './src/database/initializeDatabase';
import AddPlayerScreen from './src/screens/AddPlayerScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
      <StatusBar barStyle="light-content" />
      <SQLiteProvider databaseName="splitgg.db" onInit={initializeDatabase}>
        <AddPlayerScreen />
      </SQLiteProvider>
    </SafeAreaView>
  );
}
