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
  const [datosContrato, setDatosContrato] = useState<Record<string, string>>();

  const { id } = useParams();
  const { user } = useAuth();

  // Funcion para cambiar de fase intermedia
  function handleFaseIntermedia(
    e: React.FormEvent,
    data: Record<string, string>
  ) {
    e.preventDefault();

    setDatosContrato(data);
    setFaseIntermedia(true);
  }

  // Funcion para manejar la firma y pasar a la fase final
  function handleFirma(dataUrl: string) {
    /* Como queremos agregar la firma, tenemos que coger el estado anterior con prevData y sobreescribirlo
    esto se hace con ...prevData que es el estado anterior y añadimos firma y post_id*/
    if (!id) return;
    setDatosContrato((prevData) => ({
      ...prevData,
      firma: dataUrl,
      post_id: id,
    }));

    if (faseIntermedia) {
      setFaseFinal(true);
    }
  }

  //Funcion para crear el contrato
  async function handleCrearContrato(): Promise<boolean> {
    if (datosContrato && user) {
      const postId = Number(datosContrato.post_id);
      try {
        const response = await postContrato(datosContrato);
        const responseUpdatePost = await updatePost(postId, {
          adopted: true,
          userAdopted_id: user.id,
        });
        return true;
      } catch (error) {
        console.log("Error al crear el contrato " + error);
        return false;
      }
    }
    return true;
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
