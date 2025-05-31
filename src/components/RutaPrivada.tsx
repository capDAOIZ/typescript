import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { ComponentType } from "react";

interface PrivateRouteProps {
  component: ComponentType<any>;
}

export function RutaPrivada({ component: Component }: PrivateRouteProps) {
  const { isAuthenticated } = useAuth();
  // Verifica si esta autentificado, si lo esta, renderiza el componente, si no lo redirige a la pagina de inicio
  return isAuthenticated ? <Component /> : <Navigate to="/" />;
}

export function RutaPrivadaAdmin({ component: Component }: PrivateRouteProps) {
  const { isAuthenticated, user } = useAuth();
  // Verifica si esta autentificado y que su rol sea admin. Hacemos esto para mas seguridad
  return isAuthenticated && user?.role === "admin" ? (
    <Component />
  ) : (
    <Navigate to="/" />
  );
}
