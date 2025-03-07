import { useEffect, useState } from "react";
import { getAllUsers, deactivateUser, reactivateUser } from "@/utils/adminApi";

export default function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  const handleDeactivate = async (id) => {
    await deactivateUser(id);
    fetchUsers();
  };

  const handleReactivate = async (id) => {
    await reactivateUser(id);
    fetchUsers();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>
      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th className="p-2">Nombre</th>
            <th className="p-2">Email</th>
            <th className="p-2">Rol</th>
            <th className="p-2">Estado</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="p-2">{user.nombre}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.rol}</td>
              <td className="p-2">
                {user.deleted_at ? "Desactivado" : "Activo"}
              </td>
              <td className="p-2">
                {user.deleted_at ? (
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => handleReactivate(user.id)}
                  >
                    Reactivar
                  </button>
                ) : (
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDeactivate(user.id)}
                  >
                    Desactivar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
