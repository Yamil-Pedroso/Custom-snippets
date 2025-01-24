import styled from "styled-components";

export const UserBenefitsContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  margin: 2rem auto;
  border-radius: 8px;
  position: relative;
  background-color: ${({ theme }) => theme.colors.bgBody};
  gap: 2rem;

    p {
        color: #1b1b1b;
        font-size: 1.5rem;
        font-weight: 400;
        margin-bottom: .7rem;
        padding: 1.5rem;
        background-color: #ffffff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 10rem;
        border-bottom: 2px solid #ff7225;
    }
`;

export const HeaderText = styled.div`
    h2 {
        text-align: center;
        color: #1b1b1b;
        font-size: 2rem;
        margin-bottom: 1rem;
    }
    `;
