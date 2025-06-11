import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from '../api';
function Support() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showFAQ, setShowFAQ] = useState(false);
  const [role, setRole] = useState(""); // Estado para el rol del usuario

  // Obtener el rol desde localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem('role'); // Obtener el rol desde el localStorage
    setRole(storedRole || "user"); // Si no hay rol, asumir "user" por defecto
  }, []);

  const toggleFAQ = () => {
    setShowFAQ(!showFAQ);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/send-email", {
        name,
        email,
        message,
      });
      alert(response.data.message);  // Mostrar mensaje de éxito
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      alert("Hubo un error al enviar el mensaje");
    }
  };

  return (
    <div className="container-fluid d-flex" style={{ backgroundColor: "#fae1dd", minHeight: "100vh" }}>
      
      <div
        className="d-flex flex-column align-items-start p-3"
        style={{
          backgroundColor: "#343a40",
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
        
        {/* Menú para usuarios normales */}
       
          <>
            <Link to="/stock" className="btn btn-dark mb-3 w-100">Stock</Link>
            <Link to="/support" className="btn btn-secondary mb-3 w-100">Soporte</Link>
          </>
        

        {/* Menú para administradores */}
        {role === "admin" && (
          <>
            <Link to="/reports" className="btn btn-secondary mb-3 w-100">Reportes</Link>
            <Link to="/activity-history" className="btn btn-info mb-3 w-100">Historial</Link>
            <Link to="/modify-product" className="btn btn-warning mb-3 w-100">Modificar Producto</Link>
          </>
        )}

        <Link to="/" className="btn btn-danger w-100">Cerrar Sesión</Link>
      </div>

      {/* Barra superior con el texto "CENTRO DE SOPORTE" */}
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
        <h2 className="text-center">CENTRO DE SOPORTE</h2>
      </div>

      {/* Contenido principal */}
      <div className="flex-grow-1 p-4" style={{ marginLeft: "250px", marginTop: "120px" }}> {/* Ajuste para el menú fijo y barra superior */}
        <p className="text-center">¿Tienes algún problema? Contáctanos o revisa nuestras preguntas frecuentes.</p>

        {/* Formulario de Contacto */}
        <div className="mt-4">
          <h4 className="text-dark text-center">Envíanos un mensaje</h4>
          <form className="w-50 mx-auto" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Tu nombre" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Correo Electrónico</label>
              <input 
                type="email" 
                className="form-control" 
                placeholder="Tu correo" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mensaje</label>
              <textarea 
                className="form-control" 
                rows="4" 
                placeholder="Escribe tu mensaje aquí..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">Enviar</button>
          </form>
        </div>

        <div className="row mt-4">
          {/* Sección de Contacto en un recuadro */}
          <div className="col-md-6">
            <div className="border p-4 rounded" style={{ backgroundColor: "#ffffff" }}>
              <h4 className="text-dark">Contacto</h4>
              <p>Email: soporte@empresa.com</p>
              <p>Teléfono: +52 123 456 7890</p>
              <p>Horario: Lunes a Viernes, 9:00 AM - 6:00 PM</p>
            </div>
          </div>

          {/* Sección de Preguntas Frecuentes en un recuadro */}
          <div className="col-md-6">
            <div className="border p-4 rounded" style={{ backgroundColor: "#ffffff" }}>
              <h4 className="text-dark">Preguntas Frecuentes</h4>
              <button 
                className="btn btn-link text-dark" 
                onClick={toggleFAQ}>
                {showFAQ ? "Ocultar preguntas" : "Mostrar preguntas"}
              </button>
              {showFAQ && (
                <ul style={{ color: "#6c757d" }}> 
                  <li>¿Cómo puedo registrar un nuevo producto?</li>
                  <li>¿Cómo modificar un producto existente?</li>
                  <li>¿Cómo generar reportes de ventas?</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;
