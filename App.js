import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {api} from './src/services/API';
import { useEffect } from 'react';
export default function App() {
  const [paises, setPaises] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const cargarPaises = async () => {
      const listaPaises = await api.obtenerPaises();
      setPaises(listaPaises);
    };
    cargarPaises();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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
