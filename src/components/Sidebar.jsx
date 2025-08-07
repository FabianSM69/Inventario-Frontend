// src/components/Sidebar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";  // 1) Importa useNavigate

export default function Sidebar({ isOpen, toggle }) {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();                         // 2) Llama a useNavigate dentro

  const handleLogout = () => {                            // 3) Usa esa instancia aquí
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: 250,
        position: "fixed",
        top: 0,
        left: isOpen ? 0 : -250,
        height: "100vh",
        transition: "left 0.3s",
        overflowY: "auto",
        zIndex: 1000,
      }}
    >
      <h3 className="mb-4" onClick={toggle} style={{ cursor: "pointer" }}>
        Menú
      </h3>

      <Link to="/dashboard" className="btn btn-primary mb-3 w-100 text-start">
        <i className="fas fa-tachometer-alt me-2"></i> Dashboard
      </Link>

      <Link to="/register-product" className="btn btn-success mb-3 w-100 text-start">
        <i className="fas fa-plus-square me-2"></i> Registrar Producto
      </Link>

      <Link to="/stock" className="btn btn-dark mb-3 w-100 text-start">
        <i className="fas fa-boxes me-2"></i> Stock
      </Link>

      <Link to="/support" className="btn btn-secondary mb-3 w-100 text-start">
        <i className="fas fa-headset me-2"></i> Soporte
      </Link>

      <Link to="/profile" className="btn btn-secondary mb-3 w-100 text-start">
        <i className="fas fa-user me-2"></i> Perfil
      </Link>

      {(role === "admin" || role === "superadmin") && (
        <>
          <Link to="/modify-product" className="btn btn-warning mb-3 w-100 text-start">
            <i className="fas fa-edit me-2"></i> Modificar Producto
          </Link>
          <Link to="/activity-history" className="sidebar-button btn-history">
            <i className="fas fa-history"></i> Historial
          </Link>
          <Link to="/reports" className="sidebar-button btn-reports">
            <i className="fas fa-chart-bar"></i> Reportes
          </Link>

        </>
      )}

      <button className="sidebar-button btn-logout" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
      </button>

    </div>
  );
}
