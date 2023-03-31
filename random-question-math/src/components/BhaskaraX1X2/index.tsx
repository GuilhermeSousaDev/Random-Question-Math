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
    loadQuestion: () => void
}

const BhaskaraX1X2: FC<IProp> = ({ token, delta, a, b, loadQuestion }) => {

    const inputX1Ref = useRef() as MutableRefObject<HTMLInputElement>;
    const inputX2Ref = useRef() as MutableRefObject<HTMLInputElement>;
    const buttonRef = useRef() as MutableRefObject<HTMLButtonElement>;

    const [x1, setX1] = useState<string>();
    const [x2, setX2] = useState<string>();
    const [msgX1, setMsgX1] = useState<string>();
    const [msgX2, setMsgX2] = useState<string>();
    const [hits, setHits] = useState<IHits>({
        hitsBhaskara: 0,
        hitsPitagoras: 0,
        hitsVelmedia: 0,
    })

    useEffect(() => {
        if(a && b) {
            setX1(String((b * -1) + Math.sqrt(delta) / (2 * a)))
            setX2(String((b * -1) - Math.sqrt(delta) / (2 * a)))
        }

        (async () => {
            if(hits.hitsBhaskara !== 0) {
                await api.post('/question', hits, {
                    headers: {
                        Authorization: token
                    }
                })
            }
        })();

        if(msgX1 && msgX2) {
            setTimeout(() => loadQuestion(), 3000);
        }

    }, [a, b, x1, x2, delta, hits, token, msgX1, msgX2, loadQuestion]);

    const submitResponse = useCallback(async () => {
        const responseX1 = inputX1Ref.current.value;
        const responseX2 = inputX2Ref.current.value;

        buttonRef.current.style.display = 'none';

        if(x1?.includes('.')) {
            const [integerRes, naturalRes] = x1.split('.');

            if(responseX1 === integerRes || responseX1 === `${integerRes}.${naturalRes}`) {
                setHits((prev) => {
                    return {
                        ...hits,
                        hitsBhaskara: prev.hitsBhaskara + 1
                    }
                })

                setMsgX1('Você Acertou o X1 da equação!');
            }else {
                setMsgX1('Você Errou o X1 da equação!');
            }

        } else {
            if(responseX1 === x1) {
                setHits((prev) => {
                    return {
                        ...hits,
                        hitsBhaskara: prev.hitsBhaskara + 1
                    }
                })

                setMsgX1('Você Acertou o X1 da equação!')
            } else {
                setMsgX1('Você Errou o X1 da equação!')
            }
        }

        if(x2?.includes('.')) {
            const [integerRes, naturalRes] = x2.split('.');
            
            if(responseX2 === integerRes || responseX2 === `${integerRes}.${naturalRes}`) {
                setHits((prev) => {
                    return {
                        ...hits,
                        hitsBhaskara: prev.hitsBhaskara + 1
                    }
                })
                
                setMsgX2('Você Acertou o X2 da equação!');
            }else {
                setMsgX2('Você Errou o X2 da equação!');
            }

        } else {
            if(responseX2 === x2) {
                setHits((prev) => {
                    return {
                        ...hits,
                        hitsBhaskara: prev.hitsBhaskara + 1
                    }
                })

                setMsgX2('Você Acertou o X2 da equação!');
            } else {
                setMsgX2('Você Errou o X2 equação!');
            }
        }
    }, [hits, x1, x2]);

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
            <Button ref={buttonRef} onClick={submitResponse}>Enviar</Button>
        </>
    )
}

export default BhaskaraX1X2;