import { useEffect, useState } from "react";
import { getPost } from "../../services/ApiPost";
interface Props {
  id: number;
}
interface Post {
  nameAnimal: string;
  typeAnimal: string;
  description: string;
  race: string;
  image: File;
  user_id: number;
  adopted: boolean;
}
export default function useGetPost({ id }: Props) {
  const [post, setPost] = useState<Post>({} as Post);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(false);
  const [refrescarFetch, setRefrescarFetch] = useState(false);

  async function fetchPost() {
    setCargando(true);
    try {
      const response = await getPost(Number(id));
      const data = response.post;
      setPost(data);
      console.log(data);
    } catch (error) {
      console.error("Error al obtener el post", error);
      setError(true);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    fetchPost();
  }, [id, refrescarFetch]);

  function refrescar() {
    setRefrescarFetch((prevData) => !prevData);
  }

  return { post, cargando, error, refrescar };
}
