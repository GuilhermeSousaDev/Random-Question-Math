import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: #343a40;
    }

    body, textarea {
        font-family: 'Bebas Neue', cursive;
        letter-spacing: 1px;
    }
    button, p {
        font-family: 'Spline Sans', sans-serif;
    }

    #root {
        max-width: 1120px;
        margin: 0 auto;
        
    }
`;
