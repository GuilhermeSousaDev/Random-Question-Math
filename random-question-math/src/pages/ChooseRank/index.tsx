import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Title, Container } from '../../style/globalStyle';
import { Rank } from './style';

const ChooseRank: FC = () => {
    return(
        <Container>
            <Title>Ranks</Title>
            <Rank>
                <div>
                    <Link to={'/rank/bhaskara'}>Bhaskara</Link>
                    <Link to={'/rank/pitagoras'}>Pitágoras</Link>
                    <Link to={'/rank/vel_media'}>Velocidade média</Link>
                    <Link to={'/rank/all'}>Todos</Link>
                </div>
            </Rank>
        </Container>
    )
}

export default ChooseRank;