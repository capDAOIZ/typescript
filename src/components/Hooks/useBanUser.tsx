import { useState, useRef, useEffect } from "react";
import { banearUsuario } from "../../services/ApiUsuario";
interface PropsBanUser {
  id: number;
  refrescar: () => void;
}
export default function useBanUser() {
  const [cargandoBan, setCargandoBan] = useState(false);
  const [errorBan, setErrorBan] = useState("");
  const [mensajeBan, setMensajeBan] = useState("");

  const timeout = useRef<number | null>(null);
  const timeoutCargando = useRef<number | null>(null);

  async function fecthBanUser({ id, refrescar }: PropsBanUser) {
    setCargandoBan(true);
    try {
      const response = await banearUsuario(id);
      setMensajeBan(response.mensaje);
      timeout.current = window.setTimeout(() => refrescar(), 3000);
      return;
    } catch (error: any) {
      setErrorBan(error.response.data.mensaje);
      console.log(errorBan);
      timeoutCargando.current = window.setTimeout(() => {
        setCargandoBan(false);
      }, 3000);
    }
  }

  useEffect(() => {
    if (!errorBan) return;
    const id = window.setTimeout(() => setErrorBan(""), 3000);
    return () => {
      clearTimeout(id);
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      if (timeoutCargando.current) {
        clearTimeout(timeoutCargando.current);
      }
    };
  }, [errorBan]);

  return {
    cargandoBan,
    errorBan,
    mensajeBan,
    fecthBanUser,
  };
}
