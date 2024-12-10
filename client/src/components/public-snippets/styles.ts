import styled from "styled-components";

export const SnippetListContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;

    h1 {
        margin-bottom: 1rem;
        color: #333;
    }

    p {
        color: #777;
    }
    `;

export const SnippetCard = styled.div`
    border: 1px solid #ddd;
    padding: 1.5rem;
    margin-bottom: 1rem;
    border-radius: 8px;
    background-color: #f9f9f9;
    width: 300px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;