import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Row, Col, Form, Button, Container, Table} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {getUserDetails, updateUserProfile} from "../actions/userActions";
import {USER_UPDATE_PROFILE_RESET} from "../constants/userConstants";
import {listMyOrders} from "../actions/orderActions";

import {motion} from "framer-motion";
import {animationStart, reveal} from "../utils/animation";


function ProfileScreen({history}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, user, error} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const {loading: loadingOrders, error: errorOrders, orders} = orderListMy

    const navigate = useNavigate();

    const [trackLimit, setTrackLimit] = useState(0)

    const windowInnerWidth = document.documentElement.clientWidth
    const windowInnerHeight = document.documentElement.clientHeight

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
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user ||
                !user.name ||
                success ||
                userInfo._id !== user._id
            ) {
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
        const track = document.getElementById("table")
        if ((windowInnerWidth <= 896 && windowInnerHeight <= 414) || (windowInnerWidth <= 414 && windowInnerHeight <= 896)) {
            setTrackLimit(-67.5)
        } else if ((windowInnerWidth <= 768 && windowInnerHeight <= 1024) || (windowInnerWidth <= 1024 && windowInnerHeight <= 768)) {
            setTrackLimit(-57)
        } else {
            setTrackLimit(-19)
        }
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, [dispatch, userInfo, navigate, user, success])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Введенные пароли не совпадают!')
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password,
            }))
            setMessage('')
        }
    }

    const [leftBtnLimit, setLeftBtnLimit] = useState(true)
    const [rightBtnLimit, setRightBtnLimit] = useState(false)

    const trackLeft = () => {
        const track = document.getElementById("table");

        if (Number(track.dataset.position) < 0) {
            track.dataset.position = Number(track.dataset.position) + 25
            setLeftBtnLimit(false)
            setRightBtnLimit(false)
            if (track.dataset.position > -60 && track.dataset.position > 0) {
                track.dataset.position = 0
                setLeftBtnLimit(true)
                setRightBtnLimit(false)
            }
            track?.animate({
                transform: `translate(${Number(track.dataset.position)}%, 0%)`
            }, { duration: 300, fill: "forwards" });
            console.log(60 + (Number(track.dataset.position) / 25))
        }
    }

    const trackRight = () => {
        const track = document.getElementById("table");

        if (Number(track.dataset.position) >= trackLimit) {
            track.dataset.position = Number(track.dataset.position) - 25
            setRightBtnLimit(false)
            setLeftBtnLimit(false)
            if (track.dataset.position < trackLimit) {
                track.dataset.position = trackLimit
                setRightBtnLimit(true)
                setLeftBtnLimit(false)
            }
            track?.animate({
                transform: `translate(${Number(track.dataset.position)}%, 0%)`
            }, { duration: 300, fill: "forwards" });
            console.log(60 + (Number(track.dataset.position) / 25))
        }
    }

    return (loading || loadingOrders) ?
        (<Loader/>) :
        (
            <Container>
                <Row>
                    <Col md={3}>
                        <motion.h2
                            className='text-center'
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
                        >Мой Профиль</motion.h2>
                        {message && <Message variant='danger'>{message}</Message>}
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
                                    delayChildren: animationStart,
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
                                            <Form.Label>Изменить пароль</Form.Label>
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

                                    <Form.Group className='mb-3' controlId='passwordConfirm'>
                                        <motion.div variants={reveal}>
                                            <Form.Label>Подтверждение пароля</Form.Label>
                                        </motion.div>
                                        <motion.div variants={reveal}>
                                            <Form.Control
                                                type='password'
                                                placeholder='Подтвердите пароль'
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            ></Form.Control>
                                        </motion.div>
                                    </Form.Group>

                                    <motion.div variants={reveal}>
                                        <Button className='size-btn btn btn-dark mb-3' type='submit' style={{width: 100 + '%'}}>Обновить</Button>
                                    </motion.div>
                                </Form>
                            </motion.div>
                        }
                    </Col>
                    <Col md={9} className='overflow-hidden'>
                        <motion.h2
                            className='text-center'
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
                        >Мои Заказы</motion.h2>
                        {
                            errorOrders ? (
                                <Message variant='danger'>
                                    {errorOrders}
                                </Message>
                            ) : (
                                <motion.div
                                    id='profile-screen'
                                    variants={reveal}
                                    initial='hiddenVariantX'
                                    animate='revealedVariantX'
                                    transition={{
                                        ease: 'easeIn',
                                        type: 'spring',
                                        staggerChildren: .01,
                                        duration: 1,
                                        delayChildren: animationStart,
                                        delay: animationStart
                                    }}
                                >
                                    <div className='img-track-btns'>
                                        <button onClick={trackLeft} disabled={leftBtnLimit}><i className="fa-solid fa-arrow-left"></i></button>
                                        <button onClick={trackRight} disabled={rightBtnLimit}><i className="fa-solid fa-arrow-right"></i></button>
                                    </div>
                                    <Table striped responsive className='table-sm text-center' data-position="0"
                                           id='table'>
                                        <thead>
                                            <tr>
                                                <motion.th variants={reveal}>ID</motion.th>
                                                <motion.th variants={reveal}>Дата</motion.th>
                                                <motion.th variants={reveal}>Сумма</motion.th>
                                                <motion.th variants={reveal}>Оплачено</motion.th>
                                                <motion.th variants={reveal}>Детали</motion.th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map(order => {
                                                return (
                                                    <tr key={order._id}>
                                                        <motion.td variants={reveal}>{order._id}</motion.td>
                                                        <motion.td variants={reveal}>{order.createdAt.substring(0, 10)}</motion.td>
                                                        <motion.td variants={reveal}><strong>₽ </strong>{order.totalPrice}</motion.td>
                                                        <motion.td variants={reveal}>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                                            <i className='fa-solid fa-xmark fa-l' style={{color: 'red'}}></i>
                                                        )}</motion.td>
                                                        <motion.td width={50} variants={reveal}>
                                                            <LinkContainer to={`/order/${order._id}`}>
                                                                <Button  variant='dark' className='size-btn btn-sm'>
                                                                    <i className="fa-solid fa-info fa-xl"></i>
                                                                </Button>
                                                            </LinkContainer>
                                                        </motion.td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </motion.div>
                            )
                        }
                    </Col>
                </Row>
                <br/>
            </Container>
    );
}

export default ProfileScreen;