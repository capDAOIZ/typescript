import { useState, useEffect, useCallback } from "react";
import { getPosts } from "../services/ApiPost";
interface Post {
  id: number;
  nameAnimal: string;
  typeAnimal: string;
  description: string;
  image: File;
}
export default function usePostsXPaginas(idUsuario?: number) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [refrescarFetch, setRefrescarFetch] = useState(false);

  //Obtener todos los posts
  async function fetchPosts() {
    setCargando(true);
    try {
      const response = await getPosts(paginaActual, idUsuario);
      const data = response.posts.data;
      setPosts(data);
      setPaginaActual(response.posts.current_page);
      setTotalPaginas(response.posts.last_page);
      return;
    } catch (e: any) {
      setError(e.mensaje);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [paginaActual, refrescarFetch]);

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
  };
}
