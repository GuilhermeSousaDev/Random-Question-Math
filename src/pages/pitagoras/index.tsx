import React, { useState, useEffect, useRef, MutableRefObject, useCallback } from 'react';

import { Title } from './style';
import { Container } from './style';
import { Button } from './style';
import { Response } from './style';

const Convert: React.FC = () => {
    const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

    const [catetoA, setCatetoA] = useState<number>();
    const [catetoB, setCatetoB] = useState<number>();
    const [res, setRes] = useState<string>();
    const [msg, setMsg] = useState<string>();

    const loadQuestion = useCallback(() => {
        const randoms = [10, 20, 30];
        const randomArrayIndex = Math.floor(Math.random() * randoms.length);

        setCatetoA(Math.floor(Math.random() * randoms[randomArrayIndex]))
        setCatetoB(Math.floor(Math.random() * randoms[randomArrayIndex]))

        if(catetoA && catetoB) {
            setRes(
                String(
                    Math.sqrt(
                        Math.pow(catetoA, 2) + Math.pow(catetoB, 2)
                    )
                ));
        }

        setMsg('');
    }, [catetoA, catetoB])

    useEffect(() => loadQuestion(), []);

    const submitReponse = useCallback(() => {
        const response = inputRef.current.value;

        if(response.length === 0) {
            setMsg('Resposta Vazia!');
            return;
        }

        if(res?.includes('.')) {
            const [integerRes, naturalRes] = res.split('.')
            
            if(response === integerRes || response === integerRes + '.' + naturalRes) {
                setMsg('Você Acertou!');
            }else {
                setMsg('Você Errou!');
            }
        }else {
            if(response === res) {
                setMsg('Você Acertou!');
            }else {
                setMsg('Você Errou!');
            }
        }

    }, [res]);

    const loadOtherQuestion = useCallback(() => loadQuestion(), [loadQuestion])

    return(
        <Container>
            <Title> Resolva a Questão <hr /> <span>Teorema de Pitágoras</span> </Title>

            <div>Cateto a: {catetoA}</div>
            <div>Cateto b: {catetoB}</div>

            <p>Fórmula: a2 = b2 + c2</p>
            <p>Hipotenusa = Soma dos Catetos ao quadrado</p>

            <h4>Resposta</h4>
            <input type="number" ref={inputRef} />
            <Button onClick={submitReponse}>Enviar Resposta</Button>
            <br />
            <Button onClick={loadOtherQuestion}>Outra Questão</Button>

            { 
                msg? msg === 'Você Acertou!'? 
                <Response color={'#28a745'}>{ msg }</Response> : 
                <Response color={'#dc3545'}>{ msg }</Response>
                : ''
            }
            { res }
        </Container>
    )
}

export default Convert;
