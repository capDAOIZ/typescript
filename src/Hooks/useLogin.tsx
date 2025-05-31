import { iniciarSesion } from "../services/ApiUsuario";
import { validarToken } from "../services/ApiUsuario";
import { useState, useRef, useEffect } from "react";

interface Usuario {
  id: number;
  name: string;
  email: string;
  biografia: string;
  role: string;
  password: string;
  image: File;
  is_banned: boolean;
}
export default function useLogin() {
  const [errorLogin, setErrorLogin] = useState("");
  const [user, setUser] = useState<Usuario>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cargandoLogin, setCargandoLogin] = useState(false);

  const timeout = useRef<number | null>(null);
  async function fecthLogin(email: string, password: string) {
    try {
      setCargandoLogin(true);
      const response = await iniciarSesion({ email, password });
      const token = response.token;
      const validacion = await validarToken(token);
      localStorage.setItem("token", token);
      setUser(validacion.usuario);
      setIsAuthenticated(true);
      return true;
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
      setErrorLogin(errores);
      return false;
    } finally {
      setCargandoLogin(false);
      timeout.current = setTimeout(() => setErrorLogin(""), 3000);
    }
  }
  useEffect(() => {
    return () => {
      timeout.current && clearTimeout(timeout.current);
    };
  }, []);
  return {
    fecthLogin,
    user,
    isAuthenticated,
    setIsAuthenticated,
    setUser,
    errorLogin,
    cargandoLogin,
  };
}

/*
    Esta es la informacion que se guarda en el user
    "user": {
        "id": 1,
        "name": "Moob",
        "image": null,
        "email": "moob@gmail.com",
        "biografia": "Soy un programador programando",
        "role": "user",
        "is_banned": 0,
        "created_at": "2025-04-03T09:43:00.000000Z",
        "updated_at": "2025-04-03T09:43:00.000000Z"
    }
*/
