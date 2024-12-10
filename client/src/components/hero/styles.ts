import styled from "styled-components";

export const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeroContent = styled.div`
  width: 100%;
  display: flex;
`;

export const HeroLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 2rem;
  width: 50%;
  height: 50vh;
  background-color: #39444d;

  h1 {
    color: #fff;
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    color: #ccc;
    margin-bottom: 1rem;
  }

  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    background-color: #f9f9f9;
    color: #333;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
  }
`;

export const HeroRight = styled.div`
  width: 50%;
  height: 50vh;
  background-color: #18191a;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;
