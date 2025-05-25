import { deletePost } from "../../services/ApiPost";
import { useState, useEffect } from "react";
interface Props {
  id: number;
  refrescar?: () => void;
}
export default function useDeletePost({ id, refrescar }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function fecthDeletePost() {
    setLoading(true);
    try {
      const response = await deletePost(id - 100);
      refrescar && refrescar();
      return;
    } catch (error: any) {
      console.error("Error al eliminar el post", error);
      setError(true);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  }

  return { loading, error, fecthDeletePost };
}
