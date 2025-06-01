import useGetLastPosts from "../../Hooks/useGetLastPosts";
import TarjetaAnimalesMini from "../Tarjetas/TarjetaAnimalesMini";
import { Cargando } from "../modals/Cargando";
interface Props {
  user_id: number;
}

export default function AnimalesPosteados({ user_id }: Props) {
  const { posts, cargando } = useGetLastPosts({ user_id });

  return (
    <section>
      <h1 className="text-xl font-semibold my-2 mb-10 text-center">
        Ultimos animales en adopcion 🐶🐾🐱
      </h1>
      {posts.length === 0 ? (
        cargando ? (
          <Cargando />
        ) : (
          <p className="text-blue-600 flex justify-center items-center ">
            No hay animales en adopcion
          </p>
        )
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {posts.slice(0, 4).map((post) => (
            <TarjetaAnimalesMini key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
