import { useCallback } from "react";
import TarjetaUsuario from "./TarjetaUsuario";
import { Cargando } from "../modals/Cargando";
import PasadoresDePaginas from "../PasadoresDePaginas";
import useUsuariosXPaginas from "../../Hooks/useUsuariosXPaginas";
import debounce from "just-debounce-it";

export default function GestionUsuarios() {
  const {
    usuarios,
    cargando,
    totalPaginas,
    actualPagina,
    setActualPagina,
    setRefrescarFecth,
    setTextoBusqueda,
    fechtGetUsuariosXPaginas,
  } = useUsuariosXPaginas();

  const debouncedFetchPosts = useCallback(
    debounce((busqueda: string) => {
      fechtGetUsuariosXPaginas(1, busqueda);
    }, 400),
    []
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const busqueda = formData.get("buscador") as string;
    setTextoBusqueda(busqueda);
    await fechtGetUsuariosXPaginas(1, busqueda);
  }

  async function handleChangeForm(e: React.ChangeEvent<HTMLInputElement>) {
    const busqueda = e.target.value;
    setTextoBusqueda(busqueda);
    debouncedFetchPosts(busqueda);
  }

  return (
    <div className="min-h-screen flex flex-col items-center my-20 ">
      <h1 className="text-2xl font-bold mb-6">
        Todos los usuarios registrados
      </h1>
      <form className="flex gap-x-4 mb-6" onSubmit={handleSubmit}>
        <input
          type="text"
          name="buscador"
          placeholder="Buscar usuario..."
          className="py-2 px-4 rounded-lg border-2 font-semibold focus:border-pink-600 focus:outline-none "
          required
          onChange={handleChangeForm}
        ></input>
        <button type="submit" className=" p-2 rounded-full">
          🔎
        </button>
      </form>
      {cargando ? (
        <Cargando />
      ) : (
        usuarios.map((usuario) => (
          <TarjetaUsuario
            key={usuario.id}
            usuario={usuario}
            refrescar={() => setRefrescarFecth((prevData) => !prevData)}
          ></TarjetaUsuario>
        ))
      )}
      <PasadoresDePaginas
        paginaActual={actualPagina}
        setPaginaActual={setActualPagina}
        totalPaginas={totalPaginas}
      ></PasadoresDePaginas>
    </div>
  );
}
