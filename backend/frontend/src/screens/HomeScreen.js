import React, {useState, useEffect} from 'react';
import {Container, Button} from 'react-bootstrap';
import Product from "../components/Product";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";

import Banner from "../components/Banner";
import Filter from "../components/Filter";
import Loader from "../components/Loader";
import Message from "../components/Message";
import RunningStroke from "../components/RunningStroke";

import {motion, AnimatePresence} from "framer-motion";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function HomeScreen() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products, page, pages} = productList

    let keyword = window.location.search

    const [filtered, setFiltered] = useState([])
    const [activeFilter, setActiveFilter] = useState("0")

    const ACCOUNT = 'SZagROHe9DGO9gX9wsQ5E3nOrRBcPnGe'
    const PASS = 'UoMKLl8J3vQ7zIO3sYrh7pF46ZoID6ly'

    const extraMenuClose = () => {
        const menu = document.querySelector('.extra-menu')
        const backGround = document.querySelector('.extra-background')

        menu.animate({
            left: '-16rem'
        }, 250)

        backGround.animate({
            opacity: '0'
        }, 250)

        setTimeout(() => {menu.style.left = '-16rem'}, 249)
        setTimeout(() => {backGround.style.display = 'none'}, 249)
    }

    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length",
        withCredentials: true,
    }

    useEffect(() => {
        extraMenuClose()
        dispatch(listProducts(keyword))
        setFiltered(products)

        const sdekInfo = async () => {
            // const {data} = await axios.post(`https://thingproxy.freeboard.io/fetch/https://api.cdek.ru/v2/oauth/token?grant_type=client_credentials&client_id=${ACCOUNT}&client_secret=${PASS}`)
            const {data} = await axios.post(`https://api.cdek.ru/v2/oauth/token?grant_type=client_credentials&client_id=${ACCOUNT}&client_secret=${PASS}`)
            window.localStorage.setItem('sdekInfo', JSON.stringify(data))
        }

        sdekInfo()

        // axios.post(`https://api.cdek.ru/v2/oauth/token?grant_type=client_credentials&client_id=${ACCOUNT}&client_secret=${PASS}`, {
        //     headers: {
        //         'Access-Control-Allow-Origin': '*',
        //         'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        //     }
        // }).then((response) => {
        //         window.localStorage.setItem('sdekInfo', JSON.stringify(response.data))
        //     })

        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, [dispatch, keyword])

    const popupHandler = () => {
        const popupBackground = document.getElementById('popup-background')
        const popupCard = document.getElementById('popup-card')

        popupBackground.animate({
            opacity: '0'
        }, 250)

        popupCard.animate({
            transform: "translate(-12.5vw, 100vh) scale(.5)"
        }, 250)

        setTimeout(() => {popupBackground.remove()}, 200)
        setTimeout(() => {popupCard.style.display = 'none'}, 200)
    }

    const popupBackground = document.getElementById('popup-background')

    document.body.addEventListener('load', () => {
        popupBackground.style.display = 'flex'
    })

    return loading ? (
        <Loader/>
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div>
            <motion.div
                className='popup-background'
                id='popup-background'
                animate={{opacity: .75, display: 'flex'}}
                transition={{
                    duration: 1,
                    delay: 15
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
                    delay: 15
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
                <div id='btn-holder'>
                    <Button
                        className='size-btn btn btn-dark popup-card-btn'
                        href='https://t.me/+8h0qPRLvvu9hOWIy'
                        target='_blank'
                    >ПОДПИСАТЬСЯ</Button>
                </div>
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
                <motion.div layout className="products" id='products'>
                    <AnimatePresence>
                        {
                            filtered.map((product) => {
                                return <Product key={product._id} product={product}/>
                            })
                        }
                    </AnimatePresence>
                </motion.div>
            </Container>
        </div>
    );
}

export default HomeScreen;