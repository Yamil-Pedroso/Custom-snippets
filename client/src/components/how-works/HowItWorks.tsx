import React from 'react';
import styled from 'styled-components';

// Estilos
const Section = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  background-color: #f9f9f9;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #ff7225;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #666;
`;

const StepsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Step = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  text-align: left;
`;

const StepNumber = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff7225;
`;

const StepContent = styled.div`
  font-size: 1rem;
`;

const HowItWorks: React.FC = () => {
  return (
    <Section>
      <Title>How It Works</Title>
      <Subtitle>Follow these simple steps to start using our app and save time managing your code snippets.</Subtitle>
      <StepsContainer>
        <Step>
          <StepNumber>1.</StepNumber>
          <StepContent>
            <strong>Sign Up or Log In:</strong> Create your account in just a few seconds or log in with your preferred method.
          </StepContent>
        </Step>
        <Step>
          <StepNumber>2.</StepNumber>
          <StepContent>
            <strong>Create and Organize Snippets:</strong> Add snippets to your collection and organize them by categories or tags.
          </StepContent>
        </Step>
        <Step>
          <StepNumber>3.</StepNumber>
          <StepContent>
            <strong>Search and Edit:</strong> Use the search bar to quickly find snippets or edit existing ones with ease.
          </StepContent>
        </Step>
        <Step>
          <StepNumber>4.</StepNumber>
          <StepContent>
            <strong>Share with Your Team:</strong> Share your snippets with colleagues or teams for better collaboration.
          </StepContent>
        </Step>
      </StepsContainer>
    </Section>
  );
};

export default HowItWorks;
