import { useNavigate } from "react-router-dom";

interface Props {
  idPost: number;
}
export default function BotonEditar({ idPost }: Props) {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/editarPost/${idPost}`);
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
