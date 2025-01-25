import styled from "styled-components";

export const FeaturesContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.bgBody};

  h2 {
    font-size: 2.5rem;
    color: #1b1b1b;
    font-weight: bold;
    margin-bottom: 2rem;
    text-align: center;
  }
`;

export const FeaturesWrapper = styled.div`
  width: 70rem;
  display: flex;
  justify-content: space-around;
  align-items: flex-start; /* Ajuste para que los textos se alineen bien */
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 2rem;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 3rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Feature = styled.div`
  width: 14rem;
  min-height: 16rem;
  border-radius: 2rem;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  text-align: center;

  p {
    font-size: 1.2rem;
    color: #3c3c3c;
    margin-top: 1rem;
    line-height: 1.5;
    font-weight: 400;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  div {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    background-color: #ff7225;
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
      width: 2.5rem;
      height: 2.5rem;
      color: #fff;
    }
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
`;
