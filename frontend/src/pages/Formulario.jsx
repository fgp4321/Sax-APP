import { useState, useEffect } from "react";
import { FaPaperclip, FaPaperPlane } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";


const FormularioTicket = ({ usuario }) => {
  const [form, setForm] = useState({
    categoria: "",
    subcategoria: "",
    nombre: usuario?.nombre || "",
    correo: usuario?.correo || "",
    telefono: usuario?.telefono || "",
    descripcion: "",
    ubicacion: "",
    archivo: null,
  });

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const categorias = ["Incidencia", "Queja", "Sugerencia"];
  const subcategorias = [
    "Aceras y calzadas", "Alumbrado", "Animales muertos o abandonados", "Limpieza de calles",
    "Mobiliario urbano", "Parques y jardines", "Plagas de insectos y roedores", "Puntos de agua",
    "Señales", "Vehículos abandonados", "Otros"
  ];

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("user")) || {};
    setForm((prev) => ({
      ...prev,
      nombre: usuario.nombre || "",
      correo: usuario.email || "",
      telefono: usuario.telefono || "",
    }));

    // Obtener ubicación del usuario si el navegador lo permite
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const ubicacion = `${position.coords.latitude},${position.coords.longitude}`;
          setForm((prev) => ({ ...prev, ubicacion }));
        },
        (error) => {
          console.error("Error obteniendo ubicación:", error);
          toast.warn("No se pudo obtener la ubicación", { autoClose: 2000 });
        }
      );
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.categoria || !form.subcategoria || !form.nombre || !form.correo || !form.telefono || !form.descripcion || !form.ubicacion) {
      setError("Por favor, complete todos los campos obligatorios.");
      return;
    }

    setError("");

    const formData = new FormData();
    formData.append("categoria", form.categoria);
    formData.append("subcategoria", form.subcategoria);
    formData.append("nombre", form.nombre);
    formData.append("correo", form.correo);
    formData.append("telefono", form.telefono);
    formData.append("descripcion", form.descripcion);
    formData.append("ubicacion", form.ubicacion);
    if (form.archivo) formData.append("adjunto", form.archivo);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/api/tickets", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Error al enviar el ticket");

      toast.success("Ticket creado correctamente", { autoClose: 2000 });
      setTimeout(() => {
        navigate("/mis-tickets");
      }, 2000);
      
      setForm({
        categoria: "",
        subcategoria: "",
        nombre: usuario?.nombre || "",
        correo: usuario?.correo || "",
        telefono: usuario?.telefono || "",
        descripcion: "",
        ubicacion: "",
        archivo: null,
      });
    } catch (error) {
      toast.error(error.message, { autoClose: 2000 });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6 pt-32">
      <Navbar />
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="bg-white p-12 rounded-2xl shadow-xl max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Reporte de Ticket</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {[
            { label: "Categoría", type: "select", name: "categoria", options: categorias },
            { label: "Subcategoría", type: "select", name: "subcategoria", options: subcategorias },
            { label: "Nombre", type: "text", name: "nombre" },
            { label: "Correo", type: "email", name: "correo" },
            { label: "Teléfono", type: "tel", name: "telefono" },
            { label: "Ubicación", type: "text", name: "ubicacion", readOnly: true },
            { label: "Descripción", type: "textarea", name: "descripcion" },
          ].map(({ label, type, name, options, readOnly }) => (
            <div key={name}>
              <label className="block text-gray-500 font-medium mb-3">{label} <span className="text-red-500">*</span></label>
              {type === "select" ? (
                <select
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 bg-white"
                  value={form[name]}
                  onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                  required
                >
                  <option value="">Seleccione una opción</option>
                  {options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : type === "textarea" ? (
                <textarea
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
                  placeholder={`Ingrese ${label.toLowerCase()}`}
                  value={form[name]}
                  onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                  required
                />
              ) : (
                <input
                  type={type}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
                  placeholder={`Ingrese ${label.toLowerCase()}`}
                  value={form[name]}
                  onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                  required
                  readOnly={readOnly}
                />
              )}
            </div>
          ))}

          {/* Adjuntar Archivo */}
          <div>
            <label className="block text-gray-500 font-medium mb-3">Adjuntar archivo</label>
            <div
              className="flex items-center border border-gray-300 rounded-xl p-4 cursor-pointer bg-gray-100 hover:bg-gray-200"
              onClick={() => document.getElementById("archivoInput").click()}
            >
              <FaPaperclip className="text-gray-500 mr-3" />
              <input
                id="archivoInput"
                type="file"
                className="hidden"
                onChange={(e) => setForm({ ...form, archivo: e.target.files[0] })}
              />
              <span className="text-gray-600">
                {form.archivo ? form.archivo.name : "Seleccionar archivo"}
              </span>
            </div>
          </div>

          {/* Mensaje de error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Botón Enviar */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="flex items-center gap-3 bg-blue-500 text-white font-bold px-6 py-3 rounded-xl text-lg hover:bg-blue-600 transition shadow-md"
            >
              <FaPaperPlane className="text-white" />
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioTicket;
