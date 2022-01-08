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
    const [res, setRes] = useState<string>();
    const [msg, setMsg] = useState<string>();

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
        }

        setMsg('');
    }, [a, b, c]);

    const submitResponse = useCallback(() => {
        const response = inputRef.current.value

        if(response.length === 0) {
            setMsg('Resposta Vazia!')
            return;
        }

        if(response === res) {
            setMsg('Você Acertou!')
        }else {
            setMsg('Você Errou!')
        }
        
    }, [res]);

    useEffect(() => loadQuestion(), []);

    const loadOtherQuestion = useCallback(() => loadQuestion(), [loadQuestion])

    return(
        <Container>
            <Title> Resolva a Questão <hr /> <p>Equação do 2 Grau</p> </Title>

            <div>A: {a}<span>x2</span></div>
            <div>B: {b}<span>x</span></div>
            <div>C: {c}</div>
            <p>Δ = b**2 - 4 . a . c</p>

            <h4>Resposta</h4>
            <input type="number" ref={inputRef} />
            <Button onClick={submitResponse}>Enviar Resposta</Button>
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

export default Bhaskara;