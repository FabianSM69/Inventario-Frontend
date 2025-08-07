import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../api";
import "../App.css";

function Profile() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return window.location.replace("/login");

    axios
      .get("/user/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.clear();
        window.location.replace("/login");
      });
  }, []);

  const handleFileChange = (e) => {
    setError("");
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return setError("Selecciona primero un archivo.");
    setUploading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const form = new FormData();
      form.append("profilePhoto", file);
      const res = await axios.post("/user/me/photo", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setUser((u) => ({ ...u, photoUrl: res.data.photoUrl }));
      setFile(null);
    } catch {
      setError("Error al subir la foto. Inténtalo de nuevo.");
    } finally {
      setUploading(false);
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    setActionError("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setActionError("No se pudieron cargar usuarios.");
    } finally {
      setLoadingUsers(false);
    }
  };

  const toggleAdminPanel = () => {
    setShowAdminPanel((sh) => !sh);
    if (!showAdminPanel) fetchUsers();
  };

  const changeRole = async (id, newRole) => {
    setActionError("");
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/admin/users/${id}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers((us) => us.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
    } catch {
      setActionError("Error al cambiar rol.");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("¿Eliminar este usuario?")) return;
    setActionError("");
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((us) => us.filter((u) => u.id !== id));
    } catch {
      setActionError("Error al eliminar usuario.");
    }
  };

  if (!user) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status" />
        <p>Cargando perfil…</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="profile-card">
        <div className="text-center">
          <img
            src={user.photoUrl || "/imagenes/default-user.png"}
            alt="Perfil"
            className="profile-avatar"
          />
          <h4 className="profile-username">{user.username}</h4>
        </div>

        <div className="profile-info mt-4">
          <p><strong><i className="bi bi-envelope-at-fill"></i> Correo:</strong> {user.email || "No especificado"}</p>
          <p><strong><i className="bi bi-person-badge-fill"></i> Dueño:</strong> {user.ownerName || "No especificado"}</p>
          <p><strong><i className="bi bi-telephone-fill"></i> Teléfono:</strong> {user.phone || "No especificado"}</p>
        </div>

        <hr className="profile-divider" />

        <h5>Actualizar foto de perfil</h5>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="input-group mb-3">
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleFileChange}
          />
          <button
            className="btn btn-primary"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Subiendo…" : "Subir foto"}
          </button>
        </div>

        {user.role === "superadmin" && (
          <>
            <button
              className="admin-btn mb-3"
              onClick={toggleAdminPanel}
            >
              {showAdminPanel ? "Ocultar Usuarios" : "Administrar Usuarios"}
            </button>

            {showAdminPanel && (
              <div className="admin-panel card bg-light p-3">
                {actionError && (
                  <div className="alert alert-danger">{actionError}</div>
                )}
                {loadingUsers ? (
                  <p>Cargando usuarios…</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-sm table-bordered">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Usuario</th>
                          <th>Correo</th>
                          <th>Rol</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u) => (
                          <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.username}</td>
                            <td>{u.email}</td>
                            <td>
                              <select
                                className="form-select form-select-sm"
                                value={u.role}
                                onChange={(e) => changeRole(u.id, e.target.value)}
                              >
                                <option value="user">user</option>
                                <option value="admin">admin</option>
                                <option value="superadmin">superadmin</option>
                              </select>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => deleteUser(u.id)}
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
