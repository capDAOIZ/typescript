import { useState, useEffect, useRef } from "react";
import { actualizarUsuario } from "../services/ApiUsuario";

interface PropsFetch {
  user_id: number;
  formData: FormData;
  refrescarUsuario?: () => void;
}

export default function useUpdateUser() {
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const timeoutRef = useRef<number>();
  const timeoutMensaje = useRef<number>();

  async function fecthUpdateuser({
    user_id,
    formData,
    refrescarUsuario,
  }: PropsFetch) {
    try {
      setLoading(true);
      await actualizarUsuario(user_id, formData);
      //El mensaje de exito se mostrara por 1 segundo en el componente DatosPerfil y luego se recargara la pagina
      setMensaje("Usuario actualizado correctamente");
      // Gaurdamos el id del timeout en una referencia para poder cancelarlo si el hook se desmonta antes de que termine
      // Utilizamos windor.setTimeout para asegurarnos de que obtendremos un id de timeout válido
      // Si utilizamos setTimeout directamente, no obtendremos un id de timeout válido
      timeoutRef.current = window.setTimeout(() => {
        setMensaje("");
        refrescarUsuario && refrescarUsuario();
        setLoading(false);
      }, 3000);
      return;
    } catch (e: any) {
      let errores = "";
      console.log(e);
      const errorObj = e.errors;
      if (errorObj) {
        Object.keys(errorObj).forEach((key) => {
          errorObj[key].forEach((msg: string) => {
            errores += `${msg}\n`;
          });
        });
      }
      setError(errores || "Error al actualizar el usuario");
      setLoading(false);
    } finally {
      timeoutMensaje.current = window.setTimeout(() => {
        setError("");
      }, 3000);
    }
  }

  useEffect(() => {
    // cancelamos el timeout si el hook se desmonta antes de que termine
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (timeoutMensaje.current) {
        clearTimeout(timeoutMensaje.current);
      }
    };
  }, []);

  return { mensaje, error, loading, fecthUpdateuser };
}
