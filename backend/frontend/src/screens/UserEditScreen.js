import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {Form, Button, Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import {getUserDetails, updateUser} from "../actions/userActions";
import {USER_UPDATE_RESET} from "../constants/userConstants";

import {motion} from "framer-motion";
import {animationStart, reveal} from "../utils/animation";

function UserEditScreen({location, history}) {
    const { id } = useParams();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, user, error} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {error: errorUpdate, loading: loadingUpdate, success: successUpdate} = userUpdate

    const navigate = useNavigate();

    useEffect(() => {
        if (successUpdate) {
            dispatch({type: USER_UPDATE_RESET})
            navigate('/admin/userlist')
        } else {
            if (!user.name || user._id !== Number(id)) {
                dispatch(getUserDetails(id))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, [user, id, successUpdate, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({_id: user._id, name, email, isAdmin}))
    }

    const handleToggle = () => setIsAdmin(!isAdmin);

    return (
        <Container>
            <motion.div
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
            >
                <Link to='/admin/userlist' className='btn btn-light my-3'>Назад</Link>
            </motion.div>
            {
                loadingUpdate &&
                <Loader/>
            }
            {
                errorUpdate &&
                <Message variant='danger'>{errorUpdate}</Message>
            }
            <FormContainer>
                <motion.h1
                    className='text-sm-center'
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
                >Редактор пользователя</motion.h1>
                {
                    loading ?
                        <Loader/> :
                        error ?
                            <Message variant='danger'>{error}</Message> :
                            (
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
                                        <Form.Group className='mb-3' controlId='name'>
                                            <motion.div variants={reveal}>
                                                <Form.Label>Имя</Form.Label>
                                            </motion.div>
                                            <motion.div variants={reveal}>
                                                <Form.Control
                                                    type='name'
                                                    placeholder='Введите Имя'
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                ></Form.Control>
                                            </motion.div>
                                        </Form.Group>

                                        <Form.Group className='mb-3' controlId='email'>
                                            <motion.div variants={reveal}>
                                                <Form.Label>Email</Form.Label>
                                            </motion.div>
                                            <motion.div variants={reveal}>
                                                <Form.Control
                                                    type='email'
                                                    placeholder='Введите Email'
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                ></Form.Control>
                                            </motion.div>
                                        </Form.Group>

                                        <Form.Group className='mb-3' controlId='isAdmin'>
                                            <motion.div variants={reveal}>
                                                <Form.Switch
                                                    type="switch"
                                                    label='Админ'
                                                    checked={isAdmin}
                                                    onChange={handleToggle}
                                                ></Form.Switch>
                                            </motion.div>
                                        </Form.Group>

                                        <motion.div variants={reveal}>
                                            <Button
                                                className='size-btn btn btn-dark mb-3'
                                                type='submit'
                                                style={{width: 100 + '%'}}>
                                                Обновить
                                            </Button>
                                        </motion.div>
                                    </Form>
                                </motion.div>
                            )
                }
            </FormContainer>
        </Container>
    );
}

export default UserEditScreen;