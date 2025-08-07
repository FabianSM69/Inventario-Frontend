// src/pages/Login.jsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api";
import "../App.css"; // tus estilos generales, incluyendo .login-page, .login-visual, .login-panel, etc.
const carouselImages = [
  "/imagenes/Login1.webp",
  "/imagenes/login1.jpg",
  "/imagenes/logi",
];

function Login() {
  const navigate = useNavigate();
  const [loginValue, setLoginValue] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // índice para el carrusel
  const [idx, setIdx] = useState(0);

  // auto-rotación
  useEffect(() => {
    const iv = setInterval(() => {
      setIdx(i => (i + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(iv);
  }, []);

  // avanzar/retroceder manualmente
  const prevSlide = () =>
    setIdx(i => (i - 1 + carouselImages.length) % carouselImages.length);
  const nextSlide = () =>
    setIdx(i => (i + 1) % carouselImages.length);

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  const loginTrimmed = loginValue.trim();
  const passTrimmed = contrasena.trim();

  if (!loginTrimmed || !passTrimmed) {
    return setError("Por favor, completa ambos campos.");
  }

  const isEmail = /\S+@\S+\.\S+/.test(loginTrimmed);
  const isUsername = /^[a-zA-Z0-9_-]{3,20}$/.test(loginTrimmed);

  if (!isEmail && !isUsername) {
    return setError("Ingresa un nombre de usuario o correo válido.");
  }

  if (passTrimmed.length < 6) {
    return setError("La contraseña es demasiado corta.");
  }

  setLoading(true);
  try {
    const { data } = await axios.post("/login", {
      login: loginTrimmed,
      password: passTrimmed,
    });

   const { token, role, user } = data;

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("user", JSON.stringify(user));

    navigate("/dashboard");
  } catch (err) {
    console.error("❌ Error al iniciar sesión:", err);
    setError("Usuario o contraseña incorrectos o error al procesar los datos.");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="login-page">
      {/* Logo que hace de home-button */}
      <Link to="/home" className="login-logo">
        <img src="/imagenes/Logo.png" alt="Home" />
      </Link>

      {/* Columna izquierda: carrusel de imágenes */}
      <div className="login-visual">
        <span className="arrow prev" onClick={prevSlide}>‹</span>
        <img src={carouselImages[idx]} alt={`Slide ${idx + 1}`} />
        <div className="overlay" />
        <span className="arrow next" onClick={nextSlide}>›</span>

        <div className="dots">
          {carouselImages.map((_, i) => (
            <div
              key={i}
              className={`dot ${i === idx ? "active" : ""}`}
              onClick={() => setIdx(i)}
            />
          ))}
        </div>
      </div>

      {/* Columna derecha: formulario de login */}
      <div className="login-panel">
        <div className="login-card">
          <h1 className="login-title">Iniciar Sesión</h1>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <span className="input-icon">👤</span>
              <input
                type="text"
                placeholder="Usuario o correo"
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                placeholder="Contraseña"
                value={contrasena}
                onChange={e => setContrasena(e.target.value)}
                disabled={loading}
              />
            </div>
            <button className="btn-login" type="submit" disabled={loading}>
              {loading ? "Cargando..." : "Entrar"}
            </button>
          </form>

          <div className="login-links">
            <a onClick={() => navigate("/forgot-password")}>
              ¿Olvidaste tu contraseña?
            </a>
            <span> | </span>
            <a onClick={() => navigate("/register")}>Regístrate</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
