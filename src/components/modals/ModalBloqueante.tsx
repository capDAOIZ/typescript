import { Cargando } from "./Cargando";

export default function ModalBloqueante() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <Cargando />
        <p className="mt-4 text-lg">Trabajando, por favor espera...</p>
      </div>
    </div>
  );
}
