import styled from "styled-components";

export const HeroContainer = styled.div`
  width: 100%;
  height: 50rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.bgBody};
`;

export const HeroContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
`;

export const HeroLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 2rem;
  width: 50%;
  height: 50vh;

  h1 {
    color: #333;
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  p {
    color: #333;
    margin-bottom: 1rem;
    font-size: 1.3rem;
    font-weight: bold;
  }

  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    background-color: #ff7225;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
  }
`;

export const HeroRight = styled.div`
  width: 40%;
  height: 40rem;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px solid #333333;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  img {
    height: 90%;
    object-fit: cover;

  }

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;
