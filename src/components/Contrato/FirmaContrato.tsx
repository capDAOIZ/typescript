import { useState, useEffect, Children } from "react";

import BarraDeCarga from "./BarraDeCarga";
import ContratoFaseIntermedia from "./FasesDelContrato/ContratoFaseIntermedia";
import ContratoFaseInicial from "./FasesDelContrato/ContratoFaseInicial";
import ContratoFinal from "./FasesDelContrato/ContratoFinal";
import Firma from "./Firma";

export default function FirmaContrato() {
  const [faseIntermedia, setFaseIntermedia] = useState(false);
  const [faseFinal, setFaseFinal] = useState(false);
  const [firma, setFirma] = useState("");

  // Funcion para cambiar de fase intermedia
  function handleFaseIntermedia(e: React.FormEvent) {
    e.preventDefault();
    setFaseIntermedia(true);
  }

  // Funcion para manejar la firma y pasar a la fase final
  function handleFirma(dataUrl: string) {
    setFirma(dataUrl);
    console.log(dataUrl);
    if (faseIntermedia) {
      setFaseFinal(true);
    }
  }

  return (
    <div className="flex flex-col gap-y-24 items-center py-20  w-full min-h-screen ">
      <BarraDeCarga faseIntermedia={faseIntermedia} faseFinal={faseFinal} />
      {faseFinal ? (
        <ContratoFinal></ContratoFinal>
      ) : faseIntermedia ? (
        <ContratoFaseIntermedia>
          <Firma handleFirma={handleFirma}></Firma>
        </ContratoFaseIntermedia>
      ) : (
        <ContratoFaseInicial
          handleFaseIntermedia={handleFaseIntermedia}
        ></ContratoFaseInicial>
      )}
    </div>
  );
}
