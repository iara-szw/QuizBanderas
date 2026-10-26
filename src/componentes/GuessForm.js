import { React, useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useGameContext } from "../contexts/GameContext";

export default function GuessForm() {
  const { comprobarRespuesta, paisActual, siguientePais, timer } = useGameContext();
  const [respuesta, setRespuesta] = useState("");
  const [resultado, setResultado] = useState(null);

  const handleEnviar = () => {
    if (!respuesta.trim() || resultado) return;

    const texto = String(respuesta || "").trim().toLowerCase();
    const nombrePais = paisActual?.name?.trim();
    const esCorrecto = nombrePais && texto === nombrePais.trim().toLowerCase();

    comprobarRespuesta(respuesta, timer);

    setResultado({
      correcto: esCorrecto,
      mensaje: esCorrecto
        ? `Correcto +${timer} pts extra`
        : `Incorrecto. La respuesta correcta era ${nombrePais}.`,
    });

    setRespuesta("");
  };

  const handleContinuar = () => {
    siguientePais();
    setResultado(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>¿Qué país es?</Text>
      <TextInput
        value={respuesta}
        onChangeText={setRespuesta}
        placeholder="Escribí el país"
        style={styles.input}
        editable={!resultado}
      />

      {resultado && (
        <Text style={[styles.resultado, resultado.correcto ? styles.correcto : styles.incorrecto]}>
          {resultado.mensaje}
        </Text>
      )}

      <TouchableOpacity
        style={[styles.button, resultado && styles.buttonContinuar]}
        onPress={resultado ? handleContinuar : handleEnviar}
        activeOpacity={0.85}
        disabled={!resultado && !respuesta.trim()}
      >
        <Text style={styles.buttonText}>{resultado ? "Continuar" : "Enviar"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d7e0ea",
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 12,
    width: 220,
    marginVertical: 10,
    borderRadius: 12,
    fontSize: 16,
    color: "#1f2937",
  },
  button: {
    backgroundColor: "#8ac3dd",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 28,
    marginTop: 8,
    width: 220,
    alignItems: "center",
  },
  buttonContinuar: {
    backgroundColor: "#74c69d",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  resultado: {
    marginTop: 8,
    marginBottom: 4,
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  correcto: {
    color: "#1f8f5f",
  },
  incorrecto: {
    color: "#b42318",
  },
});