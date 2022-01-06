import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body, input, textarea {
        font-family: 'Bebas Neue', cursive;
    }
    button, span {
        font-family: 'Spline Sans', sans-serif;
    }

    #root {
        max-width: 1120px;
        margin: 0 auto;
    }
`;
