import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
    FC,
    MutableRefObject
} from 'react';
import { Button, Span } from '../../style/globalStyle';

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

    useEffect(() => {
        setX1((b * -1) + Math.sqrt(delta) / (2 * a))
        setX2((b * -1) - Math.sqrt(delta) / (2 * a))
    }, [a, b, x1, x2, delta]);

    const submitResponse = useCallback(() => {
        const responseX1 = Number(inputX1Ref.current.value);
        const responseX2 = Number(inputX2Ref.current.value);

        if(responseX1 === x1) {
            setMsgX1('Você Acertou o X1!');
        }else {
            setMsgX1('Você Errou o X1!');
        }

        if(responseX2 === x2) {
            setMsgX1('Você Acertou o X2!');
        }else {
            setMsgX1('Você Errou o X2!');
        }
    }, [x1, x2]);

    return(
        <>
            <Span> Encontre X1 e X2 do Δ = {delta} </Span>
            <input type="number" ref={inputX1Ref} />
            <br />
            <input type="number" ref={inputX2Ref} />

            { msgX1? msgX1 : '' }
            
            <Button onClick={submitResponse}>Enviar</Button>
        </>
    )
}

export default BhaskaraX1X2;