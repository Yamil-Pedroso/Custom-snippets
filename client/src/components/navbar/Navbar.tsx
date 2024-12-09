import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import { logoutUser } from "../../services/UserService";

const Navbar: React.FC = () => {
  const { currentUser, setCurrentUser } = useUserContext(); // Obtenemos el usuario actual del contexto
  const navigate = useNavigate();

  const isAuthenticated = currentUser !== null;

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("authToken"); // Eliminar token del localStorage
      setCurrentUser(null); // Limpiar el contexto del usuario
      navigate("/login"); // Redirigir al login
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#333",
        color: "#fff",
      }}
    >
      <h1>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          Snippet App
        </Link>
      </h1>

      {isAuthenticated ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <h3>
            {currentUser?.isAdmin ? "Admin" : "User"}: {currentUser?.username}
          </h3>
          <Link to="/profile" style={{ color: "#fff", textDecoration: "none" }}>
            Profile
          </Link>
          <Link to="/dashboard" style={{ color: "#fff", textDecoration: "none" }}>
            Dashboard
          </Link>
          {currentUser?.isAdmin && (
            <Link
              to="/user-management"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Admin Panel
            </Link>
          )}
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#f00",
              color: "#fff",
              border: "none",
              padding: "0.5rem 1rem",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <Link to="/register" style={{ color: "#fff", textDecoration: "none" }}>
            Register
          </Link>
          <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
