import usePostsXPaginas from "../../Hooks/usePostsXPaginas";
import PasadoresDePaginas from "../PasadoresDePaginas";
import TarjetaAnimales from "../Tarjetas/TarjetaAnimales";
import { Cargando } from "../modals/Cargando";
import { useCallback, useEffect, useState } from "react";
import debounce from "just-debounce-it";

export default function Adoptables() {
  const {
    posts,
    cargando,
    error,
    setPaginaActual,
    paginaActual,
    totalPaginas,
    fetchPosts,
    setTipoBusqueda,
    setTextoBusqueda,
    tipoBusqueda,
    textoBusqueda,
    refrescar,
  } = usePostsXPaginas();

  const debouncedFetchPosts = useCallback(
    debounce((busqueda: string) => {
      fetchPosts(1, busqueda, tipoBusqueda);
    }, 400),
    []
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const texto = formData.get("buscador") as string;
    setTextoBusqueda(texto);
    await fetchPosts(1, texto, tipoBusqueda);
  }

  async function handleChangeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    // Valor seleccionado entre perros || gatos || todos
    const valorSeleccionado = e.target.value;

    setTipoBusqueda(valorSeleccionado);
    await fetchPosts(1, textoBusqueda, valorSeleccionado);
  }

  async function handleChangeForm(e: React.ChangeEvent<HTMLInputElement>) {
    const busqueda = e.target.value;
    setTextoBusqueda(busqueda);
    debouncedFetchPosts(busqueda);
  }

  return (
    <section className="w-full min-h-screen py-12 bg-gray-100 text-center px-12">
      <div className="flex flex-col items-center gap-y-5 mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Mascotas en Adopción {""}
        </h1>

        <p className="text-gray-600  text-md font-semibold">
          Aquí tienes nuestras mascotas en adopción.
        </p>

        {/* BUSCADOR Y FILTRADOR*/}
        <section className="flex gap-x-8">
          <select
            // onFocus onBlur
            value={tipoBusqueda}
            className="py-2 px-4 rounded-lg border-2 border-pink-600 font-semibold"
            onChange={handleChangeSelect}
          >
            <option value="">Todos</option>
            <option value="perro">Perros</option>
            <option value="gato">Gatos</option>
          </select>
          <form className="flex gap-x-4" onSubmit={handleSubmit}>
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
        </section>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 max-w-7xl mx-auto">
        {cargando ? (
          <div className="col-span-full">
            <Cargando></Cargando>
          </div>
        ) : error ? (
          <p className="text-red-600 flex justify-center items-center col-span-full">
            Problemas en la red, intentalo mas tarde
          </p>
        ) : posts.length === 0 ? (
          <p className="col-span-full text-blue-600 text-center">
            Actualmente no tenemos animales en adopcion
          </p>
        ) : (
          posts.map((post) => (
            <TarjetaAnimales key={post.id} post={post}></TarjetaAnimales>
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
