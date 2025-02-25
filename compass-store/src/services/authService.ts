import api from "./api";

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { username, password });
    const token = response.data.token;
    if (token) {
      localStorage.setItem("token", token);
    }
    return token;
  } catch (error) {
    console.error("Erro no login", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
