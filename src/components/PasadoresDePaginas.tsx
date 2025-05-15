interface Props {
  paginaActual: number;
  setPaginaActual: React.Dispatch<React.SetStateAction<number>>;
  totalPaginas: number;
}
export default function PasadoresDePaginas({
  paginaActual,
  setPaginaActual,
  totalPaginas,
}: Props) {
  return (
    <div className="mt-10 flex justify-center">
      <button
        onClick={() => setPaginaActual((prevData) => prevData - 1)}
        disabled={paginaActual === 1}
        className={`${
          paginaActual === 1 ? "bg-gray-500" : "bg-blue-600"
        } px-4 py-2 bg-blue-600 text-white rounded-l-md`}
      >
        Anterior
      </button>
      <span className="px-4 py-2 flex items-center">
        Página {paginaActual} de {totalPaginas}
      </span>
      <button
        onClick={() => setPaginaActual((prevData) => prevData + 1)}
        disabled={paginaActual === totalPaginas}
        className={`${
          paginaActual == totalPaginas ? "bg-gray-500" : "bg-blue-600"
        } px-4 py-2 text-white rounded-r-md`}
      >
        Siguiente
      </button>
    </div>
  );
}
