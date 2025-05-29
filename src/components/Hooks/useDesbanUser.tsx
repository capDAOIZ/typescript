import { useState, useRef, useEffect } from "react";
import { desbanearUsuario } from "../../services/ApiUsuario";

interface PropsDesbanUser {
  id: number;
  refrescar: () => void;
}
export default function useDesbanUser() {
  const [cargandoDesban, setCargandoDesban] = useState(false);
  const [errorDesban, setErrorDesban] = useState("");
  const [mensajeDesban, setMensajeDesban] = useState("");

  const timeout = useRef<number | null>(null);
  const timeoutCargando = useRef<number | null>(null);
  async function fecthDesbanUser({ id, refrescar }: PropsDesbanUser) {
    setCargandoDesban(true);
    try {
      const response = await desbanearUsuario(id);
      setMensajeDesban(response.mensaje);
      timeout.current = window.setTimeout(() => refrescar(), 3000);
      return;
    } catch (error: any) {
      setErrorDesban(error.response.data.mensaje);
      timeoutCargando.current = window.setTimeout(() => {
        setCargandoDesban(false);
      }, 3000);
    }
  }
  useEffect(() => {
    if (!errorDesban) return;
    const id = window.setTimeout(() => setErrorDesban(""), 3000);
    return () => {
      clearTimeout(id);
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      if (timeoutCargando.current) {
        clearTimeout(timeoutCargando.current);
      }
    };
  }, [errorDesban]);

  return {
    cargandoDesban,
    errorDesban,
    mensajeDesban,
    fecthDesbanUser,
  };
}
