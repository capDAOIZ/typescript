import { registrarse } from "../../services/ApiUsuario";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  name: string;
  email: string;
  password: string;
}
export default function useRegisterUser({ name, email, password }: Props) {
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  async function fecthRegisterUser() {
    setCargando(true);
    try {
      const response = await registrarse({ name, email, password });
      setMensaje(response.mensaje);
      setTimeout(() => navigate("/"), 2000);
      return;
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
      setError(errores);
    } finally {
      setTimeout(() => setError(""), 7000);
      setCargando(false);
    }
  }

  return { error, mensaje, cargando, fecthRegisterUser };
}
