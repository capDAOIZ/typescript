import { validatePost } from "../../services/ApiPost";
import { useState } from "react";
import ModalBloqueante from "../../modals/ModalBloqueante";
interface Props {
  id: number;
  refrescar: () => void;
}
export default function BotonVerificar({ id, refrescar }: Props) {
  const [cargando, setCargando] = useState(false);
  async function handleClick() {
    try {
      setCargando(true);
      await validatePost(id);
      refrescar();
    } catch (error) {
      console.error("Error al validar el post", error);
    } finally {
      setCargando(false);
    }
  }
  return (
    <>
      <button
        onClick={handleClick}
        className="bg-blue-600 p-3 text-white rounded-full"
      >
        Verificar
      </button>

      {cargando && <ModalBloqueante />}
    </>
  );
}
