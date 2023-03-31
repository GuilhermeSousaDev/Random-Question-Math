import React, { 
    FC, 
    useCallback,
    useState,
    useRef,
    MutableRefObject,
    useEffect,
    useContext,
} from 'react';

import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/axios';
import { AuthContext } from '../../services/Context/AuthContext';
import { 
    Button,
    Container, 
    Title 
} from '../../style/globalStyle';
import { Error, Form, Msg } from './style';

interface IForm {
    name: string;
    email: string;
    password: string;
}

const Register: FC = () => {

    const nameRef = useRef() as MutableRefObject<HTMLInputElement>
    const emailRef = useRef() as MutableRefObject<HTMLInputElement>
    const passwordRef = useRef() as MutableRefObject<HTMLInputElement>

    const [error, setError] = useState<string>('');
    const [msg, setMsg] = useState<string>('');
    const [form, setForm] = useState<IForm>({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const { isAuth } = useContext(AuthContext);

    useEffect(() => {
        if(isAuth) {
            navigate('/')
        }

        if(error.length) {
            setTimeout(() => setError(''), 10000);
        }

        if(msg.length) {
            setTimeout(() => setMsg(''), 10000);
        }
    }, [error, msg, navigate, isAuth]);

    const submitForm = useCallback(async () => {
        const nameLen = nameRef.current.value;
        const emailLen = emailRef.current.value;
        const passwordLen = passwordRef.current.value;

        if(!nameLen.length || !emailLen.length || !passwordLen.length) {
            setError('Preencha todos os Campos!');
            return;
        }

        if(emailLen.length < 3) {
            setError('Email muito Curto!');
            return;
        }    

        setForm({
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        })

        setError('');
        
        const { data } = await api.post('/user', form);

        if(data === 'This email already exists.') {
            setError(data);
        }else {
            setMsg('Usuário Cadastrado com Sucesso!');
        }

        nameRef.current.value = '';
        emailRef.current.value = '';
        passwordRef.current.value = '';

    }, [form]);

    const changeForm = useCallback(() => {
        setForm({
            ...form,
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        })

    }, [form]);

    return(
        <Container>
            <Title>Register</Title>

            <Form>
                {error? <Error>{error}</Error> : ''}
                {msg? <Msg>{msg}</Msg> : ''}

                <span>Name</span>
                <input 
                    onChange={changeForm}
                    ref={nameRef} 
                    type="text" 
                    name='name' />

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
                    <Button onClick={submitForm}>Criar</Button>
                    <Link to="/login">
                        <Button>Login</Button>
                    </Link>
                </div>
            </Form>
        </Container>
    )
}

export default Register;