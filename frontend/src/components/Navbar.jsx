import { useState } from "react";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { isAuthenticated, getUser, logout } from "@/utils/auth";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = getUser();

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 bg-blue-900 bg-opacity-90 backdrop-blur-md text-blue-100 z-50">
      {/* Logo */}
      <Link to="/">
        <img src="/escudo_sax.svg" alt="Escudo Ayuntamiento" className="h-14 cursor-pointer" />
      </Link>

      {/* Menú de navegación - versión escritorio */}
      <div className="hidden md:flex space-x-6 font-semibold">
        <Link to="/formulario" className="hover:text-white">Incidencias</Link>
        <Link to="/mapa-desfibriladores" className="hover:text-white">Mapa Desfibriladores</Link>
        <Link to="/reservas-castillo" className="hover:text-white">Reservas Castillo</Link>
        <a href="https://www.sax.es" target="_blank" rel="noopener noreferrer" className="hover:text-white">Web Oficial</a>
      </div>

      {/* Parte derecha: hamburguesa (solo móvil) + icono de usuario (ambos) */}
      <div className="flex items-center gap-4">
        {/* Botón hamburguesa solo visible en móvil */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <FaBars className="text-2xl" />
        </button>

        {/* Icono de usuario (visible siempre) */}
        {!isAuthenticated() ? (
          <a href="/login">
            <FaUserCircle className="text-2xl" />
          </a>
        ) : (
          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <FaUserCircle className="text-2xl" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg text-sm z-50">
                <div className="p-2 text-gray-700 border-b text-center font-semibold">
                  {user.nombre} {user.apellidos?.split(" ")[0]}
                </div>
                <Link to="/tickets" className="block px-4 py-2 hover:bg-gray-200 text-gray-700">Mis Tickets</Link>
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200 text-gray-700">Ver mi cuenta</Link>
                <button onClick={() => { logout(); setMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200">
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Menú móvil desplegable */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-blue-800 text-blue-100 shadow-lg z-40">
          <Link to="/formulario" className="block px-6 py-3 hover:bg-blue-700">Incidencias</Link>
          <Link to="/mapa-desfibriladores" className="block px-6 py-3 hover:bg-blue-700">Mapa Desfibriladores</Link>
          <Link to="/reservas-castillo" className="block px-6 py-3 hover:bg-blue-700">Reservas Castillo</Link>
          <a href="https://www.sax.es" target="_blank" rel="noopener noreferrer" className="block px-6 py-3 hover:bg-blue-700">Web Oficial</a>
        </div>
      )}
    </nav>
  );
}
