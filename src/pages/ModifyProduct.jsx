import React, { useState, useEffect } from "react";
import axios from '../api';
import { Link } from "react-router-dom";
function ModifyProduct() {
  const [productos, setProductos] = useState([]);
  const [selectedProducto, setSelectedProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [error, setError] = useState("");

  // Cargar los productos desde la API
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getproductos");
        setProductos(response.data);  // Asumiendo que el backend retorna un array de productos
      } catch (err) {
        console.error("Error al obtener productos:", err);
        setError("No se pudo cargar los productos.");
      }
    };

    fetchProductos();
  }, []);

  const handleModify = async (e) => {
    e.preventDefault();

    if (!selectedProducto || !cantidad || !precio) {
      setError("Por favor, llena todos los campos.");
      return;
    }

    try {
      const response = await axios.put("http://localhost:5000/modifyproduct", {
        id: selectedProducto,
        cantidad,
        precio,
      });

      alert("Producto modificado exitosamente.");
    } catch (err) {
      setError("Error al modificar el producto.");
      console.error("Error al modificar producto:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/deleteproduct/${id}`);
      alert("Producto eliminado exitosamente.");
      setProductos(productos.filter(producto => producto.id !== id));  // Actualizar la lista de productos
    } catch (err) {
      setError("Error al eliminar el producto.");
      console.error("Error al eliminar producto:", err);
    }
  };

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
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
      >
        <h3 className="mb-4">Menú</h3>
        <Link to="/dashboard" className="btn btn-primary mb-3 w-100">Dashboard</Link>
        <Link to="/register-product" className="btn btn-success mb-3 w-100">Registrar Producto</Link>
        <Link to="/reports" className="btn btn-danger mb-3 w-100">Reportes</Link>
        <Link to="/activity-history" className="btn btn-info mb-3 w-100">Historial</Link>
        <Link to="/support" className="btn btn-secondary mb-3 w-100">Soporte</Link>
                <Link to="/stock" className="btn btn-dark mb-3 w-100">Stock</Link>
        <Link to="/" className="btn btn-danger w-100">Cerrar Sesión</Link>
      </div>

      {/* Barra superior con el texto "MODIFICAR PRODUCTO" */}
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
        <h2 className="text-center">MODIFICAR PRODUCTO</h2>
      </div>

      {/* Contenido principal */}
      <div className="flex-grow-1 p-4" style={{ marginLeft: "250px", marginTop: "120px" }}> 
        <form onSubmit={handleModify} className="w-75 mx-auto p-4 shadow-lg rounded-lg bg-[#e2d4b7]">
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Selección de producto */}
          <div className="mb-3">
            <label className="form-label text-dark">Seleccionar Producto</label>
            <select
              className="form-select rounded-lg p-3"
              value={selectedProducto}
              onChange={(e) => setSelectedProducto(e.target.value)}
            >
              <option value="">Seleccione un producto</option>
              {productos.map((producto) => (
                <option key={producto.id} value={producto.id}>
                  {producto.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Nueva cantidad */}
          <div className="mb-3">
            <label className="form-label text-dark">Nueva Cantidad</label>
            <input
              type="number"
              className="form-control rounded-lg p-3"
              placeholder="Ingrese la nueva cantidad"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
          </div>

          {/* Nuevo costo */}
          <div className="mb-3">
            <label className="form-label text-dark">Nuevo Costo</label>
            <input
              type="number"
              className="form-control rounded-lg p-3"
              placeholder="Ingrese el nuevo costo"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </div>

          <button className="btn btn-warning w-100 py-3 rounded-lg shadow-md">
            Modificar
          </button>
        </form>

        {/* Lista de productos con botón de eliminación */}
        <div className="mt-5">
          <h4 className="text-center">Lista de Productos</h4>
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Costo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>
                  <td>{producto.cantidad}</td>
                  <td>{producto.precio}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(producto.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ModifyProduct;
