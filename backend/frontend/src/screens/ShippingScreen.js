import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Form, Button, Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import {saveShippingAddress} from "../actions/cartActions";

import {motion} from "framer-motion";
import {animationStart, reveal} from "../utils/animation";

import YMap from "../components/YMap";
import axios from "axios";


function ShippingScreen({history}) {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const orderDetails = useSelector(state => state.orderDetails)
    const {order} = orderDetails

    const dispatch = useDispatch()

    const [city, setCity] = useState('Ваш город')
    const [cityError, setCityError] = useState(false)
    const [fullName, setFullName] = useState(shippingAddress.fullName)
    const [fullNameError, setFullNameError] = useState(false)
    const [address, setAddress] = useState(shippingAddress.address)
    const [addressError, setAddressError] = useState(false)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [postalCodeError, setPostalCodeError] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber)
    const [phoneNumberError, setPhoneNumberError] = useState(false)
    const [socials, setSocials] = useState(shippingAddress.socials)
    const [socialsError, setSocialsError] = useState(false)
    const [infoSource, setInfoSource] = useState(shippingAddress.infoSource)
    const [infoSourceError, setInfoSourceError] = useState(false)
    const [sdek, setSdek] = useState(false)

    const navigate = useNavigate();

    const cityCheck = /^[\u0400-\u0484\u0487-\u052F\u1C80-\u1C88\u1D2B\u1D78\u2DE0-\u2DFF\uA640-\uA69F\uFE2E\uFE2F\s]*$/
    const fullNameCheck = /^[\u0400-\u0484\u0487-\u052F\u1C80-\u1C88\u1D2B\u1D78\u2DE0-\u2DFF\uA640-\uA69F\uFE2E\uFE2F\s]*$/
    const addressCheck = /^[улУЛУлуЛ]/
    const postalCheck = /^\d+$/
    const phoneCheck = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    const socialsCheck = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi
    const infoSourceCheck = /^[\u0400-\u0484\u0487-\u052F\u1C80-\u1C88\u1D2B\u1D78\u2DE0-\u2DFF\uA640-\uA69F\uFE2E\uFE2F\s]*$/

    const submitHandler = (e) => {
        e.preventDefault()
        if (!cityCheck.test(city)) {
            setCity(' ')
            setCityError(true)
            setFullNameError(false)
            setAddressError(false)
            setPostalCodeError(false)
            setPhoneNumberError(false)
            setSocialsError(false)
            setInfoSourceError(false)
        } else if (!fullNameCheck.test(fullName)) {
            setFullName(' ')
            setCityError(false)
            setFullNameError(true)
            setAddressError(false)
            setPostalCodeError(false)
            setPhoneNumberError(false)
            setSocialsError(false)
            setInfoSourceError(false)
        } else if (!addressCheck.test(address)) {
            setAddress(' ')
            setCityError(false)
            setFullNameError(false)
            setAddressError(true)
            setPostalCodeError(false)
            setPhoneNumberError(false)
            setSocialsError(false)
            setInfoSourceError(false)
        } else if (!postalCheck.test(postalCode)) {
            setPostalCode(' ')
            setCityError(false)
            setFullNameError(false)
            setAddressError(false)
            setPostalCodeError(true)
            setPhoneNumberError(false)
            setSocialsError(false)
            setInfoSourceError(false)
        } else if (!phoneCheck.test(phoneNumber)) {
            setPhoneNumber(' ')
            setCityError(false)
            setFullNameError(false)
            setAddressError(false)
            setPostalCodeError(false)
            setPhoneNumberError(true)
            setSocialsError(false)
            setInfoSourceError(false)
        } else if (!socialsCheck.test(socials)) {
            setSocials(' ')
            setCityError(false)
            setFullNameError(false)
            setAddressError(false)
            setPostalCodeError(false)
            setPhoneNumberError(false)
            setSocialsError(true)
            setInfoSourceError(false)
        } else if (!infoSourceCheck.test(infoSource)) {
            setInfoSource(' ')
            setCityError(false)
            setFullNameError(false)
            setAddressError(false)
            setPostalCodeError(false)
            setPhoneNumberError(false)
            setSocialsError(false)
            setInfoSourceError(true)
        } else {
            dispatch(saveShippingAddress({city, fullName, address, postalCode, phoneNumber, socials, infoSource}))
            navigate('/placeorder')
            setCityError(false)
            setFullNameError(false)
            setAddressError(false)
            setPostalCodeError(false)
            setPhoneNumberError(false)
            setSocialsError(false)
            setInfoSourceError(false)
        }
    }

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

    const [cdekToken, setCdekToken] = useState('')

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(window.localStorage.getItem('sdekInfo')).access_token}`
    }

    // async function cdekCity() {
    //     await axios.get(`https://api.cdek.ru/v2/location/cities/?size=3&page=0`, {headers})
    //         .then((response) => {
    //             setData(response)
    //         })
    //         .catch((error) => {
    //             console.error(error)
    //         })
    // }

    useEffect(() => {
        extraMenuClose()
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})

        const sdekCity = async () => {
            // const {data} = await axios.get(`https://thingproxy.freeboard.io/fetch/https://api.edu.cdek.ru/v2/location/cities?city=${city}`, {headers})
            const {data} = await axios.get(`https://api.edu.cdek.ru/v2/location/cities?city=${city}`, {headers})
            console.log(data[0].city)
            // console.log(city)
        }

        sdekCity()

        // cdekCity()
    }, [city])

    const [data, setData] = useState(null);



    const sdekBtn = document.getElementById('sdek-btn')
    const pochtaBtn = document.getElementById('pochta-btn')
    const resetBtn = document.getElementById('reset-btn')

    const sdekHandler = () => {
        setCity(city)
        setSdek(true)
        cart.shippingPrice = 100
        sdekBtn?.classList.add('active')
        pochtaBtn?.classList.remove('active')
        resetBtn?.classList.remove('active')
    }

    const pochtaHandler = () => {
        setSdek(false)

        cart.shippingPrice = 200

        sdekBtn?.classList.remove('active')
        resetBtn?.classList.remove('active')
        pochtaBtn?.classList.add('active')
    }

    const resetHandler = () => {
        setSdek(false)
        cart.shippingPrice = 0
        sdekBtn?.classList.remove('active')
        resetBtn?.classList.add('active')
        pochtaBtn?.classList.remove('active')
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
                                 disabled={sdek}
                                required
                                type='text'
                                placeholder='г. Москва'
                                value={city ? city : ''}
                                onChange={(e) => setCity(e.target.value)}
                            ></Form.Control>
                         </motion.div>
                         {cityError && <div style={{color: 'red'}}>Некорректный Адрес</div>}
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='deliveryOption'>
                        <motion.div variants={reveal}>
                            <Form.Label>Способ доставки</Form.Label>
                        </motion.div>

                        <motion.div className='delivery-option-container' variants={reveal}>
                            <Button
                                id='sdek-btn'
                                className='size-btn btn btn-dark'
                                onClick={sdekHandler}>СДЭК</Button>
                            <Button
                                id='pochta-btn'
                                className='size-btn btn btn-dark'
                                onClick={pochtaHandler}>ПОЧТА РОССИИ</Button>
                            <Button
                                id='reset-btn'
                                className='size-btn btn btn-dark'
                                onClick={resetHandler}>Сбросить</Button>
                        </motion.div>
                    </Form.Group>

                    <YMap city={city} sdek={sdek} setAddress={setAddress}/>

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
                        {fullNameError && <div style={{color: 'red'}}>Некорректный ФИО</div>}
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
                        {addressError && <div style={{color: 'red'}}>Некорректный Адрес</div>}
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
                        {postalCodeError && <div style={{color: 'red'}}>Некорректный Индекс</div>}
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
                                placeholder='8 (999) 999-99-99'
                                value={phoneNumber ? phoneNumber : ''}
                                onChange={(e) => setPhoneNumber(e.target.value)}></Form.Control>
                        </motion.div>
                        {phoneNumberError && <div style={{color: 'red'}}>Некорректный Телефон</div>}
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
                        {socialsError && <div style={{color: 'red'}}>Некорректная Ссылка</div>}
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
                        {infoSourceError && <div style={{color: 'red'}}>Некорректные Данные</div>}
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