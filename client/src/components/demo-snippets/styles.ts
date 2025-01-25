import styled, { keyframes } from "styled-components";

// Neon border animation (suavizado)
const neonGlow = keyframes`
  0% {
    box-shadow: 0 0 3px #ff7225, 0 0 6px #ff7225, 0 0 12px #ff7225;
  }
  50% {
    box-shadow: 0 0 6px #ff944d, 0 0 12px #ff944d, 0 0 18px #ff944d;
  }
  100% {
    box-shadow: 0 0 3px #ff7225, 0 0 6px #ff7225, 0 0 12px #ff7225;
  }
`;

// Main container
export const DemoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  margin: 2rem auto;
  gap: 3rem;
  background: radial-gradient(circle, #1b1b1b, #0f0f0f);
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  position: relative;
  max-width: 1200px;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

// Neon effect container for video (con menos intensidad)
export const NeonBorder = styled.div`
  border: 3px solid transparent;
  border-radius: 12px;
  animation: ${neonGlow} 2s infinite alternate;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(90deg, rgba(255, 114, 37, 0.2), rgba(255, 148, 77, 0.15));
`;

export const VideoContainer = styled.div`
  width: 60%;
  max-width: 800px;
  margin: 2rem 0;
  height: auto;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

// Header text
export const HeaderText = styled.div`
   margin-top: 2rem;
  text-align: center;

  h2 {
    font-size: 2rem;
    color: #ff7225;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.2rem;
    color: #9d9d9d;
    line-height: 1.5;
    font-weight: 400;
  }
  @media (max-width: 768px) {
    text-align: center;
  }
`;
