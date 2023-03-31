import React, {
    Dispatch, 
    FC, 
    SetStateAction,
    useState,
    useContext,
    useEffect,
} from 'react';
import { Button } from '../../pages/Profile/style';
import { Account, Warning } from './style';
import { IoMdWarning } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../services/Context/AuthContext';
import api from '../../services/axios';

interface IProp {
    id: string | undefined;
    setModal: Dispatch<SetStateAction<boolean>>;
}

interface IDelete {
    message: string;
}

const DeleteAccountModal: FC<IProp> = ({ id, setModal }) => {
    const navigate = useNavigate();
    const { handleLogout, isAuth } = useContext(AuthContext);

    const [msg, setMsg] = useState<string>('Deseja Excluir sua Conta?');

    useEffect(() => {
        if(!isAuth) {
            navigate('/login');
        }
    }, [isAuth, navigate]);

    const deleteAccount = async () => {
        if(id) {
            const { data } = await api.delete<IDelete>(`/user/${id}`);

            setMsg('Excluindo...');

            if(data.message === 'Deletado com Sucesso') {
                handleLogout();
            }
        }
    };

    return(
        <Account>
            <Warning>{msg}</Warning>
            <IoMdWarning 
                width={300} 
                height={300}
                color='#dc3545'
            />

            <div>
                <Button 
                    onClick={deleteAccount}
                    color={'#dc3545'}>Confirmar</Button>
                <Button 
                    onClick={() => setModal(false)}
                    color={'#007bff'}>Cancelar</Button>
            </div>
        </Account>
    );
};

export default DeleteAccountModal; 