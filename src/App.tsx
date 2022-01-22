import React from 'react';
import Router from './routes';

import { GlobalStyle } from './style/global';


function App() {
    return(
        <> 
            <Router />
            <GlobalStyle />
        </>
    )
}

export default App;