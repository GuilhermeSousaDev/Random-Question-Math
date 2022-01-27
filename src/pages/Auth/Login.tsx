import React, { 
    FC, 
    useCallback,
    useState,
    useRef,
    MutableRefObject,
} from 'react';
import { Link } from 'react-router-dom';
import { 
    Button,
    Container, 
    Title 
} from '../../style/globalStyle';
import { Error, Form } from './style';

interface IForm {
    email: string;
    password: string;
}

const Login: FC = () => {

    const emailRef = useRef() as MutableRefObject<HTMLInputElement>
    const passwordRef = useRef() as MutableRefObject<HTMLInputElement>

    const [msg, setMsg] = useState<string>('');
    const [form, setForm] = useState<IForm>({
        email: '',
        password: ''
    });

    const submitForm = useCallback(() => {
        const emailLen = emailRef.current.value;
        const passwordLen = passwordRef.current.value;
        if(!emailLen.length || !passwordLen.length) {
            setMsg('Preencha todos os Campos!');
            return;
        }
        if(emailLen.length < 3) {
            setMsg('Email muito Curto!');
            return;
        }    

        setForm({
            email: emailRef.current.value,
            password: passwordRef.current.value,
        })

        setMsg('');

        console.log(form)

    }, [form]);

    const changeForm = useCallback(() => {
        setForm({
            ...form,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        })

        console.log(form)
    }, [form]);

    return(
        <Container>
            <Title>Login</Title>

            <Form>
                {msg? <Error>{msg}</Error> : ''}
                <span>Email</span>
                <input 
                    onChange={changeForm}
                    ref={emailRef} 
                    type="email" 
                    name='email' />
                <span>Password</span>
                <input 
                    onChange={changeForm}
                    ref={passwordRef} 
                    type="password" 
                    name='password' />
                <div>
                    <Button onClick={submitForm}>Entrar</Button>
                    <Link to={'/register'}>
                        <Button>Criar Conta</Button>
                    </Link>
                </div>
            </Form>
        </Container>
    )
}

export default Login;