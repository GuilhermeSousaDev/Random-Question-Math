import React, { 
    FC,
    useState,
    useEffect,
    useContext,
} from 'react';
import api from '../../services/axios';
import { AuthContext } from '../../services/Context/AuthContext';
import { Link } from 'react-router-dom';
import { Container, Title } from '../../style/globalStyle';
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
    id: string
    hitsBhaskara: number;
    hitsPitagoras: number;
    hitsVelmedia: number;
    user: {
        id: string;
        name: string;
    }
    createdAt: Date;
    updatedAt: Date;
}

const Profile: FC = () => {
    const { user } = useContext(AuthContext);

    const [userData, setUserData] = useState<IUser | null>(null);
    const [profile, setProfile] = useState<IHits | null>(null);
    const [modal, setModal] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const request_user = await api.get<IUser>(`/user/${user?.id}`);
            const request_hits = await api.get<IHits>(`/question/${user?.id}`);

            setProfile(request_hits.data);
            setUserData(request_user.data);
        })();
    }, [user]);

    const showModal = () => {
        modal === true?
            setModal(false) :
            setModal(true)
    }

    return(
        <Container>
            <Title> Perfil <hr /> <p>{profile?.user.name}</p> </Title>
            <List>
                {userData && profile?  
                    <>
                        <li>Name: {profile.user.name}</li>
                        <LiImage onClick={showModal}>
                            {userData.avatar? 
                                <img 
                                    src={`http://localhost:8081/files/${userData.avatar}`} 
                                    alt={userData.avatar} /> : 
                                <img src={DefaultImg} alt="default_image" />
                            }
                        </LiImage>
                        { modal? <Modal /> : ''}
                        <br />
                        <h3>Acertos</h3>
                        <li>Bhaskara: {profile.hitsBhaskara}</li>
                        <li>Pitagoras: {profile.hitsPitagoras}</li>
                        <li>Velocidade média: {profile.hitsVelmedia}</li>
                        <li>Criado em: {userData.createdAt}</li>
                        <li>id: {userData.id}</li>
                    </>
                    : 
                    <p>...Loading</p>
                }
            </List>
            <Link to={`/perfil/edit/${userData?.id}`}>
                <Button>Editar</Button>
            </Link>
        </Container>
    );
}

export default Profile;