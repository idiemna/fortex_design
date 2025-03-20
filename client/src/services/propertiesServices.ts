import api from "./api";

export const getAllProperties = async () => {
  try {
    const response = await api.get("/properties");

    if (response.status !== 200) {
      throw new Error(response.data?.message || "Error al obtener propiedades");
    }

    return response.data;
  } catch (error) {
    console.error("Error en getAllProperties:", error);
    return [];
  }
};

export const createProperty = async (property: any) => {
  try {
    const response = await api.post("/properties", property);

    if (response.status !== 201) {
      throw new Error(response.data?.message || "Error al crear propiedad");
    }

    return response.data;
  } catch (error) {
    console.error("Error en createProperty:", error);
    return null;
  }
};

export const updateProperty = async (property: any) => {
  try {
    const response = await api.put(`/properties/${property.id}`, property);

    if (response.status !== 200) {
      throw new Error(
        response.data?.message || "Error al actualizar propiedad"
      );
    }

    return response.data;
  } catch (error) {
    console.error("Error en updateProperty:", error);
    return null;
  }
};

export const deleteProperty = async (id: number) => {
  try {
    const response = await api.delete(`/properties/${id}`);

    if (response.status !== 200) {
      throw new Error(response.data?.message || "Error al eliminar propiedad");
    }

    return true;
  } catch (error) {
    console.error("Error en deleteProperty:", error);
    return false;
  }
};
