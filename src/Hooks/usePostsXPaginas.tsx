import { useState, useEffect, useCallback, useRef } from "react";
import { getPosts } from "../services/ApiPost";
interface Post {
  id: number;
  nameAnimal: string;
  typeAnimal: string;
  description: string;
  image: File;
}
export default function usePostsXPaginas() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [refrescarFetch, setRefrescarFetch] = useState(false);

  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [tipoBusqueda, setTipoBusqueda] = useState("");
  const anteriorBusquedaRef = useRef(textoBusqueda);

  //Obtener todos los posts
  const fetchPosts = useCallback(
    async (page: number, search?: string, searchType?: string) => {
      if (search && anteriorBusquedaRef.current == search) return;

      setCargando(true);
      try {
        if (search) {
          anteriorBusquedaRef.current = search;
        }

        const response = await getPosts(page, search, searchType);
        const data = response.posts.data;
        setPosts(data);
        setPaginaActual(response.posts.current_page);
        setTotalPaginas(response.posts.last_page);
      } catch (e: any) {
        setError(e.mensaje);
      } finally {
        setCargando(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchPosts(paginaActual, textoBusqueda, tipoBusqueda);
  }, [paginaActual, fetchPosts]);

  useEffect(() => {
    fetchPosts(1, textoBusqueda, tipoBusqueda);
  }, [refrescarFetch, fetchPosts]);

  function refrescar() {
    setRefrescarFetch(!refrescarFetch);
  }

  return {
    posts,
    paginaActual,
    totalPaginas,
    setPaginaActual,
    cargando,
    error,
    refrescar,
    fetchPosts,
    setTextoBusqueda,
    setTipoBusqueda,
    textoBusqueda,
    tipoBusqueda,
  };
}
