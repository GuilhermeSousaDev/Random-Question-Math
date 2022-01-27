import React, { 
    createContext, 
    FC,
    useContext
} from 'react';

interface IAuth {
    user: {
        id: string;
        name: string;
    }
    token: string;
}

const AuthContext = createContext<IAuth | null>(null);

const AuthProvider: FC = ({ children }) => {

    const { token, user } = useContext(AuthContext);

    return(
        <AuthContext.Provider value={{user, token}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };
