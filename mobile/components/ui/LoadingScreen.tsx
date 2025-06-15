import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { ActivityIndicator, useColorScheme, View } from 'react-native';

interface LoadingScreenProps {
  message?: string;
  backgroundColor?: string;
  size?: 'small' | 'large';
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = "लोड हो रहा है...",
  backgroundColor,
  size = "large"
}) => {
  const colorScheme = useColorScheme();
  
  const defaultBackgroundColor = backgroundColor || 
    (colorScheme === 'dark' ? '#000' : '#F5F7FA');

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: defaultBackgroundColor,
      padding: 20
    }}>
      <ActivityIndicator 
        size={size} 
        color="#007AFF" 
      />
      {message && (
        <ThemedText style={{
          marginTop: 16,
          fontSize: 16,
          textAlign: 'center',
          color: colorScheme === 'dark' ? '#FFF' : '#000'
        }}>
          {message}
        </ThemedText>
      )}
    </View>
  );
}; 