import { useEffect, useState } from "react";
import { getLastPost } from "../services/ApiPost";
import { Link } from "react-router-dom";
interface Post {
  id: number;
  nameAnimal: string;
  typeAnimal: string;
  description: string;
  image: File;
}
interface Props {
  user_id: number;
}

export default function AnimalesPosteados({ user_id }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [cargando, setCargando] = useState(true);

  //Cargar los ultimos posts del usuario
  useEffect(() => {
    async function fetchLastPost() {
      setCargando(true);
      try {
        const response = await getLastPost(user_id);
        const data = response.posts;
        setPosts(data);
      } catch (error) {
        console.error("Error al obtener el post", error);
      } finally {
        setCargando(false);
      }
    }
    fetchLastPost();
  }, []);

  return (
    <section>
      <h1 className="text-xl font-semibold my-2 mb-10">
        Ultimos animales en adopcion 🐶🐾🐱
      </h1>
      {posts.length === 0 ? (
        cargando ? (
          <div className=" text-black px-10 py-2  rounded-full w-full flex justify-center items-center gap-x-2">
            <div className=" w-6 h-6 border-4 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
            Cargando...
          </div>
        ) : (
          <p className="text-center">No hay animales en adopcion</p>
        )
      ) : (
        <div className="grid grid-cols-2 gap-3 grid-rows-2 ">
          {posts.slice(0, 4).map((post) => (
            <div
              className="border-pink-400 border-4 rounded-lg text-center"
              key={post.id}
            >
              <Link to={`/adoptables/${post.id}`}>
                <img src="../imagenes/animales.jpg"></img>
              </Link>
              <p className="font-semibold p-3">{post.nameAnimal}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
