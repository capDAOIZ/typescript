import { useAuth } from "./context/AuthContext";

export default function Perfil() {
  const { user } = useAuth();
  return (
    <div className="grid grid-rows-3 my-10 gap-2 min-h-screen md:grid-cols-3 xl:mx-32 ">
      <div className="p-3 row-span-1  md:col-span-1 md:row-span-full">
        <section className="grid grid-rows-2 gap-0">
          <div className="grid grid-cols-4 gap-x-4 md:block">
            <div className="col-span-1">
              <img
                className="rounded-full object-cover w-40 h-40 border-4 col-span-1 border-black  md:w-72 md:h-72  md:justify-self-center md:self-start "
                src="Goku.jpg"
                alt="Imagen del pefil"
              ></img>
            </div>
            <div className=" col-span-3 self-center ">
              <h1 className="font-bold text-3xl">{user?.name}</h1>
              <p>
                {user?.email} || Tu acceso actual es{" "}
                <span className="font-semibold">{user?.role}</span>
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
            <button className="bg-pink-600 text-black px-10 py-2 rounded-full w-full ">
              Editar perfil
            </button>
          </div>
        </section>
      </div>
      <article className="  row-span-2 md:col-span-2 md:row-span-full flex flex-col gap-10 md:p-5">
        <section>
          <h1 className="text-xl font-semibold my-2">
            Tus ultimos animales en adopcion
          </h1>
          <div className="grid grid-cols-2 gap-3 grid-rows-2 ">
            <div className="border-2 border-black rounded-lg ">
              <p>Texto prueba</p>
            </div>
            <div className="border-2 border-black rounded-lg f">
              <p>Texto prueba</p>
            </div>
            <div className="border-2 border-black rounded-lg ">
              <p>Texto prueba</p>
            </div>
            <div className="border-2 border-black rounded-lg ">
              <p>Texto prueba</p>
            </div>
          </div>
        </section>
        <hr className=" border-black"></hr>
        <section>
          <h1 className="text-xl font-semibold my-2">
            Animales adoptados 🎉🎉
          </h1>
          <div className="grid grid-cols-2 gap-3 grid-rows-2 ">
            <div className="border-2 border-black rounded-lg ">
              <p>Texto prueba</p>
            </div>
            <div className="border-2 border-black rounded-lg f">
              <p>Texto prueba</p>
            </div>
            <div className="border-2 border-black rounded-lg ">
              <p>Texto prueba</p>
            </div>
            <div className="border-2 border-black rounded-lg ">
              <p>Texto prueba</p>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
