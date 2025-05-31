import useBanUser from "../../Hooks/useBanUser";
import useDesbanUser from "../../Hooks/useDesbanUser";
import useMakeAdmin from "../../Hooks/useMakeAdmin";
import { BotonCargando } from "../modals/Cargando";
interface Usuario {
  id: number;
  image: File;
  name: string;
  email: string;
  role: string;
  is_banned: boolean;
}

interface Props {
  usuario: Usuario;
  refrescar: () => void;
}
export default function TarjetaUsuario({ usuario, refrescar }: Props) {
  const { cargandoBan, errorBan, mensajeBan, fecthBanUser } = useBanUser();
  const { cargandoDesban, errorDesban, mensajeDesban, fecthDesbanUser } =
    useDesbanUser();
  const {
    cargandoMakeAdmin,
    errorMakeAdmin,
    mensajeMakeAdmin,
    fecthMakeAdmin,
  } = useMakeAdmin();

  const cargandoGlobal = cargandoBan || cargandoDesban || cargandoMakeAdmin;

  return (
    <div
      className="bg-pink-300 py-4 px-5 rounded-3xl lg:px-10 lg:py-2 lg:rounded-full my-2 border-2 border-black mx-10 flex flex-col lg:flex lg:flex-row gap-5 items-center "
      key={usuario.id}
    >
      <section className="flex gap-x-3 ">
        <img
          src={
            usuario.image
              ? `data:image/jpeg;base64,${usuario.image}`
              : "/imagenes/fotoPredeterminada.jpg"
          }
          className="w-20 h-20 rounded-full border-2 border-white"
          alt="Foto de perfil"
        ></img>
        <div className="flex flex-col justify-center">
          <div className="flex flex-col items-center">
            <p className="font-black">{usuario.name} </p>
            <p className="font-semibold">{usuario.email}</p>
          </div>

          <hr className="my-2 border-1 border-black"></hr>

          {mensajeBan || mensajeDesban || mensajeMakeAdmin ? (
            <p className="text-sm font-medium text-green-600">
              {mensajeBan || mensajeDesban || mensajeMakeAdmin}
            </p>
          ) : errorBan || errorDesban || errorMakeAdmin ? (
            <p className="text-sm font-medium text-red-600">
              {errorBan || errorDesban || errorMakeAdmin}
            </p>
          ) : (
            <div className="flex gap-x-2">
              <p className="text-sm font-medium">
                Acceso:{" "}
                <span className="font-normal">
                  {usuario.role === "user" ? "Usuario" : "Admin"}
                </span>
              </p>
              <p className="text-sm font-medium">
                Estado:{" "}
                <span className="font-normal">
                  {usuario.is_banned ? "Baneado" : "No baneado"}
                </span>
              </p>
            </div>
          )}
        </div>
      </section>
      <section>
        {cargandoGlobal ? (
          <BotonCargando></BotonCargando>
        ) : (
          <div className="flex flex-col   gap-2 ">
            <button
              onClick={() => fecthMakeAdmin({ id: usuario.id, refrescar })}
              className="bg-amber-300 p-3 rounded-full font-bold"
            >
              Administrador
            </button>
            <div className="flex gap-x-2">
              <button
                onClick={() => fecthBanUser({ id: usuario.id, refrescar })}
                className="bg-red-800 p-3 px-6 rounded-full text-white font-bold "
              >
                Ban
              </button>
              <button
                onClick={() => fecthDesbanUser({ id: usuario.id, refrescar })}
                className="bg-green-800 p-3 rounded-full text-white font-bold"
              >
                Desban
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
