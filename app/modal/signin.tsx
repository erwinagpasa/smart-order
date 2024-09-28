import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams } from 'expo-router';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';

export default function Paywall() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const [tagId, setTagId] = useState('');

  useEffect(() => {
    NfcManager.start();
    readNdef();
  }, []);

  const readNdef = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      if (tag && tag.id) {
        setTagId(tag.id);
      } else {
        console.warn('Tag not found or ID is undefined');
      }
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>user: {userId}</Text>
        <Text className='text-lg' style={{ textAlign: 'center' }}>NFC ID: {tagId}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ddd',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center', // Added to center the content horizontally
    justifyContent: 'center', // Added to center the content vertically
  },
  header: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 14,
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
  },
});