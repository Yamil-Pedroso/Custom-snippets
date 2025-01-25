import styled, { keyframes } from "styled-components";

// Animación para el cohete (movimiento hacia arriba y abajo)
const liftOff = keyframes`
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-15px) scale(1.05);
  }
`;

// Contenedor principal del Hero
export const HeroContainer = styled.div`
  width: 100%;
  height: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: url("https://img.freepik.com/free-vector/dark-blue-memphis-blog-banner-template_53876-98946.jpg?uid=R30358756&ga=GA1.1.978746274.1729116055&semt=ais_hybrid")
    no-repeat center center;
  background-size: cover;
  color: #fff;
`;

// Contenido del Hero
export const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 2; /* Para asegurarse de que el texto esté por encima del fondo */
  padding: 2rem;
  max-width: 800px;
`;

// Texto del lado izquierdo
export const HeroLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  h1 {
    font-size: 3rem;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); /* Sombra para destacar */
  }

  p {
    font-size: 1.2rem;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7); /* Sombra para destacar */
  }
`;

// Imagen del cohete con animación
export const RocketImage = styled.img`
  animation: ${liftOff} 2.5s infinite ease-in-out;
`;

// Botón animado
export const HeroButton = styled.button`
  margin-top: 0rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background-color: #ff7225;
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 4px 0px #6a458d, 0px 8px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 0px #ff7225, 0px 10px 20px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0px 2px 0px #ff7225, 0px 4px 10px rgba(0, 0, 0, 0.2);
  }
`;
