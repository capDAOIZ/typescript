const API_URL = "http://localhost/ApiContrato_PF/public/api";

async function getContratos() {
  try {
    const response = await fetch(`${API_URL}/contratos`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Error al obtener los contratos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los contratos", error);
    throw error;
  }
}

async function postContrato(datos: Record<string, string>) {
  try {
    const response = await fetch(`${API_URL}/contratos`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(datos),
    });

    // Comprobar si la respuesta es correcta o si hay otro tipo de error como validaciones
    const data = await response.json();
    if (!response.ok || data.errores) {
      console.error("Error de validación del backend:", data.message || data);
      throw new Error(data.message || "Error al crear el contrato");
    }
    return data;
  } catch (error) {
    console.error("Error al crear un contrato", error);
    throw error;
  }
}

async function validacionCampos(datos: Record<string, string>) {
  try {
    const response = await fetch(`${API_URL}/validacion-campos-store`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(datos),
    });

    // Comprobar si la respuesta es correcta o si hay otro tipo de error como validaciones
    const data = await response.json();
    if (!response.ok || data.errores) {
      throw data;
    }
    return data;
  } catch (error) {
    console.error("Error al verificar los campos", error);
    throw error;
  }
}

async function getContrato(id: number) {
  try {
    const response = await fetch(`${API_URL}/contratos/${id}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Error al obtener el contrato");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener el contrat", error);
    throw error;
  }
}

export { getContratos, postContrato, getContrato, validacionCampos };
