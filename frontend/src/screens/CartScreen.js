import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Row, Col, ListGroup, Image, Form, Button, Card, Container} from "react-bootstrap";
import Message from "../components/Message";
import {addToCart, removeFromCart} from "../actions/cartActions";
import Size from "../components/Size";
// import {useState} from "@types/react";


function CartScreen(location, history) {
    const { id } = useParams();
    const productId = id
    let q = window.location.search ? window.location.search.split('?') : 1
    const qty = window.location.search ? Number(q[1].split('=')[1]) : 1
    const size = window.location.search ? q[2].split('=')[1] : 1

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
                    <h1>Корзина</h1>
                    {
                        cartItems.length !== 0 && (
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col md={2}></Col>
                                        <Col md={3}></Col>
                                        <Col md={2}></Col>
                                        <Col md={3}>
                                            <h6 className='text-center'>Количество</h6>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        )
                    }
                    {cartItems.length === 0 && (
                        <div style={{height: 55 + 'px'}}>
                            <Message>
                                Корзина пуста. <Link className="back-to-homepage" to='/'>Вернуться к товарам.</Link>
                            </Message>
                        </div>

                    )}
                    {cartItems.length !== 0 && (
                        <ListGroup variant='flush'>
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.size}>
                                    <Row>
                                        <Col md={2}>
                                            <Image className='mb-3' src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col md={3}>
                                            <Link className='cart-item-title' to={`/product/${item.product}`}>{item.name}</Link> <h6 className='mt-0'>{item.size}</h6>
                                        </Col>
                                        <Col md={2} className='fs-6 fw-bold text-center mb-1'>
                                            ₽{item.price}
                                        </Col>
                                        <Col md={3}>
                                            <Form.Control className="qty-form" as="select" value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value), item.size))}>
                                                {
                                                    [...Array(item.countInStock !== 0 ? item.countInStock : ((item.size === "S" && item.sizeInStockS) || (item.size === "M" && item.sizeInStockM) || (item.size === "L" && item.sizeInStockL) || (item.size === "XL" && item.sizeInStockXL))).keys()].map((x) => (
                                                        <option key={x+1} value={x+1}>{x+1}</option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                        <Col md={1}>
                                            <Button className='mt-3' type='button' variant='light' onClick={() => removeFromCartHandler(item.product, item.size)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
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
                                    <ListGroup.Item>
                                        <h2 style={{textAlign: "center"}} className='mb-3'>Детали заказа</h2>
                                        <div className="cart-sub-total mb-3">
                                            <span>
                                                {cartItems.reduce((acc, item) => acc + item.qty, 0)} {cartQty(cartItems.reduce((acc, item) => acc + item.qty, 0))}
                                            </span>
                                            ₽{(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0))}
                                        </div>
                                        {/*<div className="mb-3">Купон:</div>*/}
                                        {/*<div className="input-group">*/}
                                        {/*    <input id='coupon' type="text" className="form-control" placeholder="Используйте купон" aria-label="Используйте купон" aria-describedby="button-addon2" onKeyPress={cupon} maxLength={5}/>*/}
                                        {/*    <button className="btn btn-outline-secondary bg-black" type="button" id="button-addon2" onClick={cupon}>Применить</button>*/}
                                        {/*</div>*/}
                                        {/*<div className='ur-sale mb-3'>Ваша скидка: {sale}%</div>*/}
                                        <div className="cart-total mb-3">
                                            <b>Итого:</b>
                                            ₽{(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)) - (cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)) * (sale/100)}
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>

                                <ListGroup.Item>
                                    <Button
                                        type='button'
                                        className='size-btn btn btn-dark checkout-btn'
                                        disabled={cartItems.length === 0}
                                        onClick={checkOutHandler}
                                    >
                                        Перейти к оплате
                                    </Button>
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