import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaGitlab, FaBitbucket, FaGoogle } from 'react-icons/fa';

// Estilos
const Section = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  background-color: #f9f9f9;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #666;
`;

const IntegrationsList = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

const IntegrationCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 150px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const IntegrationIcon = styled(motion.div)<{ hoverColor: string }>`
  font-size: 3rem; /* Tamaño del ícono */
  margin-bottom: 0.5rem;
  color: #333; /* Color inicial */

  &:hover {
    color: ${({ hoverColor }) => hoverColor}; /* Toma el color característico al hacer hover */
    transition: color 0.3s ease; /* Transición suave */
  }
`;

const IntegrationName = styled.p`
  font-size: 1rem;
  color: #333;
`;

const Integrations: React.FC = () => {
  // Lista de integraciones con componentes React para los íconos y colores característicos
  const integrations = [
    { name: 'GitHub', icon: FaGithub, color: '#181717' }, // Negro GitHub
    { name: 'GitLab', icon: FaGitlab, color: '#fc6d26' }, // Naranja GitLab
    { name: 'Bitbucket', icon: FaBitbucket, color: '#0052cc' }, // Azul Bitbucket
    { name: 'Google', icon: FaGoogle, color: '#4285f4' }, // Azul Google
  ];

  return (
    <Section>
      <Title>Integrations</Title>
      <Subtitle>Connect with your favorite tools to enhance your experience.</Subtitle>
      <IntegrationsList>
        {integrations.map((integration, index) => (
          <IntegrationCard key={index}>
            {/* Ícono animado con colores personalizados */}
            <IntegrationIcon
              as={motion.div}
              hoverColor={integration.color} // Color para hover
              initial={{ color: '#333' }} // Color inicial
              whileInView={{
                color: [integration.color], // Cambia al color de la app y regresa al gris
              }}
              viewport={{ once: false }}
              transition={{
                duration: 1.5, // Duración total del ciclo
                delay: index * 0.3, // Retraso para animar secuencialmente
              }}
            >
              <integration.icon />
            </IntegrationIcon>
            <IntegrationName>{integration.name}</IntegrationName>
          </IntegrationCard>
        ))}
      </IntegrationsList>
    </Section>
  );
};

export default Integrations;
