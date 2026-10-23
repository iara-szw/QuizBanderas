import { Image, StyleSheet, Text, View } from 'react-native';

import { useGameContext } from '../context/gameContext';

export default function Bandera() {
  const { paisActual } = useGameContext();
  const [Tieneerorr, SetTieneError] = useState(false);
 return (
    <View style={styles.container}>
      {Tieneerorr || !paisActual.flag ? (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>No se pudo cargar la bandera</Text>
        </View>
      ) : (
        <Image
          source={paisActual.flag}
          style={styles.flagImage}
          resizeMode="contain"
          onError={() => SetTieneError(true)}
        />
      )}
    </View>
  );

}