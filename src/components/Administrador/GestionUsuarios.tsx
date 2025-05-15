import { useState, useEffect } from "react";
import { getUsuarios } from "../../services/ApiUsuario";
import TarjetaUsuario from "./TarjetaUsuario";
import debounce from "just-debounce-it";

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
  const [busqueda, setBusqueda] = useState("");

  const [totalPaginas, setTotalPaginas] = useState(1);
  const [actualPagina, setActualPagina] = useState(1);
  const [pagina, setPagina] = useState(1);

  const token = localStorage.getItem("token");

  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.nombre.includes(busqueda)
  );
  const usuariosLength = usuariosFiltrados.length;

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setBusqueda(e.target.value);
    console.log(busqueda);
  }

  return (
    <div className="min-h-screen flex flex-col items-center my-20 ">
      <h1 className="text-2xl font-bold mb-6">
        Todos los usuarios registrados
      </h1>
      <form className="flex gap-x-4 mb-6" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar usuario..."
          className="py-2 px-4 rounded-lg border-2 border-pink-600 font-semibold"
          value={busqueda}
          onChange={handleChange}
          required
        ></input>
        <button type="submit" className=" p-2 rounded-full">
          🔎
        </button>
      </form>
      {loading ? (
        <div className=" flex justify-center items-center gap-x-2">
          <div className=" w-6 h-6 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
          Cargando...
        </div>
      ) : (
        usuariosFiltrados.map((usuario) => (
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
            actualPagina === 1 ? "bg-gray-500" : "bg-blue-600"
          } px-4 py-3 text-white rounded-l-full `}
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
            actualPagina === totalPaginas ? "bg-gray-500" : "bg-blue-600"
          } px-4 py-3 text-white rounded-r-full`}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
