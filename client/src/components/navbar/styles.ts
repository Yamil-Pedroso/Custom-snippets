import styled from "styled-components";
import { Link } from "react-router-dom";

// Estilos para el contenedor principal del Navbar (Desktop)
export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #2d3133;
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  @media (max-width: 960px) {
    display: none;
  }
`;

// Estilos para el contenedor del logo
export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    width: 50px;
    height: auto;

    @media (max-width: 768px) {
      width: 45px;
    }

    @media (max-width: 480px) {
      width: 40px;
    }
  }

  h2 {
    color: #ff7225;
    font-size: 1.8rem;
    font-weight: bold;

    @media (max-width: 768px) {
      font-size: 1.6rem;
    }

    @media (max-width: 480px) {
      font-size: 1.5rem;
    }
  }
`;

// Estilos para los enlaces de navegación
export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 960px) {
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

// Estilos individuales para los enlaces
export const NavItem = styled(Link)<{ active: boolean }>`
  text-decoration: none;
  color: ${({ active }) => (active ? "#ff7225" : "#fff")};
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: #ff944d;
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

// Estilos para el contenedor del User Menu
export const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 960px) {
    gap: 0.8rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  @media (max-width: 480px) {
    gap: 0.3rem;
  }

  h3 {
    font-size: 1rem;
    font-weight: 400;

    span {
      color: #ff7225;
      font-weight: bold;
    }

    @media (max-width: 768px) {
      font-size: 0.95rem;
    }

    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
  }
`;

// Estilos para el avatar del usuario
export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    @media (max-width: 768px) {
      width: 35px;
      height: 35px;
    }

    @media (max-width: 480px) {
      width: 30px;
      height: 30px;
    }
  }
`;

// Estilos para el botón de Logout
export const LogoutButton = styled.button`
  background-color: #ff7225;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff944d;
  }

  @media (max-width: 960px) {
    padding: 0.4rem 0.9rem;
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 0.3rem 0.7rem;
    font-size: 0.85rem;
  }
`;

// Estilos para el Navbar en Mobile
export const NavbarMobileContainer = styled.div`
  display: none;

  @media (max-width: 960px) {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #2d3133;
    color: #fff;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
`;

// Estilos para el wrapper del icono del menú en mobile
export const MenuWrapper = styled.div`
  cursor: pointer;
`;

// Estilos para el menú desplegable en mobile
export const BoxItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  position: absolute;
  top: 4rem;
  left: 0;
  background-color: #2d3133;
  z-index: 1000;
  transition: transform 0.3s;
`;

export const UserMenuContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 960px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

// Contenedor del avatar del usuario
export const AvatarContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Estilo del texto del nombre de usuario
export const UsernameText = styled.h3`
  font-size: 1rem;
  font-weight: 400;

  span {
    color: #ff7225;
    font-weight: bold;
  }
`;


