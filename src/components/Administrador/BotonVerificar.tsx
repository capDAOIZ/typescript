import { validatePost } from "../../services/ApiPost";
interface Props {
  id: number;
}
export default function BotonVerificar({ id }: Props) {
  async function handleClick() {
    try {
      await validatePost(id);
      alert("Post verificado correctamente");
    } catch (error) {
      console.error("Error al validar el post", error);
    } finally {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }
  return (
    <button
      onClick={handleClick}
      className="bg-blue-600 p-3 text-white rounded-full"
    >
      Verificar
    </button>
  );
}
