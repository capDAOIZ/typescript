import { useState, useEffect } from "react";

import {
  banearUsuario,
  desbanearUsuario,
  makeAdmin,
} from "../../services/ApiUsuario";

interface Usuario {
  id: number;
  imagen: File;
  nombre: string;
  email: string;
  role: string;
  is_banned: boolean;
}

interface Props {
  usuario: Usuario;
  token: string | null;
  refrescar: () => void;
}
export default function TarjetaUsuario({ usuario, token, refrescar }: Props) {
  const [loadingAction, setLoadingAction] = useState(false);
  const [error, setError] = useState("");
  const [gestionBaneos, setGestionBaneos] = useState(false);
  const [mensaje, setMensaje] = useState("");

  async function banUsuario(id: number) {
    if (!token) return;
    setLoadingAction(true);
    try {
      const response = await banearUsuario(id, token);
      setMensaje(response.mensaje);
      setTimeout(() => refrescar(), 3000);
      return;
    } catch (error: any) {
      setError(error.response.data.mensaje);
    } finally {
      setGestionBaneos(false);
      setLoadingAction(false);
      setTimeout(() => setError(""), 3000);
    }
  }

  async function desbanUsuario(id: number) {
    if (!token) return;
    setLoadingAction(true);
    try {
      const response = await desbanearUsuario(id, token);
      setMensaje(response.mensaje);
      setTimeout(() => refrescar(), 3000);
      return;
    } catch (error: any) {
      setError(error.response.data.mensaje);
    } finally {
      setGestionBaneos(false);
      setLoadingAction(false);
      setTimeout(() => setError(""), 3000);
    }
  }

  async function convertirAdmin(id: number) {
    if (!token) return;
    setLoadingAction(true);
    try {
      const response = await makeAdmin(id, token);
      setMensaje(response.mensaje);
      setTimeout(() => refrescar(), 3000);
      return;
    } catch (error: any) {
      setError(error.response.data.mensaje);
      console.log(error);
    } finally {
      setGestionBaneos(false);
      setLoadingAction(false);
      setTimeout(() => setError(""), 3000);
    }
  }

  return (
    <div
      className="bg-pink-300 p-3 rounded-full flex gap-x-5 items-center my-2 border-2 border-black "
      key={usuario.id}
    >
      <section className="flex gap-x-2">
        <img
          src={
            usuario.imagen
              ? `data:image/jpeg;base64,${usuario.imagen}`
              : "/imagenes/fotoPredeterminada.jpg"
          }
          className="w-20 h-20 rounded-full border-2 border-white"
          alt="Foto de perfil"
        ></img>
        <div className="flex flex-col justify-center">
          <p className="font-black">{usuario.nombre} </p>
          <p className="font-semibold">{usuario.email}</p>

          <hr className="my-2 border-1 border-black"></hr>

          {mensaje ? (
            <p className="text-sm font-medium text-green-600">{mensaje}</p>
          ) : error ? (
            <p className="text-sm font-medium text-red-600">{error}</p>
          ) : (
            <div className="flex gap-x-2">
              <p className="text-sm font-medium">
                Acceso:{" "}
                <span className="font-normal">
                  {usuario.role === "user" ? "Usuario" : "Admin"}
                </span>
              </p>
              <p className="text-sm font-medium">
                Estado:{" "}
                <span className="font-normal">
                  {usuario.is_banned ? "Baneado" : "No baneado"}
                </span>
              </p>
            </div>
          )}
        </div>
      </section>
      <section className="flex gap-x-2">
        {loadingAction ? (
          <button className="bg-gray-500 p-3 rounded-full">
            <div className=" flex justify-center items-center gap-x-2">
              <div className=" w-6 h-6 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
              Cargando...
            </div>
          </button>
        ) : (
          <div className="flex gap-x-2">
            <button
              onClick={() => convertirAdmin(usuario.id)}
              className="bg-yellow-200 p-3 rounded-full"
            >
              Hacerlo administrador
            </button>
            {!gestionBaneos ? (
              <button
                onClick={() => setGestionBaneos(true)}
                className="bg-blue-400 p-3 rounded-full"
              >
                Gestionar baneos
              </button>
            ) : (
              <div className="flex gap-x-2">
                <button
                  onClick={() => banUsuario(usuario.id)}
                  className="bg-red-600 p-3 rounded-full"
                >
                  Banear
                </button>
                <button
                  onClick={() => desbanUsuario(usuario.id)}
                  className="bg-green-600 p-3 rounded-full"
                >
                  Desbanear
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
