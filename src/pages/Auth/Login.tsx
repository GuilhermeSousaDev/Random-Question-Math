import React, { 
    FC, 
    useCallback,
    useState,
    useRef,
    MutableRefObject,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/axios';
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

    const navigate = useNavigate();

    const [msg, setMsg] = useState<string>('');
    const [form, setForm] = useState<IForm>({
        email: '',
        password: ''
    });

    const submitForm = useCallback(async () => {
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

        const { data } = await api.post('/login', form);

        if(data.user && data.token) {
            localStorage.setItem('token', data.token);
            navigate('/');
        }

        emailRef.current.value = '';
        passwordRef.current.value = '';

    }, [form, navigate]);

    const changeForm = useCallback(() => {
        setForm({
            ...form,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        })
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