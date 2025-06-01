import { useState, useEffect, Children } from "react";
import { useParams } from "react-router-dom";

import { postContrato } from "../../services/ApiContrato";
import { updatePost } from "../../services/ApiPost";
import { useAuth } from "../../Hooks/useAuth";

import BarraDeCarga from "./BarraDeCarga";
import ContratoFaseIntermedia from "./FasesDelContrato/ContratoFaseIntermedia";
import ContratoFaseInicial from "./FasesDelContrato/ContratoFaseInicial";
import ContratoFinal from "./FasesDelContrato/ContratoFinal";
import Firma from "./Firma";

export default function FirmaContrato() {
  const [faseIntermedia, setFaseIntermedia] = useState(false);
  const [faseFinal, setFaseFinal] = useState(false);
  const [datosContrato, setDatosContrato] = useState<FormData | null>(null);

  const { id } = useParams();
  const { user } = useAuth();

  // Funcion para cambiar de fase intermedia
  function handleFaseIntermedia(e: React.FormEvent, formData: FormData) {
    e.preventDefault();
    setDatosContrato(formData);
    setFaseIntermedia(true);
  }

  // Funcion para manejar la firma y pasar a la fase final
  function handleFirma(dataUrl: string) {
    /* Como queremos agregar la firma, tenemos que coger el estado anterior con prevData y sobreescribirlo
    esto se hace con ...prevData que es el estado anterior y añadimos firma y post_id*/
    if (!datosContrato) {
      return;
    }
    const formDataConFirma = new FormData();

    for (const [key, value] of datosContrato.entries()) {
      formDataConFirma.append(key, value);
    }

    formDataConFirma.append("firma", dataUrl);
    formDataConFirma.append("post_id", String(id));

    setDatosContrato(formDataConFirma);
    if (faseIntermedia) {
      setFaseFinal(true);
    }
  }

  //Funcion para crear el contrato
  async function handleCrearContrato(): Promise<boolean> {
    if (datosContrato && user && id) {
      try {
        const postId = Number(id);
        const formDataUpdatePost = new FormData();
        formDataUpdatePost.append("adopted", "1"); // Recuerda: FormData solo acepta strings o Blobs
        await updatePost(postId, formDataUpdatePost);
        await postContrato(datosContrato);

        return true;
      } catch (error) {
        console.log("Error al crear el contrato " + error);
        return false;
      }
    }
    return false;
  }

  return (
    <div className="flex flex-col gap-y-24 items-center py-20  w-full min-h-screen ">
      <BarraDeCarga faseIntermedia={faseIntermedia} faseFinal={faseFinal} />
      {faseFinal ? (
        <ContratoFinal
          datosContrato={datosContrato}
          handleCrearContrato={handleCrearContrato}
        ></ContratoFinal>
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
