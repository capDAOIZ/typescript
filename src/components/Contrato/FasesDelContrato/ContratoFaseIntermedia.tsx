import { ReactNode, useState } from "react";

import InformacionDeberes from "../Informacion/InformacionDeberes";
import InformacioCondiciones from "../Informacion/InformacioCondiciones";
import Captcha from "../Captcha";

interface Props {
  children: ReactNode;
}

export default function ContratoFaseIntermedia({ children }: Props) {
  const [validado, setValidado] = useState(false);
  const [deberesAceptados, setDeberesAceptados] = useState(false);
  const [condicionesAceptadas, setCondicionesAceptadas] = useState(false);

  const trueValido = () => {
    setValidado(true);
  };

  function handleCheck() {
    if (deberesAceptados && condicionesAceptadas) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <section className="bg-blue-400 w-full xl:w-1/2 h-full rounded-3xl p-10  shadow-lg shadow-pink-600 ">
      <h1 className="text-4xl font-bold mb-10 text-center">
        CONDICIONES Y DEBERES
      </h1>
      <section className="bg-white p-10 mb-10  rounded-lg shadow-xl shadow-black ">
        {/*Nombre*/}
        <div className="flex flex-col gap-4 items-center mb-5">
          <InformacionDeberes></InformacionDeberes>
          <InformacioCondiciones></InformacioCondiciones>

          <hr className="w-full border-1 border-black m-5"></hr>

          {handleCheck() ? (
            <div className="flex flex-col gap-y-6 ">
              <div className="flex items-center gap-3">
                <p className="text-lg font-black">Acepto mis deberes </p>
                <input
                  type="checkbox"
                  checked={deberesAceptados}
                  onChange={(e) => setDeberesAceptados(e.target.checked)}
                ></input>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-lg font-black">
                  Acepto las condiciones y asumo las responsabilidades
                </p>
                <input
                  type="checkbox"
                  checked={condicionesAceptadas}
                  onChange={(e) => setCondicionesAceptadas(e.target.checked)}
                ></input>
              </div>
            </div>
          ) : validado ? (
            children
          ) : (
            <Captcha trueValido={trueValido}></Captcha>
          )}
        </div>
      </section>
    </section>
  );
}
