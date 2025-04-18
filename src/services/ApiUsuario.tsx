import axios from "axios";

const API_URL = "http://localhost/ApiUsuario_PF/public/api";

const api = axios.create({
  baseURL: API_URL,
});

interface CrearUsuario {
  name: string;
  email: string;
  password: string;
}

interface IniciarSesion {
  email: string;
  password: string;
}

export async function validarToken(token: string) {
  try {
    const response = await api.get(`/validarToken`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al validar el token", error);
    throw error;
  }
}

export async function iniciarSesion(usuario: IniciarSesion) {
  try {
    const response = await api.post(`/login`, usuario);
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesion", error);
    throw error;
  }
}

export async function cerrarSesion(token: string) {
  try {
    const response = await api.post(
      `/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al cerrar sesion", error);
    throw error;
  }
}

export async function getUsuarios() {
  try {
    const response = await api.get("/usuarios");
    return response.data;
  } catch (error) {
    console.error("Error al obtener todos los usuarios", error);
    throw error;
  }
}

export async function perfilUsuario(id: number) {
  try {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el usuario", error);
    throw error;
  }
}

export async function registrarse({ name, email, password }: CrearUsuario) {
  try {
    const response = await api.post(`/usuarios`, { name, email, password });
    return response.data;
  } catch (error) {
    console.error("Error al crear usuario", error);
    throw error;
  }
}

export async function actualizarUsuario(
  id: number,
  formData: FormData,
  token: string
) {
  try {
    const response = await api.post(`/usuarios/${id}?_method=PATCH`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el usuario", error);
    throw error;
  }
}
