import { useState } from "react";
import useDeletePost from "../Hooks/useDeletePost";
import ConfirmacionModal from "../../modals/ConfirmacionModal";
import ModalBloqueante from "../../modals/ModalBloqueante";
interface Props {
  idPost: number;
  refrescar?: () => void;
}
export default function BotonEliminar({ idPost, refrescar }: Props) {
  const [showModal, setShowModal] = useState(false);
  const { errorDelete, fecthDeletePost, loading } = useDeletePost({
    idPost,
    refrescar,
  });

  function handleClick() {
    setShowModal(true);
  }

  async function onModalResult(confirmar: boolean) {
    setShowModal(false);
    if (confirmar) {
      await fecthDeletePost();
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="bg-red-600 p-3 text-white rounded-full"
      >
        Eliminar
      </button>

      {showModal && (
        <ConfirmacionModal
          onConfirmar={() => onModalResult(true)}
          onCancelar={() => onModalResult(false)}
        />
      )}

      {loading && <ModalBloqueante />}
    </>
  );
}
