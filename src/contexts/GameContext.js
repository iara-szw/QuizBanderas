import { createContext, useEffect } from "react";
import {API} from '../services/API';
const GameContext = createContext(null);

export default function GameProvider({ children }) {
 
    const [paises, setPaises] = useState([]);
    const [paisActual, setPaisActual] = useState(null);
    const [puntaje, setPuntaje] = useState(0);
    const [jugadores, setJugadores] = useState([]);
      const [NombreJugador, setNombreJugador] = useState('');
    const [jugadorActual, setJugadorActual] = useState(null);
    const [timer, setTimer] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarPaises = async () => {
            try {
                const listaPaises = await API.obtenerPaises();
                setPaises(listaPaises);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        cargarPaises();
    }, []);
     const elegirPaisAleatorio = (paises) => {
    if (!paises || paises.length === 0) return null;
    const index = Math.floor(Math.random() * paises.length);
    return paises[index];
  };
    const siguientePais = () => {
    const siguiente = elegirPaisAleatorio(paises);
    setPaisActual(siguiente);
    
    const comprobarRespuesta = (respuesta) => {
    const texto = String(respuesta || "").trim().toLowerCase();
    const correcto = paisActual?.name?.trim().toLowerCase() === texto;

    if (correcto) {
      setPuntaje((prev) => prev + 10);
    } else {
      setPuntaje((prev) => prev - 1);
    }

    siguientePais();
  };
    return(
        <GameContext.Provider value={{ paises, setPaises, NombreJugador, setNombreJugador, paisActual, setPaisActual, puntaje, setPuntaje, jugadores, setJugadores, jugadorActual, setJugadorActual, timer, setTimer, loading, error, elegirPaisAleatorio, siguientePais, comprobarRespuesta }}>
            {children}
        </GameContext.Provider>
    )
}

}