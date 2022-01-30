import React, { 
    FC, 
    MutableRefObject, 
    useCallback, 
    useContext, 
    useEffect, 
    useRef, 
    useState 
} from 'react';

import api from '../../services/axios';
import { 
    Container, 
    Button, 
    Title, 
    Response
} from '../../style/globalStyle';

import BhaskaraX1X2 from '../../components/BhaskaraX1X2';
import { AuthContext } from '../../services/Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Bhaskara: FC = () => {
    const navigate = useNavigate();
    const { isAuth } = useContext(AuthContext);

    if(!isAuth) {
        navigate('/login');
    }

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

        //randomArrayIndex and randoms variable alternate between a negative and positive value of A, B and c in the equation 
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
        const response = inputRef.current.value;

        if(response.length === 0) {
            setMsg('Resposta Vazia!');
            return;
        }

        if(response === res) {
            (async () => {
                const obj = { hitsBhaskara: 1, hitsPitagoras: 0, hitsVelmedia: 0 }
                const request = await api.post('/question', obj)
            })();

            setMsg('Você Acertou!');
        }else {
            setMsg('Você Errou!');
        }
        
    }, [res]);

    return(
        <Container>
            <Title> Resolva a Questão <hr /> <p>Equação do 2 Grau</p> </Title>

            <div ref={divRefA}> a: {a}</div>
            <div ref={divRefB}> b: {b}</div>
            <div ref={divRefC}> c: {c}</div>
            <p>Δ = b**2 - 4 . a . c</p>

            <h4>Resposta</h4>
            <input type="number" ref={inputRef} />

            <Button onClick={submitResponse}>Enviar Resposta</Button>
            <br />
            <Button onClick={loadQuestion}>Outra Questão</Button>

            { 
                res && a && b && 
                msg ? msg === 'Você Acertou!'? 
                    <BhaskaraX1X2 delta={Number(res)} a={a} b={b} />
                    : 
                    <Response color={'#dc3545'}>{ msg }</Response>
                : ''
            }
            <br />
            {res}
            
            {!msg? 
                res? 
                    <Response color={'#28a745'}>
                        Resposta Pronta, Tente Resolver
                    </Response> 
                    : 
                    <Response color={'#dc3545'}>
                        Erro ao calcular resposta, carregue outra questão
                    </Response>
                : ''
            }
        </Container>
    )
}

export default Bhaskara;