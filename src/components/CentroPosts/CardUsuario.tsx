import useGetUsuario from "../Hooks/useGetUsuario";
import { Link } from "react-router-dom";
interface Props {
  id: number;
}
export default function CardUsuario({ id }: Props) {
  const { user } = useGetUsuario(id);
  return (
    <div className="flex items-center gap-3">
      <Link to={`/perfilUsuario/${user.id}`}>
        <img
          className="rounded-full object-cover w-10 h-10 border-2  border-black "
          src={
            user.image
              ? `data:image/jpeg;base64,${user.image}`
              : "/imagenes/fotoPredeterminada.jpg"
          }
          alt={user.name}
        />
      </Link>
      <div>
        <h6 className="font-semibold">{user.name} </h6>
        <p>{user.email}</p>
      </div>
    </div>
  );
}
