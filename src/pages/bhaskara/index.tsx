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
    const divRefA = useRef() as MutableRefObject<HTMLDivElement>;
    const divRefB = useRef() as MutableRefObject<HTMLDivElement>;
    const divRefC = useRef() as MutableRefObject<HTMLDivElement>;

    const [a, setA] = useState<number>();
    const [b, setB] = useState<number>();
    const [c, setC] = useState<number>();
    const [res, setRes] = useState<string>();
    const [msg, setMsg] = useState<string>('');

    useEffect(() => loadQuestion(), []);

    const loadQuestion = useCallback(() => {
        const randoms = [10, -10, 20, -20];
        const randomArrayIndex = Math.floor(Math.random() * randoms.length);
        const otherRandomArrayIndex = Math.floor(Math.random() * randoms.length);

        const randomCoefficientA = [1, -1, 10];
        const randomCoefficientArrayIndex = Math.floor(Math.random() * randomCoefficientA.length);

        //randomArrayIndex and variable randoms alternate between a negative and positive value of A and B in the equation 
        setA(Math.floor(Math.random() * randomCoefficientA[randomCoefficientArrayIndex]));
        setB(Math.floor(Math.random() * randoms[randomArrayIndex]));
        setC(Math.floor(Math.random() * randoms[otherRandomArrayIndex]));

        if(a && b && c) {
            setRes(String(Math.pow(b, 2) - (4 * a * c)))
            divRefA.current.innerHTML = `a: ${String(a)}`;
            divRefB.current.innerHTML = `b: ${String(b)}`;
            divRefC.current.innerHTML = `c: ${String(c)}`;
        }

        setMsg('');
        inputRef.current.value = '';
    }, [a, b, c]);

    const submitResponse = useCallback(() => {
        const response = inputRef.current.value

        if(response.length === 0) {
            setMsg('Resposta Vazia!')
            return;
        }

        response === res?
            setMsg('Você Acertou!') : 
            setMsg('Você Errou!')
        
    }, [res]);

    return(
        <Container>
            <Title> Resolva a Questão <hr /> <p>Equação do 2 Grau</p> </Title>

            <div ref={divRefA}> {a}</div>
            <div ref={divRefB}> {b}</div>
            <div ref={divRefC}> {c}</div>
            <p>Δ = b**2 - 4 . a . c</p>

            <h4>Resposta</h4>
            <input type="number" ref={inputRef} />
            <Button onClick={submitResponse}>Enviar Resposta</Button>
            <br />
            <Button onClick={loadQuestion}>Outra Questão</Button>

            { 
                msg ? msg === 'Você Acertou!'? 
                    <Response color={'#28a745'}>{ msg }</Response> : 
                    <Response color={'#dc3545'}>{ msg }</Response>
                : ''
            }
            <br />
            
            {!msg? 
                res? 
                    'Resposta Pronta, Tente Resolver' : 
                    'Se o Resultado não bater carregue outra questão'
                : ''
            }
        </Container>
    )
}

export default Bhaskara;