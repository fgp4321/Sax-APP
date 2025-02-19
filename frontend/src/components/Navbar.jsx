import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { isAuthenticated, getUser, logout } from "@/utils/auth";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = getUser();

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-6 bg-transparent backdrop-blur-md">
      <img href="/" src="/escudo_sax.svg" alt="Escudo Ayuntamiento" className="h-20 ml-4" />

      {/* Si el usuario no está autenticado, el icono redirige al login */}
      {!isAuthenticated() ? (
        <a href="/login" className="mr-4">
          <FaUserCircle className="text-3xl text-white hover:text-gray-300" />
        </a>
      ) : (
        <div className="relative">
          {/* Icono de usuario con menú desplegable */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="mr-4 focus:outline-none">
            <FaUserCircle className="text-3xl text-white hover:text-gray-300" />
          </button>

          {/* Menú desplegable */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
              <div className="p-2 text-gray-700 border-b">{user.nombre}</div>
              <Link
                to="/mis-incidencias"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Mis Incidencias
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
