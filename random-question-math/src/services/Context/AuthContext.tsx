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
        avatar: string;
    }
    token: string | null;
    isAuth: boolean;
    handleLogout: () =>void;
}

interface IUser {
    id: string;
    name: string;
    avatar: string;
}

interface IRequest {
    token: string;
    tokenVerified: IUser;
}

//default value
const AuthContext = createContext<IAuth>({
    user: {
        id: '',
        name: '',
        avatar: '',
    },
    token: '',
    isAuth: false,
    handleLogout: () => false,
});

const AuthProvider: FC = ({ children }) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | undefined>();
    const [token, setToken] = useState<string | null>(null);

    const handleLogout = () => {
        setIsAuth(false);
        setUser(undefined);
        setToken(null);
        localStorage.removeItem('token');
    };

    useEffect(() => {
        if(localStorage.getItem('token')) {
            setTimeout(async () => {
                    const { data, status } = await api.get<IRequest>('/token', {
                        headers: {
                            Authorization: localStorage.getItem('token') as string
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
                            avatar: data.tokenVerified.avatar? data.tokenVerified.avatar : ''
                        });
                        setToken(data.token);
                    }
            }, 500)
        } 
    }, [token]);

    return(
        <AuthContext.Provider value={{ token, isAuth, user, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };
