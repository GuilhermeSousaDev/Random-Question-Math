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
        font-family: 'Spline Sans', sans-serif;
        letter-spacing: 1px;
    }

    #root {
        max-width: 1120px;
        margin: 0 auto;
        
    }
`;
