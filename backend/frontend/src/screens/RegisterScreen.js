import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Row, Col, Form, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import {login, register} from "../actions/userActions";

import {motion} from "framer-motion";
import {animationStart, reveal} from "../utils/animation";

function RegisterScreen({location, history}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const redirect = window.location.search ? window.location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const {loading, userInfo, error} = userRegister

    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Введенные пароли не совпадают!')
        } else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <FormContainer>
            <motion.h1
                className='text-sm-center'
                variants={reveal}
                initial='hiddenVariantY'
                animate='revealedVariantY'
                transition={{
                    ease: 'easeIn',
                    type: 'spring',
                    staggerChildren: .25,
                    duration: 1,
                    delayChildren: animationStart,
                    delay: animationStart
                }}
            >Вход</motion.h1>

            {message && <Message variant='danger'>{message}</Message>}

            {loading && <Loader/>}

            {error && <Message variant='danger'>{error}</Message>}

            {
                (!error && !loading) &&
                <motion.div
                    variants={reveal}
                    initial='hiddenVariantX'
                    animate='revealedVariantX'
                    transition={{
                        ease: 'easeIn',
                        type: 'spring',
                        staggerChildren: .1,
                        duration: 1,
                        delayChildren: animationStart + .25,
                        delay: animationStart
                    }}
                >
                    <Form onSubmit={submitHandler}>
                        <Form.Group className='mb-3' controlId='name'>
                            <motion.div variants={reveal}>
                                <Form.Label>Имя</Form.Label>
                            </motion.div>
                            <motion.div variants={reveal}>
                                <Form.Control
                                    required
                                    type='name'
                                    placeholder='Введите Имя'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></Form.Control>
                            </motion.div>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='email'>
                            <motion.div variants={reveal}>
                                <Form.Label>Email</Form.Label>
                            </motion.div>
                            <motion.div variants={reveal}>
                                <Form.Control
                                    required
                                    type='email'
                                    placeholder='Введите Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></Form.Control>
                            </motion.div>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='password'>
                            <motion.div variants={reveal}>
                                <Form.Label>Пароль</Form.Label>
                            </motion.div>
                            <motion.div variants={reveal}>
                                <Form.Control
                                    required
                                    type='password'
                                    placeholder='Введите пароль'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                >
                                </Form.Control>
                            </motion.div>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='passwordConfirm'>
                            <motion.div variants={reveal}>
                                <Form.Label>Подтверждение пароля</Form.Label>
                            </motion.div>
                            <motion.div variants={reveal}>
                                <Form.Control
                                    required
                                    type='password'
                                    placeholder='Подтвердите пароль'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                ></Form.Control>
                            </motion.div>
                        </Form.Group>

                        <motion.div variants={reveal}>
                            <Button className='size-btn btn btn-dark mb-3' type='submit' style={{width: 100 + '%'}}>Создать</Button>
                        </motion.div>
                    </Form>
                </motion.div>
            }

            {
                (!error && !loading) &&
                <Row className='py-3 text-sm-center'>
                    <Col>
                        <motion.div
                            variants={reveal}
                            initial='hiddenVariantX'
                            animate='revealedVariantX'
                            transition={{
                                ease: 'easeIn',
                                type: 'spring',
                                staggerChildren: .1,
                                duration: 1,
                                delayChildren: animationStart,
                                delay: animationStart + 1
                            }}
                        >
                            Есть аккаунт? <Link
                                className='create-acc'
                                to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                                Войти
                            </Link>
                        </motion.div>
                    </Col>
                </Row>
            }
        </FormContainer>
    );
}

export default RegisterScreen;