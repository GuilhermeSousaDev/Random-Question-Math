import React, { 
    FC, 
    MutableRefObject, 
    useRef, 
    useContext,
    useCallback,
} from 'react';
import api from '../../services/axios';
import { FiUpload } from 'react-icons/fi';
import { Button } from '../../pages/Profile/style';
import { Form } from './style';
import { AuthContext } from '../../services/Context/AuthContext';

const Modal: FC = () => {
    const { token } = useContext(AuthContext);

    const inpFileRef = useRef() as MutableRefObject<HTMLInputElement>;

    const submitFile = useCallback(async () => {
        const { files } = inpFileRef.current;

        if(files != null) {
            const data = new FormData();

            data.append('avatar', files[0]);

            await api.put('/avatar', data, { 
                headers: {
                    Authorization: token as string,
                },
            })
        }
    }, [token]);

    return(
        <Form>
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