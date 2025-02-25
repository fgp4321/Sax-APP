export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : {
    nombre: "No disponible",
    apellidos: "",
    email: "No disponible",
    telefono: "No disponible",
    rol: "No disponible"
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/";
};
