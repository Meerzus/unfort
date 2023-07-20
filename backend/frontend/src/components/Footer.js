import React, {useEffect} from 'react';
import {Nav, Container, Row, Col, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

import {useNavigate} from "react-router-dom";

import {motion} from "framer-motion";
import {animationStart, reveal} from "../utils/animation";


function Footer() {
    const navigate = useNavigate()

    const email = 'unfort@email.com'

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

    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const emailHoverHandler = () => {
        const element = document.getElementById("channel-link"),
            text = element && element?.innerText.split("");

        if (element) {
            element.innerText = "";
        }

        text && text.forEach((value, index) => {
            const outer = document.createElement("span");

            outer.className = "outer";

            const inner = document.createElement("span");

            inner.className = "inner";

            inner.style.animationDelay = `${rand(-5000, 0)}ms`;

            const letter = document.createElement("span");

            letter.className = "letter";

            letter.innerText = value;

            letter.style.animationDelay = `${index * 1000 }ms`;

            inner.appendChild(letter);

            outer.appendChild(inner);

            element.appendChild(outer);
        });
    }

    const unfortFooterHoverHandler = () => {
        const element = document.getElementById("unfort-link-footer"),
            text = element && element?.innerText.split("");

        if (element) {
            element.innerText = "";
        }

        text && text.forEach((value, index) => {
            const outer = document.createElement("span");

            outer.className = "outer";

            const inner = document.createElement("span");

            inner.className = "inner";

            inner.style.animationDelay = `${rand(-5000, 0)}ms`;

            const letter = document.createElement("span");

            letter.className = "letter";

            letter.innerText = value;

            letter.style.animationDelay = `${index * 1000 }ms`;

            inner.appendChild(letter);

            outer.appendChild(inner);

            element.appendChild(outer);
        });
    }

    const unfortHeaderHoverHandler = () => {
        const element = document.getElementById("unfort-link-header"),
            text = element && element?.innerText.split("");

        if (element) {
            element.innerText = "";
        }

        text && text.forEach((value, index) => {
            const outer = document.createElement("span");

            outer.className = "outer";

            const inner = document.createElement("span");

            inner.className = "inner";

            inner.style.animationDelay = `${rand(-5000, 0)}ms`;

            const letter = document.createElement("span");

            letter.className = "letter";

            letter.innerText = value;

            letter.style.animationDelay = `${index * 1000 }ms`;

            inner.appendChild(letter);

            outer.appendChild(inner);

            element.appendChild(outer);
        });
    }

    useEffect(() => {
        emailHoverHandler()
        unfortFooterHoverHandler()
        unfortHeaderHoverHandler()
    })

    return (
        <footer className="bg-black unfort-footer">
            <Navbar variant="dark" className="flex-column unfort-footer-nav">
              <Container>
                <Navbar.Collapse id="basic-navbar-nav" className="flex-column">
                    <Nav className="flex-column">
                        <Row>
                            <Col md={3}>
                                <motion.div
                                    variants={reveal}
                                    initial='hiddenVariantX'
                                    animate='revealedVariantX'
                                    transition={{
                                        ease: 'easeIn',
                                        type: 'spring',
                                        staggerChildren: .25,
                                        duration: 1,
                                        delayChildren: animationStart
                                    }}
                                >
                                    <div className="line">
                                        <a
                                            id="unfort-link-footer"
                                            href='/'
                                            className="word fancy mailto"
                                        >
                                            unfort
                                        </a>
                                    </div>
                                </motion.div>
                            </Col>

                            <Col md={5}>
                                <motion.div
                                    variants={reveal}
                                    initial='hiddenVariantY'
                                    animate='revealedVariantY'
                                    transition={{
                                        ease: 'easeIn',
                                        type: 'spring',
                                        staggerChildren: .1,
                                        duration: 1,
                                        delayChildren: animationStart
                                    }}
                                >
                                    <Row>
                                        <Col>
                                            <motion.div variants={reveal}>
                                                <LinkContainer className="text-center" to='/about' onClick={about}>
                                                    <Nav.Link className="cursor">ABOUT US</Nav.Link>
                                                </LinkContainer>
                                            </motion.div>
                                        </Col>

                                        <Col>
                                            <motion.div variants={reveal}>
                                                <LinkContainer className="text-center" to='/delivery' onClick={delivery}>
                                                    <Nav.Link className="cursor">DELIVERY</Nav.Link>
                                                </LinkContainer>
                                            </motion.div>
                                        </Col>

                                        <Col>
                                            <motion.div variants={reveal}>
                                                <LinkContainer className="text-center" to='/contract' onClick={contract}>
                                                    <Nav.Link className="cursor">CONTRACT OFFER</Nav.Link>
                                                </LinkContainer>
                                            </motion.div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <motion.div variants={reveal}>
                                                <LinkContainer className="text-center" to='/support' onClick={support}>
                                                    <Nav.Link className="cursor">SUPPORT</Nav.Link>
                                                </LinkContainer>
                                            </motion.div>
                                        </Col>

                                        <Col>
                                            <motion.div variants={reveal}>
                                                <LinkContainer className="text-center" to='/return' onClick={reTurn}>
                                                    <Nav.Link className="cursor">RETURN</Nav.Link>
                                                </LinkContainer>
                                            </motion.div>
                                        </Col>

                                        <Col>
                                            <motion.div variants={reveal}>
                                                <LinkContainer className="text-center" to='/privacy' onClick={privacy}>
                                                    <Nav.Link className="cursor">PRIVACY POLICY</Nav.Link>
                                                </LinkContainer>
                                            </motion.div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <motion.div variants={reveal}>
                                                <a href="https://vk.com/unfort_4u" target='_blank'
                                                   className='text-center cursor footer-vk nav-link'>
                                                    <i className="fa-brands fa-vk fa-2xl"></i>
                                                </a>
                                            </motion.div>
                                        </Col>

                                        <Col>
                                            <motion.div variants={reveal}>
                                                <a href="https://vk.com/unfort_4u" target='_blank'
                                                   className='text-center cursor footer-telegram nav-link'>
                                                    <i className="fa-brands fa-telegram fa-2xl"></i>
                                                </a>
                                            </motion.div>
                                        </Col>

                                        <Col>
                                            <motion.div variants={reveal}>
                                                <a href="https://vk.com/unfort_4u" target='_blank'
                                                   className='text-center cursor footer-instagram nav-link'>
                                                    <i className="fa-brands fa-instagram fa-2xl"></i>
                                                </a>
                                            </motion.div>
                                        </Col>

                                        <Col>
                                            <motion.div variants={reveal}>
                                                <a href="https://vk.com/unfort_4u" target='_blank'
                                                   className='text-center cursor footer-tiktok nav-link'>
                                                    <i className="fa-brands fa-tiktok fa-xl"></i>
                                                </a>
                                            </motion.div>
                                        </Col>
                                    </Row>
                                </motion.div>
                            </Col>

                            <Col md={4}>
                                <motion.div
                                    variants={reveal}
                                    initial='hiddenVariantX'
                                    animate='revealedVariantX'
                                    transition={{
                                        ease: 'easeIn',
                                        type: 'spring',
                                        staggerChildren: .25,
                                        duration: 1,
                                        delayChildren: animationStart + .5,
                                        delay: animationStart - .5
                                    }}
                                >
                                    <div className="line">
                                        <a
                                            id="channel-link"
                                            href='mailto:support@unfort.ru'
                                            target="_blank"
                                            className="word fancy mailto"
                                        >
                                            support@unfort
                                        </a>
                                    </div>
                                </motion.div>
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