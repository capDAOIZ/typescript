interface Usuario {
  image: File;
  name: string;
  email: string;
  biografia: string;
  role: string;
}
interface Props {
  user: Usuario;
  setEditando?: (value: boolean) => void;
  mensaje?: string;
  externo?: boolean;
}
export default function DatosPerfil({
  setEditando = () => {},
  user,
  mensaje,
  externo = false,
}: Props) {
  return (
    <section className="grid grid-rows-2 gap-0">
      <div className="grid grid-cols-4 gap-x-4 md:block">
        <div className="col-span-1 md:mb-5">
          <img
            className="rounded-full object-cover w-40 h-40 border-4 col-span-1 border-black  md:w-72 md:h-72  md:justify-self-center md:self-start "
            src={
              user?.image
                ? `data:image/jpeg;base64,${user.image}`
                : "/imagenes/fotoPredeterminada.jpg"
            }
            alt={user?.name}
          />
        </div>
        <div className="col-span-3 self-center ">
          <h1 className="font-bold text-3xl">{user.name}</h1>
          <p className="my-2">{user?.email} </p>
          <p>
            El acceso actual es{" "}
            <span className="font-semibold">{user.role}</span>
          </p>
        </div>
      </div>
      <div>
        <section className="my-5 flex flex-col gap-2">
          <h1 className="text-xl font-semibold">Sobre mi</h1>
          <p id="biografia">
            {user?.biografia ? user?.biografia : "Pensando..."}
          </p>
        </section>
        {mensaje && (
          <p className="text-green-600 text-sm my-4 text-center">{mensaje}</p>
        )}
        {externo ? (
          ""
        ) : (
          <button
            className="bg-pink-600 text-black px-10 py-2 rounded-full w-full"
            onClick={() => {
              setEditando(true);
            }}
          >
            Editar perfil
          </button>
        )}
      </div>
    </section>
  );
}
