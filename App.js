import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { GameProvider, useGameContext } from './src/contexts/GameContext';
import Inicio from './src/pages/Inicio';
import Puntaje from './src/componentes/Puntaje';
import Timer from './src/componentes/Timer';
import Bandera from './src/componentes/Bandera';
import GuessForm from './src/componentes/GuessForm';
import Leaderboard from './src/componentes/LeaderBoard';

function AppContent() {
  const { partidaActiva, terminarPartida } = useGameContext();

  if (!partidaActiva) {
    return (
      <View style={styles.container}>
        <Text>Quiz de Banderas</Text>
        <Inicio />
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Quiz de Banderas</Text>
      <Puntaje />
      <Timer />
      <Bandera />
      <GuessForm />
      <Leaderboard />
      <Button title="Terminar partida" onPress={terminarPartida} />
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AppContent />
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
