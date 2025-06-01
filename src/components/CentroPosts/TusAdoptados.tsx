import { useAuth } from "../../Hooks/useAuth";
import useGetAdoptedPosts from "../../Hooks/useGetAdoptedPosts";
import PasadoresDePaginas from "../PasadoresDePaginas";
import TarjetaAnimales from "../Tarjetas/TarjetaAnimales";
import { Cargando } from "../modals/Cargando";
import BotonPDF from "../Tarjetas/BotonPDF";
export default function TusAdoptados() {
  const { user } = useAuth();
  if (!user) return null;
  const {
    postsAdopted,
    cargandoAdopted,
    paginaActual,
    totalPaginas,
    setPaginaActual,
    errorAdopted,
  } = useGetAdoptedPosts(user?.id);

  return (
    <section className="w-full min-h-screen py-12 bg-gray-100 text-center px-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-10">
        Tus animales adoptados
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 max-w-7xl mx-auto">
        {cargandoAdopted ? (
          <div className="col-span-full">
            <Cargando></Cargando>
          </div>
        ) : errorAdopted ? (
          <p className="text-red-600 flex justify-center items-center col-span-full">
            {errorAdopted}
          </p>
        ) : postsAdopted.length === 0 ? (
          <p className="text-blue-600 flex justify-center items-center col-span-full">
            Actualmente no tienes animales adoptados
          </p>
        ) : (
          postsAdopted.map((post) => (
            <TarjetaAnimales post={post} key={post.id}>
              <BotonPDF PostId={post.id}></BotonPDF>
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
