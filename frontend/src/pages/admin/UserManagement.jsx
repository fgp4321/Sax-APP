import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getAllUsers, deactivateUser, reactivateUser } from "@/utils/adminApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import { Eye } from "lucide-react";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  const handleDeactivate = async (user) => {
    const result = await Swal.fire({
      title: `¿Seguro que deseas desactivar a ${user.nombre}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, desactivar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      await deactivateUser(user.id);
      fetchUsers();
      Swal.fire("Desactivado!", `${user.nombre} ha sido desactivado.`, "success");
    }
  };

  const handleReactivate = async (id) => {
    await reactivateUser(id);
    fetchUsers();
  };

  const handleViewDetails = (user) => {
    Swal.fire({
      title: "Detalles del usuario",
      html: `<p><strong>ID:</strong> ${user.id}</p>
             <p><strong>DNI/NIF:</strong> ${user.dni}</p>
             <p><strong>Nombre:</strong> ${user.nombre}</p>
             <p><strong>Apellidos:</strong> ${user.apellidos}</p>
             <p><strong>Email:</strong> ${user.email}</p>
             <p><strong>Teléfono:</strong> ${user.telefono}</p>
             <p><strong>Rol:</strong> ${user.rol}</p>
             <p><strong>Estado:</strong> ${user.deleted_at ? "Desactivado" : "Activo"}</p>
             <p><strong>Fecha de creación:</strong> ${user.created_at}</p>
             <p><strong>Última modificación:</strong> ${user.updated_at}</p>`,
      icon: "info",
    });
  };

  const filteredUsers = users.filter((user) =>
    user.nombre.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.dni.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Panel de Administración</h2>
      
      <div className="flex justify-between mb-4">
        <Input
          placeholder="Buscar usuario..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3"
        />
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>DNI</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Rol</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.dni}</TableCell>
              <TableCell>{user.nombre}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.rol}</TableCell>
              <TableCell>
                <span className={user.deleted_at ? "text-red-500" : "text-green-500"}>
                  {user.deleted_at ? "Desactivado" : "Activo"}
                </span>
              </TableCell>
              <TableCell className="flex gap-2 items-center">
                <Button variant="ghost" onClick={() => handleViewDetails(user)}>
                  <Eye className="w-5 h-5 text-gray-700" />
                </Button>
                {user.deleted_at ? (
                  <Button onClick={() => handleReactivate(user.id)} className="bg-green-500">
                    Reactivar
                  </Button>
                ) : (
                  <Button className="bg-red-500" onClick={() => handleDeactivate(user)}>Desactivar</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination page={page} onChange={(newPage) => setPage(newPage)} total={filteredUsers.length} />
    </div>
  );
}
