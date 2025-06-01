const API_URL = "http://localhost/ApiContrato_PF/public/api";

// Recordar que fecth hay que pasarle el metodo, el body y el header
// El body debe ser en JSON por lo que usamos la funcion JSON.stringify("contenido")
// Hay que comprobar si la respuesta es correcta con response.ok
// Hay que hacer con await el response.json() para obtener los datos
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

async function postContrato(formData: FormData) {
  try {
    const response = await fetch(`${API_URL}/contratos`, {
      method: "POST",
      body: formData,
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

async function validacionCampos(formData: FormData) {
  try {
    const response = await fetch(`${API_URL}/validacion-campos-store`, {
      method: "POST",
      body: formData,
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
