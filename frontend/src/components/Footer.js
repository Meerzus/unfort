import React from 'react';
import {Nav, Container, Row, Col, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

import {useNavigate} from "react-router-dom";


function Footer() {
    const navigate = useNavigate()

    const about = () => {
        navigate('/about')
        navigate(0)
    }

    const support = () => {
        navigate('/support')
        navigate(0)
    }

    const delivery = () => {
        navigate('/delivery')
        navigate(0)
    }

    const reTurn = () => {
        navigate('/return')
        navigate(0)
    }

    const contract = () => {
        navigate('/contract')
        navigate(0)
    }

    const privacy = () => {
        navigate('/privacy')
        navigate(0)
    }
    return (
        <footer className="bg-black unfort-footer">
            <Navbar variant="dark" className="flex-column unfort-footer-nav">
              <Container>
                <Navbar.Collapse id="basic-navbar-nav" className="flex-column">
                    <Nav className="flex-column">
                        <Row>
                            <Col
                                md={document.documentElement.clientWidth < 992 ? 3 : 2}
                                className="footer-column-first"
                            >
                                <LinkContainer className="text-center" to='/'>
                                    <Nav.Link className="cursor">UNFORT <br/> &copy; Unfort, 2023</Nav.Link>
                                </LinkContainer>
                            </Col>

                            <Col
                                md={document.documentElement.clientWidth < 992 ? 3 :2}
                                className="footer-column-second"
                            >
                                <LinkContainer className="text-center" to='/about' onClick={about}>
                                    <Nav.Link className="cursor">О нас</Nav.Link>
                                </LinkContainer>

                                <LinkContainer className="text-center" to='/support' onClick={support}>
                                    <Nav.Link className="cursor">Поддержка</Nav.Link>
                                </LinkContainer>

                                <LinkContainer className="text-center" to='/delivery' onClick={delivery}>
                                    <Nav.Link className="cursor">Доставка</Nav.Link>
                                </LinkContainer>

                                <LinkContainer className="text-center" to='/return' onClick={reTurn}>
                                    <Nav.Link className="cursor">Возврат</Nav.Link>
                                </LinkContainer>
                            </Col>

                            <Col
                                md={document.documentElement.clientWidth < 992 ? 3 : 4}
                                className="footer-column-third"
                            >
                                <LinkContainer className="text-center" to='/contract' onClick={contract}>
                                    <Nav.Link className="cursor">Договор оферты</Nav.Link>
                                </LinkContainer>

                                <LinkContainer className="text-center" to='/privacy' onClick={privacy}>
                                    <Nav.Link className="cursor">Политика конфиденциальности</Nav.Link>
                                </LinkContainer>
                            </Col>

                            <Col
                                md={document.documentElement.clientWidth < 992 ? 3 :4}
                                className="footer-column-fourth"
                            >
                                <Row>
                                    <LinkContainer className="text-center" to='/copyright'>
                                        <Nav.Link className="cursor">
                                            <i className="fa-brands fa-vk fa-2xl"></i>
                                        </Nav.Link>
                                    </LinkContainer>

                                    <LinkContainer className="text-center" to='/copyright'>
                                        <Nav.Link className="cursor">
                                            <i className="fa-brands fa-telegram fa-2xl"></i>
                                        </Nav.Link>
                                    </LinkContainer>

                                    <LinkContainer className="text-center" to='/copyright'>
                                        <Nav.Link className="cursor">
                                            <i className="fa-brands fa-instagram fa-2xl"></i>
                                        </Nav.Link>
                                    </LinkContainer>

                                    <LinkContainer className="text-center" to='/copyright'>
                                        <Nav.Link className="cursor">
                                            <i className="fa-brands fa-tiktok fa-xl"></i>
                                        </Nav.Link>
                                    </LinkContainer>
                                </Row>

                                <Row>
                                    <a href='mailto:unfort@email.com' className='mailto'>
                                        unfort@email.com
                                    </a>
                                </Row>
                            </Col>
                        </Row>
                    </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
        </footer>
    );
}

export default Footer;