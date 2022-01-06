import React, { useState, useEffect, useRef, MutableRefObject } from 'react';

import { Title } from './style';
import { Container } from './style';

const Convert: React.FC = () => {

    const divRef = useRef() as MutableRefObject<HTMLDivElement>;

    const [a, setA] = useState<number>();
    const [b, setB] = useState<number>();
    const [c, setC] = useState<number>();

    useEffect(() => {

        setA(Math.floor(Math.random() * 10))
        setB(Math.floor(Math.random() * 20))
        setC(Math.floor(Math.random() * -10))

    }, []);

    const showResult = () => {
        const divStyle = divRef.current.style
        divStyle.display === 'none'? 
        divStyle.display = 'block' : divStyle.display = 'none';
    };

    return(
        <Container>
            <Title>Resolva a Questão</Title>

            <div>{a}</div>
            <div>{b}</div>
            <div>{c}</div>

            <div ref={divRef} style={{ display: 'none' }}>7</div>
            <button onClick={showResult}>Exibir Resultado</button>
        </Container>
    )
}

export default Convert;
