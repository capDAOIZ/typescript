import { Cargando } from "../modals/Cargando";
import useGetAdoptedPosts from "../../Hooks/useGetAdoptedPosts";
import TarjetaAnimalesMini from "../Tarjetas/TarjetaAnimalesMini";
interface Props {
  user_id: number;
}

export default function AnimalesAdoptados({ user_id }: Props) {
  const { postsAdopted, cargandoAdopted } = useGetAdoptedPosts(user_id);
  return (
    <section>
      <h1 className="text-xl font-semibold my-2 mb-10 text-center">
        Animales adoptados 🎉🎉
      </h1>
      {postsAdopted.length === 0 ? (
        cargandoAdopted ? (
          <Cargando />
        ) : (
          <p className="text-blue-600 flex justify-center items-center ">
            No hay animales adoptados
          </p>
        )
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {postsAdopted.slice(0, 4).map((post) => (
            <TarjetaAnimalesMini key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
