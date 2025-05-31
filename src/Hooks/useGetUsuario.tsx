import { useEffect, useState } from "react";

import { getUsuario } from "../services/ApiUsuario";

interface Usuario {
  id: number;
  image: File;
  name: string;
  email: string;
  biografia: string;
  role: string;
}

export default function useGetUsuario(id: number) {
  const [user, setUser] = useState({} as Usuario);

  async function fetchUser() {
    try {
      const response = await getUsuario(id);
      console.log(response.usuario);
      setUser(response.usuario);
      return;
    } catch (error) {
      console.error("Error al obtener el usuario", error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return { user };
}
