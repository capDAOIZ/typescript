import { cerrarSesion } from "../services/ApiUsuario";
import { useAuth } from "./useAuth";
import { useState } from "react";
export default function useLogout() {
  const { desloguearse } = useAuth();
  const token = localStorage.getItem("token");
  const [cargandoLogout, setCargandoLogout] = useState(false);
  async function fecthLogout() {
    try {
      setCargandoLogout(true);
      if (token) {
        await cerrarSesion(token);
      }
      localStorage.removeItem("token");
      desloguearse();
    } catch (error) {
      console.error("Error en cerrar sesion", error);
      throw error;
    } finally {
      setCargandoLogout(false);
    }
  }
  return { fecthLogout, cargandoLogout };
}
