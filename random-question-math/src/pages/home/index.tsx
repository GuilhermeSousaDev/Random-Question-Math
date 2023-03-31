import React, { 
    FC, 
    MutableRefObject, 
    useCallback, 
    useRef,
} from 'react';
import { Link } from 'react-router-dom';
import { Button,Title } from '../../style/globalStyle';
import { Exercice, Container } from './style';

const Home: FC = () => {
    const exerciceRef = useRef() as MutableRefObject<HTMLDivElement>;
    const divRef = useRef() as MutableRefObject<HTMLDivElement>;

    const showExercicie = useCallback(() => {
        exerciceRef.current.style.display = 'block';
        divRef.current.style.display = 'none';
    }, []);

    const showMenu = useCallback(() => {
        exerciceRef.current.style.display = 'none';
        divRef.current.style.display = 'block';
    }, []);

    return(
        <>
            <Container>
                <div ref={divRef}>
                    <Title>Questions Math</Title>
                    <Button onClick={showExercicie}>Resolver Questões</Button>
                </div>
                <Exercice ref={exerciceRef}>
                    <Title>Exercícios</Title>
                    <div>
                        <Link to={'/exercicio/bhaskara'}>Bhaskara</Link>
                        <Link to={'/exercicio/pitagoras'}>Pitágoras</Link>
                        <Link to={'/exercicio/vel_media'}>Velocidade média</Link>
                    </div>
                    <Button onClick={showMenu}>Voltar</Button>
                </Exercice>
            </Container>
        </>
    )
}

export default Home;