interface Props {
  onConfirmar: () => void;
  onCancelar: () => void;
}
export default function ConfirmacionModal({ onConfirmar, onCancelar }: Props) {
  return (
    <div
      role="modal"
      className="fixed inset-0 pt-52 flex items-start justify-center"
    >
      <div
        onClick={onCancelar}
        className="bg-gray-600 bg-opacity-50 min-w-full min-h-screen fixed inset-0"
      ></div>
      <section className="bg-white p-6 shadow-2xl rounded-lg z-50">
        <h1 className="text-2xl font-bold ">
          ¿Estas seguro de eliminar el post?
        </h1>
        <div className="flex gap-4 justify-around mt-5">
          <button
            onClick={onConfirmar}
            className="bg-green-400 py-3 px-6 rounded-full font-semibold"
          >
            SI
          </button>
          <button
            onClick={onCancelar}
            className="bg-red-400 py-3 px-6 rounded-full font-semibold "
          >
            NO
          </button>
        </div>
      </section>
    </div>
  );
}
