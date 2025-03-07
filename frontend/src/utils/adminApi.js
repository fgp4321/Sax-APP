const API_URL = "http://localhost:3000/api/users";

export const getAllUsers = async () => {
  const response = await fetch(`${API_URL}/usuarios`, {
    credentials: "include",
  });
  return response.json();
};

export const deactivateUser = async (id) => {
  await fetch(`${API_URL}/usuarios/${id}/desactivar`, {
    method: "PUT",
    credentials: "include",
  });
};

export const reactivateUser = async (id) => {
  await fetch(`${API_URL}/usuarios/${id}/reactivar`, {
    method: "PUT",
    credentials: "include",
  });
};
