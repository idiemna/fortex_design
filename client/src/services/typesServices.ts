import api from "./api";

export const getAllTypes = async () => {
  try {
    const response = await api.get("/types");

    if (response.status !== 200) {
      throw new Error(response.data?.message || "Error al obtener tipos");
    }

    return response.data;
  } catch (error) {
    console.error("Error en getAllTypes:", error);
    return [];
  }
};

export const createType = async (type: any) => {
  try {
    const response = await api.post("/types", type);

    if (response.status !== 201) {
      throw new Error(response.data?.message || "Error al crear tipo");
    }

    return response.data;
  } catch (error) {
    console.error("Error en createType:", error);
    return null;
  }
};

export const updateType = async (type: any) => {
  try {
    const response = await api.put(`/types/${type.id}`, type);

    if (response.status !== 200) {
      throw new Error(response.data?.message || "Error al actualizar tipo");
    }

    return response.data;
  } catch (error) {
    console.error("Error en updateType:", error);
    return null;
  }
}

export const deleteType = async (id: number) => {
  try {
    const response = await api.delete(`/types/${id}`);

    if (response.status !== 200) {
      throw new Error(response.data?.message || "Error al eliminar tipo");
    }

    return true;
  } catch (error) {
    console.error("Error en deleteType:", error);
    return false;
  }
}