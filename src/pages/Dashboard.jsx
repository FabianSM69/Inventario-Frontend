import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [imageIndex, setImageIndex] = useState(0);
  const [role, setRole] = useState(null); // Estado para almacenar el rol
  const images = [
    "https://toppng.com/public/uploads/preview/bienvenido-11563519952rwpmf18ojy.png",
    "/imagenes/a.png",
    "https://via.placeholder.com/400x200/32CD32/FFFFFF?text=Imagen+3",
  ];

  // Efecto para cambiar la imagen cada 5 segundos
  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  // Verificar el rol del usuario al cargar el componente
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole); // Guardamos el rol en el estado
  }, []);

  return (
    <div className="container-fluid d-flex" style={{ backgroundColor: "#fae1dd", minHeight: "100vh" }}>
      {/* Menú lateral */}
      <div
        className="d-flex flex-column align-items-start p-3"
        style={{
          backgroundColor: "#343a40",
          color: "white",
          width: "250px",
          height: "100vh",
          position: "fixed", // Fijamos el menú lateral
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
      >
        <h3 className="mb-4">Menú</h3>
        <Link to="/register-product" className="btn btn-success mb-3 w-100">
          Registrar Producto
        </Link>

        {/* Mostrar opciones solo si el usuario es admin */}
        {role === "admin" && (
          <>
            <Link to="/modify-product" className="btn btn-warning mb-3 w-100">
              Modificar Producto
            </Link>
            <Link to="/reports" className="btn btn-info mb-3 w-100">
              Ver Reportes
            </Link>
            <Link to="/activity-history" className="btn btn-primary mb-3 w-100">
              Historial de Actividad
            </Link>
          </>
        )}

        {/* Opciones visibles para todos los usuarios */}
        <Link to="/support" className="btn btn-light mb-3 w-100">
          Soporte
        </Link>
        <Link to="/stock" className="btn btn-dark mb-3 w-100">
          Stock
        </Link>

        {/* Opción para cerrar sesión */}
        <Link to="/" className="btn btn-danger w-100">
          Cerrar Sesión
        </Link>
      </div>

      {/* Barra superior con el texto "DASHBOARD" */}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          position: "fixed",
          top: 0,
          left: 250,
          right: 0,
          height: "80px",
          backgroundColor: "#343a40",
          color: "white",
          zIndex: 999,
        }}
      >
        <h2 className="text-center">DASHBOARD</h2>
      </div>

      {/* Contenido principal */}
      <div className="flex-grow-1 p-4" style={{ marginLeft: "250px", marginTop: "120px" }}>
        <h2 className="mb-4">¡Bienvenido al Panel!</h2>
        <img
          src={images[imageIndex]}
          alt="Imagen de bienvenida"
          className="mb-4"
          style={{ width: "400px", height: "auto" }}
        />
      </div>
    </div>
  );
}

export default Dashboard;
