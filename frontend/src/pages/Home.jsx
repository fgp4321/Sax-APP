import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { isAuthenticated } from "@/utils/auth";
import { FaPlusCircle } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-200">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl font-bold text-blue-700">Incidencias - Quejas - Sugerencias</h1>
        <h1 className="text-5xl font-bold text-blue-700">Ayuntamiento de Sax</h1>
        <p className="text-lg text-gray-700 mt-4 max-w-2xl">
          Deja tus quejas y sugerencias para mejorar nuestra comunidad.
        </p>

        {!isAuthenticated() ? (
          <>
            <p className="text-red-600 font-medium mt-4">
              Para crear tickets, debes estar registrado y haber iniciado sesión en la plataforma.
            </p>
            <a
              href="/register"
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg shadow-md hover:bg-blue-700 transition"
            >
              Regístrate ahora
            </a>
          </>
        ) : (
          <div className="mt-6 flex flex-col items-center gap-4">
            <a
              href="/mis-incidencias"
              className="px-6 py-3 bg-orange-600 text-white rounded-lg text-lg shadow-md hover:bg-orange-700 transition"
            >
              Mis Tickets
            </a>

            {/* Botón "Nueva Incidencia" solo para usuarios autenticados */}
            <a
              href="/formulario"
              className="px-6 py-3 flex items-center bg-green-600 text-white rounded-lg text-lg shadow-md hover:bg-green-700 transition"
            >
              <FaPlusCircle className="mr-2" /> Nuevo Ticket
            </a>
          </div>
        )}

        <section className="mt-12 w-full max-w-4xl">
          <h2 className="text-3xl font-semibold text-blue-700 mb-4">Noticias</h2>
          <p className="text-gray-600">Próximamente se mostrarán las últimas noticias del ayuntamiento...</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
