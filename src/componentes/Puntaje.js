import React from "react";
import { View, Text } from "react-native";
import { useGameContext } from "../contexts/GameContext";

export default function Puntaje() {
  const { puntaje } = useGameContext();

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Puntaje: {puntaje}
      </Text>
    </View>
  );
}