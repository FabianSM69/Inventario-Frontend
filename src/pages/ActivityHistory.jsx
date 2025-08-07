import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from '../api';

function ActivityHistory() {
  const [activityHistory, setActivityHistory] = useState([]);
  const [role, setRole] = useState("");  // Estado para el rol

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
    fetchActivityHistory();
  }, []);

  const fetchActivityHistory = async () => {
    try {
      const response = await fetch('http://localhost:5000/get-activity-history');
      const data = await response.json();
      setActivityHistory(data); 
    } catch (error) {
      console.error("Error al obtener el historial de actividades:", error);
    }
  };

  return (
    <div className="container-fluid d-flex" style={{ backgroundColor: "#fae1dd", minHeight: "100vh" }}>

      {/* Menú lateral removido porque ya se usa Sidebar global */}
      {/*
      <div
        className="d-flex flex-column align-items-start p-3"
        style={{
          backgroundColor: "#073058ff",
          color: "white",
          width: "250px",
          height: "100vh",
          position: "fixed", 
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
      >
        <h3 className="mb-4">Menú</h3>
        <Link to="/dashboard" className="btn btn-primary mb-3 w-100">Dashboard</Link>
        <Link to="/register-product" className="btn btn-success mb-3 w-100">Registrar Producto</Link>
        {role === "admin" && (
          <>
            <Link to="/modify-product" className="btn btn-warning mb-3 w-100">Modificar Producto</Link>
            <Link to="/reports" className="btn btn-info mb-3 w-100">Reportes</Link>
          </>
        )}
        <Link to="/support" className="btn btn-secondary mb-3 w-100">Soporte</Link>
        <Link to="/stock" className="btn btn-dark mb-3 w-100">Stock</Link>
        <Link to="/" className="btn btn-danger w-100">Cerrar Sesión</Link>
      </div>
      */}

      {/* Barra superior */}
      <div 
        className="d-flex justify-content-center align-items-center" 
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "80px",
          backgroundColor: "#d9e0ecff",
          color: "white",
          zIndex: 999,
        }}
      >
        <h2 className="text-center">HISTORIAL DE ACTIVIDAD</h2>
      </div>

      {/* Contenido principal */}
      <div className="activity-container">
        <p className="text-center">Consulta las acciones recientes dentro del sistema.</p>

        <table className="table table-striped mt-4 activity-table">
          <thead className="table-dark">
            <tr>
              <th>Fecha</th>
              <th>Usuario</th>
              <th>Acción</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {activityHistory.length > 0 ? (
              activityHistory.map((activity, index) => (
                <tr key={index}>
                  <td>{new Date(activity.fecha).toLocaleDateString()}</td>
                  <td>{activity.usuario}</td>
                  <td>{activity.accion}</td>
                  <td>{activity.detalles}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No hay actividades recientes</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ActivityHistory;
