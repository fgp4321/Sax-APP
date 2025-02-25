import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { isAuthenticated } from "@/utils/auth";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-200">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl font-bold text-blue-700">Bienvenido a la Plataforma de incidencias del Ayuntamiento de Sax</h1>
        <p className="text-lg text-gray-700 mt-4 max-w-2xl">
          Deja tus quejas y sugerencias para mejorar nuestra comunidad.
        </p>

        {!isAuthenticated() && (
          <a
            href="/register"
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg shadow-md hover:bg-blue-700 transition"
          >
            Regístrate ahora
          </a>
        )}

        {isAuthenticated() && (
          <a
            href="/mis-incidencias"
            className="mt-6 px-6 py-3 bg-orange-600 text-white rounded-lg text-lg shadow-md hover:bg-orange-700 transition"
          >
            Mis Incidencias
          </a>
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