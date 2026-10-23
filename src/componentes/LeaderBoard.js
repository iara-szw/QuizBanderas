import { View, Text } from "react-native";
import { useGameContext } from "../contexts/GameContext";

export default function Leaderboard() {
  const { jugadores } = useGameContext();

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Ranking</Text>

      {jugadores.length === 0 ? (
        <Text>No hay jugadores todavía</Text>
      ) : (
        jugadores.map((jugador, index) => (
          <Text key={index}>
            {index + 1}. {jugador.nombre}: {jugador.puntaje} pts
          </Text>
        ))
      )}
    </View>
  );
}

