import { useEffect, useState } from "react";
import { adoptedPosts } from "../services/ApiPost";
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

export default function AnimalesAdoptados({ user_id }: Props) {
  const [postsAdopted, setPostsAdopted] = useState<Post[]>([]);
  const [cargando, setCargando] = useState(true);

  //Cargar los ultimos animales adoptados del usuario
  useEffect(() => {
    setCargando(true);
    async function fetchAdoptedPosts() {
      try {
        const response = await adoptedPosts(user_id);
        const data = response.posts;
        setPostsAdopted(data);
      } catch (error) {
        console.error("Error al obtener los posts", error);
      } finally {
        setCargando(false);
      }
    }
    fetchAdoptedPosts();
  }, []);

  return (
    <section>
      <h1 className="text-xl font-semibold my-2 mb-10">
        Animales adoptados 🎉🎉
      </h1>
      {postsAdopted.length === 0 ? (
        cargando ? (
          <div className=" text-black px-10 py-2  rounded-full w-full flex justify-center items-center gap-x-2">
            <div className=" w-6 h-6 border-4 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
            Cargando...
          </div>
        ) : (
          <p className="text-center">No hay animales adoptados</p>
        )
      ) : (
        <div className="grid grid-cols-2 gap-3 grid-rows-2 ">
          {postsAdopted.map((post) => (
            <Link to={`/adoptables/${post.id}`}>
              <div
                className="border-pink-400 border-4 rounded-lg text-center"
                key={post.id}
              >
                <img src="../imagenes/animales.jpg"></img>
                <p className="font-semibold p-3">{post.nameAnimal}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
