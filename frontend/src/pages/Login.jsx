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

export default function Login() {
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/users/login", formData, { withCredentials: true });
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Inicio de sesión exitoso");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error en el inicio de sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="flex flex-grow items-center justify-center pt-24">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200">
          <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold text-gray-700">Correo Electrónico o DNI <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="identifier"
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700">Contraseña <span className="text-red-500">*</span></label>
              <input
                type="password"
                name="password"
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center font-semibold shadow-md"
              disabled={loading}
            >
              {loading ? <FaSpinner className="animate-spin" /> : "Iniciar Sesión"}
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
            <span className="font-medium">Iniciar sesión con Google</span>
          </button>

          {/* Link a registro */}
          <p className="text-center text-sm text-gray-600 mt-6">
            ¿Todavía no tienes una cuenta?{" "}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
