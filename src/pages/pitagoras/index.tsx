import React, { 
    useState, 
    useEffect, 
    useRef, 
    MutableRefObject, 
    useCallback, 
    useContext
} from 'react';
import api from '../../services/axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../services/Context/AuthContext';

import { 
    Container, 
    Button, 
    Title, 
    Response 
} from '../../style/globalStyle';

const Convert: React.FC = () => {
    const navigate = useNavigate();
    const { isAuth } = useContext(AuthContext);

    if(!isAuth) {
        navigate('/login');
    }

    const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
    const divRefA = useRef() as MutableRefObject<HTMLDivElement>;
    const divRefB = useRef() as MutableRefObject<HTMLDivElement>;

    const [catetoA, setCatetoA] = useState<number>();
    const [catetoB, setCatetoB] = useState<number>();
    const [res, setRes] = useState<string>();
    const [msg, setMsg] = useState<string>();

    useEffect(() => loadQuestion(), []);

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

            divRefA.current.innerHTML = `Cateto a: ${String(catetoA)}`;
            divRefB.current.innerHTML = `Cateto b: ${String(catetoB)}`;
        }

        setMsg('');
        inputRef.current.value = '';
    }, [catetoA, catetoB])

    const submitReponse = useCallback(() => {
        const response = inputRef.current.value;

        if(response.length === 0) {
            setMsg('Resposta Vazia!');
            return;
        }

        if(res?.includes('.')) {
            const [integerRes, naturalRes] = res.split('.')
            
            if(response === integerRes || response === integerRes + '.' + naturalRes) {
                (async () => {
                    const obj = { hitsBhaskara: 0, hitsPitagoras: 1, hitsVelmedia: 0 }
                    const request = await api.post('/question', obj)
                    console.log(request)
                })();

                setMsg('Você Acertou!');
                return;
            }else {
                setMsg('Você Errou!');
            }
        }else {
            if(response === res) {
                (async () => {
                    const obj = { hitsBhaskara: 0, hitsPitagoras: 1, hitsVelmedia: 0 }
                    const request = await api.post('/question', obj)
                    console.log(request)
                })();
                setMsg('Você Acertou!');
            }else {
                setMsg('Você Errou!');
            }
        }

    }, [res]);

    return(
        <Container>
            <Title> Resolva a Questão <hr /> <span>Teorema de Pitágoras</span> </Title>

            <div ref={divRefA}>Cateto a: {catetoA}</div>
            <div ref={divRefB}>Cateto b: {catetoB}</div>

            <p>Fórmula: a2 = b2 + c2</p>
            <p>Hipotenusa = Soma dos Catetos ao quadrado</p>

            <h4>Resposta</h4>
            <input type="number" ref={inputRef} />
            <Button onClick={submitReponse}>Enviar Resposta</Button>
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

export default Convert;
