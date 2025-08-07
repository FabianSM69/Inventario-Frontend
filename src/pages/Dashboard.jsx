import React, { useState, useEffect } from "react";
import axios from "../api";
import "../App.css";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

function Dashboard() {
  const [role, setRole] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [slides, setSlides] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Guardar rol desde localStorage
  useEffect(() => {
    const r = localStorage.getItem('role');
    setRole(r);
  }, []);

  // Cargar datos
  useEffect(() => {
    Promise.all([
      axios.get('/stats/ventas-mensuales'),
      axios.get('/stats/entradas-hoy'),
      axios.get('/stats/stock-bajo'),
    ]).then(([ventas, entradasHoy, stockBajo]) => {
      setSlides([
        { type: 'welcome' },
        { type: 'ventasMensuales', data: ventas.data },
        { type: 'entradasHoy',     data: entradasHoy.data },
        { type: 'stockBajo',       data: stockBajo.data },
      ]);
    });
  }, []);

  // Carrusel automático
  useEffect(() => {
    if (!slides.length) return;
    const id = setInterval(() => {
      setCarouselIndex(i => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [slides]);

  return (
    <div className="d-flex app-page" style={{ minHeight: "100vh" }}>
      {slides.length > 0 && (
        <div
          style={{
            width: '100%',
            padding: '2rem',
          }}
        >
          <div className="dashboard-card" style={{ width: '100%' }}>
            {/* slide de bienvenida */}
            {slides[carouselIndex].type === 'welcome' && (
              <div style={{ textAlign: 'center' }}>
                <h2 className="dashboard-title">¡Bienvenido al Panel de Inventario!</h2>
                <p>Gestiona entradas, salidas y stock de forma fácil y eficiente.</p>
                <img
                  src="/imagenes/Bienvenido.png"
                  alt="Bienvenida"
                  style={{ width: '100%', maxWidth: 400, margin: '0 auto' }}
                />
              </div>
            )}

            {/* slide de ventas mensuales */}
            {slides[carouselIndex].type === 'ventasMensuales' && (
              <>
                <h3 className="dashboard-title">Top 5 Vendidos (Mes)</h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <ResponsiveContainer width="40%" height={180}>
                    <BarChart data={slides[carouselIndex].data}>
                      <XAxis dataKey="nombre" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="total_vendidas" fill="#4f93ff" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </>
            )}

            {/* slide de entradas hoy */}
            {slides[carouselIndex].type === 'entradasHoy' && (
              <>
                <h3 className="dashboard-title">Entradas Registradas Hoy</h3>
                <p className="dashboard-value">
                  {slides[carouselIndex].data.total_entradas}
                </p>
              </>
            )}

            {/* slide de stock bajo */}
            {slides[carouselIndex].type === 'stockBajo' && (
              <>
                <h3 className="dashboard-title">Productos con Stock Bajo</h3>
                <div className="stock-card-list">
                  {slides[carouselIndex].data.map(p => (
                    <div key={p.nombre} className="stock-card">
                      <span className="stock-name">{p.nombre}</span>
                      <span className={`stock-badge ${p.cantidad_total < 10 ? 'danger' : 'warning'}`}>
                        {p.cantidad_total} unidades
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
