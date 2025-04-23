import { useEffect, useState } from "react";
import { registrarse } from "../services/ApiUsuario";
export default function Registrarse() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {}, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!terms) {
      setMensaje("Debes aceptar los terminos y condiciones para continuar");
      return;
    }
    if (!name || !email || !password) {
      setMensaje("Por favor, llena todos los campos.");
      return;
    }
    try {
      const response = await registrarse({ name, email, password });
      setMensaje(response.mensaje);
      setName("");
      setEmail("");
      setPassword("");
    } catch (e: any) {
      let errores = "";

      const errorObj = e.response.data.errors;
      if (errorObj) {
        Object.keys(errorObj).forEach((key) => {
          errorObj[key].forEach((msg: string) => {
            errores += `${msg}\n`;
          });
        });
      }
      setMensaje(errores);
    }
  }

  return (
    <div className="flex flex-row  gap-4 m-5  ">
      <picture className=" w-full  lg:w-1/2">
        <img src="../images/Logo-PaginaAdopcion.png"></img>
      </picture>
      <section className="w-full lg:w-1/2 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold m-4">Registrate</h1>
        <form className=" w-full lg:w-1/2 border-2 border-black rounded-lg p-11 flex flex-col gap-4">
          <label htmlFor="name" className="font-semibold">
            Nombre de usuario :{" "}
          </label>
          <input
            type="text"
            placeholder="Nombre de usuario..."
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
            placeholder="Email..."
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
          {mensaje && <p className="text-red-600 font-medium">{mensaje}</p>}
          <button
            type="submit"
            className="bg-blue-700 text-white py-3 rounded-full w-full "
            onClick={handleSubmit}
          >
            Registrarse
          </button>
        </form>
        <hr className="w-full  border-black m-10"></hr>
        <div>
          <h2 className="text-2xl font-semibold">Terminos y condiciones</h2>
          <p>
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
