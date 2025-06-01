import { createContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import { validarToken } from "../services/ApiUsuario";

import useLogin from "../Hooks/useLogin";

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

interface AuthContextType {
  isAuthenticated: boolean;
  desloguearse: () => void;
  user: Usuario | undefined;
  fecthLogin: (email: string, password: string) => Promise<boolean>;
  errorLogin: string;
  cargandoLogin: boolean;
  cargandoContext: boolean;
}

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType); // La forma {} as AuthContextType es para decirle a TypeScript que el objeto vacío es de tipo AuthContextType para utilizarlo tenemos que estar seguros de que el objeto vacío cumple con la estructura de AuthContextType

export function AuthProvider({ children }: Props) {
  const {
    user,
    isAuthenticated,
    setIsAuthenticated,
    setUser,
    fecthLogin,
    errorLogin,
    cargandoLogin,
  } = useLogin();

  const [cargandoContext, setCargandoContext] = useState(false);
  function desloguearse() {
    setUser(undefined);
    setIsAuthenticated(false);
  }

  useEffect(() => {
    const tokenGuardado = localStorage.getItem("token");
    if (!tokenGuardado) return; // No hay token, usuario no está autenticado

    // Si hay token, lo validamos con la API
    (async () => {
      try {
        setCargandoContext(true);
        const validacion = await validarToken(tokenGuardado);
        setUser(validacion.usuario);
        setIsAuthenticated(true);
      } catch (error) {
        console.log("Token inválido o expirado:", error);
        localStorage.removeItem("token");
        desloguearse();
      } finally {
        setCargandoContext(false);
      }
    })();
  }, [setUser, setIsAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        desloguearse,
        fecthLogin,
        errorLogin,
        cargandoLogin,
        cargandoContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/*
  useEffect(() => {
    if (tokenLocalStorage) {
      validarToken(tokenLocalStorage)
        .then((data) => {
          setUser(data.user);
          setIsAuthenticated(true);
        })
        .catch(() => {
          logout();
        });
    }
  }, []);
*/
