import React, {useState, useEffect} from 'react';
import {Row, Col, Container, Image, Button} from 'react-bootstrap';
import Product from "../components/Product";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";

import Banner from "../components/Banner";
import Filter from "../components/Filter";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";

import {motion, AnimatePresence} from "framer-motion";
import {useNavigate} from "react-router-dom";

function HomeScreen() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products, page, pages} = productList
    const navigate = useNavigate

    let keyword = window.location.search

    const [filtered, setFiltered] = useState([])
    const [activeFilter, setActiveFilter] = useState("0")

    useEffect(() => {
        dispatch(listProducts(keyword))
        setFiltered(products)
    }, [dispatch, keyword])

    const popupHandler = () => {
        const popUpBtn = document.getElementById('popup-close-btn')
        const popupBackground = document.getElementById('popup-background')
        const popupCard = document.getElementById('popup-card')

        popUpBtn.animate({
            top: '-10rem'
        }, 250)

        popupBackground.animate({
            opacity: '0'
        }, 250)

        popupCard.animate({
            transform: "translate(-12.5vw, 100vh) scale(.5)"
        }, 250)

        setTimeout(() => {popUpBtn.style.display = 'none'}, 200)
        setTimeout(() => {popupBackground.style.display = 'none'}, 200)
        setTimeout(() => {popupCard.style.display = 'none'}, 200)
    }

    return loading ? (
        <Loader/>
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div>
            <motion.button
                id="popup-close-btn"
                animate={{top: 2 + 'rem'}}
                transition={{
                    type: "spring",
                    duration: .75,
                    delay: 2.1
                }}
                onClick={popupHandler}
            >
                <i className="fa-solid fa-xmark fa-xl"></i>
            </motion.button>
            <motion.div
                className='popup-background'
                id='popup-background'
                animate={{opacity: .75}}
                transition={{
                    duration: 1,
                    delay: 2
                }}
                onClick={popupHandler}
            ></motion.div>
            <motion.div
                className='popup-card'
                id='popup-card'
                animate={{top: 50 + '%'}}
                transition={{
                    type: "spring",
                    duration: 1,
                    delay: 2
                }}
            >
                <div className='popup-card-img'></div>
                <h4>WELCOME TO THE FAMILY</h4>
                <p className='mb-5'>Будь в курсе закрытой информации:</p>
                <ul className='mb-5'>
                    <li className='mb-1'>Новинок</li>
                    <li className='mb-1'>Новостей</li>
                    <li className='mb-1'>Скидок</li>
                    <li className='mb-1'>Розыгрышей</li>
                </ul>
                <Button
                    className='size-btn btn btn-dark popup-card-btn'
                    href='https://vk.com/unfort_4u'
                    target='_blank'
                >ПОДПИСАТЬСЯ</Button>
            </motion.div>
            <Banner/>
            <Filter
                products={products}
                setFiltered={setFiltered}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
            />
            <Container>
                <Paginate
                    page={page}
                    pages={pages}
                    keyword={keyword}
                />
                <motion.div layout className="products">
                    <AnimatePresence>
                        {
                            filtered.map((product) => {
                                return <Product key={product._id} product={product}/>
                            })
                        }
                    </AnimatePresence>
                </motion.div>
                {
                    Number(filtered.length) > 4 &&
                    <Paginate
                        page={page}
                        pages={pages}
                        keyword={keyword}
                    />
                }
            </Container>
        </div>
    );
}

export default HomeScreen;