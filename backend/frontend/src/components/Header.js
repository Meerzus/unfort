import React, {useEffect} from 'react';
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/userActions";
import {useNavigate} from "react-router-dom";

import {motion} from "framer-motion";
import {animationStart, reveal} from "../utils/animation";


function Header() {
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    const logoutHandler = () => {
        dispatch(logout())
    }

    const navigate = useNavigate()

    const extraMenuHandler = () => {
        const menu = document.querySelector('.extra-menu')

        menu.animate({
            left: '0'
        }, 250)

        setTimeout(() => {menu.style.left = '0'}, 249)
    }

    const extraMenuClose = () => {
        const menu = document.querySelector('.extra-menu')

        menu.animate({
            left: '-16rem'
        }, 250)

        setTimeout(() => {menu.style.left = '-16rem'}, 249)
    }

    return (
        <motion.div>
            <motion.div
                initial={{opacity: 1}}
                animate={{opacity: 1}}
                transition={{delay: animationStart - .5, duration: 1}}
            >
                <motion.div variants={reveal} initial='hiddenVariantY' animate='revealedVariantY' transition={{
                    ease: 'easeIn',
                    type: 'spring',
                    staggerChildren: .25,
                    duration: 1,
                    delayChildren: animationStart - .25
                }}>
                    <header>
                        <Navbar bg="black" variant="dark" expand="lg">
                            <button id='header-btn' onClick={extraMenuHandler}>
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className='extra-menu'>
                                <button
                                    id="extra-close-btn"
                                    onClick={extraMenuClose}
                                >
                                    <i className="fa-solid fa-xmark fa-xl"></i>
                                </button>
                                <div className='extra-container'>
                                    <div id="extra-user">
                                        {userInfo ? (
                                            <motion.div variants={reveal}>
                                                <NavDropdown title={userInfo.name} id='username'>
                                                    <LinkContainer to='/profile'>
                                                        <NavDropdown.Item>
                                                            Профиль
                                                        </NavDropdown.Item>
                                                    </LinkContainer>
                                                    <NavDropdown.Item onClick={logoutHandler}>
                                                        Выйти
                                                    </NavDropdown.Item>
                                                </NavDropdown>
                                            </motion.div>
                                        ) : (
                                            <motion.div variants={reveal}>
                                                <LinkContainer className='nav-login' to='/login'>
                                                    <Nav.Link><motion.i className="far fa-user" variants={reveal}></motion.i></Nav.Link>
                                                </LinkContainer>
                                            </motion.div>
                                        )}
                                        {
                                            (userInfo && userInfo.isAdmin) && (
                                                <motion.div variants={reveal}>
                                                    <NavDropdown className='admin-menu' title='Админ' id='admin-menu'>
                                                        <LinkContainer to='/admin/userlist'>
                                                            <NavDropdown.Item>
                                                                Пользователи
                                                            </NavDropdown.Item>
                                                        </LinkContainer>

                                                        <LinkContainer to='/admin/productlist'>
                                                            <NavDropdown.Item>
                                                                Товары
                                                            </NavDropdown.Item>
                                                        </LinkContainer>

                                                        <LinkContainer to='/admin/orderlist'>
                                                            <NavDropdown.Item>
                                                                Заказы
                                                            </NavDropdown.Item>
                                                        </LinkContainer>
                                                    </NavDropdown>
                                                </motion.div>
                                            )
                                        }
                                    </div>
                                    <LinkContainer className="text-center" to='/'>
                                        <Nav.Link className="cursor">CATALOG</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer className="text-center" to='/delivery'>
                                        <Nav.Link className="cursor">DELIVERY</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer className="text-center" to='/return'>
                                        <Nav.Link className="cursor">RETURN</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer className="text-center" to='/about'>
                                        <Nav.Link className="cursor">ABOUT US</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer className="text-center" to='/support'>
                                        <Nav.Link className="cursor">SUPPORT</Nav.Link>
                                    </LinkContainer>
                                </div>
                            </div>
                            <div className='unfort-brand'>
                                <Navbar.Brand className='unfort-logo'>
                                    <motion.div variants={reveal}>
                                        <LinkContainer to='/'>
                                            <Nav.Link>
                                                <svg width="200" height="35" viewBox="0 0 443 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M55.5302 0.720723H69.254V18.2883C69.254 21.5616 67.7732 24.4595 64.8116 26.982C61.9029 29.5045 57.8836 31.4715 52.7536 32.8829C47.6237 34.2943 41.8856 35 35.5393 35C29.193 35 23.2962 34.2943 17.849 32.8829C12.4546 31.4715 8.14442 29.5045 4.91838 26.982C1.69235 24.4294 0.0528859 21.5465 0 18.3333V0.720723H13.8032V18.6486C13.8032 21.0811 15.0196 23.033 17.4523 24.5045C19.8851 25.976 22.7674 27.027 26.0992 27.6577C29.431 28.2583 32.6041 28.5586 35.6186 28.5586C38.3687 28.5586 41.2774 28.2583 44.3448 27.6577C47.4122 27.027 50.03 25.976 52.1983 24.5045C54.4195 23.033 55.5302 21.0811 55.5302 18.6486V0.720723ZM92.317 34.0541H78.9105V0.720723L92.317 34.0541ZM134.917 24.3694V0.720723H148.324V34.0541H134.917L92.317 10.3604V34.0541H78.9105V0.720723H92.317L134.917 24.3694ZM218.561 0.720723V6.84685H171.916V13.6036H211.898V19.5045H171.916V34.0541H158.509V0.720723H218.561ZM256.582 0C263.458 0 269.645 0.750753 275.145 2.25225C280.698 3.75376 285.035 5.84084 288.155 8.51351C291.275 11.1862 292.836 14.1892 292.836 17.5225C292.836 20.8258 291.275 23.7988 288.155 26.4414C285.035 29.0841 280.725 31.1712 275.225 32.7027C269.724 34.2042 263.537 34.955 256.662 34.955C249.998 34.955 243.863 34.2042 238.257 32.7027C232.651 31.1712 228.209 29.0841 224.93 26.4414C221.651 23.7688 220.012 20.7958 220.012 17.5225C220.012 14.2192 221.651 11.2312 224.93 8.55856C228.209 5.88589 232.625 3.7988 238.178 2.2973C243.784 0.765768 249.919 0 256.582 0ZM256.582 28.7387C260.443 28.7387 264.092 28.3033 267.53 27.4324C270.967 26.5616 273.744 25.2853 275.859 23.6036C277.975 21.8919 279.032 19.8649 279.032 17.5225C279.032 15.2102 277.948 13.1982 275.78 11.4865C273.664 9.77478 270.862 8.46847 267.371 7.56757C263.933 6.66667 260.284 6.21622 256.424 6.21622C252.299 6.21622 248.517 6.66667 245.08 7.56757C241.695 8.46847 238.998 9.75976 236.988 11.4414C234.978 13.1231 233.974 15.1201 233.974 17.4324C233.974 19.8048 235.005 21.8468 237.067 23.5586C239.183 25.2402 241.959 26.5315 245.397 27.4324C248.835 28.3033 252.563 28.7387 256.582 28.7387ZM351.503 33.964L336.986 20.6579H314.219V33.964H301.88V0.630633H342.539C347.457 0.630633 354.884 1.25187 355.288 1.31579C358.247 1.78454 360.669 2.83717 360.669 2.83717C360.669 2.83717 364.173 4.88644 365.108 6.25822C366.185 7.83717 366.185 9.62068 366.185 10.5263C366.185 11.432 365.996 12.9688 365.108 14.4161C364.301 15.7319 362.687 16.6758 360.669 17.7056C358.651 18.7353 354.212 19.9424 349.234 20.6579L366.723 33.964H351.503ZM352.732 10.5263C352.732 9.15296 352.292 8.44637 351.503 7.83717C350.31 6.91612 348.561 6.53858 346.544 6.25822C344.526 5.97787 342.777 5.86349 340.624 5.86349C331.823 5.86349 323.021 5.78947 314.219 5.78947V14.7368H340.624C343.798 14.7368 344.826 14.6746 346.544 14.4161C348.292 14.153 350.176 13.7582 351.503 12.9688C352.328 12.1793 352.732 11.8997 352.732 10.5263ZM375.043 7.07207L373.315 0.720723H443L375.043 7.07207ZM443 0.720723V7.20721H414.48V34.0541H401.835V7.20721H373.315V0.720723H443Z" fill="white"/>
                                                </svg>
                                            </Nav.Link>
                                        </LinkContainer>
                                    </motion.div>
                                </Navbar.Brand>
                            </div>
                            <motion.div variants={reveal} id='cart'>
                                <LinkContainer className='nav-cart' to='/cart'>
                                    <Nav.Link>
                                        <i className="fa-solid fa-bag-shopping"></i>
                                        <i className='cart-qty fa-solid'>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</i>
                                    </Nav.Link>
                                </LinkContainer>
                            </motion.div>
                        </Navbar>
                    </header>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default Header;