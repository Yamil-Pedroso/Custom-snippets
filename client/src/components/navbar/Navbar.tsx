import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { NavbarContainer } from "./styles";
import NavbarMobile from "./NavbarMobile";
import UserMenu from "./UserMenu";
import { useUserContext } from "../../context/userContext";
import { logoutUser } from "../../services/UserService";

const Navbar: React.FC = () => {
  const { currentUser, setCurrentUser } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = currentUser !== null;

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("authToken");
      setCurrentUser(null);
      toast.success("Logged out successfully", {
        className: "toast",
      });
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const getLinkStyle = (path: string) => ({
    color: location.pathname === path ? "#ff7225" : "#fff",
    textDecoration: "none",
  });

  return (
    <>
      <NavbarMobile
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
        getLinkStyle={getLinkStyle}
        currentUser={currentUser}
      />
      <NavbarContainer>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          <h2>SNIPPETS</h2>
        </Link>

        <UserMenu
          isAuthenticated={isAuthenticated}
          currentUser={currentUser}
          handleLogout={handleLogout}
          getLinkStyle={getLinkStyle}
        />
      </NavbarContainer>
    </>
  );
};

export default Navbar;
