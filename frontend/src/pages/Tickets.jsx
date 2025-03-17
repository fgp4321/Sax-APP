import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const GoogleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/tickets", {
          withCredentials: true,
        });

        setTickets(response.data);
      } catch (error) {
        console.error("🔥 Error al obtener tickets:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const categoriaMap = {
    Incidencia: "Incidencias",
    Queja: "Quejas",
    Sugerencia: "Sugerencias",
  };

  const categorizedTickets = {
    Incidencias: [],
    Quejas: [],
    Sugerencias: [],
  };

  tickets.forEach((ticket) => {
    const categoriaKey = categoriaMap[ticket.categoria];
    if (categoriaKey) {
      categorizedTickets[categoriaKey].push(ticket);
    }
  });

  const getStatusColor = (estado) => {
    return estado === "Pendiente" ? "bg-yellow-500" : "bg-green-500";
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <Navbar />
      <div className="flex flex-grow items-center justify-center pt-24 p-6">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-4xl border border-gray-200">
          <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">Mis Tickets</h2>
          {loading ? (
            <p className="text-center text-gray-600">Cargando tickets...</p>
          ) : tickets.length === 0 ? (
            <p className="text-center text-gray-600">
              Aún no has enviado tickets. <br />
              <span className="text-blue-600 font-semibold hover:underline cursor-pointer" onClick={() => navigate("/formulario")}>
                Pulsa aquí para crear uno
              </span>
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.keys(categorizedTickets).map((categoria) => (
                <div key={categoria} className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-blue-700 mb-4">{categoria}</h3>
                  {categorizedTickets[categoria].length > 0 ? (
                    <ul className="space-y-3">
                      {categorizedTickets[categoria].map((ticket) => (
                        <li
                          key={ticket.id}
                          className="bg-white p-3 rounded-lg shadow border border-gray-300 cursor-pointer transition hover:shadow-lg"
                          onClick={() => setSelectedTicket(ticket)}
                        >
                          <div className="flex justify-between">
                            <p className="text-gray-700 font-medium">{ticket.nombre}</p>
                            <span className={`text-white text-xs px-2 py-1 rounded ${getStatusColor(ticket.estado)}`}>
                              {ticket.estado}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">{ticket.descripcion}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No tienes tickets en esta categoría</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />

      {/* Nuevo Modal Mejorado */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-oklch(0.901 0.058 230.902) bg-opacity-30 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md transform transition-all scale-100">
            <h2 className="text-lg font-bold text-blue-700">{selectedTicket.nombre}</h2>
            <p className="text-gray-600">{selectedTicket.descripcion}</p>
            <p className="text-sm text-gray-500">Categoría: {selectedTicket.categoria}</p>
            <p className="text-sm text-gray-500">Subcategoría: {selectedTicket.subcategoria || "No especificada"}</p>
            <p className="text-sm text-gray-500">Fecha de creación: {new Date(selectedTicket.fecha_creacion).toLocaleDateString()}</p>

            {/* Mapa de Google */}
            {selectedTicket.ubicacion && (
              <iframe
                className="w-full h-40 mt-3 rounded-lg"
                src={`https://www.google.com/maps/embed/v1/place?key=${GoogleMapsApiKey}&q=${selectedTicket.ubicacion}`}
                allowFullScreen
              ></iframe>
            )}

            {/* Vista previa del archivo adjunto */}
            {selectedTicket.archivo && (
              <div className="mt-3">
                <p className="text-sm text-gray-500">Archivo adjunto:</p>
                <a href={selectedTicket.archivo} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  Ver archivo
                </a>
              </div>
            )}

            {/* Botón para cerrar */}
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                onClick={() => setSelectedTicket(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
