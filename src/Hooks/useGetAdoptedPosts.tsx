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
  const [cargando, setCargando] = useState(false);

  // Fecth de los ultimos animales adoptados del usuario
  async function fetchAdoptedPosts() {
    try {
      setCargando(true);
      const response = await adoptedPosts(user_id);
      const data = response.posts;
      setPostsAdopted(data);
    } catch (error) {
      console.error("Error al obtener los posts", error);
    } finally {
      setCargando(false);
    }
  }
  //Cargar los ultimos animales adoptados del usuario al montar el componente
  useEffect(() => {
    fetchAdoptedPosts();
  }, []);

  return { postsAdopted, cargando };
}
