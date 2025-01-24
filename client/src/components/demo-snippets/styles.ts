import styled from 'styled-components';

export const DemoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    margin: 2rem auto;
    border-radius: 8px;
    position: relative;
    background-color: ${({ theme }) => theme.colors.bgBody};
    gap: 2rem;

`;


export const HeaderText = styled.div`

    h2 {
        color: #1b1b1b;
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    h3 {
        color: #9a9a9a;
        font-size: 1.5rem;
        font-weight: 400;
        margin-bottom: .7rem;
    }

`;
