import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

import { useGameContext } from '../contexts/GameContext';

export default function Bandera() {
  const { paisActual } = useGameContext();
  const [tieneError, setTieneError] = useState(false);

  const flagUrl = paisActual?.flag || '';

  useEffect(() => {
    setTieneError(false);
  }, [flagUrl]);

  return (
    <View style={styles.container}>
      {tieneError || !flagUrl ? (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>No se pudo cargar la bandera</Text>
        </View>
      ) : (
        <Image
          source={{ uri: flagUrl }}
          style={styles.flagImage}
          contentFit="contain" 
          onError={() => setTieneError(true)}
          headers={{
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36'
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
  },
  placeholder: {
    width: 220,
    height: 140,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  placeholderText: {
    color: '#666',
    fontSize: 14,
  },
  flagImage: {
    width: 220,
    height: 140,
    borderRadius: 10,
    backgroundColor: '#f5f5f5', 
  },
});
