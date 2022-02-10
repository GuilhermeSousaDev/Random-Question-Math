import React, { 
    FC,
    useState,
    useEffect,
    useContext,
    useCallback,
    ChangeEvent,
} from 'react';
import api from '../../services/axios';
import { Container, Response, Title } from '../../style/globalStyle';
import { Button, List } from '../Profile/style';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../services/Context/AuthContext';

interface IUser {
    id: string
    name: string;
    email: string;
    password: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
}

interface IForm {
    [key: string]: string;
}

const EditProfile: FC = () => {
    const { id } = useParams();
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const [userData, setUserData] = useState<IUser | null>(null);
    const [form, setForm] = useState<IForm>();
    const [msg, setMsg] = useState<string>('');

    useEffect(() => {
        (async () => {
            const request_user = await api.get<IUser>(`/user/${id}`);

            setUserData(request_user.data);
        })();
    }, [id]);

    const changeData = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const getFormData = async () => {
        const { data } = await api.put('/profile', form, {
            headers: {
                Authorization: token as string,
            },
        });

        if(data.id) {
            navigate('/perfil');
        } else {
            setMsg(data);
        }
    }

    return(
        <Container>
            <Title> Edit Perfil <hr /> <p>{userData?.name}</p> </Title>
            <List>
                {msg? 
                    <Response color={'#dc3545'} >{msg}</Response> 
                    : ''
                }
                <br />
                {userData?  
                    <>
                        <p>Name: </p>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder={userData.name}
                            onChange={changeData}
                        />
                        <p>Email: </p>
                        <input 
                            type="text" 
                            name="email"
                            placeholder={userData.email}  
                            onChange={changeData}
                        />
                        <p>Senha Antiga: </p>
                        <input 
                            type="password" 
                            name='old_password' 
                            onChange={changeData}
                        />
                        <p>Nova Senha: </p>
                        <input 
                            type="text" 
                            name="password" 
                            onChange={changeData}
                        />
                        <p>Confirmar Senha: </p>
                        <input 
                            type="text" 
                            name="password_confirmation" 
                            onChange={changeData}
                        />

                    </>
                    : 
                    <p>...Loading</p>
                }
            </List>
            <Button
             color={'#28a745'}
             onClick={getFormData}
            >
                Confirmar
            </Button>
        </Container>
    );
}

export default EditProfile;