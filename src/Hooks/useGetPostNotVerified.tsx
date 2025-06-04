import { getPostNotVerified } from "../services/ApiPost";
import { useState, useEffect, useCallback, useRef } from "react";
interface Post {
  id: number;
  nameAnimal: string;
  typeAnimal: string;
  description: string;
  image: File;
}
export default function useGetPostNotVerified() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [refrescarFetch, setRefrescarFetch] = useState(false);

  const [textoBusqueda, setTextoBusqueda] = useState("");
  const anteriorBusquedaRef = useRef(textoBusqueda);

  const fecthPostNotVerified = useCallback(
    async (page: number, search?: string) => {
      if (search && anteriorBusquedaRef.current == search) return;
      try {
        if (search) {
          anteriorBusquedaRef.current = search;
        }
        setCargando(true);
        const response = await getPostNotVerified(page, search);
        const data = response.posts.data;
        setPosts(data);
        setTotalPaginas(response.posts.last_page);
        setPaginaActual(response.posts.current_page);
      } catch (e: any) {
        setError(e.mensaje);
      } finally {
        setCargando(false);
      }
    },
    []
  );

  useEffect(() => {
    fecthPostNotVerified(paginaActual, textoBusqueda);
  }, [paginaActual, fecthPostNotVerified]);

  useEffect(() => {
    fecthPostNotVerified(1, textoBusqueda);
  }, [refrescarFetch, fecthPostNotVerified]);

  function refrescar() {
    setRefrescarFetch((prevData) => !prevData);
  }
  return {
    posts,
    cargando,
    error,
    refrescar,
    paginaActual,
    totalPaginas,
    setPaginaActual,
    setTextoBusqueda,
    fecthPostNotVerified,
  };
}
