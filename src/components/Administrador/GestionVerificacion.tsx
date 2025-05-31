import { useState, useEffect } from "react";
import TarjetaAnimales from "../Tarjetas/TarjetaAnimales";
import BotonVerificar from "../Tarjetas/BotonVerificar";
import { Cargando } from "../modals/Cargando";
import PasadoresDePaginas from "../PasadoresDePaginas";
import useGetPostNotVerified from "../../Hooks/useGetPostNotVerified";

export default function GestionVerificacion() {
  const {
    posts,
    cargando,
    error,
    setPaginaActual,
    totalPaginas,
    paginaActual,
    refrescar,
  } = useGetPostNotVerified();

  return (
    <section className="w-full min-h-screen py-12 bg-gray-100 text-center px-12">
      <h1 className="text-2xl font-bold mb-2">
        Todos los animales por verificar ✔️
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 max-w-7xl mx-auto">
        {cargando ? (
          <div className="col-span-full">
            <Cargando />
          </div>
        ) : error ? (
          <p className="text-red-600 flex justify-center items-center col-span-full">
            {error}
          </p>
        ) : posts.length === 0 ? (
          <p className="flex justify-center items-center col-span-full text-blue-600">
            No hay posts actualmente para verificar
          </p>
        ) : (
          posts.map((post) => (
            <TarjetaAnimales post={post} key={post.id}>
              <BotonVerificar
                id={post.id}
                refrescar={refrescar}
              ></BotonVerificar>
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
