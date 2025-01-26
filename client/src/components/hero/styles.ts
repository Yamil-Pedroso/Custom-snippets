import styled, { keyframes } from "styled-components";

// Animaciones
const liftOff = keyframes`
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-15px) scale(1.05);
  }
`;

const takeoffRocket = keyframes`
  0% {
    transform: translate(0, 0); 
  }
  50% {
    transform: translate(12px, -12px); 
  }
  100% {
    transform: translate(0, 0); 
  }
`;

const flyOutViewport = keyframes`
  0% {
    transform: translate(0, 0); 
  }
  100% {
    transform: translate(100vw, -100vh); 
  }
`;

// Estilos del contenedor principal del Hero
export const HeroContainer = styled.div`
  width: 100%;
  height: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("https://img.freepik.com/free-vector/dark-blue-memphis-blog-banner-template_53876-98946.jpg?uid=R30358756&ga=GA1.1.978746274.1729116055&semt=ais_hybrid")
    no-repeat center center;
  background-size: cover;
  color: #fff;

  @media (max-width: 960px) {
    height: 25rem;
  }
`;

// Contenedor del lado izquierdo
export const HeroWrapper = styled.div`
  h1 {
    font-size: 3rem;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  }

  p {
    font-size: 1.2rem;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
    color: #7680e4;
  }

  @media (max-width: 960px) {
    .button-wrapper {
      display: flex;
      justify-content: center;
    }
    h1 {
      font-size: 2.5rem;
      text-align: center;
    }

    p {
      font-size: 1rem;
      text-align: center;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 960px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;

  @media (max-width: 960px) {
    width: 100%;
    padding: 0 1rem;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 1.5rem;
    }

    p {
      font-size: 0.8rem;
    }
  }
`;
// Contenedor de la imagen del cohete
export const RocketImageWrapper = styled.div`
  position: relative;
  animation: ${liftOff} 3s infinite;

  &.takeoffRocket {
    animation: ${takeoffRocket} 0.2s infinite;
  }

  &.flyOutViewPort {
    animation: ${flyOutViewport} 1s forwards;
  }
`;

// Estilo para la imagen del cohete
export const RocketImage = styled.img`
  width: 200px;

  @media (max-width: 960px) {
    width: 150px;
  }
`;

// Estilo para el botón
export const HeroButton = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background-color: #ff7225;
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 4px 0px #7680e4, 0px 8px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 0px #ff944d, 0px 10px 20px rgba(0, 0, 0, 0.3);
    background-color: #ff944d;
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0px 2px 0px #ff944d, 0px 4px 10px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 960px) {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    margin-top: 2rem;
  }
`;
