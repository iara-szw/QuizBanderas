import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { useGameContext } from '../contexts/GameContext';

export default function Bandera() {
  const { paisActual } = useGameContext();
  const [tieneError, setTieneError] = useState(false);

  useEffect(() => {
    setTieneError(false);
  }, [paisActual?.flag]);

  return (
    <View style={styles.container}>
      {tieneError || !paisActual?.flag ? (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>No se pudo cargar la bandera</Text>
        </View>
      ) : (
        <Image
          source={{ uri: paisActual.flag }}
          style={styles.flagImage}
          resizeMode="contain"
          onError={() => setTieneError(true)}
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
    width: 180,
    height: 120,
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
  },
});