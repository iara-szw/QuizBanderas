import {React, useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useGameContext } from "../contexts/GameContext";

export default function GuessForm() {
  const { comprobarRespuesta } = useGameContext();
  const [respuesta, setRespuesta] = useState("");

  const handleEnviar = () => {
    if (!respuesta.trim()) return;

    comprobarRespuesta(respuesta);
    setRespuesta("");
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text>¿Qué país es?</Text>
      <TextInput
        value={respuesta}
        onChangeText={setRespuesta}
        placeholder="Escribí el país"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginVertical: 10,
        }}
      />
      <Button title="Enviar" onPress={handleEnviar} />
    </View>
  );
}