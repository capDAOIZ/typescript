import { createContext, useContext, useEffect, useState } from "react";
import {
  validarToken,
  iniciarSesion,
  cerrarSesion,
} from "../../services/ApiUsuario";
import { ReactNode } from "react";
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
  user: Usuario | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextType); // La forma {} as AuthContextType es para decirle a TypeScript que el objeto vacío es de tipo AuthContextType para utilizarlo tenemos que estar seguros de que el objeto vacío cumple con la estructura de AuthContextType

export function AuthProvider({ children }: AuthProviderProps) {
  const tokenLocalStorage = localStorage.getItem("token");

  const [user, setUser] = useState<Usuario | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!tokenLocalStorage
  ); /* !!tokenLocalStorage es para convertir el valor a booleano. El primer signo de exclamación convierte el valor a booleano pero invertido y el segundo invierte el valor booleano correctamente
  Si tokenLocalStorage tiene un valor válido (es decir, un token válido, no null, undefined, o una cadena vacía), la expresión !!tokenLocalStorage se convierte en true*/

  const login = async (email: string, password: string) => {
    try {
      const response = await iniciarSesion({ email, password });
      const token = response.token;
      const validacion = await validarToken(token);

      localStorage.setItem("token", token);
      setUser(validacion.user);
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
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error en login", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await cerrarSesion(token);
      }
      localStorage.removeItem("token");
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error en cerrar sesion", error);
      // En cualquier caso que no se pueda cerrar sesion por algun error, independientemente se cerrara sesion
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
      }
      throw error;
    }
  };

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

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return context;
}
