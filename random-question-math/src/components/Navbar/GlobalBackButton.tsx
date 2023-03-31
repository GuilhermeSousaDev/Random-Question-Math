import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { GlobalButton } from './style';

const GlobalBackButton: FC = () => {
    return(
        <>
            <GlobalButton>
                <Link to={'/'}>Exercícios</Link>
            </GlobalButton>
        </>
    )
}

export default GlobalBackButton;