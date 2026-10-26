import React from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useGameContext } from "../contexts/GameContext";

export default function Inicio() {
  const { NombreJugador, setNombreJugador, empezarJuego, loading, paises } = useGameContext();
  const deshabilitado = loading || paises.length === 0;

  return (
    <View >
      <Text style={styles.title}>Ingresá tu nombre</Text>
      <TextInput
        value={NombreJugador}
        onChangeText={setNombreJugador}
        placeholder="Ej: Iara"
        style={styles.input}
      />
      <TouchableOpacity
        style={[styles.button, deshabilitado && styles.buttonDisabled]}
        onPress={empezarJuego}
        disabled={deshabilitado}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>{loading || paises.length === 0 ? "Cargando países..." : "Jugar"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 18,
    color: "#1f2937",
    textAlign: "center",
  },
  flag: {
    width: 120,
    height: 72,
    marginBottom: 20,
    alignSelf: "center",
    borderRadius: 12,
  },
   button: {
    backgroundColor: "#8ac3dd",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 28,
    marginTop: 12,
    width: 220,
    alignItems: "center",

  },
  input: {
    borderWidth: 1,
    borderColor: "#d7e0ea",
    backgroundColor: "#fff",
    borderRadius: 12
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  buttonDisabled: {
    backgroundColor: "#a8bfdc",
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});