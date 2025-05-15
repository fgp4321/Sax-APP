import { useState } from "react";
import { FaCalendarAlt, FaClock, FaPaperPlane } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);

const horarios = [
  "--- MAÑANAS ---",
  "Viernes 9:30 a 13:30",
  "Sábado 9:30 a 13:30",
  "Domingo 9:30 a 13:30",
  "Visita guiada - Viernes 9:30 a 13:30",
  "Visita guiada - Sábado 9:30 a 13:30",
  "Visita guiada - Domingo 9:30 a 13:30",
  "--- TARDES ---",
  "Viernes 16:00 a 18:00",
  "Sábado 16:00 a 18:00",
  "Visita guiada - Viernes 16:00 a 18:00",
  "Visita guiada - Sábado 16:00 a 18:00"
];

const FormularioReserva = ({ usuario }) => {
  const [form, setForm] = useState({
    nombre: usuario?.nombre || "",
    apellidos: usuario?.apellidos || "",
    telefono: "",
    email: usuario?.email || "",
    fecha: null,
    horario: "",
    numero_personas: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nombre, apellidos, telefono, email, fecha, horario, numero_personas } = form;

    if (!nombre || !apellidos || !telefono || !email || !fecha || !horario || !numero_personas) {
      setError("Por favor, complete todos los campos obligatorios.");
      return;
    }

    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, fecha: form.fecha.toISOString().split("T")[0] }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error al enviar la reserva");

      toast.success("Reserva enviada correctamente", { autoClose: 2000 });
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      toast.error(error.message, { autoClose: 2000 });
    }
  };

  const filtrarDiasPermitidos = (date) => {
    const day = date.getDay();
    return day === 5 || day === 6 || day === 0; // viernes, sábado, domingo
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-100 to-green-300 p-6 pt-32">
      <Navbar />
      <ToastContainer position="top-right" />
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-8">Reserva tu visita al castillo</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Nombre y Apellidos */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 font-medium mb-2">Nombre <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-2">Apellidos <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.apellidos}
                onChange={(e) => setForm({ ...form, apellidos: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-xl"
                required
              />
            </div>
          </div>

          {/* Teléfono y Email */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 font-medium mb-2">Teléfono <span className="text-red-500">*</span></label>
              <input
                type="tel"
                value={form.telefono}
                onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-2">Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-xl"
                required
              />
            </div>
          </div>

          {/* Fecha */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">Fecha <span className="text-red-500">*</span></label>
            <div className="relative">
              <DatePicker
                selected={form.fecha}
                onChange={(date) => setForm({ ...form, fecha: date })}
                filterDate={filtrarDiasPermitidos}
                placeholderText="Selecciona una fecha válida"
                locale="es"
                className="w-full p-4 border border-gray-300 rounded-xl"
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                required
              />
              <FaCalendarAlt className="absolute right-4 top-4 text-gray-400" />
            </div>
          </div>

          {/* Horario */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">Horario <span className="text-red-500">*</span></label>
            <select
              className="w-full p-4 border border-gray-300 rounded-xl"
              value={form.horario}
              onChange={(e) => setForm({ ...form, horario: e.target.value })}
              required
            >
              <option value="">Selecciona un horario</option>
              {horarios.map((opt) =>
                opt.startsWith("---") ? (
                  <option key={opt} disabled className="font-bold text-gray-400">{opt}</option>
                ) : (
                  <option key={opt} value={opt}>{opt}</option>
                )
              )}
            </select>
          </div>

          {/* Nº de personas */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">Nº de personas <span className="text-red-500">*</span></label>
            <input
              type="number"
              min="1"
              value={form.numero_personas}
              onChange={(e) => setForm({ ...form, numero_personas: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-xl"
              required
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Botón Enviar */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="flex items-center gap-3 bg-green-500 text-white font-bold px-6 py-3 rounded-xl text-lg hover:bg-green-600 transition shadow-md"
            >
              <FaPaperPlane className="text-white" />
              Reservar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioReserva;
