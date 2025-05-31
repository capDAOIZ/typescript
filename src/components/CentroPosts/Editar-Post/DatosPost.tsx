import useGetPost from "../../../Hooks/useGetPost";
interface Props {
  id: number;
}
export default function DatosPost({ id }: Props) {
  const { post } = useGetPost({ id });
  return (
    <>
      <h2 className="text-2xl font-semibold text-center ">DATOS DEL POST</h2>
      <div className="flex flex-col gap-y-5 mt-5 border-2 border-pink-600 p-10 rounded-xl shadow-2xl">
        <p className="font-medium">
          Nombre del animal:{" "}
          <span className="font-bold ml-3">{post.nameAnimal}</span>
        </p>
        <p className="font-medium">
          Descripcion del animal:{" "}
          <span className="font-bold ml-3">{post.description}</span>
        </p>
        <p className="font-medium">
          Raza del animal: <span className="font-bold ml-3">{post.race}</span>
        </p>
        <p className="font-medium">Imagen del animal: </p>
        <img
          src={`${
            post.image
              ? "data:image/jpeg;base64," + post.image
              : "/imagenes/animales.jpg"
          }`}
          className="w-1/2 self-center rounded-2xl"
        ></img>
      </div>
    </>
  );
}
