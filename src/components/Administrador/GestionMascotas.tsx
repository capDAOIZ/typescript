import usePostsXPaginas from "../Hooks/usePostsXPaginas";
import TarjetaAnimales from "../Tarjetas/TarjetaAnimales";
import BotonEliminar from "../Tarjetas/BotonEliminar";
export default function GestionMascotas() {
  const {
    posts,
    cargando,
    error,
    setPaginaActual,
    paginaActual,
    totalPaginas,
    refrescar,
  } = usePostsXPaginas();

  return (
    <section className="w-full min-h-screen py-12 bg-gray-100 text-center px-12">
      <h1 className="text-2xl font-bold mb-2">
        Todos los animales registrados ❤️
      </h1>
      <p className="mb-7">Toca la foto de perfil para ver sus detalles</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 max-w-7xl mx-auto">
        {cargando ? (
          <p className="flex justify-center items-center col-span-full">
            CARGANDO...
          </p>
        ) : error ? (
          <p className="flex justify-center items-center col-span-full">
            No hay posts actualmente
          </p>
        ) : (
          posts.map((post) => (
            <TarjetaAnimales post={post} key={post.id}>
              <BotonEliminar id={post.id} refrescar={refrescar} />
            </TarjetaAnimales>
          ))
        )}
      </div>

      <div className="flex gap-x-4 mt-10 items-center justify-center">
        <button
          onClick={() => setPaginaActual((prevData) => prevData - 1)}
          disabled={paginaActual === 1}
          className={`${
            paginaActual === 1 ? "bg-gray-500" : "bg-blue-600"
          } px-4 py-3 bg-blue-600 text-white rounded-l-full`}
        >
          Anterior
        </button>
        <span>
          Página {paginaActual} de {totalPaginas}
        </span>
        <button
          onClick={() => setPaginaActual((prevData) => prevData + 1)}
          disabled={paginaActual === totalPaginas}
          className={`${
            paginaActual == totalPaginas ? "bg-gray-500" : "bg-blue-600"
          } px-4 py-3 text-white rounded-r-full`}
        >
          Siguiente
        </button>
      </div>
    </section>
  );
}
