import React, { 
    FC,
    useState,
    useEffect,
    useContext,
} from 'react';
import api from '../../services/axios';
import { AuthContext } from '../../services/Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Response, Title } from '../../style/globalStyle';
import { Button,LiImage, List } from './style';
import DefaultImg from '../../images/perfil.png';
import Modal from '../../components/Modal';

interface IUser {
    id: string
    name: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
}

interface IHits {
    hitsBhaskara: number;
    hitsPitagoras: number;
    hitsVelmedia: number;
}

const Profile: FC = () => {
    const { user, handleLogout, isAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const [userData, setUserData] = useState<IUser | null>(null);
    const [profile, setProfile] = useState<IHits>({
        hitsBhaskara: 0,
        hitsPitagoras: 0,
        hitsVelmedia: 0,
    });
    const [msg, setMsg] = useState<string>('');

    useEffect(() => {
        (async () => {
            if(!isAuth) {
                navigate('/login');
            }

            const request_hits = await api.get(`/question/${user?.id}`);
            const request_user = await api.get<IUser>(`/user/${user?.id}`);
            
            if(request_hits.data === 'This hit profile does not exist') {
                setMsg('Você ainda não tem um perfil de questões');
            } else {
                setProfile(request_hits.data);
            }

            setUserData(request_user.data);
        })();
    }, [user, navigate, isAuth]);

    return(
        <Container>
            <Title> Perfil <hr /> <p>{userData?.name}</p> </Title>
            <List>
                {msg?
                    <Response color={'#dc3545'}>{msg}</Response> :
                    ''
                }
                {userData?  
                    <>
                        <li>Name: {userData.name}</li>
                        <img src={DefaultImg} alt="default_image" />
                        <br />
                        <h3>Acertos</h3>
                        <li>Bhaskara: {profile.hitsBhaskara}</li>
                        <li>Pitagoras: {profile.hitsPitagoras}</li>
                        <li>Velocidade média: {profile.hitsVelmedia}</li>
                        <li>Criado em: {new Date(userData.createdAt).toLocaleDateString()}</li>
                        <li>id: {userData.id}</li>
                    </>
                    : 
                    <p>...Loading</p>
                }
            </List>
            <Link to={`/perfil/edit/${userData?.id}`}>
                <Button>Editar</Button>
            </Link>
            <br />
            <Button onClick={handleLogout} color={'#dc3545'}>Desconectar</Button>
        </Container>
    );
}

export default Profile;