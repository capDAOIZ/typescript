import { useState, useEffect, useCallback, useRef } from "react";
import { getPostsVerifiedUser } from "../services/ApiPost";
interface Post {
  id: number;
  nameAnimal: string;
  typeAnimal: string;
  description: string;
  image: File;
}
export default function usePostsVerifiedUser(idUser: number, search?: string) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [refrescarFetch, setRefrescarFetch] = useState(false);

  const [textoBusqueda, setTextoBusqueda] = useState("");
  const anteriorBusquedaRef = useRef(textoBusqueda);

  //Obtener todos los posts
  const fetchPostsVerifiedUser = useCallback(
    async (UserId: number, page = 1, search?: string) => {
      if (search && anteriorBusquedaRef.current == search) return;
      setCargando(true);
      try {
        if (search) {
          anteriorBusquedaRef.current = search;
        }

        const response = await getPostsVerifiedUser(UserId, page, search);
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
    },
    []
  );

  useEffect(() => {
    fetchPostsVerifiedUser(idUser, paginaActual, textoBusqueda);
  }, [paginaActual, refrescarFetch, idUser, fetchPostsVerifiedUser]);

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
    setTextoBusqueda,
    textoBusqueda,
    fetchPostsVerifiedUser,
  };
}
