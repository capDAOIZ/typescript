interface Props {
  handleClick(): void;
}
export default function BotonEliminar({ handleClick }: Props) {
  return (
    <button
      onClick={handleClick}
      className="bg-red-600 p-3 text-white rounded-full"
    >
      Eliminar
    </button>
  );
}
