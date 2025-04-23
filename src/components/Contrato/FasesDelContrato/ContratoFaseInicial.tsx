interface Props {
  handleFaseIntermedia: (e: React.FormEvent) => void;
}
export default function ContratoFaseInicial({ handleFaseIntermedia }: Props) {
  return (
    <section className="bg-blue-400 w-full xl:w-1/2 h-screen rounded-3xl p-10  shadow-lg shadow-pink-600 ">
      <h1 className="text-4xl font-bold mb-10 text-center">FORMULARIO</h1>
      <form className="bg-white p-10 rounded-lg shadow-xl shadow-black ">
        {/*Nombre*/}
        <div className="flex flex-col gap-4 items-center mb-5">
          <label htmlFor="name" className="text-lg font-semibold">
            Nombre{" "}
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="border-2 border-gray-500 rounded-lg p-2 w-1/2 "
            placeholder="Nombre"
          />
        </div>
        {/*Apellidos*/}
        <div className="flex flex-col gap-4 items-center mb-5">
          <label className="text-lg font-semibold">Apellidos </label>
          <div className="flex gap-4 w-full">
            <input
              type=""
              name="primerApellido"
              id="primerApellido"
              className="border-2 border-gray-500 rounded-lg p-2 w-1/2 "
              placeholder="Primer Apellido"
            />
            <input
              type="text"
              name="segundoApellido"
              id="segundoApellido"
              className="border-2 border-gray-500 rounded-lg p-2 w-1/2 "
              placeholder="Segundo Apellido"
            />
          </div>
        </div>
        {/*Correo Electronico*/}
        <div className="flex flex-col gap-4 items-center mb-5">
          <label htmlFor="correo" className="text-lg font-semibold">
            Correo Electronico{" "}
          </label>
          <input
            type="email"
            name="correo"
            id="correo"
            className="border-2 border-gray-500 rounded-lg p-2 w-1/2 "
            placeholder="Correo Electronico"
          />
        </div>
        {/*Telefono*/}
        <div className="flex flex-col gap-4 items-center mb-5">
          <label htmlFor="Telefono" className="text-lg font-semibold">
            Telefono{" "}
          </label>
          <input
            type="number"
            name="Telefono"
            id="Telefono"
            className="border-2 border-gray-500 rounded-lg p-2 w-1/2 "
            placeholder="Telefono "
          />
        </div>
        {/*Fecha Nacimiento*/}
        <div className="flex flex-col gap-4 items-center mb-5">
          <label htmlFor="Fecha Nacimiento" className="text-lg font-semibold">
            Fecha Nacimiento{" "}
          </label>
          <input
            type="date"
            name="Fecha Nacimiento"
            id="Fecha Nacimiento"
            className="border-2 border-gray-500 rounded-lg p-2 w-1/2 "
            placeholder="Fecha Nacimiento "
          />
        </div>
        <button
          onClick={handleFaseIntermedia}
          className="bg-blue-600 text-white p-4 rounded-3xl w-full mt-6  hover:bg-blue-900"
        >
          Siguiente
        </button>
      </form>
    </section>
  );
}
