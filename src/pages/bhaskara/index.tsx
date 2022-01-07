import React, { 
    FC, 
    MutableRefObject, 
    useCallback, 
    useEffect, 
    useRef, 
    useState 
} from 'react';

import { Container } from './style';
import { Title } from './style';
import { Button } from './style';
import { Response } from './style';

const Bhaskara: FC = () => {

    const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

    const [a, setA] = useState<number>();
    const [b, setB] = useState<number>();
    const [c, setC] = useState<number>();
    const [res, setRes] = useState<number>();
    const [msg, setMsg] = useState<string>();

    useEffect(() => {
        const randoms = [10, -10, 20, -20];
        const randomArrayIndex = Math.floor(Math.random() * randoms.length);

        //randomArrayIndex and variable randoms alternate between a negative and positive value of A and B in the equation 
        setA(Math.floor(Math.random() * 20));
        setB(Math.floor(Math.random() * randoms[randomArrayIndex]));
        setC(Math.floor(Math.random() * randoms[randomArrayIndex]));

        if(a && b && c) {
            setRes(Math.pow(b, 2) - (4 * a * c))
        }
    }, []);

    const submitResponse = useCallback(() => {
        const response = Number(inputRef.current.value)

        if(response === res) {
            setMsg('Você Acertou!')
        }else {
            setMsg('Você Errou!')
        }
        
    }, [res]);

    return(
        <Container>
            <Title> Resolva a Questão <hr /> <p>Equação do 2 Grau</p> </Title>

            <div>A: {a}</div>
            <div>B: {b}</div>
            <div>C: {c}</div>
            <p>Fórmula: b**2 - 4 . a . c</p>

            <h4>Resposta</h4>
            <input type="number" ref={inputRef} />
            <Button onClick={submitResponse}>Enviar Resposta</Button>

            { 
                msg? msg === 'Você Acertou!'? 
                    <Response color={'#28a745'}>{ msg }</Response> : 
                    <Response color={'#dc3545'}>{ msg }</Response>
                : ''
            }
        </Container>
    )
}

export default Bhaskara;