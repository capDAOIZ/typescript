import useGetUsuario from "../components/Hooks/useGetUsuario";
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
  const externo = true;

  return (
    <div className="grid grid-rows-3 my-10 gap-2 min-h-screen md:grid-cols-3 mx-5">
      <div className="p-3 row-span-1 md:col-span-1 md:row-span-full">
        <DatosPerfil user={user} externo={externo}></DatosPerfil>
      </div>
      {user_id && (
        <article className="flex flex-col gap-10 row-span-2 p-5 md:col-span-2 md:row-span-full ">
          <AnimalesPosteados user_id={user_id}></AnimalesPosteados>
          <hr className=" border-black"></hr>
          <AnimalesAdoptados user_id={user_id}></AnimalesAdoptados>
        </article>
      )}
    </div>
  );
}
