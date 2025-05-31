import { createPost } from "../services/ApiPost";
import { useState } from "react";
export default function useCreatePost() {
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  async function fecthCreatePost(formData: FormData) {
    setCargando(true);
    setError("");
    try {
      const response = await createPost(formData);
      setMensaje("Post creado con éxito, en espera de revisión");
      return;
    } catch (e: any) {
      const errores = e.errores;
      var mensaje = "";
      if (errores) {
        Object.keys(errores).forEach((key) => {
          errores[key].forEach((error: string) => {
            mensaje += `${error}\n`;
          });
        });
        setError(mensaje);
      } else {
        mensaje = e.mensaje;
        setError(mensaje);
      }
    } finally {
      setCargando(false);
    }
  }
  return { error, cargando, mensaje, fecthCreatePost };
}
