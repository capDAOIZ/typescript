import { useState, useEffect } from "react";
import { getUsuarios } from "../../services/ApiUsuario";
import { Link } from "react-router-dom";
import TarjetaUsuario from "./TarjetaUsuario";

interface Usuario {
  id: number;
  imagen: File;
  nombre: string;
  email: string;
  role: string;
  is_banned: boolean;
}

export default function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [recargarFecth, setRecargarFecth] = useState(false);

  const [totalPaginas, setTotalPaginas] = useState(1);
  const [actualPagina, setActualPagina] = useState(1);
  const [pagina, setPagina] = useState(1);

  const token = localStorage.getItem("token");

  //Fecth de obtencion de usuarios
  useEffect(() => {
    async function obtenerUsuarios() {
      setLoading(true);
      try {
        const response = await getUsuarios(pagina);
        console.log(response.usuarios);
        setTotalPaginas(response.usuarios.last_page);
        setActualPagina(response.usuarios.current_page);

        //Filtrado de usuarios para que no aparecan los admins
        const controlUsuarios = response.usuarios.data
          .filter((usuario: any) => usuario.role !== "admin")
          .map((usuario: any) => ({
            id: usuario.id,
            imagen: usuario.image,
            nombre: usuario.name,
            email: usuario.email,
            role: usuario.role.trim(),
            is_banned: usuario.is_banned,
          }));

        console.log(controlUsuarios);
        setUsuarios(controlUsuarios);
        return response;
      } catch (error) {
        console.error("Error al obtener todos los usuarios", error);
      } finally {
        setLoading(false);
      }
    }
    obtenerUsuarios();
  }, [pagina, recargarFecth]);

  function siguientePagina() {
    if (actualPagina === totalPaginas) return;
    setPagina(actualPagina + 1);
  }

  function anteriorPagina() {
    if (actualPagina === 1) return;
    setPagina(actualPagina - 1);
  }

  return (
    <div className="min-h-screen flex flex-col items-center my-20 ">
      <h1 className="text-2xl font-bold mb-2">
        Todos los usuarios registrados
      </h1>
      <p className="mb-7">Toca la foto de perfil para ver sus post</p>
      {loading ? (
        <div className=" flex justify-center items-center gap-x-2">
          <div className=" w-6 h-6 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
          Cargando...
        </div>
      ) : (
        usuarios.map((usuario) => (
          <TarjetaUsuario
            key={usuario.id}
            usuario={usuario}
            token={token}
            refrescar={() => setRecargarFecth((prevData) => !prevData)}
          ></TarjetaUsuario>
        ))
      )}
      <div className="flex gap-x-4 mt-10 items-center">
        <button
          disabled={actualPagina === 1}
          onClick={anteriorPagina}
          className={`${
            actualPagina === 1 ? "bg-gray-400" : "bg-blue-400"
          } p-4 rounded-full`}
        >
          Anterior
        </button>
        <p>
          Pagina {actualPagina} de {totalPaginas}
        </p>
        <button
          disabled={actualPagina === totalPaginas}
          onClick={siguientePagina}
          className={`${
            actualPagina === totalPaginas ? "bg-gray-400" : "bg-blue-400"
          } p-4 rounded-full`}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
