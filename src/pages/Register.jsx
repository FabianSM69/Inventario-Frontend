// src/pages/Register.jsx

import React, { useState } from "react";
import axios from '../api';
import { useNavigate } from "react-router-dom";

function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { label: "Débil", color: "red", width: "33%" };
  if (score <= 4) return { label: "Normal", color: "orange", width: "66%" };
  return { label: "Fuerte", color: "green", width: "100%" };
}

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    ownerName: "",
    phone: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const strength = getPasswordStrength(form.password);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleRegister = async e => {
  e.preventDefault();
  setError("");
  setSuccess("");

  const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
  const ownerNameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,40}$/;

  const username = form.username.trim();
  const email = form.email.trim();
  const ownerName = form.ownerName.trim();
  const phone = form.phone.trim();
  const password = form.password;

  if (!username) return setError("Ingresa un nombre de usuario.");
  if (!usernameRegex.test(username))
    return setError("El nombre de usuario solo puede contener letras, números, guiones y guión bajo (3-20 caracteres).");

  if (!email || !/\S+@\S+\.\S+/.test(email))
    return setError("Ingresa un correo válido.");

  if (!ownerName) return setError("Ingresa el nombre del dueño.");
  if (!ownerNameRegex.test(ownerName))
    return setError("El nombre del dueño solo puede contener letras y espacios.");

  if (!phone || !/^\d{7,15}$/.test(phone))
    return setError("Ingresa un número de teléfono válido (7-15 dígitos).");

  if (!password || password.length < 6)
    return setError("La contraseña debe tener al menos 6 caracteres.");

  try {
    const { data } = await axios.post('/register', {
      username,
      email,
      ownerName,
      phone,
      password
    });

    setSuccess(data.message || "Usuario registrado correctamente.");
    setForm({ username: "", email: "", ownerName: "", phone: "", password: "" });
  } catch (err) {
    console.error(err);
    setError(
      err.response?.data?.message || "Error al registrar usuario. Inténtalo más tarde."
    );
  }
};


  return (
    <div 
      className="d-flex justify-content-center align-items-center" 
      style={{ minHeight: '100vh' }}
    >
      <div className="card shadow-lg p-4" style={{ width: '400px', borderRadius: '15px' }}>
        <h2 className="text-center mb-4">Registrar Usuario</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleRegister} noValidate>
          <div className="mb-3">
            <label className="form-label">Nombre de Usuario</label>
            <input
              name="username"
              type="text"
              className="form-control"
              value={form.username}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input
              name="email"
              type="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Nombre del Dueño</label>
            <input
              name="ownerName"
              type="text"
              className="form-control"
              value={form.ownerName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Teléfono</label>
            <input
              name="phone"
              type="tel"
              className="form-control"
              value={form.phone}
              onChange={handleChange}
              placeholder="Solo dígitos"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              name="password"
              type="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
            />

            {/* Barra de fortaleza */}
            {form.password && (
              <div className="mt-2">
                <div style={{ height: "8px", background: "#ddd", borderRadius: "4px" }}>
                  <div
                    style={{
                      height: "100%",
                      width: strength.width,
                      backgroundColor: strength.color,
                      borderRadius: "4px",
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
                <small style={{ color: strength.color }}>{strength.label}</small>
              </div>
            )}
          </div>


          <button type="submit" className="btn btn-primary w-100 py-2 mt-3">
            Registrar
          </button>
        </form>

        <div className="mt-3 text-center">
          <button 
            onClick={() => navigate('/login')} 
            className="btn btn-link text-muted"
          >
            ¿Ya tienes una cuenta? Inicia sesión aquí
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
