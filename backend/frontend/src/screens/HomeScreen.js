import React, {useState, useEffect} from 'react';
import {Container, Button} from 'react-bootstrap';
import Product from "../components/Product";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";

import Banner from "../components/Banner";
import Filter from "../components/Filter";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import RunningStroke from "../components/RunningStroke";

import {motion, AnimatePresence} from "framer-motion";
import {useNavigate} from "react-router-dom";

function HomeScreen() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products, page, pages} = productList

    let keyword = window.location.search

    const [filtered, setFiltered] = useState([])
    const [activeFilter, setActiveFilter] = useState("0")

    useEffect(() => {
        dispatch(listProducts(keyword))
        setFiltered(products)
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
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
                <div id='popup-card-body'>
                    <h4>WELCOME TO THE FAMILY</h4>
                    <p>Будь в курсе закрытой информации:</p>
                </div>
                <ul>
                    <li>Новинок</li>
                    <li>Новостей</li>
                    <li>Скидок</li>
                    <li>Розыгрышей</li>
                </ul>
                <Button
                    className='size-btn btn btn-dark popup-card-btn'
                    href='https://t.me/+8h0qPRLvvu9hOWIy'
                    target='_blank'
                >ПОДПИСАТЬСЯ</Button>
            </motion.div>
            <Banner/>
            <RunningStroke/>
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
                <br/>
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