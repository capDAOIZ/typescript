import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TerminosYMas from "./TerminosYMas";
import FormularioRegistro from "./FormularioRegistro";
export default function Registrarse() {
  const [terms, setTerms] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row gap-4 m-5 p-10 min-h-screen  ">
      <picture className="w-full  lg:w-1/2 flex flex-col justify-center items-center ">
        <img
          src="../imagenes/Logo-PaginaAdopcion2.png"
          className="w-2/3 lg:w-full"
        ></img>
      </picture>
      <section className="w-full  lg:w-1/2  flex flex-col justify-center items-center mb-10">
        <h1 className="text-4xl font-bold m-4">Registrate</h1>
        <FormularioRegistro terms={terms}></FormularioRegistro>
        <hr className="w-full  border-black m-10"></hr>
        <TerminosYMas setTerms={setTerms}></TerminosYMas>
      </section>
    </div>
  );
}
