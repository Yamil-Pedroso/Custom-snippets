import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

import {
  UserMenuContainer,
  AvatarContainer,
  UsernameText,
  LogoutButton,
} from "./styles";

interface IUserMenuProps {
  isAuthenticated: boolean;
  currentUser: { isAdmin: boolean; username: string; avatar: string } | null;
  handleLogout: () => void;
  getLinkStyle?: (path: string) => React.CSSProperties;
}

const UserMenu: React.FC<IUserMenuProps> = ({
  isAuthenticated,
  currentUser,
  handleLogout,
  getLinkStyle = () => ({}),
}) => {
  return isAuthenticated ? (
    <UserMenuContainer>
      <AvatarContainer>
        {currentUser?.avatar ? (
          <img src={currentUser.avatar} alt="User avatar" />
        ) : (
          <FaUser style={{ color: "#ff7225" }} size={24} />
        )}
      </AvatarContainer>

      <UsernameText>
        {currentUser?.isAdmin ? "Admin" : "User"} :{" "}
        <span>{currentUser?.username}</span>
      </UsernameText>

      <Link to="/profile" style={getLinkStyle("/profile")}>
        Profile
      </Link>
      <Link to="/dashboard" style={getLinkStyle("/dashboard")}>
        Dashboard
      </Link>
      {currentUser?.isAdmin && (
        <Link to="/user-management" style={getLinkStyle("/user-management")}>
          Admin Panel
        </Link>
      )}

      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </UserMenuContainer>
  ) : (
    <UserMenuContainer>
      <FaUser style={{ color: "#ff7225" }} size={24} />

      <Link to="/register" style={{ color: "#fff", textDecoration: "none" }}>
        Register
      </Link>
      <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>
        Login
      </Link>
    </UserMenuContainer>
  );
};

export default UserMenu;
