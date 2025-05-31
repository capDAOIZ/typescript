import { useState, useEffect } from "react";
import { getUsuarios } from "../services/ApiUsuario";
interface Usuario {
  id: number;
  image: File;
  name: string;
  email: string;
  role: string;
  is_banned: boolean;
}
export default function useUsuariosXPaginas() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cargando, setCargando] = useState(false);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [actualPagina, setActualPagina] = useState(1);
  const [refrescarFecth, setRefrescarFecth] = useState(false);
  async function fechtGetUsuariosXPaginas() {
    try {
      setCargando(true);
      const response = await getUsuarios(actualPagina);
      const data = response.usuarios.data;

      console.log(response.usuarios);

      setTotalPaginas(response.usuarios.last_page);
      setActualPagina(response.usuarios.current_page);
      setUsuarios(data);
    } catch (error) {
      console.error("Error al obtener todos los usuarios", error);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    fechtGetUsuariosXPaginas();
  }, [actualPagina, refrescarFecth]);

  return {
    usuarios,
    cargando,
    totalPaginas,
    actualPagina,
    setActualPagina,
    setRefrescarFecth,
    fechtGetUsuariosXPaginas,
  };
}
