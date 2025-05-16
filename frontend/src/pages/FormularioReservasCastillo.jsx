import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
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
  { label: "--- MAÑANAS ---", disabled: true },
  { label: "9:30 a 13:30", hora_inicio: "09:30:00", hora_fin: "13:30:00" },
  { label: "Visita guiada - 9:30 a 13:30", hora_inicio: "09:30:00", hora_fin: "13:30:00" },
  { label: "--- TARDES ---", disabled: true },
  { label: "16:00 a 18:00", hora_inicio: "16:00:00", hora_fin: "18:00:00" },
  { label: "Visita guiada - 16:00 a 18:00", hora_inicio: "16:00:00", hora_fin: "18:00:00" },
];

const FormularioReserva = ({ usuario }) => {
  const [form, setForm] = useState({
    nombre: usuario?.nombre || "",
    apellidos: usuario?.apellidos || "",
    telefono: "",
    email: usuario?.email || "",
    fecha: null,
    hora_inicio: "",
    hora_fin: "",
    numero_personas: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, apellidos, telefono, email, fecha, hora_inicio, hora_fin, numero_personas } = form;

    if (!nombre || !apellidos || !telefono || !email || !fecha || !hora_inicio || !hora_fin || !numero_personas) {
      setError("Por favor, complete todos los campos obligatorios.");
      return;
    }

    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          apellidos,
          telefono,
          email,
          fecha: fecha.toISOString().split("T")[0],
          hora_inicio,
          hora_fin,
          num_personas: parseInt(numero_personas, 10),
        }),
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6 pt-32">
      <Navbar />
      <ToastContainer position="top-right" />
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Reserva tu visita al castillo</h1>

        <form className="space-y-10" onSubmit={handleSubmit}>
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

          <hr className="my-6 border-t-2 border-blue-200" />


          {/* Datos de la reserva: Fecha, Horario, Nº personas */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Fecha */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Fecha <span className="text-red-500">*</span>
              </label>
              <DatePicker
                selected={form.fecha}
                onChange={(date) => setForm({ ...form, fecha: date })}
                filterDate={filtrarDiasPermitidos}
                placeholderText="Selecciona una fecha válida"
                locale="es"
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                className="w-full p-4 border border-gray-300 rounded-xl"
                required
              />
            </div>

            {/* Horario */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Horario <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full p-4 border border-gray-300 rounded-xl"
                value={`${form.hora_inicio}-${form.hora_fin}`}
                onChange={(e) => {
                  const selected = horarios.find(
                    h => !h.disabled && `${h.hora_inicio}-${h.hora_fin}` === e.target.value
                  );
                  if (selected) {
                    setForm({ ...form, hora_inicio: selected.hora_inicio, hora_fin: selected.hora_fin });
                  }
                }}
                required
              >
                <option value="">Selecciona un horario</option>
                {horarios.map((opt) =>
                  opt.disabled ? (
                    <option key={opt.label} disabled className="font-bold text-gray-400">{opt.label}</option>
                  ) : (
                    <option key={opt.label} value={`${opt.hora_inicio}-${opt.hora_fin}`}>
                      {opt.label}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Nº personas */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Nº de personas <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                value={form.numero_personas}
                onChange={(e) => setForm({ ...form, numero_personas: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-xl"
                required
              />
            </div>
          </div>


          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Botón enviar */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="flex items-center gap-3 bg-blue-500 text-white font-bold px-6 py-3 rounded-xl text-lg hover:bg-blue-600 transition shadow-md"
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
