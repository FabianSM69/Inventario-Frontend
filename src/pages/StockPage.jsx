// src/pages/StockPage.jsx

import React, { useState, useEffect } from "react";
import axios from "../api";
import { Link } from "react-router-dom";

function StockPage() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");
  const [role, setRole] = useState("");
  const [conteoFisico, setConteoFisico] = useState({});
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    setRole(localStorage.getItem("role") || "");
  }, []);

  useEffect(() => {
    axios.get("/getproductos")
      .then(resp => setProductos(resp.data))
      .catch(err => {
        console.error("Error al obtener productos:", err);
        setError("No se pudo cargar los productos.");
      });
  }, []);

  const fetchConteoFisico = () => {
    axios.get("/getconteofisico")
      .then(resp => {
        const c = {};
        resp.data.forEach(item => {
          c[item.producto_id] = item.cantidad_contada;
        });
        setConteoFisico(c);
      })
      .catch(err => console.error("Error al obtener conteo físico:", err));
  };

  useEffect(() => {
    fetchConteoFisico();
    const id = setInterval(fetchConteoFisico, 2000);
    return () => clearInterval(id);
  }, []);

  const calcularDiferencia = (id, registrado) => {
    const fisico = parseInt(conteoFisico[id] || 0, 10);
    const reg = parseInt(registrado, 10);
    if (isNaN(fisico) || isNaN(reg)) return "Dato inválido";
    const diff = fisico - reg;
    if (diff > 0) return `+${diff} sobrante`;
    if (diff < 0) return `${Math.abs(diff)} faltante`;
    return "Correcto";
  };

  return (
    <div className="d-flex app-page" style={{ minHeight: "100vh" }}>
      <div style={{ height: "100px" }} />

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <div
        className="mx-auto p-4"
        style={{
          background: "#fff",
          borderRadius: "16px",
          maxWidth: "900px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          animation: "fadeIn 0.5s ease-in-out",
          width: "100%",
        }}
      >
        <h4 className="text-center section-title" style={{ marginBottom: "2rem" }}>
          Comparación de Stock
        </h4>

        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead style={{ backgroundColor: "#4F93FF", color: "white" }}>
              <tr>
                <th className="text-center">Nombre</th>
                <th className="text-center">Registrado</th>
                <th className="text-center">Conteo Físico</th>
                <th className="text-center">Resultado</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(prod => (
                <tr key={prod.id}>
                  <td className="text-capitalize text-center">{prod.nombre}</td>
                  <td className="text-center fw-semibold">{prod.cantidad_total}</td>
                  <td className="text-center">
                    <input
                      type="number"
                      className="form-control text-center"
                      value={conteoFisico[prod.id] || ""}
                      disabled
                      style={{
                        backgroundColor: "#f3f3f3",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                      }}
                    />
                  </td>
                  <td className="text-center fw-medium text-primary">
                    {calcularDiferencia(prod.id, prod.cantidad_total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default StockPage;
