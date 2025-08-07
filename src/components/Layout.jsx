// src/components/Layout.jsx
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Recupera estado del sidebar desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem("menuOpen");
    if (stored != null) setSidebarOpen(stored === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("menuOpen", sidebarOpen);
  }, [sidebarOpen]);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  // 🔒 Cierre de sesión por inactividad (15 minutos)
  useEffect(() => {
    let timeout;

    const logout = () => {
      localStorage.clear();
      navigate("/login", { replace: true });
    };

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(logout, 15 * 60 * 1000); // 15 minutos
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);

    resetTimer(); // iniciar inmediatamente

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, [navigate]);

  // Títulos de página
  const titleMap = {
    "/dashboard": "Dashboard",
    "/stock": "Stock",
    "/support": "Soporte",
    "/profile": "Mi Perfil",
    "/register-product": "Registrar Producto",
    "/modify-product": "Modificar Producto",
    "/activity-history": "Historial de Actividad",
    "/reports": "Reportes",
    // Añade más si necesitas
  };
  const title = titleMap[location.pathname] || "";

  const toggleSidebar = () => {
    setSidebarOpen(o => !o);
  };

  return (
    <div className="app-page" style={{ minHeight: "100vh" }}>
      {/* Sidebar fijo */}
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />

      {/* Header fijo */}
      <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Contenido dinámico */}
      <main
        style={{
          marginTop: 80,
          marginLeft: sidebarOpen ? 250 : 0,
          padding: "1rem",
          transition: "margin-left 0.3s ease"
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
