import { useState, useEffect } from "react";
import { getLastPost } from "../services/ApiPost";
interface Post {
  id: number;
  nameAnimal: string;
  typeAnimal: string;
  description: string;
  image: File;
}
interface Props {
  user_id?: number;
}
export default function useGetLastPosts({ user_id }: Props = {}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  //Obtener los ultimos posts
  async function fetchLastPost() {
    setCargando(true);
    try {
      const response = await getLastPost();
      const data = response.posts;
      console.log(data);
      setPosts(data);
    } catch (error) {
      console.error("Error al obtener el post", error);
      setError("Problemas en la red, intentalo mas tarde");
    } finally {
      setCargando(false);
    }
  }

  //Obtener los ultimos posts al montar el componente
  useEffect(() => {
    fetchLastPost();
  }, []);

  return { posts, cargando, error };
}
