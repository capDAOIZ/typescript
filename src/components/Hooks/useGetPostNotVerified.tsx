import { getPostNotVerified } from "../../services/ApiPost";
import { useState, useEffect } from "react";
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
  const [error, setError] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [refrescarFetch, setRefrescarFetch] = useState(false);
  async function fecthPostNotVerified() {
    try {
      setCargando(true);
      const response = await getPostNotVerified(paginaActual);
      const data = response.posts;
      setTotalPaginas(data.last_page);
      setPaginaActual(data.current_page);
      console.log(response.posts);
      setPosts(data.data);
    } catch {
      setError(true);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    fecthPostNotVerified();
  }, [refrescarFetch, paginaActual]);

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
  };
}
