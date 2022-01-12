import React, { 
    FC, 
    MutableRefObject, 
    useCallback, 
    useEffect, 
    useRef, 
    useState 
} from 'react';

import { 
    Container, 
    Button, 
    Title, 
    Response
} from './style';

const VelMedia: FC = () => {
    const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

    const [deltas, setDeltas] = useState<number>();
    const [deltat, setDeltat] = useState<number>();
    const [res, setRes] = useState<string>();
    const [msg, setMsg] = useState<string>();

    const loadQuestion = useCallback(() => {
        setDeltas(Math.floor(Math.random() * (1200 - 100) - 100));
        setDeltat(Math.floor(Math.random() * (20 - 2) - 2));

        if(deltas && deltat) {
            
            console.log(deltas, deltat)
            const val = deltas / deltat
            setRes(String(val));
        }

        setMsg('');
    }, [deltas, deltat]);

    useEffect(() => loadQuestion(), [])

    const submitResponse = useCallback(() => {
        const response = inputRef.current.value;

        if(res?.includes('.')) {
            const [parsedRes, decimalRes] = res.split('.');
            console.log(parsedRes)

            if(response === parsedRes || response === parsedRes + '.' + decimalRes) {
                setMsg('Você Acertou!');
            }else {
                setMsg('Você Errou!');
            }
        }

    }, [res]);

    const loadOtherQuestion = useCallback(() => loadQuestion(), [loadQuestion]);

    return(
        <Container>
            <Title> Resolva a Questão <hr /> <span>Velocidade Média</span> </Title>

            <div>Δs: {deltas}</div>
            <div>Δt: {deltat}</div>

            <p>Fórmula: VM = Δs / Δt</p>

            <h4>Resposta</h4>
            <input type="number" ref={inputRef} />
            <Button onClick={submitResponse}>Enviar Resposta</Button>
            <br />
            <Button onClick={loadOtherQuestion}>Outra Questão</Button>
            { 
                msg && msg === 'Você Acertou!'? 
                    <Response color={'#28a745'}>{ msg }</Response> : 
                    <Response color={'#dc3545'}>{ msg }</Response>
            }
            {res}
        </Container>
    )
}

export default VelMedia;