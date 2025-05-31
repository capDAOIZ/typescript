import { useState, useRef, useEffect } from "react";
import useRegisterUser from "../../../Hooks/useRegisterUser";
import { BotonCargando } from "../../modals/Cargando";
import ModalBloqueante from "../../modals/ModalBloqueante";

/* En React useRef es un hook que te permite tener un contenedor mutable cuyos cambios no provocan re-renders y
 que persiste durante todo el ciclo de vida del componente. UseState si provoca un re-render */

interface Props {
  terms: boolean;
}
export default function FormularioRegistro({ terms }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [errorCamposYTerminos, setErrorCamposYTerminos] = useState("");

  const timeoutRef = useRef<number>();

  const { error, mensaje, cargando, fecthRegisterUser } = useRegisterUser({
    name,
    email,
    password,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Si antes había un timeout pendiente, lo cancelamos
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!terms) {
      setErrorCamposYTerminos(
        "Debes aceptar los terminos y condiciones para continuar"
      );

      /* Almacenamos el id del timeout para poder cancelarlo luego 
    ya que cuando se hace un setTimeout devuelve un id que se puede usar para cancelarlo */
      timeoutRef.current = window.setTimeout(
        () => setErrorCamposYTerminos(""),
        3000
      );

      return;
    }
    if (!name || !email || !password) {
      setErrorCamposYTerminos("Por favor, llena todos los campos.");
      timeoutRef.current = window.setTimeout(
        () => setErrorCamposYTerminos(""),
        3000
      );
      return;
    }

    await fecthRegisterUser();
  }

  function handleClick(e: React.FormEvent) {
    e.preventDefault();
    setMostrarContraseña(!mostrarContraseña);
  }

  // Cuando el componente se desmonte, limpiamos el timeout
  useEffect(() => {
    // Limpiamos suscripcion en el DOM, cleanup se llama cuando el componente se desmonta
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [mensaje, error]);

  return (
    <form className=" w-full xl:w-3/4 m-5 border-2 border-black rounded-lg p-11 flex flex-col gap-4">
      {/* Nombre usuario*/}
      <div className="flex flex-col gap-y-2 mb-2">
        <label htmlFor="name" className="font-semibold">
          Nombre de usuario :{" "}
        </label>
        <input
          type="text"
          placeholder="Por ejemplo: Pepe, DiosX2..."
          className="border-2 border-black rounded-lg p-2 focus:outline-none focus:border-pink-600"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>
      {/* Email usuario*/}
      <div className="flex flex-col gap-y-2 mb-2">
        <label htmlFor="email" className="font-semibold">
          Email :{" "}
        </label>
        <input
          type="email"
          placeholder="Por ejemplo: pepe@example.com..."
          className="border-2 border-black rounded-lg p-2 focus:outline-none focus:border-pink-600"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
      </div>
      {/* Contraseña usuario*/}
      <div className="flex flex-col gap-y-2 mb-2">
        <label htmlFor="password" className="font-semibold ">
          Contraseña :
        </label>
        <div className="flex  items-center gap-x-2">
          <input
            type={mostrarContraseña ? "text" : "password"}
            placeholder="Recuerda!!! Contraseña segura"
            className="border-2 w-full border-black rounded-lg p-2 focus:outline-none focus:border-pink-600"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button
            onClick={handleClick}
            className="border-2 border-black rounded-lg p-2"
          >
            {mostrarContraseña ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3l18 18"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.968 0-9.1-3.21-10.94-7.5a10.056 
                   10.056 0 012.573-3.522M6.159 6.159A10.056 10.056 0 0112 5c4.968 
                   0 9.1 3.21 10.94 7.5a10.056 10.056 0 01-1.05 1.993M15 
                   12a3 3 0 11-6 0 3 3 0 016 0"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 
                  0 8.268 2.943 9.542 7-1.274 4.057-5.064 
                  7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mensaje ? (
        <p className="text-green-600 font-medium text-center">{mensaje}</p>
      ) : error ? (
        error && <p className="text-red-600 font-medium text-center">{error}</p>
      ) : (
        <p className="text-red-600 font-medium text-center">
          {errorCamposYTerminos}
        </p>
      )}

      {cargando ? (
        <div>
          <ModalBloqueante></ModalBloqueante>
          <BotonCargando></BotonCargando>
        </div>
      ) : (
        <button
          type="submit"
          className="bg-blue-700 text-white py-3 rounded-full w-full mt-2"
          onClick={handleSubmit}
        >
          Registrarse
        </button>
      )}
    </form>
  );
}
