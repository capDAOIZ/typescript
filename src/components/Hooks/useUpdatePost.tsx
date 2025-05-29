import { updatePost } from "../../services/ApiPost";
import { useState } from "react";

interface PropsFetch {
  id: number;
  formDataCleaned: FormData;
}
export default function useUpdatePost() {
  const [cargandoUpdate, setCargandoUpdate] = useState(false);
  const [mensajeUpdate, setMensajeUpdate] = useState("");
  const [errorSubmit, setErrorSubmit] = useState("");
  async function fecthUpdatePost({ id, formDataCleaned }: PropsFetch) {
    try {
      setCargandoUpdate(true);
      const response = await updatePost(Number(id), formDataCleaned);
      console.log(response);
      setMensajeUpdate("Post actualizado correctamente");
      return;
    } catch (error: any) {
      var mensaje = "";
      const errorResponse = error.errores;
      Object.keys(errorResponse).forEach((key) => {
        errorResponse[key].forEach((msg: string) => {
          mensaje += `${msg}\n`;
        });
      });
      setErrorSubmit(mensaje);
    } finally {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  return { fecthUpdatePost, cargandoUpdate, mensajeUpdate, errorSubmit };
}
