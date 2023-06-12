import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {Button, Row, Col, ListGroup, Image, Card, Container, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Tinkoff from 'react-tinkoff-pay'

import FormContainer from "../components/FormContainer";
import {addToCart} from "../actions/cartActions";
import {getOrderDetails, payOrder, deliverOrder} from "../actions/orderActions";
import {ORDER_PAY_RESET, ORDER_DELIVER_RESET} from "../constants/orderConstants";


function OrderScreen({match}) {
    const { id } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [sdkReady, setSdkReady] = useState(false)
    const [paymentReady, setPaymentReady] = useState(false)
    const [isDelivered, setIsDelivered] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const {order, error, loading} = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const {loading: loadingPay, success: successPay} = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const {loading: loadingDeliver, success: successDeliver} = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

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
            setSdkReady(true)
        }
    }, [dispatch, order, id, successPay, successDeliver])

    const successPaymentHandler = (paymentResult) => {
        setPaymentReady(true)
        dispatch(payOrder(id, paymentResult))
        // console.log(Tinkoff.Pay._this)
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    const handleToggle = () => setIsDelivered(!isDelivered);

    const tinkoffForm = (order) => {
        Tinkoff.Link({
            terminalkey: '1680349104054DEMO',
            frame: 'true',
            language: 'ru',
            amount: order.totalPrice,
            order: order._id,
            description: order.shippingAddress,
            name: order.user.name,
            email: order.user.email,
            phone: order.user.phone
        }, link => {
            console.log(link) // => https://securepay.tinkoff.ru/xo7L8v
        })
        let form;
        return (
             form = {
                terminalkey: '1680349104054DEMO',
                frame: 'true',
                language: 'ru',
                amount: order.totalPrice,
                order: order._id,
                description: order.shippingAddress,
                name: order.user.name,
                email: order.user.email,
                phone: order.user.phone
            }
        )
    }

    return loading ? (
        <Loader/>
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
            <Container>
                <h1>Order: {order._id}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Доставка</h2>

                                <p>
                                    <strong>Name: </strong>{order.user.name}
                                </p>

                                <p>
                                    <strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                </p>

                                <p>
                                    {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode} {' '} {userInfo && userInfo.isAdmin && order.isPaid && (
                                        <Form.Switch
                                            type="switch"
                                            label='is delivered'
                                            checked={order.isDelivered}
                                            onChange={deliverHandler}
                                            disabled={order.isDelivered}
                                        >

                                        </Form.Switch>
                                    )}
                                </p>

                                {
                                    order.isDelivered ? (
                                        <Message variant='success'>
                                            Delivered on {order.deliveredAt.substring(0, 10)}
                                        </Message>
                                    ) : (
                                        <Message variant='warning'>
                                            Not Delivered
                                        </Message>
                                    )
                                }


                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Оплата</h2>
                                <p>
                                    {order.paymentMethod}
                                </p>
                                {
                                    order.isPaid ? (
                                        <Message variant='success'>
                                            Paid on {order.paidAt.substring(0, 10)}
                                        </Message>
                                    ) : (
                                        <Message variant='warning'>
                                            Not Paid
                                        </Message>
                                    )
                                }
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Заказ</h2>
                                {order.orderItems.length === 0 ? <Message variant='info'>
                                    Корзина пуста
                                </Message> : (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item) => (
                                            <ListGroup.Item key={item.size}>
                                                <Row>
                                                    <Col md={2}>
                                                        <Image className='mb-3' src={item.image} alt={item.name} fluid rounded/>
                                                    </Col>
                                                    <Col>
                                                        <Link className='cart-item-title' to={`/product/${item.product}`}>{item.name}</Link> <h6 className='mt-0'>{item.size}</h6>
                                                    </Col>
                                                    <Col md={3} className='fs-6 text-center mb-1'>
                                                        {item.qty} X ₽{item.price}
                                                    </Col>
                                                    <Col md={2} className='fs-6 text-center fw-bold mb-1'>
                                                        ₽{item.price * item.qty}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>

                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Итог</h2>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>₽{order.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>ship</Col>
                                        <Col>₽{order.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>itog</Col>
                                        <Col>
                                            ₽{order.totalPrice}
                                        </Col>
                                    </Row>
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

                                        <Row>
                                            <Button
                                            variant='dark'
                                            className='size-btn'
                                            type='button' onClick={successPaymentHandler}>
                                                Купить
                                            </Button>
                                        </Row>

                                        {paymentReady &&
                                            <Tinkoff.Pay form={tinkoffForm(order)} onClose={() => setPaymentReady(false)} />
                                        }
                                    </ListGroup.Item>
                                )}
                            </ListGroup>

                            {/*{userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (*/}
                            {/*    <ListGroup.Item>*/}

                            {/*    </ListGroup.Item>*/}
                            {/*)}*/}
                        </Card>
                    </Col>
                </Row>
            </Container>
    );
}

export default OrderScreen;