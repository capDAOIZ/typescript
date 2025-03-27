import { useState, useEffect } from "react";
import { getPosts } from "../services/ApiPost";

interface Post {
  id: number;
  nameAnimal: string;
  typeAnimal: string;
  description: string;
  image: File;
}

export default function Adoptables() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  async function fetchPosts(page: number) {
    try {
      const response = await getPosts(page);
      const data = response.posts.data;
      setPosts(data);
      setPaginaActual(response.posts.current_page);
      setTotalPaginas(response.posts.last_page);
    } catch (e: any) {
      setError("Error al obtener los posts");
    }
  }

  if (error) {
    return console.error(error);
  }

  useEffect(() => {
    fetchPosts(paginaActual);
  }, [paginaActual]);

  return (
    <section className="w-full min-h-screen py-12 bg-gray-100 text-center px-12">
      <h2 className="text-3xl font-bold text-gray-800">Mascotas en Adopción</h2>
      <p className="text-gray-600 mt-2">
        Aquí tienes algunas de las últimas mascotas en adopción.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 max-w-7xl mx-auto">
        {posts.map((post) => (
          <div className="bg-white p-4 shadow-lg rounded-lg" key={post.id}>
            <img alt={post.nameAnimal} />
            <h3 className="text-xl font-bold mt-4">{post.nameAnimal}</h3>
            <p className="text-gray-600">{post.typeAnimal}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setPaginaActual(paginaActual - 1)}
          disabled={paginaActual === 1}
          className="px-4 py-2 bg-gray-300 text-white rounded-l-md"
        >
          Anterior
        </button>
        <span className="px-4 py-2 flex items-center">
          Página {paginaActual} de {totalPaginas}
        </span>
        <button
          onClick={() => setPaginaActual(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
          className="px-4 py-2 bg-gray-300 text-white rounded-r-md"
        >
          Siguiente
        </button>
      </div>
    </section>
  );
}
