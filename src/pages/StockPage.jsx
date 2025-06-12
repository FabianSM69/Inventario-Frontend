import React, { useState, useEffect } from "react";
import axios from '../api';
import { Link } from "react-router-dom";

function StockPage() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");
  const [role, setRole] = useState("");
  const [conteoFisico, setConteoFisico] = useState({});

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("/getproductos");
        setProductos(response.data);
      } catch (err) {
        console.error("Error al obtener productos:", err);
        setError("No se pudo cargar los productos.");
      }
    };
    fetchProductos();
  }, []);
  
    const fetchConteoFisico = async () => {
      try {
        const response = await axios.get("/getconteofisico");
        const conteo = {};
        response.data.forEach(item => {
          conteo[item.producto_id] = item.cantidad_contada;
        });
        
        setConteoFisico(conteo);
      } catch (err) {
        console.error("Error al obtener conteo físico:", err);
      }
    }; 
    const alerta = document.createElement("div");
    alerta.className = "alert alert-success position-fixed";
    alerta.style.top = "20px";
    alerta.style.right = "20px";
    alerta.style.zIndex = 1200;
    alerta.innerText = "Conteo actualizado";

    useEffect(() => {
    fetchConteoFisico();
    const intervalo = setInterval(fetchConteoFisico, 2000); // cada 2 segundos
    return () => clearInterval(intervalo);
  }, []); 
  

  const calcularDiferencia = (id, registrado) => {
  const fisico = parseInt(conteoFisico[id] || 0);
  const reg = parseInt(registrado);
  if (isNaN(fisico) || isNaN(reg)) return "Dato inválido";
  const diferencia = fisico - reg;
  if (diferencia > 0) return `+${diferencia} sobrante`;
  if (diferencia < 0) return `${Math.abs(diferencia)} faltante`;
  return "Correcto";
};


  const handleChangeConteo = (id, value) => {
  const numero = parseInt(value);
  if (!isNaN(numero)) {
    setConteoFisico({ ...conteoFisico, [id]: numero });
  } else {
    setConteoFisico({ ...conteoFisico, [id]: "" });
  }
};


  return (
    <>
    <div className="container-fluid d-flex" style={{ backgroundColor: "#fae1dd", minHeight: "100vh" }}>
      <div className="d-flex flex-column align-items-start p-3" style={{ backgroundColor: "#343a40", color: "white", width: "250px", height: "100vh", position: "fixed", top: 0, left: 0, zIndex: 1000 }}>
        <h3 className="mb-4">Menú</h3>
        <Link to="/dashboard" className="btn btn-primary mb-3 w-100">Dashboard</Link>
        <Link to="/register-product" className="btn btn-success mb-3 w-100">Registrar Producto</Link>
        <Link to="/stock" className="btn btn-dark mb-3 w-100">Stock</Link>
        <Link to="/support" className="btn btn-secondary mb-3 w-100">Soporte</Link>
        {role === "admin" && (
          <>
            <Link to="/reports" className="btn btn-danger mb-3 w-100">Reportes</Link>
            <Link to="/activity-history" className="btn btn-info mb-3 w-100">Historial</Link>
            <Link to="/modify-product" className="btn btn-warning mb-3 w-100">Modificar Producto</Link>
          </>
        )}
        <Link to="/" className="btn btn-danger w-100">Cerrar Sesión</Link>
      </div>

      <div className="d-flex justify-content-center align-items-center"
        style={{
          position: "fixed", top: 0, left: 250, right: 0,
          height: "80px", backgroundColor: "#343a40", color: "white", zIndex: 999
        }}>
        <h2 className="text-center">STOCK DE PRODUCTOS</h2>
      </div>

      <div className="flex-grow-1 p-4" style={{ marginLeft: "250px", marginTop: "120px" }}>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mt-5">
          <h4 className="text-center">Comparación de Stock</h4>
          <table className="table table-bordered mt-3">
            <thead style={{ backgroundColor: "#000", color: "white" }}>
              <tr>
                <th>Nombre</th>
                <th>Cantidad Registrada</th>
                <th>Conteo Físico</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>
                  <td>{producto.cantidad_total}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={conteoFisico[producto.id] || ""}
                      onChange={(e) => handleChangeConteo(producto.id, e.target.value)}
                      disabled  /> 
                  </td>
                  <td>{calcularDiferencia(producto.id, parseInt(producto.cantidad_total))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
     <button
      onClick={fetchConteoFisico}
      className="btn btn-primary"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "30px",
        zIndex: 1100,
        boxShadow: "0px 4px 6px rgba(0,0,0,0.3)"
      }}
    >
      Actualizar Conteo
    </button>
  </>
  );
}

export default StockPage;
