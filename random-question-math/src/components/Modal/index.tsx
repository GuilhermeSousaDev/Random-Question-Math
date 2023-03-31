import React, { 
    FC, 
    MutableRefObject, 
    useRef, 
    useContext,
    useCallback,
    useState,
} from 'react';
import api from '../../services/axios';
import { FiUpload } from 'react-icons/fi';
import { Button } from '../../pages/Profile/style';
import { Form } from './style';
import { AuthContext } from '../../services/Context/AuthContext';
import { Response } from '../../style/globalStyle';
import { useNavigate } from 'react-router-dom';

const Modal: FC = () => {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);

    const inpFileRef = useRef() as MutableRefObject<HTMLInputElement>;

    const [msg, setMsg] = useState<string>('');

    const submitFile = useCallback(async () => {
        const { files } = inpFileRef.current;

        if(files != null) {
            const data = new FormData();

            data.append('avatar', files[0]);

            const { status } = await api.put('/avatar', data, { 
                headers: {
                    Authorization: token as string,
                },
            })

            if(status !== 200) {
                setMsg('Erro ao Atualizar Imagem');
            } else {
                navigate('/');
            }
        }
    }, [token, navigate]);

    return(
        <Form>
            {msg?
                <Response color={'#dc3545'}>{msg}</Response> :
                ''
            }
            <input 
                style={{display: 'block'}} 
                type="file" 
                name='avatar' 
                ref={inpFileRef}
            />
            <FiUpload />
            <Button onClick={submitFile} color={'#007bff'}>Trocar</Button>
            <Button color={'#dc3545'}>Cancelar</Button>
        </Form>
    );
}

export default Modal;