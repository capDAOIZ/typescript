import useGetUsuario from "../../Hooks/useGetUsuario";
import { useParams } from "react-router-dom";

import DatosPerfil from "./DatosPerfil";
import AnimalesPosteados from "./AnimalesPosteados";
import AnimalesAdoptados from "./AnimalesAdoptados";

export default function VistaUsuario() {
  const { id } = useParams();
  const user_id = Number(id);

  /* Implementar esto en el futuro
  useEffect(() => {
    if (!id || isNaN(user_id)) {
      // Redirigir al home o mostrar una alerta
      navigate("/404");
    }
  }, [id, navigate, user_id]);
  */

  const { user } = useGetUsuario(user_id);

  return (
    <div className="grid lg:grid-cols-2 mb-40 mt-10 gap-x-10 mx-10 ">
      <DatosPerfil user={user}></DatosPerfil>
      {user_id && <AnimalesPosteados user_id={user_id}></AnimalesPosteados>}
    </div>
  );
}
