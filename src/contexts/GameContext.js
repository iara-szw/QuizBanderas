import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { obtenerPaises } from "../services/API";

const GameContext = createContext(null);
const STORAGE_KEY = "@quizbanderas:ranking";

export function useGameContext() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("useGameContext debe usarse dentro de GameProvider");
  }

  return context;
}

function elegirPaisAleatorio(lista) {
  if (!lista || lista.length === 0) return null;
  const index = Math.floor(Math.random() * lista.length);
  return lista[index];
}

export function GameProvider({ children }) {
  const [paises, setPaises] = useState([]);
  const [paisActual, setPaisActual] = useState(null);
  const [puntaje, setPuntaje] = useState(0);
  const [jugadores, setJugadores] = useState([]);
  const [NombreJugador, setNombreJugador] = useState("");
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [partidaActiva, setPartidaActiva] = useState(false);

  useEffect(() => {
    let activo = true;

    const cargarPaises = async () => {
      try {
        setLoading(true);
        const lista = await obtenerPaises();

        if (!activo) return;

        setPaises(lista);
        setPaisActual(elegirPaisAleatorio(lista));
      } catch (e) {
        if (!activo) return;
        setError(e.message || "No se pudo cargar la lista de países");
      } finally {
        if (activo) {
          setLoading(false);
        }
      }
    };

    cargarPaises();

    return () => {
      activo = false;
    };
  }, []);

  useEffect(() => {
    const cargarRanking = async () => {
      try {
        const guardado = await AsyncStorage.getItem(STORAGE_KEY);

        if (guardado) {
          const parsed = JSON.parse(guardado);
          setJugadores(Array.isArray(parsed) ? parsed : []);
        }
      } catch (e) {
        console.log("No se pudo cargar el ranking:", e);
      }
    };

    cargarRanking();
  }, []);

  useEffect(() => {
    const guardarRanking = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(jugadores));
      } catch (e) {
        console.log("No se pudo guardar el ranking:", e);
      }
    };

    if (jugadores.length > 0) {
      guardarRanking();
    }
  }, [jugadores]);

  useEffect(() => {
    if (!partidaActiva || !NombreJugador.trim()) return;

    const nombre = NombreJugador.trim();
    setJugadores((prev) => {
      const sinJugador = prev.filter((jugador) => jugador.nombre.toLowerCase() !== nombre.toLowerCase());
      return [...sinJugador, { nombre, puntaje }].sort((a, b) => b.puntaje - a.puntaje);
    });
  }, [puntaje, NombreJugador, partidaActiva]);

  const siguientePais = () => {
    setPaisActual(elegirPaisAleatorio(paises));
    setTimer(15);
  };

  const comprobarRespuesta = (respuesta, tiempoRestante = 0) => {
    const texto = String(respuesta || "").trim().toLowerCase();
    const nombrePais = paisActual?.name?.trim().toLowerCase();
    const correcto = nombrePais === texto;

    if (correcto) {
      setPuntaje((prev) => prev + 10 + Math.max(0, tiempoRestante));
      return;
    }

    setPuntaje((prev) => prev - 1);
  };

  const empezarJuego = () => {
    if (!NombreJugador.trim()) return;

    setPuntaje(0);
    setPartidaActiva(true);
    setPaisActual(elegirPaisAleatorio(paises));
    setTimer(15);
  };

  const terminarPartida = () => {
    setPartidaActiva(false);
    setPuntaje(0);
    setTimer(0);
    setPaisActual(null);
    setNombreJugador("");
  };

  return (
    <GameContext.Provider
      value={{
        paises,
        setPaises,
        paisActual,
        setPaisActual,
        puntaje,
        setPuntaje,
        jugadores,
        setJugadores,
        NombreJugador,
        setNombreJugador,
        timer,
        setTimer,
        loading,
        error,
        partidaActiva,
        setPartidaActiva,
        elegirPaisAleatorio,
        siguientePais,
        comprobarRespuesta,
        empezarJuego,
        terminarPartida,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export default GameProvider;