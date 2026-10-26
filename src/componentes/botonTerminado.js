import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useGameContext } from "../contexts/GameContext";

export default function BotonTerminado() {
  const { terminarPartida } = useGameContext();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={terminarPartida}
      activeOpacity={0.85}
    >
      <Text style={styles.buttonText}>Terminar partida</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#8ac3dd",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 28,
    marginTop: 12,
    width: 220,
    alignItems: "center",

  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  }
});
