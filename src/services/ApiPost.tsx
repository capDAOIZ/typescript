import axios from "axios";

const API_URL = "http://localhost/ApiPost_PF/public/api";

const api = axios.create({
  baseURL: API_URL,
});

export async function getPosts(page: number = 1, idUsuario?: number) {
  try {
    if (idUsuario) {
      const response = await api.get(
        `/posts-usuario/${idUsuario}?page=${page}`
      );
      return response.data;
    } else {
      const response = await api.get(`/posts-usuario?page=${page}`);
      return response.data;
    }
  } catch (error) {
    console.error("Error al obtener los posts", error);
    throw error;
  }
}

export async function getPost(id: number) {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el post", error);
    throw error;
  }
}
// id?: number Al ponerlo asi no puedo usar la id de esta manera wait api.get(`/posts/ultimosPosts/${id}`), ya que si no hay id se devuelve como undefined
export async function getLastPost(id?: number) {
  try {
    if (id) {
      const response = await api.get(`/ultimosPosts/${id}`);
      return response.data;
    } else {
      const response = await api.get("/ultimosPosts");
      return response.data;
    }
  } catch (error) {
    console.error("Error al obtener el post", error);
    throw error;
  }
}

export async function createPost(formData: FormData) {
  try {
    const response = await api.post("/posts", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}` || "",
      },
    });
    if (response.data.status === 422) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    console.error("Error al crear el post", error);
    throw error;
  }
}

export async function updatePost(id: number, formData: FormData) {
  try {
    const response = await api.post(`/posts/${id}?_method=PATCH`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}` || "",
      },
    });
    if (response.data.status === 422) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el post", error);
    throw error;
  }
}

export async function deletePost(id: number) {
  try {
    const response = await api.delete(`/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}` || "",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el post", error);
    throw error;
  }
}

export async function adoptedPosts(id: number) {
  try {
    const response = await api.get(`/posts-adopted/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error al encontrar posts adoptados", error);
    throw error;
  }
}

export async function validatePost(id: number) {
  try {
    const response = await api.post(
      `/posts/${id}/validarPost?_method=PATCH`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` || "",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al validar el post", error);
    throw error;
  }
}

export async function getPostNotVerified(page: number = 1) {
  try {
    const response = await api.get(`/posts/noVerificados?page=${page}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}` || "",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los posts no verificados", error);
    throw error;
  }
}
