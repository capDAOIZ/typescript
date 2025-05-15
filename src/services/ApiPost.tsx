import axios from "axios";

const API_URL = "http://localhost/ApiPost_PF/public/api";

const api = axios.create({
  baseURL: API_URL,
});

interface Post {
  nameAnimal?: string;
  typeAnimal?: string;
  description?: string;
  image?: File;
  adopted?: boolean;
  userAdopted_id?: number;
}
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

    return response.data;
  } catch (error) {
    console.error("Error al crear el post", error);
    throw error;
  }
}

export async function updatePost(id: number, post: Post) {
  try {
    const response = await api.patch(`/posts/${id}`, post, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}` || "",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el post", error);
    throw error;
  }
}

export async function deletePost(id: number, token: string) {
  try {
    const response = await api.delete(`/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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
    const response = await api.get(`/posts/adopted/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error al encontrar posts adoptados", error);
    throw error;
  }
}
