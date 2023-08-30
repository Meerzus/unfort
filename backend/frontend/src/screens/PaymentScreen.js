import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import Tinkoff from "react-tinkoff-pay";
import {Form, Button, Container, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import {savePaymentMethod} from "../actions/cartActions";

function PaymentScreen({history}) {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState('paypal')

    const submitHandler = (e) => {
        if (!shippingAddress.address) {
            navigate('/shipping')
        } else {
            e.preventDefault()
            dispatch(savePaymentMethod(paymentMethod))
            navigate('/placeorder')
        }
    }

    const extraMenuClose = () => {
        const menu = document.querySelector('.extra-menu')

        menu.animate({
            left: '-16rem'
        }, 250)

        setTimeout(() => {menu.style.left = '-16rem'}, 249)
    }

    useEffect(() =>{
        extraMenuClose()
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, [])

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <Container>
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label as='legend'>select</Form.Label>
                        <Col>
                            <Form.Check
                                className='mb-3'
                                type='radio'
                                label='PayPal or qew'
                                id='paypal'
                                name='paymentMethod'
                                checked
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                            </Form.Check>
                        </Col>
                    </Form.Group>
                    <Button
                        className='size-btn btn btn-dark'
                        type='submit'
                        style={{width: 100 + '%'}}
                    >
                        Продолжить
                    </Button>
                </Form>
            </Container>
        </FormContainer>
    );
}

export default PaymentScreen;