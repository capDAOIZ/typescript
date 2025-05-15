import { useState } from "react";
import { registrarse } from "../services/ApiUsuario";
import { useNavigate } from "react-router-dom";
export default function Registrarse() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!terms) {
      setError("Debes aceptar los terminos y condiciones para continuar");
      return;
    }
    if (!name || !email || !password) {
      setError("Por favor, llena todos los campos.");
      return;
    }
    try {
      const response = await registrarse({ name, email, password });
      setMensaje(response.mensaje);
      setTimeout(() => navigate("/"), 2000);
      return;
    } catch (e: any) {
      let errores = "";
      console.log(e);
      const errorObj = e.response.data.errors;

      if (errorObj) {
        Object.keys(errorObj).forEach((key) => {
          errorObj[key].forEach((msg: string) => {
            errores += `${msg}\n`;
          });
        });
      }

      setError(errores);
    } finally {
      setTimeout(() => setMensaje(""), 3000);
      setTimeout(() => setError(""), 7000);
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 m-5 p-10 min-h-screen  ">
      <picture className="w-full md:w-1/2 lg:w-1/2 flex flex-col justify-center items-center ">
        <img
          src="../imagenes/Logo-PaginaAdopcion2.png"
          className="w-2/3 md:w-full"
        ></img>
      </picture>
      <section className="w-full  md:w-1/2  flex flex-col justify-center items-center mb-10">
        <h1 className="text-4xl font-bold m-4">Registrate</h1>
        <form className=" w-full xl:w-3/4 m-5 border-2 border-black rounded-lg p-11 flex flex-col gap-4">
          <label htmlFor="name" className="font-semibold">
            Nombre de usuario :{" "}
          </label>
          <input
            type="text"
            placeholder="Por ejemplo: Pepe, DiosX2..."
            className="border-2 border-black rounded-lg p-2"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <label htmlFor="email" className="font-semibold">
            Email :{" "}
          </label>
          <input
            type="email"
            placeholder="Por ejemplo: pepe@example.com..."
            className="border-2 border-black rounded-lg p-2"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          ></input>
          <label htmlFor="password" className="font-semibold ">
            Contraseña :
          </label>
          <input
            type="password"
            placeholder="Contraseña..."
            className="border-2 border-black rounded-lg p-2"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {mensaje ? (
            <p className="text-green-600 font-medium text-center">{mensaje}</p>
          ) : (
            error && (
              <p className="text-red-600 font-medium text-center">{error}</p>
            )
          )}
          <button
            type="submit"
            className="bg-blue-700 text-white py-3 rounded-full w-full mt-2"
            onClick={handleSubmit}
          >
            Registrarse
          </button>
        </form>
        <hr className="w-full  border-black m-10"></hr>
        <div>
          <h2 className="text-2xl font-semibold">Terminos y condiciones</h2>
          <p className="mb-5">
            Para continuar, revisa y acepta los términos y condiciones y
            política de protección de datos
          </p>

          <p>
            <input
              type="checkbox"
              name="terminos"
              onChange={(e) => setTerms(e.target.checked)}
            ></input>{" "}
            Acepta nuestros{" "}
            <a
              href="https://www.youtube.com/watch?v=ZHgyQGoeaB0"
              className="underline text-blue-600 font-semibold "
            >
              TERMINOS
            </a>{" "}
            y{" "}
            <a
              href="https://www.youtube.com/watch?v=FoZdT_fAXew"
              className="underline text-blue-600 font-semibold "
            >
              CONDICIONES
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
