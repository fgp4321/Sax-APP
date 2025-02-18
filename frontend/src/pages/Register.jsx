import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let validationErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{9}$/;

    if (!formData.nombre) validationErrors.nombre = "El nombre es obligatorio.";
    if (!formData.apellidos) validationErrors.apellidos = "Los apellidos son obligatorios.";
    if (!formData.email) {
      validationErrors.email = "El correo es obligatorio.";
    } else if (!emailRegex.test(formData.email)) {
      validationErrors.email = "Ingrese un correo válido.";
    }
    if (!formData.telefono) {
      validationErrors.telefono = "El teléfono es obligatorio.";
    } else if (!phoneRegex.test(formData.telefono)) {
      validationErrors.telefono = "Debe ser un número de 9 dígitos.";
    }
    if (!formData.password) validationErrors.password = "La contraseña es obligatoria.";
    if (formData.password.length < 6) validationErrors.password = "Debe tener al menos 6 caracteres.";
    if (formData.password !== formData.confirmPassword) validationErrors.confirmPassword = "Las contraseñas no coinciden.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const { confirmPassword, ...userData } = formData;
      const response = await axios.post("http://localhost:3000/api/users/register", userData);
      toast.success(response.data.message);
      setTimeout(() => navigate("/"), 2000); // Redirigir después de un corto tiempo
    } catch (err) {
      toast.error(err.response?.data?.message || "Error en el registro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="flex flex-grow items-center justify-center mt-30">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">Registro</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { name: "nombre", type: "text", placeholder: "Nombre" },
              { name: "apellidos", type: "text", placeholder: "Apellidos" },
              { name: "email", type: "email", placeholder: "Correo Electrónico" },
              { name: "telefono", type: "text", placeholder: "Teléfono" },
              { name: "password", type: "password", placeholder: "Contraseña" },
              { name: "confirmPassword", type: "password", placeholder: "Confirmar Contraseña" },
            ].map(({ name, type, placeholder }) => (
              <div key={name}>
                <label className="block font-medium">
                  {placeholder} <span className="text-red-500">*</span>
                </label>
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  className="w-full p-2 border rounded"
                  onChange={handleChange}
                  required
                />
                {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
              </div>
            ))}
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrarse"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
