import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { ComponentType } from "react";

interface PrivateRouteProps {
  component: ComponentType<any>;
}

export default function RutaPrivada({
  component: Component,
}: PrivateRouteProps) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Component /> : <Navigate to="/" />;
}
