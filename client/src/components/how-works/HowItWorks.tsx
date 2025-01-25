import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Estilos
const Section = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  background-color: #f9f9f9;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #ff7225;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 3rem;
  color: #666;
`;

const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 42rem;
  margin: 0 auto;
`;

const Step = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  text-align: left;
  padding: 1.5rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  }
`;

const StepNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  color: #ff7225;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(255, 114, 37, 0.4);
`;

const StepContent = styled.div`
  font-size: 1rem;
  color: #666;

  strong {
    font-size: 1.2rem;
    color: #333;
  }

  span {
    display: block;
  }
`;

const HowItWorks: React.FC = () => {
  const stepVariants = {
    hidden: { opacity: 0, y: 20 }, // Estado inicial
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2, // Retraso secuencial
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <Section>
      <Title>How It Works</Title>
      <Subtitle>
        Follow these simple steps to start using our app and save time managing
        your code snippets.
      </Subtitle>
      <StepsContainer>
        {[
          {
            number: 1,
            title: 'Sign Up or Log In:',
            content: 'Create your account in just a few seconds or log in with your preferred method.',
          },
          {
            number: 2,
            title: 'Create and Organize Snippets:',
            content: 'Add snippets to your collection and organize them by categories or tags.',
          },
          {
            number: 3,
            title: 'Search and Edit:',
            content: 'Use the search bar to quickly find snippets or edit existing ones with ease.',
          },
          {
            number: 4,
            title: 'Share with Your Team:',
            content: 'Share your snippets with colleagues or teams for better collaboration.',
          },
        ].map((step, index) => (
          <Step
            key={step.number}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={stepVariants}
          >
            <StepNumber>{step.number}</StepNumber>
            <StepContent>
              <strong>{step.title}</strong> <span>{step.content}</span>
            </StepContent>
          </Step>
        ))}
      </StepsContainer>
    </Section>
  );
};

export default HowItWorks;
