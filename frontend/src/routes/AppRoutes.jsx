import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import UserManagement from "@/pages/admin/UserManagement";
import Formulario from "@/pages/Formulario";
import Tickets from "@/pages/Tickets";
import DesfibriladorMaps from "@/pages/DesfibriladorMaps";
import FormularioReserva from "@/pages/FormularioReservasCastillo";


import PrivateRoute from "@/routes/PrivateRoute";
import AdminRoute from "@/routes/AdminRoute";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mapa-desfibriladores" element={<DesfibriladorMaps />} />
        <Route path="/reservas-castillo" element={<FormularioReserva />} />

        {/* Rutas privadas */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/formulario" element={<Formulario />} />
          <Route path="/tickets" element={<Tickets />} />
        </Route>

        {/* Rutas de administración */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/users" element={<UserManagement />} />
        </Route>
      </Routes>
    </Router>
  );
}
