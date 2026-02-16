import api from "./axios";

export const login = async (username, password) => {

  const body = { username, password };
  try {
    const response = await api.post("/auth/login", body);
    const token = response.data.token;
    localStorage.setItem("token", token);
    return response.data;
  }

  catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }

};

export const logout = () => {
  localStorage.removeItem("token");
};

export const register = async (username, password) => {
  try {
    const response = await api.post(
      "/auth/register",
      { username, password })
    return response.data;
  } catch (error) {
    console.error("Error al registrarse:", error);
    throw error;
  }
};