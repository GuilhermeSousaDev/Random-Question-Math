import React, { 
    createContext, 
    FC,
    useEffect,
    useState
} from 'react';

interface IAuth {
    user?: {
        id: string;
        name: string;
    }
    token: string | null;
    isAuth: boolean;
}

const AuthContext = createContext<IAuth>({
    user: {
        id: '',
        name: '',
    },
    token: '',
    isAuth: false,
});

const AuthProvider: FC = ({ children }) => {

    const [token, setToken] = useState<string | null>('');
    const [isAuth, setIsAuth] = useState<boolean>(false);

    useEffect(() => {
        if(localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            setIsAuth(true);
        }
    }, []);

    return(
        <AuthContext.Provider value={{ token, isAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };
