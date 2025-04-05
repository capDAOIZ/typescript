import { validarToken } from "./ApiUsuario";
export async function AutentificacionUsuarioConecto() {
  const token = localStorage.getItem("token");
  if (!token) return false;
  try {
    /* Con axios si haces una peticion tipo fecth este se quedara en el try si la respuesta es exitosa tipo status=200
      si no es asi, directamente te manda al catch*/
    await validarToken(token);
    return true;
  } catch (error) {
    console.error("Token inválido o error en la petición", error);
    return false;
  }
}
