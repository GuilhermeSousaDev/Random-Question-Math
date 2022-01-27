import React from 'react';
import Router from './routes';

import { GlobalStyle } from './style/global';
import { AuthProvider } from './services/Context/AuthContext';

function App() {
    return(
        <AuthProvider> 
            <Router />
            <GlobalStyle />
        </AuthProvider>
    )
}

export default App;