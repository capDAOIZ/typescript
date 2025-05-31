import usePostsXPaginas from "../../Hooks/usePostsXPaginas";
import TarjetaAnimales from "../Tarjetas/TarjetaAnimales";
import BotonEliminar from "../Tarjetas/BotonEliminar";
import { Cargando } from "../modals/Cargando";
import PasadoresDePaginas from "../PasadoresDePaginas";
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
          <div className="flex justify-center items-center col-span-full">
            <Cargando />
          </div>
        ) : error ? (
          <p className="text-red-600 flex justify-center items-center col-span-full">
            {error}
          </p>
        ) : posts.length === 0 ? (
          <p className="flex justify-center items-center col-span-full text-blue-600">
            No hay posts actualmente
          </p>
        ) : (
          posts.map((post) => (
            <TarjetaAnimales post={post} key={post.id}>
              <BotonEliminar idPost={post.id} refrescar={refrescar} />
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
