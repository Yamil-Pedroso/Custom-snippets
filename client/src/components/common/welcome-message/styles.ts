import styled from "styled-components";

export const WelcomeMessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: #f5f5f5;
    width: 21rem;
    height: 12rem;
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 0 0 3rem 1px rgba(0, 0, 0, 0.1);
    z-index: 999;

    h2 {
        font-size: 20px;
        color: #0D0C22;
    }

    p {
        font-size: 16px;
        color: #0D0C22;
    }
`;

export const BtnWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 1rem;

    button {
        padding: 0.5rem 1rem;
        background-color: #0D0C22;
        color: #fff;
        border: none;
        border-radius: 3rem;
        cursor: pointer;
    }
`;
