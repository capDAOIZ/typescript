import usePostsXPaginas from "../Hooks/usePostsXPaginas";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PasadoresDePaginas from "../PasadoresDePaginas";

export default function Adoptables() {
  const {
    posts,
    cargando,
    error,
    setPaginaActual,
    paginaActual,
    totalPaginas,
  } = usePostsXPaginas();

  const { search } = useLocation(); // "?animal=perro"
  const params = new URLSearchParams(search); //API nativa de JS para parsear la cadena "?animal=perro&edad=2" en un mapa clave→valor
  const animal = params.get("animal") ?? "";
  const navigate = useNavigate();

  function handleAnimalChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value; // cogemos el valor del select
    params.set("animal", value); // modificamos el valor del parametro animal
    navigate(`?${params.toString()}`);
    // Al usar useLocation() o useSearchParams() React vuelve a renderizar el componente
  }

  return (
    <section className="w-full min-h-screen py-12 bg-gray-100 text-center px-12">
      <div className="flex flex-col items-center gap-y-3">
        <h1 className="text-3xl font-bold text-gray-800">
          Mascotas en Adopción {""}
        </h1>

        <section className="flex  gap-x-8">
          <select
            onChange={handleAnimalChange}
            // onFocus onBlur
            className="py-2 px-4 rounded-lg border-2 border-pink-600 font-semibold"
            value={animal}
          >
            <option value="">Todos</option>
            <option value="perro">Perros</option>
            <option value="gato">Gatos</option>
          </select>
          <form className="flex gap-x-4">
            <input
              type="text"
              placeholder=" Buscar animal..."
              className="py-2 px-4 rounded-lg border-2 border-pink-600 font-semibold"
              minLength={3}
              required
            ></input>
            <button type="submit" className=" p-2 rounded-full">
              🔎
            </button>
          </form>
        </section>

        <p className="text-gray-600 mt-2">
          Aquí tienes nuestras mascotas en adopción.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 max-w-7xl mx-auto">
        {cargando ? (
          <div className=" flex justify-center items-center col-span-full gap-x-2">
            <div className=" w-6 h-6 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
            Cargando...
          </div>
        ) : error ? (
          <p className="text-red-600 flex justify-center items-center col-span-full">
            Problemas en la red, intentalo mas tarde
          </p>
        ) : (
          posts
            .filter((post) => animal === "" || post.typeAnimal === animal)
            .map((post) => (
              <div className="bg-white p-4 shadow-lg rounded-lg" key={post.id}>
                <Link to={`/adoptables/${post.id}`}>
                  <img
                    className="rounded-lg cursor-pointer"
                    src="/imagenes/animales.jpg"
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
            ))
        )}
      </div>

      <PasadoresDePaginas
        paginaActual={paginaActual}
        setPaginaActual={setPaginaActual}
        totalPaginas={totalPaginas}
      ></PasadoresDePaginas>
    </section>
  );
}
