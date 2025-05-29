import { useAuth } from "../context/AuthContext";
import usePostsXPaginas from "../Hooks/usePostsXPaginas";
import PasadoresDePaginas from "../PasadoresDePaginas";
import TarjetaAnimales from "../Tarjetas/TarjetaAnimales";

import BotonEditar from "../Tarjetas/BotonEditar";
import BotonEliminar from "../Tarjetas/BotonEliminar";
import { Cargando } from "../../modals/Cargando";
export default function Publicaciones() {
  const { user } = useAuth();

  const {
    posts,
    paginaActual,
    totalPaginas,
    setPaginaActual,
    cargando,
    error,
    refrescar,
  } = usePostsXPaginas(user?.id);

  return (
    <section className="w-full min-h-screen py-12 bg-gray-100 text-center px-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-10">
        Tus publicaciones
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 max-w-7xl mx-auto">
        {cargando ? (
          <div className="col-span-full">
            <Cargando></Cargando>
          </div>
        ) : error ? (
          <p className="text-red-600 flex justify-center items-center col-span-full">
            {error}
          </p>
        ) : posts.length === 0 ? (
          <p className="text-blue-600 flex justify-center items-center col-span-full">
            Actualmente no tienes publicaciones
          </p>
        ) : (
          posts.map((post) => (
            <TarjetaAnimales post={post} key={post.id}>
              <BotonEditar idPost={post.id}></BotonEditar>
              <BotonEliminar
                idPost={post.id}
                refrescar={refrescar}
              ></BotonEliminar>
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
