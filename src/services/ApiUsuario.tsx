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

export async function getUsuarios(page: number = 1) {
  try {
    /*Recordemos que cuando utilizamos paginate en la api estamos dividiendo los datos en paginas 
    para indicar en que pagina queremos estar tenemos que pasarle un parametro en la url llamado page*/
    const response = await api.get(`/usuarios?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todos los usuarios", error);
    throw error;
  }
}

export async function getUsuario(id: number) {
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
    console.error("Error al registrar el usuario", error);
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

export async function banearUsuario(id: number, token: string) {
  try {
    const response = await api.post(`/usuarios/${id}/ban?_method=PATCH`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al banear el usuario", error);
    throw error;
  }
}

export async function desbanearUsuario(id: number, token: string) {
  try {
    const response = await api.post(
      `/usuarios/${id}/desban?_method=PATCH`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al desbanear el usuario", error);
    throw error;
  }
}

export async function makeAdmin(id: number, token: string) {
  try {
    const response = await api.post(
      `/usuarios/${id}/admin?_method=PATCH`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al convertir en admin el usuario", error);
    throw error;
  }
}
