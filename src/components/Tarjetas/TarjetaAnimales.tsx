import { Link } from "react-router-dom";

interface Post {
  id: number;
  nameAnimal: string;
  typeAnimal: string;
  description: string;
  image: File;
}
interface Props {
  post: Post;
  children?: React.ReactNode;
}

/*{`${post.image? `data:image/jpeg;base64,${post.image}`: "/imagenes/animales.jpg"}`} */
export default function TarjetaAnimales({ post, children }: Props) {
  return (
    <div className="bg-white p-4 shadow-lg rounded-lg" key={post.id}>
      <Link to={`/adoptables/${post.id}`}>
        <img
          className="rounded-lg cursor-pointer"
          src="/imagenes/animales.jpg"
          alt={post.nameAnimal}
        />
      </Link>
      <h3 className="text-xl font-bold mt-4 truncate">{post.nameAnimal}</h3>
      <p className="text-gray-600">
        {post.typeAnimal == "perro" ? "Perro 🐶 " : "Gato 🐱 "}
      </p>
      <section className="flex gap-x-4 m-4 justify-center">{children}</section>
    </div>
  );
}
