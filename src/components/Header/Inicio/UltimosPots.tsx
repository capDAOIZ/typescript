import useGetLastPosts from "../../Hooks/useGetLastPosts";
import TarjetaAnimales from "../../Tarjetas/TarjetaAnimales";
import { Cargando } from "../../../modals/Cargando";

export default function UltimosPots() {
  const { posts, cargando, error } = useGetLastPosts();
  return (
    <article className="grid grid-cols-1 max-w-6xl mx-auto px-20 gap-8 md:grid-cols-2 ">
      {cargando ? (
        <div className="col-span-full  text-center">
          <Cargando />
        </div>
      ) : error ? (
        <p className="col-span-full text-red-600 text-center">
          Problemas en la red, intentalo mas tarde
        </p>
      ) : (
        posts.map((post) => (
          <TarjetaAnimales key={post.id} post={post}></TarjetaAnimales>
        ))
      )}
    </article>
  );
}
