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
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../services/Context/AuthContext';

import { 
    Container, 
    Button, 
    Title, 
    Response 
} from '../../style/globalStyle';

const VelMedia: FC = () => {
    const navigate = useNavigate();
    const { isAuth } = useContext(AuthContext);

    if(!isAuth) {
        navigate('/login');
    }

    const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
    const divRefS = useRef() as MutableRefObject<HTMLDivElement>;
    const divRefT = useRef() as MutableRefObject<HTMLDivElement>;

    const [deltas, setDeltas] = useState<number>();
    const [deltat, setDeltat] = useState<number>();
    const [res, setRes] = useState<string>();
    const [msg, setMsg] = useState<string>();

    useEffect(() => loadQuestion(), [])

    const loadQuestion = useCallback(() => {
        setDeltas(Math.floor(Math.random() * (1200 - 100) - 100));
        setDeltat(Math.floor(Math.random() * (20 - 2) - 2));

        if(deltas && deltat) {
            const val = deltas / deltat
            setRes(String(val));
            divRefS.current.innerHTML = `Δs: ${String(deltas)}`;
            divRefT.current.innerHTML = `Δt: ${String(deltat)}`;
        }

        setMsg('');
        inputRef.current.value = '';
    }, [deltas, deltat]);

    const submitResponse = useCallback(() => {
        const response = inputRef.current.value;

        if(res?.includes('.')) {
            const [parsedRes, decimalRes] = res.split('.');

            if(response === parsedRes || response === `${parsedRes}.${decimalRes}`) {
                (async () => {
                    const obj = { hitsBhaskara: 0, hitsPitagoras: 1, hitsVelmedia: 0 }
                    const request = await api.post('/question', obj)
                    console.log(request)
                })();

                setMsg('Você Acertou!');
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
                
                setMsg('Você Acertou!')
            }else {
                setMsg('Você Errou!')
            }
        }

    }, [res]);

    return(
        <Container>
            <Title> Resolva a Questão <hr /> <span>Velocidade Média</span> </Title>

            <div ref={divRefS}>Δs: {deltas}</div>
            <div ref={divRefT}>Δt: {deltat}</div>

            <p>Fórmula: VM = Δs / Δt</p>

            <h4>Resposta</h4>
            <input type="number" ref={inputRef} />
            <Button onClick={submitResponse}>Enviar Resposta</Button>
            <br />
            <Button onClick={loadQuestion}>Outra Questão</Button>
            {
                msg? msg === 'Você Acertou!'? 
                    <Response color={'#28a745'}>{ msg }</Response> : 
                    <Response color={'#dc3545'}>{ msg }</Response>
                : ''
            }
            
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

export default VelMedia;