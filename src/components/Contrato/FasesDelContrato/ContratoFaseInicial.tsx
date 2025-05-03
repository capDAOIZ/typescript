import { useParams } from "react-router-dom";
import { useState } from "react";

import { validacionCampos } from "../../../services/ApiContrato";
interface Props {
  handleFaseIntermedia: (
    e: React.FormEvent,
    data: Record<string, string>
  ) => void;
}
export default function ContratoFaseInicial({ handleFaseIntermedia }: Props) {
  const [errores, setErrores] = useState("");
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    // Convertir FormData a un objeto clave valor de strings, el Record sirve para definir un objeto con claves y valores de un tipo determinado
    const data = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    try {
      const response = await validacionCampos(data);
      // Pasamos a la siguiente fase
      setErrores("");
      handleFaseIntermedia(e, data);
    } catch (e: any) {
      let errores = "";

      const errorObj = e.errores;
      if (errorObj) {
        // un foreach de keys de un objeto para poder iterar sobre sus propiedades
        // y un foreach de los valores de cada propiedad para poder iterar sobre sus valores
        Object.keys(errorObj).forEach((key) => {
          errorObj[key].forEach((msg: string) => {
            errores += `${msg}\n`;
          });
        });
      }
      console.log(errores);
      setErrores(errores);
    }
  }
  return (
    <section className="bg-blue-400 w-full xl:w-1/2 h-screen rounded-3xl p-10  shadow-lg shadow-pink-600 ">
      <h1 className="text-4xl font-bold mb-10 text-center">FORMULARIO</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-lg shadow-xl shadow-black "
      >
        {/*Nombre*/}
        <div className="flex flex-col gap-4 items-center mb-5">
          <label htmlFor="nombre" className="text-lg font-semibold">
            Nombre{" "}
          </label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            className="border-2 border-gray-500 rounded-lg p-2 w-1/2 "
            placeholder="Nombre"
            required
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
              required
            />
            <input
              type="text"
              name="segundoApellido"
              id="segundoApellido"
              className="border-2 border-gray-500 rounded-lg p-2 w-1/2 "
              placeholder="Segundo Apellido"
              required
            />
          </div>
        </div>
        {/*Correo Electronico*/}
        <div className="flex flex-col gap-4 items-center mb-5">
          <label htmlFor="email" className="text-lg font-semibold">
            Correo Electronico{" "}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="border-2 border-gray-500 rounded-lg p-2 w-1/2 "
            placeholder="Correo Electronico"
            required
          />
        </div>
        {/*Telefono*/}
        <div className="flex flex-col gap-4 items-center mb-5">
          <label htmlFor="telefono" className="text-lg font-semibold">
            Telefono{" "}
          </label>
          <input
            type="number"
            name="telefono"
            id="telefono"
            className="border-2 border-gray-500 rounded-lg p-2 w-1/2 "
            placeholder="Telefono "
            required
          />
        </div>
        {/*Fecha Nacimiento*/}
        <div className="flex flex-col gap-4 items-center mb-5">
          <label htmlFor="fecha_nacimiento" className="text-lg font-semibold">
            Fecha Nacimiento{" "}
          </label>
          <input
            type="date"
            name="fecha_nacimiento"
            id="fecha_nacimiento"
            className="border-2 border-gray-500 rounded-lg p-2 w-1/2 "
            placeholder="Fecha Nacimiento "
            required
          />
        </div>
        {errores && (
          <p className="text-red-600 font-medium  whitespace-pre-line text-center">
            {errores}
          </p>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white p-4 rounded-3xl w-full mt-6  hover:bg-blue-900"
        >
          Siguiente
        </button>
      </form>
    </section>
  );
}
