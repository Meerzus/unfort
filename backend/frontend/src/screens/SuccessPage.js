import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";

import Message from "../components/Message";
import Loader from "../components/Loader";

import {motion} from "framer-motion";
import {animationStart, reveal} from "../utils/animation";
import {Link} from "react-router-dom";

function SuccessPage(props) {
    // let loc = 'succsess?Success=true&ErrorCode=0&Message=None&Details=&Amount=100&MerchantEmail=support%40unfort.ru&MerchantName=Unfort&OrderId=44&PaymentId=2915184438&TranDate=&BackUrl=http%3A%2F%2Fmeerzus1.pythonanywhere.com%2F&CompanyName=ИП+МИЛЬКОВИЧ+ИЛЬЯ+МИХАЙЛОВИЧ&EmailReq=support%40unfort.ru&PhonesReq=9139376454'

    let loc = window.location.hash ? window?.location?.hash : ''

    const [successPay, setSuccessPay] = useState(false)
    const [errorCode, setErrorCode] = useState('')
    const [message, setMessage] = useState('')
    const [details, setDetails] = useState('')
    const [amount, setAmount] = useState(0)
    const [merchantEmail, setMerchantEmail] = useState('')
    const [merchantName, setMerchantName] = useState('')
    const [orderId, setOrderId] = useState('')
    const [paymentId, setPaymentId] = useState('')
    const [tranDate, setTranDate] = useState('')

    loc = loc.split('#/')[1]

    useEffect(() => {
        setSuccessPay((loc[0]?.split('?')[1]?.split('=')[1]) === 'true')
        setErrorCode(loc[1]?.split('=')[1])
        setMessage(loc[2]?.split('=')[1])
        setDetails(loc[3]?.split('=')[1])
        setAmount((loc[4]?.split('=')[1]) / 100)
        setMerchantEmail(loc[5]?.split('=')[1])
        setMerchantName(loc[6]?.split('=')[1])
        setOrderId(loc[7]?.split('=')[1])
        setPaymentId(loc[8]?.split('=')[1])
        setTranDate(loc[9]?.split('=')[1])
    })

    // useEffect(() => {
    //
    // })

    console.log(loc)
    console.log('successPay: ', successPay)
    console.log('errorCode: ', errorCode)
    console.log('message: ', message)
    console.log('details: ', details)
    console.log('amount: ', amount)
    console.log('merchantEmail: ', merchantEmail)
    console.log('merchantName: ', merchantName)
    console.log('orderId: ', orderId)
    console.log('paymentId: ', paymentId)
    console.log('tranDate: ', tranDate)

    return (
        <Container>
            <motion.div
                variants={reveal}
                initial='hiddenVariantY'
                animate='revealedVariantY'
                transition={{
                    ease: 'easeIn',
                    type: 'spring',
                    staggerChildren: .1,
                    duration: 1,
                    delayChildren: animationStart,
                    delay: animationStart
                }}
            >
                {loc !== 'success' &&
                    <motion.h1 variants={reveal} className='text-center'>Спасибо за покупку!</motion.h1>
                }

            </motion.div>
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
                    delay: animationStart + .25
                }}
            >
                <Link to='/' className='btn btn-light'>На главную</Link>
            </motion.div>
        </Container>
    );
}

export default SuccessPage;