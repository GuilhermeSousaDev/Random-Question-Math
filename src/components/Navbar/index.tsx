import React from 'react';
import { Link } from 'react-router-dom';
import { Links, Nav } from './style';
import trofeuImg from '../../images/copo.png';
import perfilImg from '../../images/perfil.png';

const Navbar: React.FC = () => {
    return(
        <Nav>
            <Link to={'/'}><h3>MATH</h3></Link>
            <Links>
                <Link to={'/'}> <img src={trofeuImg} alt="trofeu" /> </Link>
                <Link to={'/'}><img src={perfilImg} alt="trofeu" /></Link>
            </Links>
        </Nav>
    )
}

export default Navbar;