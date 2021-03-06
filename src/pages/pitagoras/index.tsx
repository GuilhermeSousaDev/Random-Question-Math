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
    const { isAuth, token } = useContext(AuthContext);

    const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
    const buttonRef = useRef() as MutableRefObject<HTMLButtonElement>;

    const [catetoA, setCatetoA] = useState<number>();
    const [catetoB, setCatetoB] = useState<number>();
    const [res, setRes] = useState<string>();
    const [msg, setMsg] = useState<string>();

    useEffect(() => {
        if(!isAuth) {
            navigate('/login');
        }

        const randoms = [10, 20, 30];
        const randomArrayIndex = Math.floor(Math.random() * randoms.length);

        if(!catetoA && !catetoB) {
            setCatetoA(Math.floor(Math.random() * randoms[randomArrayIndex]));
            setCatetoB(Math.floor(Math.random() * randoms[randomArrayIndex]));
           
        }

        if(catetoA && catetoB) {
            setRes(
                String(
                    Math.sqrt(
                        Math.pow(catetoA, 2) + Math.pow(catetoB, 2)
                    )
                ));
                console.log(catetoA, catetoB, res)
        }
    }, [isAuth, navigate, catetoA, catetoB, res]);

    const loadQuestion = useCallback(() => {
        buttonRef.current.style.display = 'block';

        const randoms = [10, 20, 30];
        const randomArrayIndex = Math.floor(Math.random() * randoms.length);

        setCatetoA(Math.floor(Math.random() * randoms[randomArrayIndex]));
        setCatetoB(Math.floor(Math.random() * randoms[randomArrayIndex]));

        if(catetoA && catetoB) {
            setRes(
                String(
                    Math.sqrt(
                        Math.pow(catetoA, 2) + Math.pow(catetoB, 2)
                    )
                ));
        }

        setMsg('');
        inputRef.current.value = '';
    }, [catetoA, catetoB]);

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
                    await api.post('/question', obj, {
                        headers: {
                            Authorization: token as string
                        }
                    })
                })();

                buttonRef.current.style.display = 'none';
                setMsg('Voc?? Acertou!');

                setTimeout(() =>  loadQuestion(), 3000);
            }else {
                setMsg('Voc?? Errou!');
            }
        }else {
            if(response === res) {
                (async () => {
                    const obj = { hitsBhaskara: 0, hitsPitagoras: 1, hitsVelmedia: 0 }
                    await api.post('/question', obj, {
                        headers: {
                            Authorization: token as string
                        }
                    })
                })();

                setMsg('Voc?? Acertou!');
            }else {
                setMsg('Voc?? Errou!');
            }
        }

    }, [res, token, loadQuestion]);

    return(
        <Container>
            <Title> Resolva a Quest??o <hr /> <span>Teorema de Pit??goras</span> </Title>

            <div>Cateto a: {catetoA}</div>
            <div>Cateto b: {catetoB}</div>

            <p>F??rmula: h = a2 + b2</p>
            <p>Hipotenusa = Soma dos Catetos ao quadrado</p>

            <h4>Resposta</h4>
            <input type="number" ref={inputRef} />
            <Button ref={buttonRef} onClick={submitReponse}>Enviar Resposta</Button>
            <br />
            <Button onClick={loadQuestion}>Outra Quest??o</Button>
            { 
                msg ? msg === 'Voc?? Acertou!'? 
                    <Response color={'#28a745'}>{ msg }</Response> : 
                    <Response color={'#dc3545'}>{ msg }</Response>
                : ''
            }
            <br />
        </Container>
    )
}

export default Convert;
