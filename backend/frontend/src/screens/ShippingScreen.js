import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Form, Button, Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import {saveShippingAddress} from "../actions/cartActions";

function ShippingScreen({history}) {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()

    const [city, setCity] = useState(shippingAddress.city)
    const [fullName, setFullName] = useState(shippingAddress.fullName)
    const [address, setAddress] = useState(shippingAddress.address)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber)
    const [socials, setSocials] = useState(shippingAddress.socials)
    const [infoSource, setInfoSource] = useState(shippingAddress.infoSource)

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({city, fullName, address, postalCode, phoneNumber, socials, infoSource}))
        navigate('/payment')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                 <Form.Group className='mb-3' controlId='city'>
                    <Form.Label>city</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Введите city'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                 <Form.Group className='mb-3' controlId='fullName'>
                    <Form.Label>fullName</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Введите fullName'
                        value={fullName ? fullName : ''}
                        onChange={(e) => setFullName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className='mb-3' controlId='address'>
                    <Form.Label>address</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Введите address'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className='mb-3' controlId='postalCode'>
                    <Form.Label>postalCode</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Введите city'
                        value={postalCode ? postalCode : ''}
                        onChange={(e) => setPostalCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className='mb-3' controlId='country'>
                    <Form.Label>tel</Form.Label>
                    <Form.Control
                        required
                        type='tel'
                        maxLength={11}
                        placeholder='Введите phoneNumber'
                        value={phoneNumber ? phoneNumber : ''}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className='mb-3' controlId='socials'>
                    <Form.Label>socials</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Введите socials'
                        value={socials ? socials : ''}
                        onChange={(e) => setSocials(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className='mb-3' controlId='infoSource'>
                    <Form.Label>infoSource</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Введите infoSource'
                        value={infoSource ? infoSource : ''}
                        onChange={(e) => setInfoSource(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button className='size-btn btn btn-dark' type='submit' style={{width: 100 + '%'}}>
                    Продолжить
                </Button>
            </Form>
        </FormContainer>
    );
}

export default ShippingScreen;