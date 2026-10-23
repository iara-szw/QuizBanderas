import React from "react";
import { View, Text, TextInput, Button,Image } from "react-native";
import { useGameContext } from "../contexts/GameContext";

export default function Inicio() {
  const { NombreJugador, setNombreJugador, empezarJuego, loading, paises } = useGameContext();

  return (
    <View style={{ padding: 20 }}>
      <Text>Ingresá tu nombre</Text>
      <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Flag_of_Afghanistan_%28Colored_Emblem%29.svg" }} style={{ width: 100, height: 60, marginVertical: 20 }} />
      <TextInput
        value={NombreJugador}
        onChangeText={setNombreJugador}
        placeholder="Ej: Iara"
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      <Button
        title={loading || paises.length === 0 ? "Cargando países..." : "Jugar"}
        onPress={empezarJuego}
        disabled={loading || paises.length === 0}
      />
    </View>
  );
}