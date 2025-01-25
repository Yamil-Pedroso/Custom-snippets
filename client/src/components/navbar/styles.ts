import styled from "styled-components";
import { Link } from "react-router-dom";

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
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    width: 50px;
    height: auto;
  }

  h2 {
    color: #ff7225;
    font-size: 1.8rem;
    font-weight: bold;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const NavItem = styled(Link)<{ active: boolean }>`
  text-decoration: none;
  color: ${({ active }) => (active ? "#ff7225" : "#fff")};
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: #ff944d;
  }
`;

export const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  h3 {
    font-size: 1rem;
    font-weight: 400;

    span {
      color: #ff7225;
      font-weight: bold;
    }
  }
`;

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
  }
`;

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
`;
