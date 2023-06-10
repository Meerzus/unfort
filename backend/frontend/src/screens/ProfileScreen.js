import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Row, Col, Form, Button, Container, Table} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {getUserDetails, updateUserProfile} from "../actions/userActions";
import {USER_UPDATE_PROFILE_RESET} from "../constants/userConstants";
import {listMyOrders} from "../actions/orderActions";


function ProfileScreen({history}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, user, error} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const {loading: loadingOrders, error: errorOrders, orders} = orderListMy

    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user ||
                !user.name ||
                success ||
                userInfo._id !== user._id
            ) {
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, userInfo, navigate, user, success])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Введенные пароли не совпадают!')
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password,
            }))
            setMessage('')
        }
    }
    return (
        <Container>
            <Row>
                <Col md={3}>
                    <h2 className='text-center'>User Profile</h2>
                    {message && <Message variant='danger'>{message}</Message>}
                    {loading && <Loader/>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {
                        (!error && !loading) &&
                        <Form onSubmit={submitHandler}>
                            <Form.Group className='mb-3' controlId='name'>
                                <Form.Label>Имя</Form.Label>
                                <Form.Control
                                    required
                                    type='name'
                                    placeholder='Введите Имя'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    required
                                    type='email'
                                    placeholder='Введите Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='password'>
                                <Form.Label>change</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Введите пароль'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='passwordConfirm'>
                                <Form.Label>Подтверждение пароля</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Подтвердите пароль'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Button className='size-btn btn btn-dark mb-3' type='submit' style={{width: 100 + '%'}}>Update</Button>
                        </Form>
                    }
                </Col>
                <Col md={9}>
                    <h2 className='text-center'>My Orders</h2>
                    {
                        loadingOrders ? (
                            <Loader/>
                        ) : errorOrders ? (
                            <Message variant='danger'>
                                {errorOrders}
                            </Message>
                        ) : (
                            <Table striped responsive className='table-sm text-center'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Paid</th>
                                        <th>Delivered</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => {
                                        return (
                                            <tr key={order._id}>
                                                <td>{order._id}</td>
                                                <td>{order.createdAt.substring(0, 10)}</td>
                                                <td><strong>₽ </strong>{order.totalPrice}</td>
                                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                                    <i className='fa-solid fa-xmark fa-l' style={{color: 'red'}}></i>
                                                )}</td>
                                                <td width={50}>
                                                    <LinkContainer to={`/order/${order._id}`}>
                                                        <Button  variant='dark' className='size-btn btn-sm'>
                                                            <i className="fa-solid fa-info fa-xl"></i>
                                                        </Button>
                                                    </LinkContainer>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        )
                    }
                </Col>
            </Row>
        </Container>
    );
}

export default ProfileScreen;