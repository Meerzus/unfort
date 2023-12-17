import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Row, Col, Form, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import {login} from "../actions/userActions";
import {USER_LOGOUT} from "../constants/userConstants";

import {motion} from "framer-motion";
import {animationStart, reveal} from "../utils/animation";


function LoginScreen({location, history}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const redirect = window.location.search ? window.location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const {loading, userInfo, error} = userLogin

    const navigate = useNavigate();

    const extraMenuClose = () => {
        const menu = document.querySelector('.extra-menu')
        const backGround = document.querySelector('.extra-background')

        menu.animate({
            left: '-16rem'
        }, 250)

        backGround.animate({
            opacity: '0'
        }, 250)

        setTimeout(() => {menu.style.left = '-16rem'}, 249)
        setTimeout(() => {backGround.style.display = 'none'}, 249)
    }

    useEffect(() => {
        extraMenuClose()
        if (userInfo) {
            navigate(redirect)
        }
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
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
            <motion.h1
                className='text-sm-center loginScreen'
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

            {loading && <Loader/>}

            {error &&
                <motion.div
                    style={{height: 55 + 'px'}}
                    variants={reveal}
                    initial='hiddenVariantX'
                    animate='revealedVariantX'
                    transition={{
                        ease: 'easeIn',
                        type: 'spring',
                        staggerChildren: .25,
                        duration: 1,
                        delayChildren: animationStart,
                        delay: animationStart
                    }}
                >
                    <Message variant='danger'>
                        Введен неверный Логин/Пароль! <Link className='try-again text-sm-center' onClick={tryAgain}>Попробовать
                        снова</Link>
                    </Message>
                </motion.div>
            }
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
                        <Form.Group className='mb-3' controlId='email'>
                            <motion.div variants={reveal}>
                                <Form.Label>Email</Form.Label>
                            </motion.div>
                            <motion.div variants={reveal}>
                                <Form.Control
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
                                    type='password'
                                    placeholder='Введите пароль'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                ></Form.Control>
                            </motion.div>
                        </Form.Group>

                        <motion.div variants={reveal}>
                            <Button className='size-btn btn btn-dark mb-3' type='submit' style={{width: 100 + '%'}}>Войти</Button>
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
                                delay: animationStart + .75
                            }}
                        >
                            Нет аккаунта? <Link
                                className='create-acc'
                                to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                                Создать
                            </Link>
                        </motion.div>
                    </Col>
                </Row>
            }
        </FormContainer>
    );
}

export default LoginScreen;