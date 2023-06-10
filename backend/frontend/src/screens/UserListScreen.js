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
            <h1 className='text-center'>Users</h1>
            <Table
                striped
                bordered
                hover
                responsive
                className='table-sm text-center'
            >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? (
                                <i
                                    className='fas fa-check fa-xl'
                                    style={{color: 'green'}}
                                ></i>
                            ) : (
                                <i
                                    className='fas fa-xmark fa-xl'
                                    style={{color: 'red'}}
                                ></i>
                            )}</td>
                            <td>
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
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default UserListScreen;
