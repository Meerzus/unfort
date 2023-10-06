import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Button, Row, Col, ListGroup, Image, Card, Container, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import {addToCart} from "../actions/cartActions";
import {createOrder} from "../actions/orderActions";
import {ORDER_CREATE_RESET} from "../constants/orderConstants";

import axios from "axios";

import {motion} from "framer-motion";
import {animationStart, reveal} from "../utils/animation";


function PlaceOrderScreen({history}) {
    const navigate = useNavigate()

    const orderCreate = useSelector(state => state.orderCreate)
    const {order, error, success} = orderCreate

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const [coupon, setCoupon] = useState(['unf23', 'UNF23'])
    const [tryCoupon, setTryCoupon] = useState('')
    const [sale, setSale] = useState(0)

    const cupon = () => {
        setTryCoupon((document.querySelector('#coupon').value))
        if (coupon.includes(document.querySelector('#coupon').value)) {
            setSale(5)
        } else {
            setSale(0)
        }
    }

    if (document.querySelector('#coupon')?.value === '') {
        document.querySelector('.ur-sale')?.classList.add('d-none')
    } else {
        document.querySelector('.ur-sale')?.classList.remove('d-none')
    }

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) * ((100 - sale)/100)
    cart.shippingPrice = cart.itemsPrice > 8500 ? 0 : 1000
    // cart.shippingPrice = 0
    cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice)

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
        if (!cart.shippingAddress.address) {
            navigate('/shipping')
        } else {
            if (success) {
                navigate(`/order/${order._id}`)
                dispatch({type: ORDER_CREATE_RESET})
            }
        }
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, [success, navigate])

    const placeOrder = () => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping')
        } else {
            dispatch(createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                totalPrice: cart.totalPrice,
            }))
        }
    }


    return (
        <Container>
            <FormContainer>
                <motion.div
                    variants={reveal}
                    initial='hiddenVariantY'
                    animate='revealedVariantY'
                    transition={{
                        ease: 'easeIn',
                        type: 'spring',
                        staggerChildren: .2,
                        duration: 1,
                        delayChildren: animationStart,
                        delay: animationStart - .5
                    }}
                ><CheckoutSteps step1 step2 step3/></motion.div>
            </FormContainer>

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
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <motion.h2 variants={reveal}>Доставка</motion.h2>
                                <motion.p variants={reveal}>
                                    {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                                </motion.p>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <motion.h2 variants={reveal}>Заказ</motion.h2>
                                {cart.cartItems.length === 0 ?
                                    <motion.div variants={reveal}>
                                        <Message variant='info'>
                                            Корзина пуста
                                        </Message>
                                    </motion.div> : (
                                        <ListGroup variant='flush'>
                                            {cart.cartItems.map((item) => (
                                                <ListGroup.Item key={item.size}>
                                                    <Row>
                                                        <Col md={2}>
                                                            <motion.div variants={reveal}>
                                                                <Image className='mb-3' src={item.image} alt={item.name} fluid rounded/>
                                                            </motion.div>
                                                        </Col>
                                                        <Col>
                                                            <motion.div variants={reveal}>
                                                                <Link className='cart-item-title' to={`/product/${item.product}`}>{item.name}</Link> <motion.h6 variants={reveal} className='mt-0'>{item.size}</motion.h6>
                                                            </motion.div>
                                                        </Col>
                                                        <Col md={3} className='fs-6 text-center mb-1'>
                                                            <motion.div variants={reveal}>
                                                                {item.qty} X ₽{item.price}
                                                            </motion.div>
                                                        </Col>
                                                        <Col md={2} className='fs-6 text-center fw-bold mb-1'>
                                                            <motion.div variants={reveal}>
                                                                ₽{item.price * item.qty}
                                                            </motion.div>
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
                        <div>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <motion.h2 variants={reveal}>Итог</motion.h2>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <motion.div variants={reveal}>Корзина:</motion.div>
                                        </Col>
                                        <Col>
                                            <motion.div variants={reveal}>₽ {cart.itemsPrice}</motion.div>
                                        </Col>
                                    </Row>

                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <motion.div variants={reveal}>Доставка:</motion.div>
                                        </Col>
                                        <Col>
                                            <motion.div variants={reveal}>₽ {cart.shippingPrice}</motion.div>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <motion.div className="mb-1" variants={reveal}>
                                            Купон:
                                        </motion.div>
                                        <motion.div className='input-group mb-1' variants={reveal}>
                                            <motion.input id='coupon' type="text" className="form-control" placeholder="Используйте купон" aria-label="Используйте купон" aria-describedby="button-addon2" onKeyPress={cupon} maxLength={5} variants={reveal}/>
                                            <motion.button className="btn btn-outline-secondary bg-black" type="button" id="button-addon2" onClick={cupon} variants={reveal}>
                                                Применить
                                            </motion.button>
                                        </motion.div>
                                        {
                                            sale !== 0 ?
                                                <motion.div className='ur-sale' variants={reveal}>
                                                    Ваша скидка: {sale}%
                                                </motion.div> :
                                                <motion.div
                                                    className='ur-sale'
                                                    style={{color: 'red'}}
                                                    variants={reveal}
                                                >
                                                    Недействительный купон
                                                </motion.div>
                                        }
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <motion.div variants={reveal}>К оплате:</motion.div>
                                        </Col>
                                        <Col>
                                            <motion.div variants={reveal}>₽ {cart.totalPrice}</motion.div>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>


                                {error &&
                                    <ListGroup.Item>
                                        <Message variant='danger'>
                                            {error}
                                        </Message>
                                    </ListGroup.Item>
                                }

                                <ListGroup.Item>
                                    <motion.div variants={reveal}>
                                        <Button
                                            className='size-btn btn btn-dark'
                                            type='button'
                                            style={{width: 100 + '%'}}
                                            disabled={cart.cartItems === 0}
                                            onClick={placeOrder}
                                        >Продолжить</Button>
                                    </motion.div>
                                </ListGroup.Item>
                            </ListGroup>
                        </div>
                    </Col>
                </Row>
            </motion.div>
            <br/>
        </Container>
    );
}

export default PlaceOrderScreen;