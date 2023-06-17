import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";
import {Table, Button, Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {listUsers, deleteUser} from "../actions/userActions";
import {userListReducer} from "../reducers/userReducers";
import loader from "../components/Loader";

import {motion} from "framer-motion";
import {animationStart, reveal} from "../utils/animation";

function UserListScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const {success: successDelete} = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            navigate('/')
        }
    }, [dispatch, navigate, successDelete, userInfo])

    const deleteHandler = (id) => {
        if (window.confirm('sure?')) {
            dispatch(deleteUser(id))
        }
    }

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
            >Пользователи</motion.h1>
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
                    bordered
                    hover
                    responsive
                    className='table-sm text-center overflow-hidden'
                >
                    <thead>
                        <tr>
                            <motion.th variants={reveal}>ID</motion.th>
                            <motion.th variants={reveal}>ИМЯ</motion.th>
                            <motion.th variants={reveal}>ПОЧТА</motion.th>
                            <motion.th variants={reveal}>АДМИН</motion.th>
                            <motion.th variants={reveal}></motion.th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <motion.td variants={reveal}>{user._id}</motion.td>
                                <motion.td variants={reveal}>{user.name}</motion.td>
                                <motion.td variants={reveal}>{user.email}</motion.td>
                                <motion.td variants={reveal}>{user.isAdmin ? (
                                    <i
                                        className='fas fa-check fa-xl'
                                        style={{color: 'green'}}
                                    ></i>
                                ) : (
                                    <i
                                        className='fas fa-xmark fa-xl'
                                        style={{color: 'red'}}
                                    ></i>
                                )}</motion.td>
                                <motion.td variants={reveal}>
                                    <LinkContainer
                                        className='mx-1'
                                        to={`/admin/user/${user._id}/edit`}
                                    >
                                        <Button
                                            variant='dark'
                                            className='size-btn btn-sm'
                                        >
                                            <i
                                                className='fas fa-edit fa-xl'
                                            ></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() => {deleteHandler(user._id)}}
                                    >
                                        <i
                                            className='fas fa-trash'
                                        ></i>
                                    </Button>
                                </motion.td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </motion.div>
        </Container>
    )
}

export default UserListScreen;
