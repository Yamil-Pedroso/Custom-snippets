import React from 'react';
import styled from 'styled-components';

// Estilos
const Section = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  background-color: #f9f9f9;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  margin-bottom: 3rem;
  color: #666;
`;

const PlansContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

const PlanCard = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 280px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const PlanTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #ff7225;
`;

const PlanPrice = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
`;

const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  text-align: left;
`;

const PlanFeature = styled.li`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #555;

  &::before {
    content: '✓';
    color: #007bff;
    margin-right: 0.5rem;
  }
`;

const Button = styled.button`
  background-color: #ff7225;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

// Componente principal
const PricingPlans: React.FC = () => {
  const plans = [
    {
      title: 'Basic',
      price: '$0/month',
      features: ['1 Project', 'Basic Support', 'Limited Features'],
    },
    {
      title: 'Pro',
      price: '$10/month',
      features: ['10 Projects', 'Priority Support', 'Advanced Features'],
    },
    {
      title: 'Enterprise',
      price: 'Custom Pricing',
      features: ['Unlimited Projects', 'Dedicated Support', 'All Features'],
    },
  ];

  return (
    <Section>
      <Title>Pricing Plans</Title>
      <Subtitle>Choose the plan that works best for you.</Subtitle>
      <PlansContainer>
        {plans.map((plan, index) => (
          <PlanCard key={index}>
            <PlanTitle>{plan.title}</PlanTitle>
            <PlanPrice>{plan.price}</PlanPrice>
            <PlanFeatures>
              {plan.features.map((feature, featureIndex) => (
                <PlanFeature key={featureIndex}>{feature}</PlanFeature>
              ))}
            </PlanFeatures>
            <Button>Choose Plan</Button>
          </PlanCard>
        ))}
      </PlansContainer>
    </Section>
  );
};

export default PricingPlans;
