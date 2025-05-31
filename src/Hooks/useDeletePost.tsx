import { deletePost } from "../services/ApiPost";
import { useState, useEffect, useRef } from "react";
interface Props {
  idPost: number;
  refrescar?: () => void;
}
export default function useDeletePost({ idPost, refrescar }: Props) {
  const [loading, setLoading] = useState(false);
  const [errorDelete, setErrorDelete] = useState(false);

  const timeout = useRef<number>();

  async function fecthDeletePost() {
    setLoading(true);
    try {
      const response = await deletePost(idPost);
      refrescar && refrescar();
      return;
    } catch (error: any) {
      console.error("Error al eliminar el post", error);
      setErrorDelete(true);
    } finally {
      setLoading(false);
      timeout.current = window.setTimeout(() => {
        setErrorDelete(false);
      }, 3000);
    }
  }

  useEffect(() => {
    return () => {
      timeout.current && clearTimeout(timeout.current);
    };
  }, []);

  return { loading, errorDelete, fecthDeletePost };
}
