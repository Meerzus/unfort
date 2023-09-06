import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";
import {Table, Button, Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {listUsers, deleteUser} from "../actions/userActions";

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

    const [trackLimit, setTrackLimit] = useState(0)

    const windowInnerWidth = document.documentElement.clientWidth
    const windowInnerHeight = document.documentElement.clientHeight

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

    useEffect(() => {
        extraMenuClose()
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            navigate('/')
        }

        const track = document.getElementById("table")
        if ((windowInnerWidth <= 896 && windowInnerHeight <= 414) || (windowInnerWidth <= 414 && windowInnerHeight <= 896)) {
            setTrackLimit(-67.5)
        } else if ((windowInnerWidth <= 768 && windowInnerHeight <= 1024) || (windowInnerWidth <= 1024 && windowInnerHeight <= 768)) {
            setTrackLimit(-57)
        } else {
            setTrackLimit(0)
        }
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, [dispatch, navigate, successDelete, userInfo])

    const deleteHandler = (id) => {
        if (window.confirm('sure?')) {
            dispatch(deleteUser(id))
        }
    }

    const [leftBtnLimit, setLeftBtnLimit] = useState(true)
    const [rightBtnLimit, setRightBtnLimit] = useState(false)

    const trackLeft = () => {
        const track = document.getElementById("table");

        if (Number(track.dataset.position) < 0) {
            track.dataset.position = Number(track.dataset.position) + 25
            setLeftBtnLimit(false)
            setRightBtnLimit(false)
            if (track.dataset.position > -60 && track.dataset.position > 0) {
                track.dataset.position = 0
                setLeftBtnLimit(true)
                setRightBtnLimit(false)
            }
            track?.animate({
                transform: `translate(${Number(track.dataset.position)}%, 0%)`
            }, { duration: 1000, fill: "forwards" });
        }
    }

    const trackRight = () => {
        const track = document.getElementById("table");

        if (Number(track.dataset.position) >= trackLimit) {
            track.dataset.position = Number(track.dataset.position) - 25
            setRightBtnLimit(false)
            setLeftBtnLimit(false)
            if (track.dataset.position < trackLimit) {
                track.dataset.position = trackLimit
                setRightBtnLimit(true)
                setLeftBtnLimit(false)
            }
            track?.animate({
                transform: `translate(${Number(track.dataset.position)}%, 0%)`
            }, { duration: 1000, fill: "forwards" });
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
                id='user-list-screen'
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
                <div className='img-track-btns'>
                    <button onClick={trackLeft} disabled={leftBtnLimit}><i className="fa-solid fa-arrow-left"></i></button>
                    <button onClick={trackRight} disabled={rightBtnLimit}><i className="fa-solid fa-arrow-right"></i></button>
                </div>
                <Table
                    striped
                    bordered
                    hover
                    responsive
                    className='table-sm text-center mx-0' data-position="0" id='table'
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
