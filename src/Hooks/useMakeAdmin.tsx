import { useState, useRef, useEffect } from "react";
import { makeAdmin } from "../services/ApiUsuario";
interface PropsMakeAdmin {
  id: number;
  refrescar: () => void;
}
export default function useMakeAdmin() {
  const [cargandoMakeAdmin, setCargandoMakeAdmin] = useState(false);
  const [errorMakeAdmin, setErrorMakeAdmin] = useState("");
  const [mensajeMakeAdmin, setMensajeMakeAdmin] = useState("");

  const timeout = useRef<number | null>(null);
  const timeoutCargando = useRef<number | null>(null);
  async function fecthMakeAdmin({ id, refrescar }: PropsMakeAdmin) {
    try {
      setCargandoMakeAdmin(true);
      const response = await makeAdmin(id);
      setMensajeMakeAdmin(response.mensaje);
      timeout.current = window.setTimeout(() => refrescar(), 3000);
      return;
    } catch (error: any) {
      setErrorMakeAdmin(error.response.data.mensaje);
      console.log(error);
      setCargandoMakeAdmin(false);
      timeoutCargando.current = window.setTimeout(() => {
        setCargandoMakeAdmin(false);
      }, 3000);
    }
  }
  useEffect(() => {
    if (!errorMakeAdmin) return;
    const id = window.setTimeout(() => setErrorMakeAdmin(""), 3000);
    return () => {
      clearTimeout(id);
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      if (timeoutCargando.current) {
        clearTimeout(timeoutCargando.current);
      }
    };
  }, [errorMakeAdmin]);

  return {
    cargandoMakeAdmin,
    errorMakeAdmin,
    mensajeMakeAdmin,
    fecthMakeAdmin,
  };
}
