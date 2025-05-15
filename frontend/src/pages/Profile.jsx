import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { isAuthenticated, getUser } from "@/utils/auth";
import { FaClipboardList, FaUserEdit, FaUserCircle, FaUserTag, FaPlusCircle, FaIdCard, FaSignOutAlt, FaMapMarkedAlt, FaLandmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    if (isAuthenticated()) {
      const userData = getUser();
      setUser(userData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!isAuthenticated() || !user) {
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
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg relative">
          <FaUserCircle className="text-gray-600 text-8xl mx-auto" />
          {/* Botón de Cerrar Sesión */}
          <button
            onClick={handleLogout}
            className="absolute top-4 right-4 p-2 text-red-600 hover:text-red-800 transition"
            title="Cerrar sesión"
          >
            <FaSignOutAlt className="text-2xl" />
          </button>
          <h1 className="text-4xl font-semibold text-blue-700 mt-4">
            {user?.nombre || "No disponible"} {user?.apellidos || ""}
          </h1>

          <div className="text-gray-600 text-lg mt-2">📧 {user?.email || "No disponible"}</div>
          <div className="text-gray-600 text-lg">📞 {user?.telefono || "No disponible"}</div>
          <div className="text-gray-600 text-lg flex items-center justify-center mt-2">
            <FaIdCard className="mr-2 text-gray-500" />
            {user?.dni || "No disponible"}
          </div>

          <div className="mt-4 flex items-center justify-center bg-gray-200 px-4 py-2 rounded-lg w-fit mx-auto">
            <FaUserTag className="mr-2 text-gray-600" />
            <span className="text-gray-800 font-medium uppercase">
              {user?.rol || "No disponible"}
            </span>
          </div>

          {/* Botón "Editar mis datos personales" */}
          {/* <a
            href="/editar-perfil"
            className="mt-6 inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition"
          >
            <FaUserEdit className="mr-2" /> Editar mis datos
          </a> */}

          <div className="mt-8 flex gap-4 justify-center">
            <a
              href="/tickets"
              className="px-6 py-3 flex items-center bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-700 transition"
            >
              <FaClipboardList className="mr-2" /> Ver mis tickets
            </a>

            {/* Botón "Añadir Nuevo Ticket" dentro del perfil */}
            <a
              href="/formulario"
              className="px-4 py-2 flex items-center bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
            >
              <FaPlusCircle className="mr-2" /> Nuevo ticket
            </a>
          </div>
        </div>
        {/* Sección de accesos rápidos a servicios */}
        <div className="mt-16 px-4 w-full max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">¿Qué necesitas hoy?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <a
              href="/averias"
              className="flex items-center p-5 bg-white shadow-md rounded-xl hover:bg-blue-100 transition"
            >
              <FaLandmark className="text-3xl text-blue-600 mr-4" />
              <div>
                <p className="font-semibold text-gray-700">Visitas al castillo</p>
                <p className="text-sm text-gray-500">Reserva tu visita al castillo de Sax</p>
              </div>
            </a>

            <a
              href="/formulario"
              className="flex items-center p-5 bg-white shadow-md rounded-xl hover:bg-blue-100 transition"
            >
              <FaUserEdit className="text-3xl text-orange-600 mr-4" />
              <div>
                <p className="font-semibold text-gray-700">Incidencias</p>
                <p className="text-sm text-gray-500">Consulta o registra incidencias</p>
              </div>
            </a>

            <a
              href="/mapa-desfibriladores"
              className="flex items-center p-5 bg-white shadow-md rounded-xl hover:bg-blue-100 transition"
            >
              <FaMapMarkedAlt className="text-3xl text-green-600 mr-4" />
              <div>
                <p className="font-semibold text-gray-700">Mapa de desfibriladores</p>
                <p className="text-sm text-gray-500">Mira la ubicación de desfibriladores</p>
              </div>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
