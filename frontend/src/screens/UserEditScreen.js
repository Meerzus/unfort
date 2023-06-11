import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {Form, Button, Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import {getUserDetails, updateUser} from "../actions/userActions";
import {USER_UPDATE_RESET} from "../constants/userConstants";

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
    }, [user, id, successUpdate, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({_id: user._id, name, email, isAdmin}))
    }

    const handleToggle = () => setIsAdmin(!isAdmin);

    return (
        <Container>
            <Link to='/admin/userlist' className='btn btn-light my-3'>Go Back</Link>
            {
                loadingUpdate &&
                <Loader/>
            }
            {
                errorUpdate &&
                <Message variant='danger'>{errorUpdate}</Message>
            }
            <FormContainer>
                <h1 className='text-sm-center'>Edit User</h1>
                {
                    loading ?
                        <Loader/> :
                        error ?
                            <Message variant='danger'>{error}</Message> :
                            (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group className='mb-3' controlId='name'>
                                        <Form.Label>Имя</Form.Label>
                                        <Form.Control
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
                                            type='email'
                                            placeholder='Введите Email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='isAdmin'>
                                        <Form.Switch
                                            type="switch"
                                            label='is admin'
                                            checked={isAdmin}
                                            onChange={handleToggle}
                                        >

                                        </Form.Switch>
                                        {/*<Form.Check*/}
                                        {/*    type='checkbox'*/}
                                        {/*    label='is admin'*/}
                                        {/*    checked={isAdmin}*/}
                                        {/*    onChange={(e) => setIsAdmin(e.target.checked)}*/}
                                        {/*>*/}
                                        {/*</Form.Check>*/}
                                    </Form.Group>

                                    <Button
                                        className='size-btn btn btn-dark mb-3'
                                        type='submit'
                                        style={{width: 100 + '%'}}>
                                        Update
                                    </Button>
                                </Form>
                            )
                }
            </FormContainer>
        </Container>
    );
}

export default UserEditScreen;