import React, { FC, MutableRefObject, useRef } from 'react';
import { Button } from '../../pages/Profile/style';
import { Container } from './style';

const Modal: FC = () => {
    const inpFileRef = useRef() as MutableRefObject<HTMLInputElement>;

    return(
        <Container>
            <input 
                style={{display: 'none'}} 
                type="file" 
                name='avatar' 
                ref={inpFileRef}
            />
            <p onClick={() => {
                console.log(inpFileRef.current)
            }}>o</p>
            <Button color={'#007bff'}>Trocar</Button>
            <Button color={'#dc3545'}>Cancelar</Button>
        </Container>
    );
}

export default Modal;