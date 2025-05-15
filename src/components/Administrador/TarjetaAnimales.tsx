import { Link } from "react-router-dom";
import { deletePost } from "../../services/ApiPost";
import { useState } from "react";
import ConfirmacionModal from "../../modals/ConfirmacionModal";

interface Post {
  id: number;
  nameAnimal: string;
  typeAnimal: string;
  description: string;
  image: File;
}
interface Props {
  post: Post;
  refrescar: () => void;
}

/*{`${post.image? `data:image/jpeg;base64,${post.image}`: "/imagenes/animales.jpg"}`} */
export default function TarjetaAnimales({ post, refrescar }: Props) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");

  async function fecthDeletePost() {
    if (!token) return;
    setLoading(true);
    try {
      const response = await deletePost(post.id, token);
      refrescar();
      return;
    } catch (error: any) {
      console.error("Error al eliminar el post", error);
    } finally {
      setLoading(false);
    }
  }

  function handleClick() {
    setShowModal(true);
  }

  function onModalResult(confirmar: boolean) {
    setShowModal(false);
    if (confirmar) {
      fecthDeletePost();
    }
  }

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg" key={post.id}>
      <Link to={`/adoptables/${post.id}`}>
        <img
          className="rounded-lg cursor-pointer"
          src="/imagenes/animales.jpg"
          alt={post.nameAnimal}
        />
      </Link>
      <h3 className="text-xl font-bold mt-4 truncate">{post.nameAnimal}</h3>
      <p className="text-gray-600">
        {post.typeAnimal == "perro" ? "Perro 🐶 " : "Gato 🐱 "}
      </p>
      {loading ? (
        <div className=" flex justify-center items-center gap-x-2 m-5">
          <div className=" w-6 h-6 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
          Cargando...
        </div>
      ) : (
        <section className="flex gap-x-4 m-4 justify-center">
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
        </section>
      )}
    </div>
  );
}
