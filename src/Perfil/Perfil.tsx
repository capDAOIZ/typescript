import { useAuth } from "../components/context/AuthContext";
import { useState } from "react";
import { actualizarUsuario } from "../services/ApiUsuario";
import useUpdateUser from "../components/Hooks/useUpdateUser";

import DatosPerfil from "./DatosPerfil";
import EditarDatosPerfil from "./EditarDatosPerfil";
import AnimalesPosteados from "./AnimalesPosteados";
import AnimalesAdoptados from "./AnimalesAdoptados";

export default function Perfil() {
  const { user } = useAuth();
  const user_id = user?.id;

  const { mensaje, error, loading, fecthUpdateuser } = useUpdateUser();

  const [editando, setEditando] = useState(false);

  //Logica para mandar los datos del formulario sin errores
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    // Eliminar campos vacíos
    for (let [key, value] of formData.entries()) {
      if (
        (typeof value === "string" && value.trim() === "") ||
        value === null
      ) {
        formData.delete(key);
      }
    }

    await fecthUpdateuser({ user_id: user_id!, formData });
  }

  return (
    <div className="grid grid-rows-1 lg:grid-cols-2 mt-10 mb-40 lg:mb-0 gap-10 min-h-screen  mx-20">
      <div>
        {!editando ? (
          user && (
            <DatosPerfil user={user}>
              <button
                className="bg-pink-600 text-black px-10 py-2 rounded-full w-full"
                onClick={() => {
                  setEditando(true);
                }}
              >
                Editar perfil
              </button>
            </DatosPerfil>
          )
        ) : (
          <EditarDatosPerfil
            error={error}
            user={user}
            loading={loading}
            mensaje={mensaje}
            handleSubmit={handleSubmit}
            setEditando={setEditando}
          ></EditarDatosPerfil>
        )}
      </div>
      {user_id && (
        <article className=" grid lg:grid-rows-2 gap-y-10">
          <AnimalesPosteados user_id={user_id}></AnimalesPosteados>
          <AnimalesAdoptados user_id={user_id}></AnimalesAdoptados>
        </article>
      )}
    </div>
  );
}
