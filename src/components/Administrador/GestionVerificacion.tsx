import { useCallback } from "react";
import TarjetaAnimales from "../Tarjetas/TarjetaAnimales";
import BotonVerificar from "../Tarjetas/BotonVerificar";
import { Cargando } from "../modals/Cargando";
import PasadoresDePaginas from "../PasadoresDePaginas";
import useGetPostNotVerified from "../../Hooks/useGetPostNotVerified";
import debounce from "just-debounce-it";

export default function GestionVerificacion() {
  const {
    posts,
    cargando,
    error,
    setPaginaActual,
    totalPaginas,
    paginaActual,
    refrescar,
    fecthPostNotVerified,
    setTextoBusqueda,
  } = useGetPostNotVerified();

  const debouncedFetchPosts = useCallback(
    debounce((busqueda: string) => {
      fecthPostNotVerified(1, busqueda);
    }, 400),
    []
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const busqueda = formData.get("buscador") as string;
    setTextoBusqueda(busqueda);
    await fecthPostNotVerified(1, busqueda);
  }

  async function handleChangeForm(e: React.ChangeEvent<HTMLInputElement>) {
    const busqueda = e.target.value;
    setTextoBusqueda(busqueda);
    debouncedFetchPosts(busqueda);
  }

  return (
    <section className="w-full min-h-screen py-12 bg-gray-100 text-center px-12">
      <h1 className="text-2xl font-bold mb-10">
        Todos los animales por verificar ✔️
      </h1>
      <form
        className="flex gap-x-4 justify-self-center mb-10"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder=" Buscar animal..."
          className="py-2 px-4 rounded-lg border-2 border-pink-600 font-semibold"
          name="buscador"
          onChange={handleChangeForm}
        ></input>
        <button type="submit" className=" p-2 rounded-full">
          🔎
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 max-w-7xl mx-auto">
        {cargando ? (
          <div className="col-span-full">
            <Cargando />
          </div>
        ) : error ? (
          <p className="text-red-600 flex justify-center items-center col-span-full">
            Problemas en la red, intentalo mas tarde
          </p>
        ) : posts.length === 0 ? (
          <p className="flex justify-center items-center col-span-full text-blue-600">
            No hay posts actualmente para verificar
          </p>
        ) : (
          posts.map((post) => (
            <TarjetaAnimales post={post} key={post.id}>
              <BotonVerificar
                id={post.id}
                refrescar={refrescar}
              ></BotonVerificar>
            </TarjetaAnimales>
          ))
        )}
      </div>
      <PasadoresDePaginas
        paginaActual={paginaActual}
        setPaginaActual={setPaginaActual}
        totalPaginas={totalPaginas}
      ></PasadoresDePaginas>
    </section>
  );
}
