import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, isAdmin } from "@/utils/auth";

export default function AdminRoute() {
  return isAuthenticated() && isAdmin() ? <Outlet /> : <Navigate to="/" />;
}
