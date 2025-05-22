import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaMapMarkedAlt, FaClipboardList, FaLandmark } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Home() {
  const [noticias, setNoticias] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState(null);

  useEffect(() => {
    fetch("https://www.sax.es/wp-json/wp/v2/posts?per_page=3&_embed")
      .then((res) => res.json())
      .then((data) => setNoticias(data))
      .catch((err) => console.error("Error al cargar noticias:", err));
  }, []);

  const abrirModal = (noticia) => {
    setNoticiaSeleccionada(noticia);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
    setNoticiaSeleccionada(null);
  };

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
        <section className="mt-20 w-full max-w-4xl text-center">
          <h2 className="text-3xl font-semibold text-blue-700 mb-6">Últimas noticias</h2>

          {noticias.length === 0 ? (
            <p className="text-gray-600">Cargando noticias...</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {noticias.map((noticia) => (
                <div
                  key={noticia.id}
                  className="bg-white rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition"
                  onClick={() => abrirModal(noticia)}
                >
                  {noticia._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                    <img
                      src={noticia._embedded["wp:featuredmedia"][0].source_url}
                      alt="Imagen destacada"
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="text-lg font-bold text-blue-800 mb-2" dangerouslySetInnerHTML={{ __html: noticia.title.rendered }} />
                  <p className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: noticia.excerpt.rendered }} />
                </div>
              ))}
            </div>
          )}

          <div className="mt-8">
            <a
              href="https://www.sax.es/ayuntamiento/noticias/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              Ver más noticias en sax.es →
            </a>
          </div>
        </section>
      </main>

      <Footer />

      {/* Modal personalizado */}
      {modalOpen && noticiaSeleccionada && (
        <div className="fixed inset-0 bg-oklch(0.901 0.058 230.902) bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-3xl mx-4 md:mx-0 transform transition-all scale-100 relative">
            <button
              onClick={cerrarModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold text-blue-700 mb-4" dangerouslySetInnerHTML={{ __html: noticiaSeleccionada.title.rendered }} />

            {noticiaSeleccionada._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
              <img
                src={noticiaSeleccionada._embedded["wp:featuredmedia"][0].source_url}
                alt="Imagen destacada"
                className="w-full h-60 object-cover rounded-lg mb-4"
              />
            )}

            <div
              className="prose max-w-none text-left text-gray-700"
              dangerouslySetInnerHTML={{ __html: noticiaSeleccionada.content.rendered }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
