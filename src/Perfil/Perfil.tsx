import { useAuth } from "../components/context/AuthContext";
import { useEffect, useState } from "react";
import { getLastPost } from "../services/ApiPost";
import { actualizarUsuario } from "../services/ApiUsuario";

import DatosPerfil from "./DatosPerfil";
import EditarDatosPerfil from "./EditarDatosPerfil";
import AnimalesPosteados from "./AnimalesPosteados";
interface Post {
  id: number;
  nameAnimal: string;
  typeAnimal: string;
  description: string;
  image: File;
}
export default function Perfil() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [editando, setEditando] = useState(false);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const user_id = user?.id;

  //Cargar los ultimos posts del usuario
  useEffect(() => {
    async function fetchLastPost() {
      try {
        if (!user_id) return;
        const response = await getLastPost(user_id);
        const data = response.posts;
        setPosts(data);
      } catch (error) {
        console.error("Error al obtener el post", error);
      }
    }
    fetchLastPost();
  }, [user_id]);

  //Logica para mandar los datos del formulario sin errores
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const token = localStorage.getItem("token");
    // Eliminar campos vacíos
    for (let [key, value] of formData.entries()) {
      if (
        (typeof value === "string" && value.trim() === "") ||
        value === null
      ) {
        formData.delete(key);
      }
    }

    if (user_id && token) {
      try {
        const response = await actualizarUsuario(user_id, formData, token);

        setMensaje("Usuario actualizado correctamente");
        setTimeout(() => {
          setMensaje("");
          window.location.reload();
        }, 1000);
        setError("");
        setEditando(false);
      } catch (error: any) {
        let errores = "";
        const errorObj = error.response.data.errores;
        if (errorObj) {
          Object.keys(errorObj).forEach((key) => {
            errorObj[key].forEach((msg: string) => {
              errores += `${msg}\n`;
            });
          });
        }
        setError(errores || "Error al actualizar el usuario");
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="grid grid-rows-3 my-10 gap-2 min-h-screen md:grid-cols-3 xl:mx-32 ">
      <div className="p-3 row-span-1  md:col-span-1 md:row-span-full">
        {!editando ? (
          <DatosPerfil
            mensaje={mensaje}
            setEditando={setEditando}
          ></DatosPerfil>
        ) : (
          <EditarDatosPerfil
            error={error}
            loading={loading}
            handleSubmit={handleSubmit}
            mensaje={mensaje}
            setEditando={setEditando}
          ></EditarDatosPerfil>
        )}
      </div>
      <article className="  row-span-2 md:col-span-2 md:row-span-full flex flex-col gap-10 md:p-5">
        <AnimalesPosteados posts={posts}></AnimalesPosteados>
        <hr className=" border-black"></hr>
        <section>
          <h1 className="text-xl font-semibold my-2">
            Animales adoptados 🎉🎉
          </h1>
          <div className="grid grid-cols-2 gap-3 grid-rows-2 ">
            <div className="border-2 border-black rounded-lg ">
              <p>Texto prueba</p>
            </div>
            <div className="border-2 border-black rounded-lg f">
              <p>Texto prueba</p>
            </div>
            <div className="border-2 border-black rounded-lg ">
              <p>Texto prueba</p>
            </div>
            <div className="border-2 border-black rounded-lg ">
              <p>Texto prueba</p>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
