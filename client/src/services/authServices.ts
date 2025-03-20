import api from "./api";

export async function loginService(email: string, password: string) {
  try {
    const response = await api.post("/auth/login", { email, password });

    if (response.status !== 200) {
      throw new Error(response.data?.message || "Error al iniciar sesión");
    }

    return response;
  } catch (error) {
    console.log("Error en login:", error);
    return { ok: false };
  }
}

export async function logoutService() {
  try {
    const response = await api.post("/auth/logout");

    if (response.status !== 200) {
      throw new Error(response.data?.message || "Error al cerrar sesión");
    }

    return { success: true };
  } catch (error) {
    console.error("Error en logout:", error);
    throw new Error("No se pudo cerrar sesión.");
  }
}

export async function getProfileService() {
  try {
    const response = await api.get("/auth/profile");

    if (response.status !== 200) {
      throw new Error(response.data?.message || "Error al obtener perfil");
    }

    return response.data;
  } catch (error) {
    console.error("Error en profile:", error);
    throw new Error("No se pudo obtener el perfil.");
  }
}