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
            setSale(20)
        } else {
            setSale(0)
        }
    }

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) * ((100 - sale)/100)
    // cart.shippingPrice = cart.itemsPrice > 20000 ? 0 : 1000
    cart.shippingPrice = 0
    cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice)

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`)
            // dispatch({type: ORDER_CREATE_RESET})
        }
    }, [success, navigate])

    const placeOrder = () => {
        if (!cart.paymentMethod) {
            navigate('/payment')
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
                <CheckoutSteps step1 step2 step3 step4/>
            </FormContainer>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Доставка</h2>
                            <p>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Оплата</h2>
                            <p>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Заказ</h2>
                            {cart.cartItems.length === 0 ? <Message variant='info'>
                                Корзина пуста
                            </Message> : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item) => (
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
                                    <Col>₽{cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>ship</Col>
                                    <Col>₽{cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <div className="mb-1">Купон:</div>
                                    <div className='input-group mb-1'>
                                        <input id='coupon' type="text" className="form-control" placeholder="Используйте купон" aria-label="Используйте купон" aria-describedby="button-addon2" onKeyPress={cupon} maxLength={5}/>
                                        <button className="btn btn-outline-secondary bg-black" type="button" id="button-addon2" onClick={cupon}>
                                            Применить
                                        </button>
                                    </div>
                                    {
                                        sale !== 0 ?
                                            <div className='ur-sale'>
                                                Ваша скидка: {sale}%
                                            </div> :
                                            <div
                                                className='ur-sale'
                                                style={{color: 'red'}}
                                            >
                                                Недействительный купон
                                            </div>
                                    }
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>itog</Col>
                                    <Col>
                                        ₽{cart.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    className='size-btn btn btn-dark'
                                    type='button'
                                    style={{width: 100 + '%'}}
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrder}
                                >
                                    Продолжить
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default PlaceOrderScreen;