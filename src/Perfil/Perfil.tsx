import { useAuth } from "../components/context/AuthContext";
import { useState } from "react";
import { actualizarUsuario } from "../services/ApiUsuario";

import DatosPerfil from "./DatosPerfil";
import EditarDatosPerfil from "./EditarDatosPerfil";
import AnimalesPosteados from "./AnimalesPosteados";
import { AnimalesAdoptados } from "./AnimalesAdoptados";

export default function Perfil() {
  const { user } = useAuth();
  const user_id = user?.id;

  const [editando, setEditando] = useState(false);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

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

        //El mensaje de exito se mostrara por 1 segundo en el componente DatosPerfil y luego se recargara la pagina
        setMensaje("Usuario actualizado correctamente");
        setTimeout(() => {
          setMensaje("");
          window.location.reload();
        }, 1000);

        //
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
    <div className="grid grid-rows-3 my-10 gap-2 min-h-screen md:grid-cols-3 ">
      <div className="p-3 row-span-1 md:col-span-1 md:row-span-full">
        {!editando ? (
          <DatosPerfil
            mensaje={mensaje}
            user={user}
            setEditando={setEditando}
          ></DatosPerfil>
        ) : (
          <EditarDatosPerfil
            error={error}
            user={user}
            loading={loading}
            handleSubmit={handleSubmit}
            mensaje={mensaje}
            setEditando={setEditando}
          ></EditarDatosPerfil>
        )}
      </div>
      <article className="flex flex-col gap-10 row-span-2 p-5 md:col-span-2 md:row-span-full ">
        <AnimalesPosteados user_id={user_id}></AnimalesPosteados>
        <hr className=" border-black"></hr>
        <AnimalesAdoptados user_id={user_id}></AnimalesAdoptados>
      </article>
    </div>
  );
}
