import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
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

    try {
      const { confirmPassword, ...userData } = formData;
      const response = await axios.post("http://localhost:3000/api/users/register", userData);
      toast.success(response.data.message);
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error en el registro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="flex items-center justify-center min-h-screen pt-32">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-200">
          <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">Crear Cuenta</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { name: "nombre", type: "text", placeholder: "Nombre" },
              { name: "apellidos", type: "text", placeholder: "Apellidos" },
              { name: "email", type: "email", placeholder: "Correo Electrónico" },
              { name: "telefono", type: "text", placeholder: "Teléfono" },
              { name: "password", type: "password", placeholder: "Contraseña" },
              { name: "confirmPassword", type: "password", placeholder: "Confirmar Contraseña" },
            ].map(({ name, type, placeholder }) => (
              <div key={name}>
                <label className="block font-semibold text-gray-700">{placeholder} <span className="text-red-500">*</span></label>
                <input
                  type={type}
                  name={name}
                  className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  onChange={handleChange}
                  required
                />
                {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
              </div>
            ))}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center font-semibold shadow-md"
              disabled={loading}
            >
              {loading ? <FaSpinner className="animate-spin" /> : "Registrarse"}
            </button>
          </form>

          {/* Separador */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-3 text-gray-500 text-sm font-medium">O</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Botón Google */}
          <button className="w-full py-3 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition shadow-sm">
            <FcGoogle className="text-2xl mr-3" />
            <span className="font-medium">Registrarse con Google</span>
          </button>

          {/* Link a login */}
          <p className="text-center text-sm text-gray-600 mt-6">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
