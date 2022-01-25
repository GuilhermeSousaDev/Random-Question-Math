import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
    FC,
    MutableRefObject
} from 'react';
import api from '../../services/axios';
import { Button, Span, Response } from '../../style/globalStyle';

interface IProp {
    delta: number;
    b: number;
    a: number;
}

const BhaskaraX1X2: FC<IProp> = ({ delta, a, b }) => {

    const inputX1Ref = useRef() as MutableRefObject<HTMLInputElement>;
    const inputX2Ref = useRef() as MutableRefObject<HTMLInputElement>;

    const [x1, setX1] = useState<number>();
    const [x2, setX2] = useState<number>();
    const [msgX1, setMsgX1] = useState<string>();
    const [msgX2, setMsgX2] = useState<string>();

    useEffect(() => {
        setX1((b * -1) + Math.sqrt(delta) / (2 * a))
        setX2((b * -1) - Math.sqrt(delta) / (2 * a))
    }, [a, b, x1, x2, delta]);

    const submitResponse = useCallback(() => {
        const responseX1 = inputX1Ref.current.value;
        const responseX2 = inputX2Ref.current.value;

        const x1String = String(x1)
        if(x1String.includes('.')) {
            const [integerRes, naturalRes] = x1String.split('.');

            if(responseX1 === integerRes || responseX1 === `${integerRes}.${naturalRes}`) {

                (async () => {
                    const obj = { 
                        hitsBhaskara: 1, 
                        hitsPitagoras: 0, 
                        hitsVelmedia: 0 
                    }
                    const request = await api.post('/question', obj);
                    console.log(request.data);
                })();

                setMsgX1('Você Acertou o X1 da equação!');
            }else {
                setMsgX1('Você Errou o X1 da equação!');
            }

        }

        Number(responseX1) === x1? 
            setMsgX1('Você Acertou o X1 da equação!') :
            setMsgX1('Você Errou o X1 da equação!')

        const x2String = String(x2)
        if(x2String.includes('.')) {
            const [integerRes, naturalRes] = x2String.split('.');
            console.log(integerRes, naturalRes)
            if(responseX2 === integerRes || responseX2 === `${integerRes}.${naturalRes}`) {
                (async () => {
                    const obj = { 
                        hitsBhaskara: 1, 
                        hitsPitagoras: 0, 
                        hitsVelmedia: 0 
                    }
                    const request = await api.post('/question', obj);
                    console.log(request.data);
                })();
                
                setMsgX2('Você Acertou o X2 da equação!');
            }else {
                setMsgX2('Você Errou o X2 da equação!');
            }

        }
        
        Number(responseX2) === x2?
            setMsgX2('Você Acertou o X2 da equação!') :
            setMsgX2('Você Errou o X2 equação!')
        
    }, [x1, x2]);

    return(
        <>
            <Span> Encontre X1 e X2 do Δ = {delta} </Span>
            <input type="number" ref={inputX1Ref} />
            <br />
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