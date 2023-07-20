import React from 'react';
import {Container, Nav, Navbar, Row, NavDropdown} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/userActions";
import SearchBox from "./SearchBox";
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

    const linkHandler = () => {
        navigate(`/`)
        navigate(0)
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
                          <Container>
                            <LinkContainer
                                onClick={linkHandler}
                                to='/'
                            >
                                <Navbar.Brand className='unfort-logo'>
                                    <motion.div variants={reveal}>
                                        <a
                                            id="unfort-link-header"
                                            href='/'
                                            className="word fancy mailto"
                                        >
                                            unfort
                                        </a>
                                    </motion.div>
                                    {/*<motion.svg variants={reveal} viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                                    {/*    <path d="M363.699 5.64236C226.14 45.9876 115.445 139.509 52.1508 268.67C2.21305 370.092 -12.4104 485.652 10.6579 596.564C28.1444 680.9 66.4203 759.373 121.915 824.664C137.106 842.627 166.362 871.425 168.05 870.284C168.894 869.856 169.597 868.003 169.597 866.292C169.597 856.313 179.021 830.652 189.71 811.833C212.215 771.916 259.193 723.73 312.361 685.951C402.942 621.37 518.419 576.035 617.439 565.771C642.194 563.347 691.001 564.773 708.723 568.764C755.42 578.886 784.817 601.981 793.397 635.056C796.632 647.887 796.069 667.133 792.131 683.385C783.129 719.025 758.937 755.806 717.303 796.864C673.56 839.918 622.924 874.846 557.098 907.493C488.178 941.565 425.024 961.667 360.746 970.22C344.008 972.359 341.476 972.929 342.742 974.212C343.023 974.497 350.9 977.063 360.183 979.772C478.917 1014.85 606.27 1004.03 717.584 949.406C767.938 924.743 808.166 896.088 848.111 856.741C908.542 797.325 953.195 723.407 977.93 641.839C1002.67 560.272 1006.68 473.694 989.609 390.134C984.546 365.185 975.403 333.251 973.434 333.679C972.731 333.821 971.324 338.241 970.48 343.373C965.781 371.52 951.026 396.929 929.028 414.756C907.031 432.582 879.329 441.579 851.206 440.03C832.639 439.033 821.106 436.324 806.056 428.911C791.779 421.935 779.046 412.097 768.627 399.992C758.207 387.888 750.317 373.767 745.434 358.485C740.511 343.516 739.245 314.29 742.621 298.181C757.952 225.046 837.422 184.843 904.935 216.065C909.91 218.339 914.748 220.91 919.423 223.763C921.673 225.474 923.924 226.614 924.346 226.187C924.768 225.759 919.985 217.918 913.797 208.651C866.066 137.658 801.369 80.0771 725.742 41.283C702.253 29.1652 669.2 14.9089 667.793 16.3346C667.371 16.7622 666.949 29.4503 666.808 44.4194C666.386 80.3451 661.323 108.573 648.242 147.492C624.893 216.635 585.51 287.203 531.781 355.633C417.007 501.76 270.024 592.287 178.458 573.184C142.732 565.628 117.696 540.252 107.568 501.047C103.349 484.795 102.364 451.435 105.459 427.77C115.445 351.356 158.204 256.552 221.92 170.302C267.211 108.858 320.378 53.4008 372.701 13.1982C380.578 7.21053 387.47 1.79315 388.314 1.08034C390.986 -1.34322 382.125 0.367546 363.699 5.64236Z" fill="white"/>*/}
                                    {/*</motion.svg>*/}
                                </Navbar.Brand>
                            </LinkContainer>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse className='navbar-container' id="basic-navbar-nav">
                                <Nav

                                >
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

                                    <motion.div  variants={reveal}>
                                        <LinkContainer className='nav-cart' to='/cart'>
                                            <Nav.Link><i className="fas fa-shopping-cart">
                                                <span className='cart-qty'>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span></i></Nav.Link>
                                        </LinkContainer>
                                    </motion.div>
                                </Nav>
                            </Navbar.Collapse>
                          </Container>
                        </Navbar>
                    </header>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default Header;