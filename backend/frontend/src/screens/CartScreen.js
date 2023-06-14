import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Row, Col, ListGroup, Image, Form, Button, Card, Container} from "react-bootstrap";
import Message from "../components/Message";
import {addToCart, removeFromCart} from "../actions/cartActions";
import Size from "../components/Size";
// import {useState} from "@types/react";

import {motion} from "framer-motion";
import {animationStart, reveal} from "../utils/animation";


function CartScreen(location, history) {
    const { id } = useParams();
    const productId = id
    let q = window.location.hash ? window.location.hash.split('?') : 1
    const qty = window.location.hash ? Number(q[1].split('=')[1]) : 1
    const size = window.location.hash ? q[2].split('=')[1] : 1

    console.log(qty)
    console.log(size)

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    function cartQty(x) {
        if (x === 1) {
            return "товар"
        } else if ((x/2 === 1) || (x/3 === 1) || (x/4 === 1)) {
            return "товара"
        } else return "товаров"
    }

    const [coupon, setCoupon] = useState(['unf23', 'UNF23'])
    const [tryCoupon, setTryCoupon] = useState('')
    const [sale, setSale] = useState(0)

    const cupon = () => {
        setTryCoupon((document.querySelector('#coupon').value))
        if (coupon.includes(document.querySelector('#coupon').value)) {
            setSale(20)
        } else {
            setSale(0)
        }
    }

    const userLogin = useSelector(state => state.userLogin)
    const {loading, userInfo, error} = userLogin

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty, size, sale))
        }
    }, [dispatch, productId, qty, size])

    const removeFromCartHandler = (id, size) => {
        dispatch(removeFromCart(id, size))
    }

    const navigate = useNavigate();

    const checkOutHandler = () => {
        if (!userInfo){
            navigate('/login')
        } else {
            navigate('/shipping')
        }
    }

    return (
        <Container>
            <Row>
                <Col md={8}>
                    <motion.h1
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
                    >Корзина</motion.h1>
                    {
                        cartItems.length !== 0 && (
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col md={2}></Col>
                                        <Col md={3}></Col>
                                        <Col md={2}></Col>
                                        <Col md={3}>
                                            <motion.h6
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
                                                    delay: animationStart + .75
                                                }}
                                            >Количество</motion.h6>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        )
                    }
                    {cartItems.length === 0 && (
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
                                delay: animationStart - .5
                            }}
                        >
                            <Message variants={reveal}>
                                Корзина пуста. <Link className="back-to-homepage" to='/'>Вернуться к товарам.</Link>
                            </Message>
                        </motion.div>

                    )}
                    {cartItems.length !== 0 && (
                        <ListGroup variant='flush'>
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.size}>
                                    <Row>
                                        <Col md={2}>
                                            <motion.div
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
                                                <Image className='mb-3' src={item.image} alt={item.name} fluid rounded/>
                                            </motion.div>
                                        </Col>
                                        <Col md={3}>
                                            <motion.div
                                                variants={reveal}
                                                initial='hiddenVariantY'
                                                animate='revealedVariantY'
                                                transition={{
                                                    ease: 'easeIn',
                                                    type: 'spring',
                                                    staggerChildren: .25,
                                                    duration: 1,
                                                    delayChildren: animationStart,
                                                    delay: animationStart + .25
                                                }}
                                            >
                                                <Link
                                                    className='cart-item-title'
                                                    to={`/product/${item.product}`}
                                                >{item.name}</Link>
                                            </motion.div>

                                            <motion.h6
                                                className='mt-0'
                                                variants={reveal}
                                                initial='hiddenVariantX'
                                                animate='revealedVariantX'
                                                transition={{
                                                    ease: 'easeIn',
                                                    type: 'spring',
                                                    staggerChildren: .25,
                                                    duration: 1,
                                                    delayChildren: animationStart,
                                                    delay: animationStart + .25
                                                }}
                                            >{item.size}</motion.h6>
                                            {/*{console.log(cartItems)}*/}
                                        </Col>

                                        <Col md={2} className='fs-6 fw-bold text-center mb-1'>
                                            <motion.div
                                                variants={reveal}
                                                initial='hiddenVariantX'
                                                animate='revealedVariantX'
                                                transition={{
                                                    ease: 'easeIn',
                                                    type: 'spring',
                                                    staggerChildren: .25,
                                                    duration: 1,
                                                    delayChildren: animationStart,
                                                    delay: animationStart + .5
                                                }}
                                            >
                                                ₽{item.price}
                                            </motion.div>
                                        </Col>
                                        <Col md={3}>
                                            <motion.div
                                                variants={reveal}
                                                initial='hiddenVariantX'
                                                animate='revealedVariantX'
                                                transition={{
                                                    ease: 'easeIn',
                                                    type: 'spring',
                                                    staggerChildren: .25,
                                                    duration: 1,
                                                    delayChildren: animationStart,
                                                    delay: animationStart + .75
                                                }}
                                            >
                                                <Form.Control className="qty-form" as="select" value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value), item.size))}>
                                                    {
                                                        [...Array(item.countInStock !== 0 ? item.countInStock : ((item.size === "S" && item.sizeInStockS) || (item.size === "M" && item.sizeInStockM) || (item.size === "L" && item.sizeInStockL) || (item.size === "XL" && item.sizeInStockXL))).keys()].map((x) => (
                                                            <option key={x+1} value={x+1}>{x+1}</option>
                                                        ))
                                                    }
                                                </Form.Control>
                                            </motion.div>
                                        </Col>
                                        <Col md={1}>
                                            <motion.div
                                                variants={reveal}
                                                initial='hiddenVariantY'
                                                animate='revealedVariantY'
                                                transition={{
                                                    ease: 'easeIn',
                                                    type: 'spring',
                                                    staggerChildren: .25,
                                                    duration: 1,
                                                    delayChildren: animationStart,
                                                    delay: animationStart + 1
                                                }}
                                            >
                                                <Button className='mt-3' type='button' variant='light' onClick={() => removeFromCartHandler(item.product, item.size)}>
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </motion.div>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                    {
                        cartItems.length !== 0 && (
                            <Card className='border-0'>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item className='pt-0'>
                                        <motion.h1
                                            style={{textAlign: "center"}}
                                            className='mb-3'
                                            variants={reveal}
                                            initial='hiddenVariantY'
                                            animate='revealedVariantY'
                                            transition={{
                                                ease: 'easeIn',
                                                type: 'spring',
                                                staggerChildren: .25,
                                                duration: 1,
                                                delayChildren: animationStart,
                                                delay: animationStart + 1.25
                                            }}
                                        >Детали заказа</motion.h1>
                                        <motion.div
                                            className="cart-sub-total mb-3"
                                            variants={reveal}
                                            initial='hiddenVariantX'
                                            animate='revealedVariantX'
                                            transition={{
                                                ease: 'easeIn',
                                                type: 'spring',
                                                staggerChildren: .25,
                                                duration: 1,
                                                delayChildren: animationStart,
                                                delay: animationStart + 1.25
                                            }}
                                        >
                                            <span>
                                                {cartItems.reduce((acc, item) => acc + item.qty, 0)} {cartQty(cartItems.reduce((acc, item) => acc + item.qty, 0))}
                                            </span>
                                            ₽{(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0))}
                                        </motion.div>

                                        <motion.div
                                            className="cart-total mb-3"
                                            variants={reveal}
                                            initial='hiddenVariantX'
                                            animate='revealedVariantX'
                                            transition={{
                                                ease: 'easeIn',
                                                type: 'spring',
                                                staggerChildren: .25,
                                                duration: 1,
                                                delayChildren: animationStart,
                                                delay: animationStart + 1.5
                                            }}
                                        >
                                            <b>Итого:</b>
                                            ₽{(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)) - (cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)) * (sale/100)}
                                        </motion.div>
                                    </ListGroup.Item>
                                </ListGroup>

                                <ListGroup.Item>
                                    <motion.div
                                        variants={reveal}
                                        initial='hiddenVariantX'
                                        animate='revealedVariantX'
                                        transition={{
                                            ease: 'easeIn',
                                            type: 'spring',
                                            staggerChildren: .25,
                                            duration: 1,
                                            delayChildren: animationStart,
                                            delay: animationStart + 1.75
                                        }}
                                    >
                                        <Button
                                            type='button'
                                            className='size-btn btn btn-dark checkout-btn'
                                            disabled={cartItems.length === 0}
                                            onClick={checkOutHandler}
                                        >
                                            Перейти к оплате
                                        </Button>
                                    </motion.div>
                                </ListGroup.Item>
                            </Card>
                        )
                    }
                </Col>
            </Row>
        </Container>
    );
}

export default CartScreen;