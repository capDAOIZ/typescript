import usePostsXPaginas from "../../Hooks/usePostsXPaginas";
import PasadoresDePaginas from "../PasadoresDePaginas";
import TarjetaAnimales from "../Tarjetas/TarjetaAnimales";

export default function Adoptables() {
  const {
    posts,
    cargando,
    error,
    setPaginaActual,
    paginaActual,
    totalPaginas,
  } = usePostsXPaginas();

  return (
    <section className="w-full min-h-screen py-12 bg-gray-100 text-center px-12">
      <div className="flex flex-col items-center gap-y-5 mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Mascotas en Adopción {""}
        </h1>

        <p className="text-gray-600  text-md font-semibold">
          Aquí tienes nuestras mascotas en adopción.
        </p>

        {/* BUSCADOR Y FILTRADOR*/}
        <section className="flex gap-x-8">
          <select
            // onFocus onBlur
            className="py-2 px-4 rounded-lg border-2 border-pink-600 font-semibold"
          >
            <option value="">Todos</option>
            <option value="perro">Perros</option>
            <option value="gato">Gatos</option>
          </select>
          <form className="flex gap-x-4">
            <input
              type="text"
              placeholder=" Buscar animal..."
              className="py-2 px-4 rounded-lg border-2 border-pink-600 font-semibold"
              minLength={3}
              required
            ></input>
            <button type="submit" className=" p-2 rounded-full">
              🔎
            </button>
          </form>
        </section>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 max-w-7xl mx-auto">
        {cargando ? (
          <div className=" flex justify-center items-center col-span-full gap-x-2">
            <div className=" w-6 h-6 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
            Cargando...
          </div>
        ) : error ? (
          <p className="text-red-600 flex justify-center items-center col-span-full">
            Problemas en la red, intentalo mas tarde
          </p>
        ) : (
          posts.map((post) => (
            <TarjetaAnimales key={post.id} post={post}></TarjetaAnimales>
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
