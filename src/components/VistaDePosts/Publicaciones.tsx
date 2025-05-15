import { useAuth } from "../context/AuthContext";
import usePostsXPaginas from "../Hooks/usePostsXPaginas";
import PasadoresDePaginas from "../PasadoresDePaginas";
import { Link } from "react-router-dom";
export default function Publicaciones() {
  const { user } = useAuth();
  if (!user) return null;
  const {
    posts,
    paginaActual,
    totalPaginas,
    setPaginaActual,
    cargando,
    error,
  } = usePostsXPaginas(user.id);
  return (
    <section className="w-full min-h-screen py-12 bg-gray-100 text-center px-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-10">
        Estas son tus publicaciones
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 max-w-7xl mx-auto">
        {cargando ? (
          <div className=" flex justify-center items-center col-span-full gap-x-2">
            <div className=" w-6 h-6 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
            Cargando...
          </div>
        ) : error ? (
          <p className="text-blue-600 flex justify-center items-center col-span-full">
            Actualmente no tienes publicaciones
          </p>
        ) : (
          posts.map((post) => (
            <div className="bg-white p-4 shadow-lg rounded-lg" key={post.id}>
              <Link to={`/adoptables/${post.id}`}>
                <img
                  className="rounded-lg cursor-pointer"
                  src="/imagenes/animales.jpg"
                  alt={post.nameAnimal}
                />
              </Link>
              <h3 className="text-xl font-bold mt-4 truncate">
                {post.nameAnimal}
              </h3>
              <p className="text-gray-600">
                {post.typeAnimal == "perro" ? "Perro 🐶 " : "Gato 🐱 "}
              </p>
            </div>
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
