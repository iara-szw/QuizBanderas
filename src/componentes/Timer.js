import {React, useEffect } from "react";
import { View, Text } from "react-native";
import { useGameContext } from "../contexts/GameContext";

export default function Timer() {
  const {timer, setTimer} = useGameContext();

  useEffect(() => {
    if (timer <= 0) return;

    const intervalo = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [timer, setTimer]);

  return (
    <View>
      <Text style={{ fontSize: 18 }}>Tiempo: {timer}s</Text>
    </View>
  );
}