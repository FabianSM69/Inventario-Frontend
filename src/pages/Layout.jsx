import React from "react";
import { Link, useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="container-fluid d-flex" style={{ backgroundColor: "#fae1dd", minHeight: "100vh" }}>
      {/* Menú lateral con los colores establecidos */}
      <div
        className="d-flex flex-column align-items-start p-3"
        style={{
          backgroundColor: "#343a40", // Gris oscuro
          color: "white",
          width: "250px",
          height: "100vh",
        }}
      >
        <h3 className="mb-4">Menú</h3>
        
        {/* Mostrar solo si no estás en la página correspondiente */}
        {location.pathname !== "/register-product" && (
          <Link
            to="/register-product"
            className={`btn ${location.pathname === "/register-product" ? "btn-secondary" : "btn-success"} mb-3 w-100`}
          >
            Registrar Producto
          </Link>
        )}

        {location.pathname !== "/modify-product" && (
          <Link
            to="/modify-product"
            className={`btn ${location.pathname === "/modify-product" ? "btn-secondary" : "btn-warning"} mb-3 w-100`}
          >
            Modificar Producto
          </Link>
        )}

        {/* Si no estamos en el Dashboard, mostrar un botón de regreso */}
        {location.pathname !== "/dashboard" && (
          <Link
            to="/dashboard"
            className="btn btn-success mb-3 w-100"
          >
            Regresar al Dashboard
          </Link>
        )}
        
        <Link to="/" className="btn btn-danger w-100">
          Cerrar Sesión
        </Link>
      </div>

      {/* Contenido principal */}
      <div className="flex-grow-1 p-4">{children}</div>
    </div>
  );
}

export default Layout;
