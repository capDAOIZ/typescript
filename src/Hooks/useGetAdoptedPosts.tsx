import { useEffect, useState } from "react";
import { adoptedPosts } from "../services/ApiPost";
interface Post {
  id: number;
  nameAnimal: string;
  typeAnimal: string;
  description: string;
  image: File;
}
export default function useGetAdoptedPosts(user_id: number) {
  const [postsAdopted, setPostsAdopted] = useState<Post[]>([]);
  const [cargandoAdopted, setCargandoAdopted] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [errorAdopted, setErrorAdopted] = useState("");

  // Fecth de los ultimos animales adoptados del usuario
  async function fetchAdoptedPosts() {
    try {
      setCargandoAdopted(true);
      const response = await adoptedPosts(user_id, paginaActual);
      const data = response.posts.data;
      setPaginaActual(response.posts.current_page);
      setTotalPaginas(response.posts.last_page);
      setPostsAdopted(data);
    } catch (error) {
      console.error("Error al obtener el post", error);
      setErrorAdopted("Problemas en la red, intentalo mas tarde");
    } finally {
      setCargandoAdopted(false);
    }
  }
  //Cargar los ultimos animales adoptados del usuario al montar el componente
  useEffect(() => {
    fetchAdoptedPosts();
  }, [paginaActual]);

  return {
    postsAdopted,
    cargandoAdopted,
    paginaActual,
    totalPaginas,
    setPaginaActual,
    errorAdopted,
  };
}
