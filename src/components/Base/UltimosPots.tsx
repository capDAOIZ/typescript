import { useState, useEffect } from "react";
import { getLastPost } from "../../services/ApiPost";
import { Link } from "react-router-dom";

interface Post {
  id: number;
  nameAnimal: string;
  typeAnimal: string;
  description: string;
  image: File;
}
export default function UltimosPots() {
  const [posts, setPosts] = useState<Post[]>([]);

  //Obtener los ultimos posts
  useEffect(() => {
    async function fetchLastPost() {
      try {
        const response = await getLastPost();
        const data = response.posts;
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error("Error al obtener el post", error);
      }
    }
    fetchLastPost();
  }, []);

  return (
    <article className="flex flex-col items-center p-4 w-full ">
      <h2 className="text-2xl font-semibold">
        Nuestras ultimas mascotas en adopcion 😊
      </h2>
      <div className="flex flex-row justify-center gap-10 flex-wrap w-full text-center">
        {posts.map((post) => (
          <div
            className="bg-white p-4 shadow-lg rounded-lg w-1/3"
            key={post.id}
          >
            <Link to={`/adoptables/${post.id}`}>
              <img
                className="rounded-lg cursor-pointer"
                src="../images/animales.jpg"
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
        ))}
      </div>
    </article>
  );
}
