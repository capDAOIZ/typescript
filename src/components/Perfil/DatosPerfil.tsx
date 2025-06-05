interface Usuario {
  image: File;
  name: string;
  email: string;
  biografia: string;
  role: string;
}
interface Props {
  user: Usuario;
  children?: React.ReactNode;
}
export default function DatosPerfil({ user, children }: Props) {
  return (
    <div className="grid grid-rows-2 gap-y-5 lg:grid-rows-1">
      <div className="flex items-center gap-x-5 lg:grid lg:grid-rows-1 gap-y-5 ">
        <img
          className="rounded-full object-cover w-40 h-40 border-4 border-black lg:w-72 lg:h-72 lg:justify-self-center "
          src={
            user?.image
              ? `data:image/jpeg;base64,${user.image}`
              : "/imagenes/fotoPredeterminada.jpg"
          }
          alt={user?.name}
        />
        <div className="lg:px-10 xl:px-20">
          <h1 className="font-bold text-3xl">{user.name}</h1>
          <p className="my-2">{user?.email} </p>
          <p>
            El acceso actual es{" "}
            <span className="font-semibold">{user.role}</span>
          </p>
        </div>
      </div>

      <section className="lg:px-10 xl:px-20">
        <div className="mb-10">
          <h1 className="text-xl font-semibold mb-3">Sobre mi</h1>
          <p id="biografia">
            {user?.biografia ? user?.biografia : "Pensando..."}
          </p>
        </div>
        {children}
      </section>
    </div>
  );
}
