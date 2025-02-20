import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc"; // Icono de Google
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="flex flex-grow items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                className="w-full p-2 border rounded"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block font-medium">Contraseña</label>
              <input
                type="password"
                name="password"
                className="w-full p-2 border rounded"
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-40 mx-auto p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <FaSpinner className="animate-spin" /> : "Iniciar Sesión"}
            </button>
          </form>

          {/* Separador */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500 text-sm">o</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Botón Google */}
          <button className="w-full p-2 border rounded-lg flex items-center justify-center hover:bg-gray-100 transition">
            <FcGoogle className="text-xl mr-2" />
            Iniciar sesión con Google
          </button>

          {/* Link a registro */}
          <p className="text-center text-sm text-gray-600 mt-4">
            ¿Todavía no tienes una cuenta?{" "}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Regístrese
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
