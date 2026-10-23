import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {GameProvider,useGameContext} from './src/contexts/GameContext';
export default function App() {
  const { paises, setPaises, paisActual, setPaisActual, puntaje, setPuntaje, jugadores, setJugadores, jugadorActual, setJugadorActual, timer, setTimer, loading, error, elegirPaisAleatorio, siguientePais, comprobarRespuesta } = useGameContext();
  return (
    <GameProvider>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
