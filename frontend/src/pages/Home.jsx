import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaMapMarkedAlt, FaClipboardList, FaLandmark } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-200">
      <Navbar />
      <main className="flex-grow flex flex-col items-center text-center px-6 pt-32">
        <h1 className="text-5xl font-bold text-blue-800">Bienvenido a la App Ciudadana de Sax</h1>
        <p className="text-lg text-gray-800 mt-6 max-w-2xl">
          Una plataforma pensada para facilitar la comunicación entre el Ayuntamiento de Sax y sus ciudadanos.
          Desde aquí podrás acceder a servicios útiles como el mapa de desfibriladores, reservas para visitas al castillo,
          contacto con el ayuntamiento y más.
        </p>

        {/* Botones de servicios */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <Link to="/formulario" className="bg-blue-600 text-white rounded-xl p-8 shadow-lg hover:bg-blue-700 transition transform hover:scale-105 flex flex-col items-center">
            <FaClipboardList className="text-4xl mb-4" />
            <span className="text-xl font-semibold">Incidencias</span>
            <p className="mt-2 text-sm text-blue-100">Envía sugerencias, quejas o avisos al ayuntamiento.</p>
          </Link>

          <Link to="/mapa-desfibriladores" className="bg-green-600 text-white rounded-xl p-8 shadow-lg hover:bg-green-700 transition transform hover:scale-105 flex flex-col items-center">
            <FaMapMarkedAlt className="text-4xl mb-4" />
            <span className="text-xl font-semibold">Mapa Desfibriladores</span>
            <p className="mt-2 text-sm text-green-100">Consulta la ubicación de desfibriladores en Sax.</p>
          </Link>

          <Link to="/reservas-castillo" className="bg-yellow-500 text-white rounded-xl p-8 shadow-lg hover:bg-yellow-600 transition transform hover:scale-105 flex flex-col items-center">
            <FaLandmark className="text-4xl mb-4" />
            <span className="text-xl font-semibold">Reservas Castillo</span>
            <p className="mt-2 text-sm text-yellow-100">Reserva tu visita guiada al Castillo de Sax.</p>
          </Link>
        </div>

        {/* Noticias */}
        <section className="mt-20 w-full max-w-4xl">
          <h2 className="text-3xl font-semibold text-blue-700 mb-4">Últimas noticias</h2>
          <p className="text-gray-600">Próximamente se mostrarán aquí las novedades y eventos del municipio.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
