import { useAuth } from "../../Hooks/useAuth";
import usePostsVerifiedUser from "../../Hooks/usePostsVerifiedUser";
import PasadoresDePaginas from "../PasadoresDePaginas";
import TarjetaAnimales from "../Tarjetas/TarjetaAnimales";
import BotonEditar from "../Tarjetas/BotonEditar";
import BotonEliminar from "../Tarjetas/BotonEliminar";
import { Cargando } from "../modals/Cargando";
import debounce from "just-debounce-it";
import { useCallback } from "react";
export default function Publicaciones() {
  const { user } = useAuth();

  if (!user) return null;

  const {
    posts,
    paginaActual,
    totalPaginas,
    setPaginaActual,
    cargando,
    error,
    refrescar,
    fetchPostsVerifiedUser,
    setTextoBusqueda,
    textoBusqueda,
  } = usePostsVerifiedUser(user.id);

  const debouncedFetchPosts = useCallback(
    debounce((busqueda: string) => {
      fetchPostsVerifiedUser(user.id, 1, busqueda);
    }, 400),
    []
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) return;
    const formData = new FormData(e.currentTarget);
    const textoBusqueda = formData.get("buscador") as string;
    setTextoBusqueda(textoBusqueda);
    await fetchPostsVerifiedUser(user.id, 1, textoBusqueda);
  }

  async function handleChangeForm(e: React.ChangeEvent<HTMLInputElement>) {
    const busqueda = e.target.value;
    setTextoBusqueda(busqueda);
    debouncedFetchPosts(busqueda);
  }

  return (
    <section className="w-full min-h-screen py-12 bg-gray-100 text-center px-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-10">
        Tus publicaciones
      </h1>
      {/* BUSCADOR */}
      <form
        className="flex gap-x-4 justify-self-center mb-10"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder=" Buscar animal..."
          className="py-2 px-4 rounded-lg border-2 border-pink-600 font-semibold"
          name="buscador"
          onChange={handleChangeForm}
        ></input>
        <button type="submit" className=" p-2 rounded-full">
          🔎
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 max-w-7xl mx-auto">
        {cargando ? (
          <div className="col-span-full">
            <Cargando></Cargando>
          </div>
        ) : error ? (
          <p className="text-red-600 flex justify-center items-center col-span-full">
            {error}
          </p>
        ) : posts.length === 0 ? (
          <p className="text-blue-600 flex justify-center items-center col-span-full">
            Actualmente no tienes publicaciones
          </p>
        ) : (
          posts.map((post) => (
            <TarjetaAnimales post={post} key={post.id}>
              <BotonEditar idPost={post.id}></BotonEditar>
              <BotonEliminar
                idPost={post.id}
                refrescar={refrescar}
              ></BotonEliminar>
            </TarjetaAnimales>
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
