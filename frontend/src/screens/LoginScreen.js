import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Row, Col, Form, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import {login} from "../actions/userActions";
import {USER_LOGOUT} from "../constants/userConstants";


function LoginScreen({location, history}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const redirect = window.location.search ? window.location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const {loading, userInfo, error} = userLogin

    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    const tryAgain = () => {
        dispatch({type: USER_LOGOUT})
    }

    return (
        <FormContainer>
            <h1 className='text-sm-center'>Вход</h1>

            {loading && <Loader/>}

            {error &&
                <div style={{height: 55 + 'px'}}>
                    <Message variant='danger'>
                        Введен неверный Логин/Пароль! <Link className='try-again text-sm-center' onClick={tryAgain}>Попробовать
                        снова</Link>
                    </Message>
                </div>
            }
            {
                (!error && !loading) &&
                <Form onSubmit={submitHandler}>
                    <Form.Group className='mb-3' controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Введите Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='password'>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Введите пароль'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Button className='size-btn btn btn-dark mb-3' type='submit' style={{width: 100 + '%'}}>Войти</Button>
                </Form>
            }

            {
                (!error && !loading) &&
                <Row className='py-3 text-sm-center'>
                    <Col>
                        Нет аккаунта? <Link
                            className='create-acc'
                            to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                            Создать
                        </Link>
                    </Col>
                </Row>
            }
        </FormContainer>
    );
}

export default LoginScreen;