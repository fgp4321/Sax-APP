export const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };
  
  export const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  
  export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };
  