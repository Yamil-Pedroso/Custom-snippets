import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: 'Arial', sans-serif;
        background-color: ${({ theme }) => theme.colors.bgBody};
        color: ${({ theme }) => theme.text.secondary};
    }
`;
