interface Props {
  user: any;
  mensaje: string;
  error: string;
  loading: boolean;
  setEditando: (value: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
}
export default function EditarDatosPerfil({
  mensaje,
  user,
  setEditando,
  error,
  loading,
  handleSubmit,
}: Props) {
  return (
    <section className="grid grid-rows-1 gap-0">
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="grid grid-cols-4 gap-x-4  md:block">
          <div className="col-span-1">
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
          <div className=" col-span-3 self-center flex flex-col gap-2 p-5 rounded-lg">
            <label htmlFor="name" className="text-xl font-semibold ">
              Nombre:
            </label>
            <input
              type="text"
              name="name"
              placeholder="Escribe tu nombre..."
              defaultValue={user?.name}
              className="border-2 border-black rounded-lg p-2"
            ></input>
            <label htmlFor="email" className="text-xl font-semibold ">
              Email:
            </label>
            <input
              type="email"
              name="email"
              placeholder="Escribe tu nuevo email..."
              defaultValue={user?.email}
              className="border-2 border-black rounded-lg p-2"
            ></input>
            <label htmlFor="password" className="text-xl font-semibold ">
              Password:
            </label>
            <input
              type="password"
              name="password"
              placeholder="Escribe tu nueva contraseña..."
              className="border-2 border-black rounded-lg p-2"
            ></input>
            <label
              htmlFor="image"
              className="bg-pink-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-pink-600 text-center mt-3"
            >
              Cambiar foto 📷
            </label>
            <input
              type="file"
              name="image"
              id="image"
              className="hidden"
            ></input>
          </div>
        </div>
        <div>
          <section className="my-5 flex flex-col gap-2">
            <label htmlFor="biografia">
              <h1 className="text-xl font-semibold">Sobre mi</h1>
            </label>
            <textarea
              id="biografia"
              className="border-2 border-black rounded-lg p-2"
              name="biografia"
              placeholder="Escribe algo sobre ti..."
              defaultValue={user?.biografia ? user?.biografia : ""}
            ></textarea>
          </section>
          {error && (
            <p className="text-red-600 text-sm my-6 text-center">{error}</p>
          )}
          {!loading ? (
            <div>
              <button
                className="bg-green-600 text-black relative  px-10 py-2  rounded-full w-1/2"
                type="submit"
              >
                Save
              </button>

              <button
                className="bg-red-600 text-black px-10 py-2  rounded-full w-1/2"
                onClick={() => {
                  setEditando(false);
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="bg-gray-500 text-white px-10 py-2  rounded-full w-full flex justify-center items-center gap-x-2">
              <div className=" w-6 h-6 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
              Cargando...
            </div>
          )}
        </div>
      </form>
    </section>
  );
}
