import { deletePost } from "../../services/ApiPost";
import { useEffect, useState } from "react";
interface Props {
  id: number;
  refrescar: () => void;
}
export default function useDeletePost({ id, refrescar }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const token = localStorage.getItem("token");
  async function fecthDeletePost() {
    if (!token) return;
    setLoading(true);
    try {
      const response = await deletePost(id, token);
      refrescar();
      return;
    } catch (error: any) {
      console.error("Error al eliminar el post", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, fecthDeletePost };
}
