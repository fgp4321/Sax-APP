export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user
    ? JSON.parse(user)
    : {
        nombre: "No disponible",
        apellidos: "",
        email: "No disponible",
        telefono: "No disponible",
        rol: "No disponible",
      };
};

export const isAdmin = () => {
  const user = getUser();
  return user.rol === "admin"; // Ajusta según la estructura de roles de tu backend
};

export const login = (token, userData) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(userData));
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/";
};
