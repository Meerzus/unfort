import React from 'react';
import {LinkContainer} from "react-router-bootstrap";
import {Nav} from "react-bootstrap";

function CheckoutSteps({step1, step2, step3}) {
    return (
        <Nav className='my-3 checkout-steps'>
            <Nav.Item>
                {
                    step1 ? (
                        <LinkContainer to='/login'>
                            <Nav.Link>Вход</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <Nav.Link disabled>Вход</Nav.Link>
                    )
                }
            </Nav.Item>

            <Nav.Item>
                {
                    step2 ? (
                        <LinkContainer to='/shipping'>
                            <Nav.Link>Доставка</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <Nav.Link disabled>Доставка</Nav.Link>
                    )
                }
            </Nav.Item>

            <Nav.Item>
                {
                    step3 ? (
                        <LinkContainer to='/placeorder'>
                            <Nav.Link>Заказ</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <Nav.Link disabled>Заказ</Nav.Link>
                    )
                }
            </Nav.Item>
        </Nav>
    );
}

export default CheckoutSteps;