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
    const { isAuth, token } = useContext(AuthContext);

    const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
    const buttonRef = useRef() as MutableRefObject<HTMLButtonElement>;

    const [a, setA] = useState<number>();
    const [b, setB] = useState<number>();
    const [c, setC] = useState<number>();
    const [res, setRes] = useState<string>();
    const [msg, setMsg] = useState<string>('');

    const loadQuestion = useCallback(() => {
        buttonRef.current.style.display = 'block';

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
        }

        setMsg('');
        inputRef.current.value = '';
    }, [a, b, c]);

    useEffect(() => {
        if(!isAuth) {
            navigate('/login');
        }

        const randoms = [10, -10, 20, -20];
        const randomArrayIndex = Math.floor(Math.random() * randoms.length);
        const otherRandomArrayIndex = Math.floor(Math.random() * randoms.length);

        const randomCoefficientA = [1, -1, 10];
        const randomCoefficientArrayIndex = Math.floor(Math.random() * randomCoefficientA.length);

        if(!a && !b && !c) {  
            setA(Math.floor(Math.random() * randomCoefficientA[randomCoefficientArrayIndex]));
            setB(Math.floor(Math.random() * randoms[randomArrayIndex]));
            setC(Math.floor(Math.random() * randoms[otherRandomArrayIndex]));
        }

        if(a && b && c) {
            setRes(String(Math.pow(b, 2) - (4 * a * c)))
        }
    }, [a, b, c, res , isAuth, navigate]);

    const submitResponse = async () => {
        const response = inputRef.current.value;

        if(response.length === 0) {
            setMsg('Resposta Vazia!');
            return;
        }

        if(response === res) {
            const hits = {
                hitsBhaskara: 1,
                hitsPitagoras: 0,
                hitsVelmedia: 0,
            }

            await api.post('/question', hits, {
                headers: {
                    Authorization: token as string,
                }
            })

            buttonRef.current.style.display = 'none';

            setMsg('Você Acertou!');
        }else {
            setMsg('Você Errou!');
        }
        
    };

    return(
        <Container>
            <Title> Resolva a Questão <hr /> <p>Equação do 2 Grau</p> </Title>

            <div> a: {a}</div>
            <div> b: {b}</div>
            <div> c: {c}</div>

            <h4>Resposta</h4>
            <input type="number" ref={inputRef} />

            <Button ref={buttonRef} onClick={submitResponse}>Enviar Resposta</Button>
            <br />
            <Button onClick={loadQuestion}>Outra Questão</Button>

            { 
                res && a && b && 
                msg ? msg === 'Você Acertou!'? 
                    <BhaskaraX1X2 
                        loadQuestion={loadQuestion}
                        token={token as string}
                        delta={Number(res)} 
                        a={a} b={b} />
                    : 
                    <Response color={'#dc3545'}>{ msg }</Response>
                : ''
            }
            <br />
        </Container>
    )
}

export default Bhaskara;