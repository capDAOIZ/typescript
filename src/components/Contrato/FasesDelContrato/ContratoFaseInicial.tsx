import { useParams } from "react-router-dom";
import { useState, useId, useEffect } from "react";
import { BotonCargando } from "../../modals/Cargando";

import { validacionCampos } from "../../../services/ApiContrato";
interface Props {
  handleFaseIntermedia: (e: React.FormEvent, formData: FormData) => void;
}
export default function ContratoFaseInicial({ handleFaseIntermedia }: Props) {
  const [errores, setErrores] = useState("");
  const [cargando, setCargando] = useState(false);
  const [maxDate, setMaxDate] = useState<string>("");

  const nombreId = useId();
  const correoElectronicoId = useId();
  const telefonoId = useId();
  const fechaNacimientoId = useId();

  // Funcion para manejar el submit del formulario
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    try {
      setCargando(true);
      const response = await validacionCampos(formData);
      // Pasamos a la siguiente fase
      setErrores("");
      handleFaseIntermedia(e, formData);
    } catch (e: any) {
      let errores = "";
      const errorObj = e.errores;
      if (errorObj) {
        /* un foreach de keys de un objeto para poder iterar sobre sus propiedades
        y un foreach de los valores de cada propiedad para poder iterar sobre sus valore */
        Object.keys(errorObj).forEach((key) => {
          errorObj[key].forEach((msg: string) => {
            errores += `${msg}\n`;
          });
        });
      }
      console.log(errores);
      setErrores(errores);
    } finally {
      setCargando(false);
    }
  }
  // Funcion para calcular la fecha maxima de nacimiento
  useEffect(() => {
    const hoy = new Date();
    // Restamos 18 años
    hoy.setFullYear(hoy.getFullYear() - 18);
    // Formatear como “YYYY-MM-DD”
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, "0");
    const dd = String(hoy.getDate()).padStart(2, "0");
    setMaxDate(`${yyyy}-${mm}-${dd}`);
  }, []);
  return (
    <section className="bg-blue-400 w-full xl:w-1/2 min-h-screen rounded-3xl p-10  shadow-lg shadow-pink-600 ">
      <h1 className="text-4xl font-bold mb-10 text-center">FORMULARIO</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-lg shadow-xl shadow-black "
      >
        {/*Nombre*/}
        <div className="flex flex-col gap-4 items-center mb-5">
          <label htmlFor={nombreId} className="text-lg font-semibold">
            Nombre{" "}
          </label>
          <input
            type="text"
            name="nombre"
            id={nombreId}
            className="border-2 border-gray-500 rounded-lg p-2 w-full md:w-1/2 focus:outline-none focus:border-pink-600 "
            placeholder="Nombre"
            required
          />
        </div>
        {/*Apellidos*/}
        <div className="flex flex-col gap-4 items-center mb-5">
          <label className="text-lg font-semibold">Apellidos </label>
          <div className="flex flex-col md:flex md:flex-row gap-4 w-full">
            <input
              type="text"
              name="primerApellido"
              id="primerApellido"
              className="border-2 border-gray-500 rounded-lg p-2 w-full md:w-1/2 focus:outline-none focus:border-pink-600 "
              placeholder="Primer Apellido"
              required
            />
            <input
              type="text"
              name="segundoApellido"
              id="segundoApellido"
              className="border-2 border-gray-500 rounded-lg p-2 w-full md:w-1/2 focus:outline-none focus:border-pink-600"
              placeholder="Segundo Apellido"
              required
            />
          </div>
        </div>
        {/*Correo Electronico*/}
        <div className="flex flex-col gap-4 items-center mb-5">
          <label
            htmlFor={correoElectronicoId}
            className="text-lg font-semibold"
          >
            Correo Electronico{" "}
          </label>
          <input
            type="email"
            name="email"
            id={correoElectronicoId}
            className="border-2 border-gray-500 rounded-lg p-2 w-full md:w-1/2 focus:outline-none focus:border-pink-600 "
            placeholder="Correo Electronico"
            required
          />
        </div>
        {/*Telefono*/}
        <div className="flex flex-col gap-4 items-center mb-5">
          <label htmlFor={telefonoId} className="text-lg font-semibold">
            Telefono{" "}
          </label>
          <input
            type="tel"
            name="telefono"
            id={telefonoId}
            className="border-2 border-gray-500 rounded-lg p-2 w-full md:w-1/2 focus:outline-none focus:border-pink-600"
            placeholder="Ej: +1 5551234567  /  +34 612345678  /  +52 1234567890"
            required
            pattern="^\+[0-9]{1,3}\s?[0-9]{6,12}$"
            title="Incluye el +código de país (1–3 dígitos) y luego tu número local (6–12 dígitos). Ej: +34 612345678 o +1 5551234567"
          />
        </div>
        {/*Fecha Nacimiento*/}
        <div className="flex flex-col gap-4 items-center mb-5">
          <label htmlFor={fechaNacimientoId} className="text-lg font-semibold">
            Fecha Nacimiento{" "}
          </label>
          <input
            type="date"
            name="fecha_nacimiento"
            id={fechaNacimientoId}
            className="border-2 border-gray-500 rounded-lg p-2 w-full md:w-1/2 focus:outline-none focus:border-pink-600 "
            placeholder="Fecha Nacimiento "
            required
            max={maxDate}
          />
        </div>
        {errores && (
          <p className="text-red-600 font-medium  whitespace-pre-line text-center">
            {errores}
          </p>
        )}
        {cargando ? (
          <BotonCargando />
        ) : (
          <button
            type="submit"
            className="bg-blue-600 text-white p-4 rounded-3xl w-full mt-6  hover:bg-blue-900"
          >
            Siguiente
          </button>
        )}
      </form>
    </section>
  );
}
