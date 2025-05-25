import { useNavigate } from "react-router-dom";

interface Props {
  id: number;
}
export default function BotonEditar({ id }: Props) {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/editarPost/${id}`);
  }
  return (
    <button
      onClick={handleClick}
      className="bg-blue-600 p-3 text-white rounded-full"
    >
      Editar
    </button>
  );
}
