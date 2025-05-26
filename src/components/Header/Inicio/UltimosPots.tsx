import useGetLastPosts from "../../Hooks/useGetLastPosts";
import TarjetaAnimales from "../../Tarjetas/TarjetaAnimales";

export default function UltimosPots() {
  const { posts, cargando, error } = useGetLastPosts();
  return (
    <article className="grid grid-cols-1 max-w-6xl mx-auto px-20 gap-8 md:grid-cols-2 ">
      {cargando ? (
        <div className=" flex justify-center items-center gap-x-2">
          <div className=" w-6 h-6 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
          Cargando...
        </div>
      ) : error ? (
        <p className="text-red-600">Problemas en la red, intentalo mas tarde</p>
      ) : (
        posts.map((post) => (
          <TarjetaAnimales key={post.id} post={post}></TarjetaAnimales>
        ))
      )}
    </article>
  );
}
