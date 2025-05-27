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
}
export default function TarjetaAnimalesMini({ post }: Props) {
  return (
    <div
      className="border-pink-400 border-4 rounded-lg text-center"
      key={post.id}
    >
      <Link to={`/adoptables/${post.id}`}>
        <img src="../imagenes/animales.jpg"></img>
      </Link>
      <p className="font-semibold p-3">{post.nameAnimal}</p>
    </div>
  );
}
