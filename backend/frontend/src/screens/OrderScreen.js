import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {Button, Row, Col, ListGroup, Image, Card, Container, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
// import Tinkoff from 'react-tinkoff-pay'

import FormContainer from "../components/FormContainer";
import {addToCart} from "../actions/cartActions";
import {getOrderDetails, payOrder, deliverOrder} from "../actions/orderActions";
import {ORDER_PAY_RESET, ORDER_DELIVER_RESET, ORDER_PAY_SUCCESS} from "../constants/orderConstants";

import {motion} from "framer-motion";
import {animationStart, reveal} from "../utils/animation";
import axios from "axios";
import {sha256} from "js-sha256";

// const telegramApi = require('node-telegram-bot-api')


function OrderScreen({match}) {
    const { id } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const tgToken = '6375899567:AAEL9i_83NDSPRm8aIPmWlHH9pFOW_HFcuI'
    // const bot = new telegramApi(tgToken, {polling: true})

    const [sdkReady, setSdkReady] = useState(false)
    const [paymentReady, setPaymentReady] = useState(false)
    const [isDelivered, setIsDelivered] = useState(false)

    const [getLink, setGetLink] = useState('')

    const orderDetails = useSelector(state => state.orderDetails)
    const {order, error, loading} = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const {loading: loadingPay, success: successPay} = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const {loading: loadingDeliver, success: successDeliver} = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const cart = useSelector(state => state.cart)

    const [coupon, setCoupon] = useState(['unf23', 'UNF23'])
    const [tryCoupon, setTryCoupon] = useState('')
    const [sale, setSale] = useState(0)

    // 1680349104054DEMO

    const tinkoffScript = () => {
        setSdkReady(true)
    }

    const cupon = () => {
        setTryCoupon((document.querySelector('#coupon').value))
        if (coupon.includes(document.querySelector('#coupon').value)) {
            setSale(20)
        } else {
            setSale(0)
        }
    }

    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0) * ((100 - sale)/100)

        // bot.on('message', msg => {
        //     const chatId = '-957139795'
        //     console.log(msg)
        //     bot.sendMessage()
        // })
    }

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }

        if (!order || successPay || order._id !== Number(id) || successDeliver) {
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVER_RESET})

            dispatch(getOrderDetails(id))
        } else if (!order.isPaid) {
            axios
                .post('https://securepay.tinkoff.ru/v2/Init', {
                    TerminalKey: "1687356961617",
                    Amount: Number(Math.round(order.totalPrice)) * 100,
                    OrderId: order._id,
                    Description: order._id,
                    DATA: {
                        Phone: userInfo.phoneNumber,
                        Email: userInfo.email
                    },
                    Receipt: {
                        Email: userInfo.email,
                        Phone: (cart.shippingAddress.phoneNumber).replace('8', '+7'),
                        EmailCompany: "unfort@mail.ru",
                        Taxation: "osn",
                        Items: [{
                            Name: `Заказ: ${order._id}`,
                            Price: Number(Math.round(order.totalPrice)) * 100,
                            Quantity: 1.00,
                            Amount: Number(Math.round(order.totalPrice)) * 100,
                            PaymentMethod: "full_prepayment",
                            PaymentObject: "commodity",
                            Tax: "vat10"
                        }]
                    },
                })
                .then((initResponse) => {
                    console.log(initResponse.data)
                    setGetLink(initResponse.data.PaymentURL)
                    console.log(getLink)
                    setPaymentReady(true)
                    if (initResponse.data.Details === `Заказ ${order._id} был оплачен.`) {
                        console.log('oplacheno')
                        dispatch(payOrder(order._id, initResponse.data))
                    }
                    const concat = `73z0hrpj2t58vwiv` + `${initResponse.data.PaymentId}` + `${initResponse.data.TerminalKey}`
                    const token = sha256(concat)
                    console.log(concat)
                    console.log(token)
                })
                .catch((initError) => {
                    console.error(initError)
                })
            setSdkReady(true)
        }
    }, [dispatch, order, id, successPay, successDeliver])

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    const handleToggle = () => setIsDelivered(!isDelivered);

    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timezone: 'UTC'
    };

    let paidDate = order && new Date(Date.parse(order.paidAt) - 420 * 60000).toLocaleString("ru", options)
    let deliveredDate = order && new Date(Date.parse(order.deliveredAt) - 420 * 60000).toLocaleString("ru", options)

    // let success = document.querySelector('iframe[name="pay-form-iframe"]');
    // let success1 = success.querySelector('eacq-pf-root[id="initial-form"]')
    // console.log(success)
    // console.log(success1)
    // console.log(order)


    return loading ? (
        <Loader/>
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
            <Container>
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
                        delay: animationStart - .5
                    }}
                >
                    <motion.h1
                        variants={reveal}
                        className='text-center'
                    >Заказ: {order._id}</motion.h1>
                    <Row>
                        <Col md={8}>
                            <motion.ListGroup>
                                <ListGroup.Item>
                                    <motion.h2 variants={reveal}>Доставка</motion.h2>

                                    <motion.div variants={reveal}>
                                        <strong>Имя: </strong>{order.user.name}
                                    </motion.div>

                                    <motion.div variants={reveal}>
                                        <strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                    </motion.div>

                                    <motion.div variants={reveal}>
                                        {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode} {' '} {userInfo && userInfo.isAdmin && order.isPaid && (
                                            <Form.Switch
                                                type="switch"
                                                label='Доставлено'
                                                checked={order.isDelivered}
                                                onChange={deliverHandler}
                                                disabled={order.isDelivered}
                                            ></Form.Switch>
                                        )}
                                    </motion.div>

                                    <motion.div variants={reveal}>
                                        {
                                            order.isDelivered ? (
                                                <Message variant='success'>
                                                    Заказ доставлен {deliveredDate} (МСК)
                                                </Message>
                                            ) : (
                                                <Message variant='warning'>
                                                    Заказ еще не доставлен
                                                </Message>
                                            )
                                        }
                                    </motion.div>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <motion.div variants={reveal}>
                                        <h2>Оплата</h2>
                                    </motion.div>

                                    <motion.div variants={reveal}>
                                        {
                                            order.isPaid ? (
                                                <Message variant='success'>
                                                    Заказ оплачен {paidDate} (МСК)
                                                </Message>
                                            ) : (
                                                <Message variant='warning'>
                                                    Заказ не оплачен
                                                </Message>
                                            )
                                        }
                                    </motion.div>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <motion.div variants={reveal}>
                                        <h2>Заказ</h2>
                                    </motion.div>
                                    {order.orderItems.length === 0 ? <motion.div variants={reveal}>
                                        <Message variant='info'>
                                            Корзина пуста
                                        </Message>
                                    </motion.div> : (
                                        <ListGroup variant='flush'>
                                            {order.orderItems.map((item) => (
                                                <motion.div variants={reveal} className='border-bottom'>
                                                    <ListGroup.Item key={item.size} className='border-0'>
                                                        <Row>
                                                            <Col md={2}>
                                                                <Image className='mb-3' src={item.image} alt={item.name} fluid rounded/>
                                                            </Col>
                                                            <Col>
                                                                <Link className='cart-item-title' to={`/product/${item.product}`}>{item.name}</Link>
                                                            </Col>
                                                            <Col md={3} className='fs-6 text-center mb-1'>
                                                                {item.qty} X ₽{item.price}
                                                            </Col>
                                                            <Col md={2} className='fs-6 text-center fw-bold mb-1'>
                                                                ₽{item.price * item.qty}
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                </motion.div>
                                            ))}
                                        </ListGroup>
                                    )}
                                </ListGroup.Item>
                            </motion.ListGroup>
                        </Col>

                        <Col md={4}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <motion.h2 variants={reveal}>Итог</motion.h2>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <motion.div variants={reveal}>
                                            <Row>
                                                <Col>Заказ</Col>
                                                <Col>₽{order.itemsPrice}</Col>
                                            </Row>
                                        </motion.div>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <motion.div variants={reveal}>
                                            <Row>
                                                <Col>Скидка</Col>
                                                <Col>₽{order.itemsPrice - Math.round(order.totalPrice)}</Col>
                                            </Row>
                                        </motion.div>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <motion.div variants={reveal}>
                                            <Row>
                                                <Col>Доставка</Col>
                                                <Col>₽{order.shippingPrice}</Col>
                                            </Row>
                                        </motion.div>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <motion.div variants={reveal}>
                                            <Row>
                                                <Col>Сумма</Col>
                                                <Col>
                                                    ₽{Math.round(order.totalPrice)}
                                                </Col>
                                            </Row>
                                        </motion.div>
                                    </ListGroup.Item>

                                    {/*<ListGroup.Item>*/}
                                    {/*    <Row>*/}
                                    {/*        <Button variant='dark' className='size-btn' type='button' onClick={() => {}}>*/}
                                    {/*            Купить*/}
                                    {/*        </Button>*/}
                                    {/*    </Row>*/}
                                    {/*</ListGroup.Item>*/}

                                    {!order.isPaid && (
                                        <ListGroup.Item>
                                            {loadingPay && <Loader/>}

                                            <motion.div variants={reveal}>
                                                {/*<Tinkoff.Pay form={form} onClose={() => console.log('close')} />*/}
                                                <Row>
                                                    <Button
                                                        variant='dark'
                                                        className='size-btn'
                                                        type='button'
                                                        // onClick={successPaymentHandler}
                                                        href={`${getLink}`}
                                                        target='_blank'
                                                    >
                                                        Купить
                                                    </Button>
                                                    {/*<a className='size-btn' href={`${getLink}`}>купить</a>*/}
                                                </Row>
                                            </motion.div>
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </motion.div>
            </Container>
    );
}

export default OrderScreen;