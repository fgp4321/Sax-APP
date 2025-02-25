import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { isAuthenticated, getUser } from "@/utils/auth";
import { FaClipboardList, FaUserEdit, FaUserCircle, FaUserTag } from "react-icons/fa";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated()) {
      const userData = getUser();
      setUser(userData);
    }
  }, []);

  if (!isAuthenticated() || !user) {
    console.log("Usuario no autenticado o datos de usuario no disponibles.");
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-700">
        <h2 className="text-3xl font-bold">Acceso denegado</h2>
        <p className="mt-2">Debes iniciar sesión para ver tu perfil.</p>
        <a href="/login" className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
          Iniciar sesión
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-200">
      <Navbar />
      <main className="flex-grow flex flex-col items-center text-center px-6 mt-32">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
          <FaUserCircle className="text-gray-600 text-8xl mx-auto" />
          <h1 className="text-4xl font-semibold text-blue-700 mt-4">
            {user?.nombre || "No disponible"} {user?.apellidos || ""}
          </h1>

          <div className="text-gray-600 text-lg mt-2">
            📧 {user?.email || "No disponible"}
          </div>
          <div className="text-gray-600 text-lg">
            📞 {user?.telefono || "No disponible"}
          </div>

          <div className="mt-4 flex items-center justify-center bg-gray-200 px-4 py-2 rounded-lg w-fit mx-auto">
            <FaUserTag className="mr-2 text-gray-600" />
            <span className="text-gray-800 font-medium uppercase">
              {user?.rol || "No disponible"}
            </span>
          </div>

          <div className="mt-8 flex gap-4 justify-center">
            <a
              href="/mis-incidencias"
              className="px-6 py-3 flex items-center bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-700 transition"
            >
              <FaClipboardList className="mr-2" /> Ver mis incidencias
            </a>
            <a
              href="/editar-perfil"
              className="px-6 py-3 flex items-center bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              <FaUserEdit className="mr-2" /> Cambiar mis datos
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
