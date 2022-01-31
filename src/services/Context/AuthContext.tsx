import React, { 
    createContext, 
    FC,
    useEffect,
    useState
} from 'react';
import api from '../axios';

interface IAuth {
    user?: {
        id: string;
        name: string;
    }
    token: string | null;
    isAuth: boolean;
}

interface IUser {
    id: string;
    name: string;
}

interface IRequest {
    token: string;
    tokenVerified: IUser;
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

    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<IUser>();
    const [isAuth, setIsAuth] = useState<boolean>(false);

    useEffect(() => {
        if(localStorage.getItem('token')) {
            setTimeout(async () => {
                    const { data, status } = await api.get<IRequest>('/token', {
                        headers: {
                            Authorization: localStorage.getItem('token') as any
                        }
                    })
    
                    if(status !== 200) {
                        localStorage.removeItem('token');
                        setToken(null);
                        setIsAuth(false);
                    } else {
                        setIsAuth(true);
                        setUser({ 
                            id: data.tokenVerified.id,
                            name: data.tokenVerified.name,
                        })
                        setToken(data.token);
                    }
            }, 500)
        } 
    }, [token]);

    return(
        <AuthContext.Provider value={{ token, isAuth, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };
