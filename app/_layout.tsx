import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function RootLayout() {
  useFrameworkReady();
  
  useEffect(() => {
    // Global error handler for JS errors that might propagate to native
    // Only available on native platforms, not web
    if (Platform.OS !== 'web') {
      const { ErrorUtils } = require('react-native');
      ErrorUtils.setGlobalHandler((error, isFatal) => {
        console.log('Global JS Error:', error);
        console.log('Is Fatal:', isFatal);
        
        // Log additional context
        if (error.stack) {
          console.log('Error Stack:', error.stack);
        }
      });
    }

    if (typeof window !== 'undefined' && window.frameworkReady) {
      window.frameworkReady();
    }
  }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}