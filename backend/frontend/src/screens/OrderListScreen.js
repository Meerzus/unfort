import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";
import {Table, Button, Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {listOrders} from "../actions/orderActions";
import {userListReducer} from "../reducers/userReducers";

import {motion} from "framer-motion";
import {animationStart, reveal} from "../utils/animation";

function OrderListScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const orderList = useSelector(state => state.orderList)
    const {loading, error, orders} = orderList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            navigate('/')
        }
    }, [dispatch, navigate, userInfo])

    return loading ? (
        <Loader/>
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <Container>
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
            >Заказы</motion.h1>
            <motion.div
                variants={reveal}
                initial='hiddenVariantX'
                animate='revealedVariantX'
                transition={{
                    ease: 'easeIn',
                    type: 'spring',
                    staggerChildren: .01,
                    duration: 1,
                    delayChildren: animationStart,
                    delay: animationStart
                }}
            >
                <Table
                    striped
                    hover
                    responsive
                    className='table-sm text-center overflow-hidden'
                >
                    <thead>
                        <tr>
                            <motion.th variants={reveal}>ID</motion.th>
                            <motion.th variants={reveal}>ПОЛЬЗОВАТЕЛЬ</motion.th>
                            <motion.th variants={reveal}>ДАТА</motion.th>
                            <motion.th variants={reveal}>СУММА</motion.th>
                            <motion.th variants={reveal}>ОПЛАЧЕНО</motion.th>
                            <motion.th variants={reveal}>ДОСТАВЛЕНО</motion.th>
                            <motion.th variants={reveal}></motion.th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <motion.td variants={reveal}>{order._id}</motion.td>
                                <motion.td variants={reveal}>{order.user && order.user.name}</motion.td>
                                <motion.td variants={reveal}>{order.createdAt.substring(0, 10)}</motion.td>
                                <motion.td variants={reveal}>₽ {order.totalPrice}</motion.td>
                                <motion.td variants={reveal}>{order.isPaid ? (
                                    order.paidAt.substring(0, 10)
                                ) : (
                                    <i
                                        className='fas fa-xmark fa-xl'
                                        style={{color: 'red'}}
                                    ></i>
                                )}</motion.td>
                                <motion.td variants={reveal}>{order.isDelivered ? (
                                    order.deliveredAt.substring(0, 10)
                                ) : (
                                    <i
                                        className='fas fa-xmark fa-xl'
                                        style={{color: 'red'}}
                                    ></i>
                                )}</motion.td>
                                <motion.td variants={reveal}>
                                    <LinkContainer
                                        className='mx-1'
                                        to={`/order/${order._id}`}
                                    >
                                        <Button
                                            variant='dark'
                                            className='size-btn btn-sm'
                                        >
                                            <i className="fa-solid fa-info fa-xl"></i>
                                        </Button>
                                    </LinkContainer>
                                </motion.td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </motion.div>
        </Container>
    )
}

export default OrderListScreen;
