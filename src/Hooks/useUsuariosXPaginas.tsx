import { useState, useEffect, useCallback, useRef } from "react";
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

  const [textoBusqueda, setTextoBusqueda] = useState("");
  const anteriorBusquedaRef = useRef(textoBusqueda);

  const fechtGetUsuariosXPaginas = useCallback(
    async (page: number = 1, search?: string) => {
      if (search && anteriorBusquedaRef.current == search) return;
      try {
        if (search) {
          anteriorBusquedaRef.current = search;
        }
        setCargando(true);
        const response = await getUsuarios(page, search);
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
    },
    []
  );

  useEffect(() => {
    fechtGetUsuariosXPaginas(actualPagina);
  }, [actualPagina, refrescarFecth, fechtGetUsuariosXPaginas]);

  return {
    usuarios,
    cargando,
    totalPaginas,
    actualPagina,
    setActualPagina,
    setRefrescarFecth,
    fechtGetUsuariosXPaginas,
    setTextoBusqueda,
  };
}
