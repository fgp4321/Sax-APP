import { useState } from "react";

const FormularioTicket = () => {
  const [form, setForm] = useState({
    categoria: "",
    subcategoria: "",
    nombre: "",
    correo: "",
    telefono: "",
    descripcion: "",
    archivo: null,
  });

  const categorias = ["Incidencia", "Queja", "Sugerencia"];
  const subcategorias = [
    "Aceras y calzadas",
    "Alumbrado",
    "Animales muertos o abandonados",
    "Limpieza de calles",
    "Mobiliario urbano",
    "Parques y jardines",
    "Plagas de insectos y roedores",
    "Puntos de agua",
    "Señales",
    "Vehículos abandonados",
    "Otros",
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full">
        <h1 className="text-2xl font-semibold text-center mb-6">Reporte de Ticket</h1>
        <form className="space-y-4">
          {/* Categoría */}
          <div>
            <label className="block text-gray-600 font-medium">Categoría</label>
            <select
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
              value={form.categoria}
              onChange={(e) => setForm({ ...form, categoria: e.target.value })}
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          {/* Subcategoría */}
          <div>
            <label className="block text-gray-600 font-medium">Subcategoría</label>
            <select
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
              value={form.subcategoria}
              onChange={(e) => setForm({ ...form, subcategoria: e.target.value })}
            >
              <option value="">Seleccione una subcategoría</option>
              {subcategorias.map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
          
          {/* Nombre */}
          <div>
            <label className="block text-gray-600 font-medium">Nombre</label>
            <input
              type="text"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
              placeholder="Ingrese su nombre"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            />
          </div>
          
          {/* Correo */}
          <div>
            <label className="block text-gray-600 font-medium">Correo</label>
            <input
              type="email"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
              placeholder="ejemplo@correo.com"
              value={form.correo}
              onChange={(e) => setForm({ ...form, correo: e.target.value })}
            />
          </div>
          
          {/* Teléfono */}
          <div>
            <label className="block text-gray-600 font-medium">Teléfono</label>
            <input
              type="tel"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
              placeholder="Ingrese su teléfono"
              value={form.telefono}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
            />
          </div>
          
          {/* Descripción */}
          <div>
            <label className="block text-gray-600 font-medium">Descripción</label>
            <textarea
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
              placeholder="Describa el problema o sugerencia"
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            />
          </div>
          
          {/* Adjuntar Archivo */}
          <div>
            <label className="block text-gray-600 font-medium">Adjuntar archivo</label>
            <input
              type="file"
              className="w-full p-2 border rounded-xl"
              onChange={(e) => setForm({ ...form, archivo: e.target.files[0] })}
            />
          </div>
          
          {/* Botón Enviar */}
          <div>
            <button className="w-full bg-blue-500 text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioTicket;
