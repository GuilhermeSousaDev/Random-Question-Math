import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
    FC,
    MutableRefObject,
} from 'react';
import api from '../../services/axios';
import { Button, Span, Response } from '../../style/globalStyle';

interface IHits {
    hitsBhaskara: number;
    hitsPitagoras: number;
    hitsVelmedia: number;
}

interface IProp {
    token: string;
    delta: number;
    b: number;
    a: number;
    hits: {
        hitsBhaskara: number;
        hitsPitagoras: number;
        hitsVelmedia: number;
    }
    setHits: React.Dispatch<React.SetStateAction<IHits>>;
}

const BhaskaraX1X2: FC<IProp> = ({ token, delta, a, b, hits, setHits }) => {

    const inputX1Ref = useRef() as MutableRefObject<HTMLInputElement>;
    const inputX2Ref = useRef() as MutableRefObject<HTMLInputElement>;

    const [x1, setX1] = useState<string>();
    const [x2, setX2] = useState<string>();
    const [msgX1, setMsgX1] = useState<string>();
    const [msgX2, setMsgX2] = useState<string>();

    useEffect(() => {
        setX1(String((b * -1) + Math.sqrt(delta) / (2 * a)))
        setX2(String((b * -1) - Math.sqrt(delta) / (2 * a)))
    }, [a, b, x1, x2, delta]);

    const submitResponse = useCallback(async () => {
        const responseX1 = inputX1Ref.current.value;
        const responseX2 = inputX2Ref.current.value;

        if(x1?.includes('.')) {
            const [integerRes, naturalRes] = x1.split('.');

            if(responseX1 === integerRes || responseX1 === `${integerRes}.${naturalRes}`) {
                setHits({
                    ...hits,
                    hitsBhaskara: 2
                })

                setMsgX1('Você Acertou o X1 da equação!');
            }else {
                setMsgX1('Você Errou o X1 da equação!');
            }

        } else {
            if(responseX1 === x1) {
                setHits({
                    ...hits,
                    hitsBhaskara: 2
                })

                setMsgX1('Você Acertou o X1 da equação!')
            } else {
                setMsgX1('Você Errou o X1 da equação!')
            }
        }

        if(x2?.includes('.')) {
            const [integerRes, naturalRes] = x2.split('.');
            
            if(responseX2 === integerRes || responseX2 === `${integerRes}.${naturalRes}`) {
                setHits({
                    ...hits,
                    hitsBhaskara: 3
                })
                
                setMsgX2('Você Acertou o X2 da equação!');
            }else {
                setMsgX2('Você Errou o X2 da equação!');
            }

        } else {
            if(responseX2 === x2) {
                setHits({
                    ...hits,
                    hitsBhaskara: 3
                })

                setMsgX2('Você Acertou o X2 da equação!');
            } else {
                setMsgX2('Você Errou o X2 equação!');
            }
        }

        await api.post('/question', hits, {
            headers: {
                Authorization: token,
            }
        })
        
    }, [x1, x2, setHits, hits, token]);

    return(
        <>
            <Span> Encontre X1 e X2 do Δ = {delta} </Span>
            <br />
            <span>x1</span>
            <input type="number" ref={inputX1Ref} />
            <br />
            <span>x2</span>
            <input type="number" ref={inputX2Ref} />
            
            <br />

            { msgX1? msgX1 === 'Você Acertou o X1 da equação!'?
                <Response color={'#28a745'}>{ msgX1 }</Response> : 
                <Response color={'#dc3545'}>{ msgX1 }</Response>
                : ''
            }
            <br />
            { msgX2? msgX2 === 'Você Acertou o X2 da equação!'?
                <Response color={'#28a745'}>{ msgX2 }</Response> : 
                <Response color={'#dc3545'}>{ msgX2 }</Response> 
                : ''
            }

            {console.log(x1, x2)}
            
            <Button onClick={submitResponse}>Enviar</Button>
        </>
    )
}

export default BhaskaraX1X2;