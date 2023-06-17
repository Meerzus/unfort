import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Form, Button, Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import {saveShippingAddress} from "../actions/cartActions";

import {motion} from "framer-motion";
import {animationStart, reveal} from "../utils/animation";

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
            <motion.div
                className='text-center'
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
            ><CheckoutSteps step1 step2/></motion.div>

            <motion.h1
                className='text-center'
                variants={reveal}
                initial='hiddenVariantY'
                animate='revealedVariantY'
                transition={{
                    ease: 'easeIn',
                    type: 'spring',
                    staggerChildren: .2,
                    duration: 1,
                    delayChildren: animationStart,
                    delay: animationStart - .25
                }}
            >Доставка</motion.h1>

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
                     <Form.Group className='mb-3' controlId='city'>
                         <motion.div variants={reveal}>
                             <Form.Label>Город</Form.Label>
                         </motion.div>

                         <motion.div variants={reveal}>
                             <Form.Control
                                required
                                type='text'
                                placeholder='г. Москва'
                                value={city ? city : ''}
                                onChange={(e) => setCity(e.target.value)}
                            ></Form.Control>
                         </motion.div>
                    </Form.Group>

                     <Form.Group className='mb-3' controlId='fullName'>
                         <motion.div variants={reveal}>
                             <Form.Label>ФИО</Form.Label>
                         </motion.div>
                         <motion.div variants={reveal}>
                             <Form.Control
                                required
                                type='text'
                                placeholder='Иванов Иван Иванович'
                                value={fullName ? fullName : ''}
                                onChange={(e) => setFullName(e.target.value)}></Form.Control>
                         </motion.div>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='address'>
                        <motion.div variants={reveal}>
                            <Form.Label>Адрес</Form.Label>
                        </motion.div>
                        <motion.div variants={reveal}>
                            <Form.Control
                                required
                                type='text'
                                placeholder='ул. Пушкина, д. Колотушкина'
                                value={address ? address : ''}
                                onChange={(e) => setAddress(e.target.value)}></Form.Control>
                        </motion.div>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='postalCode'>
                        <motion.div variants={reveal}>
                            <Form.Label>Индекс</Form.Label>
                        </motion.div>
                        <motion.div variants={reveal}>
                            <Form.Control
                                required
                                type='text'
                                placeholder='Почтовый индекс'
                                value={postalCode ? postalCode : ''}
                                onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
                        </motion.div>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='country'>
                        <motion.div variants={reveal}>
                            <Form.Label>Телефон</Form.Label>
                        </motion.div>
                        <motion.div variants={reveal}>
                            <Form.Control
                                required
                                type='tel'
                                maxLength={11}
                                placeholder='+7 (999) 999-99-99'
                                value={phoneNumber ? phoneNumber : ''}
                                onChange={(e) => setPhoneNumber(e.target.value)}></Form.Control>
                        </motion.div>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='socials'>
                        <motion.div variants={reveal}>
                            <Form.Label>Соц. сети для связи</Form.Label>
                        </motion.div>
                        <motion.div variants={reveal}>
                            <Form.Control
                                required
                                type='text'
                                placeholder='Введите ссылку'
                                value={socials ? socials : ''}
                                onChange={(e) => setSocials(e.target.value)}></Form.Control>
                        </motion.div>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='infoSource'>
                        <motion.div variants={reveal}>
                            <Form.Label>Откуда узнали о нас?</Form.Label>
                        </motion.div>
                        <motion.div variants={reveal}>
                            <Form.Control
                                required
                                type='text'
                                placeholder='Соц. сети, реклама, от друзей и т. д.'
                                value={infoSource ? infoSource : ''}
                                onChange={(e) => setInfoSource(e.target.value)}></Form.Control>
                        </motion.div>
                    </Form.Group>

                    <motion.div variants={reveal}>
                        <Button className='size-btn btn btn-dark mb-3' type='submit' style={{width: 100 + '%'}}>
                            Продолжить
                        </Button>
                    </motion.div>
                </Form>
            </motion.div>
        </FormContainer>
    );
}

export default ShippingScreen;