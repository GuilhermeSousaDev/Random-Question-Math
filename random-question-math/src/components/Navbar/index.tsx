import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Links, Nav } from './style';
import { AuthContext } from '../../services/Context/AuthContext';
import trofeuImg from '../../images/copo.png';
import perfilImg from '../../images/perfil.png';
import avatarEmpty from '../../images/avatar_empty.png';

const Navbar: React.FC = () => {
    const { isAuth } = useContext(AuthContext);

    const [isAuthState, setIsAuthState] = useState<boolean>(isAuth);

    useEffect(() => {
        if(isAuth) {
            setIsAuthState(true);
        } else {
            setIsAuthState(false);
        }
    }, [isAuth]);

    return(
        <Nav>
            <Link to={'/'}><h3>MATH</h3></Link>
            <Links>
                <Link to={'/rank'}> <img src={trofeuImg} alt="trofeu" /> </Link>
                {isAuthState? 
                    <Link to={'/perfil'}><img src={perfilImg} alt="perfil" /></Link> :
                    <Link to={'/login'}> 
                        <img 
                            style={{
                                background: 'white', 
                                borderRadius: '20px'
                            }} 
                            src={avatarEmpty} 
                            alt="perfil" /> 
                    </Link>
                }
            </Links>
        </Nav>
    )
}

export default Navbar;