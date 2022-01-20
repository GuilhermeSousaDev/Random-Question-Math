import React from 'react';
import { Link } from 'react-router-dom';
import { Links, Nav } from './style';

const Navbar: React.FC = () => {
    return(
        <Nav>
            <h3>Question Math</h3>
            <Links>
                <Link to={'/exercicio/bhaskara'}>Bhaskara</Link>
                <Link to={'/exercicio/pitagoras'}>Pitagoras</Link>
                <Link to={'/exercicio/vel_media'}>Velocidade Média</Link>
            </Links>
        </Nav>
    )
}

export default Navbar;