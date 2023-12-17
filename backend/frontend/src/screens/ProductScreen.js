import React, {useEffect, useState} from 'react';
import {Link, useParams, useNavigate} from "react-router-dom";
import {Button, Card, Col, Container, Image, ListGroup, Row, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {listProductDetails, createProductReview} from "../actions/productActions";
import {PRODUCT_CREATE_REVIEW_RESET} from "../constants/productConstants";

import axios from "axios";

import {motion} from "framer-motion";
import Size from "../components/Size";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {animationStart, reveal} from "../utils/animation";

import Carousel from "../components/Carousel";
import GoUpArrow from "../components/GoUpArrow";

function ProductScreen() {
    const navigate = useNavigate();
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const [trackLimit, setTrackLimit] = useState(0)

    const windowInnerWidth = document.documentElement.clientWidth
    const windowInnerHeight = document.documentElement.clientHeight

    if ((windowInnerWidth <= 896 && windowInnerHeight <= 414) || (windowInnerWidth <= 414 && windowInnerHeight <= 896)) {

        const track = document.getElementById("image-track");

        const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

        const handleOnUp = () => {
          track.dataset.mouseDownAt = "0";
          track.dataset.prevPercentage = track?.dataset.percentage;
        }

        const handleOnMove = e => {
          if(track?.dataset.mouseDownAt === "0") return;

          const mouseDelta = parseFloat(track?.dataset.mouseDownAt) - e.clientX,
                maxDelta = window.innerWidth / 5;

          const percentage = (mouseDelta / maxDelta) * -20,
                nextPercentageUnconstrained = parseFloat(track?.dataset.prevPercentage) + percentage,
                nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -796);

          track.dataset.percentage = nextPercentage;

          track?.animate({
            transform: `translate(${nextPercentage}%, 0%)`
          }, { duration: 1200, fill: "forwards" });

          for(const image of track?.getElementsByClassName("product-screen-img")) {
            image.animate({
              objectPosition: `${60 + (nextPercentage / 50)}% center`,
            }, { duration: 1200, fill: "forwards"});
          }
        }

        const pic = document.getElementById('image-track')
        const fullPics = document.getElementById('fullscreen')
        const fullClose = document.getElementById('fullCloseBtn')
        const sizeClose = document.getElementById('sizeClose')
        const sizeShow = document.getElementById('sizeShow')
        const sizeImg = document.getElementById('sizeImg')

        if (fullPics) {
            sizeShow.addEventListener('click', () => {
                sizeImg.classList.remove('el-hidden')
                sizeClose.classList.remove('el-hidden')
            })
            sizeClose.addEventListener('click', () => {
                sizeImg.classList.add('el-hidden')
                sizeClose.classList.add('el-hidden')
            })
            pic.addEventListener('click', function (e) {
                let imgId = e.target.id;
                let fullScreen = document.getElementById(imgId)
                fullScreen.classList.remove('el-hidden')
                fullClose.classList.remove('el-hidden')

                fullClose.addEventListener('click', function(e) {
                    fullScreen.classList.add('el-hidden')
                    fullClose.classList.add('el-hidden')
                })
            })
        }
    } else if ((windowInnerWidth <= 768 && windowInnerHeight <= 1024) || (windowInnerWidth <= 1024 && windowInnerHeight <= 768)) {

        const track = document.getElementById("image-track");

        const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

        const handleOnUp = () => {
          track.dataset.mouseDownAt = "0";
          track.dataset.prevPercentage = track?.dataset.percentage;
        }

        const handleOnMove = e => {
          if(track?.dataset.mouseDownAt === "0") return;

          const mouseDelta = parseFloat(track?.dataset.mouseDownAt) - e.clientX,
                maxDelta = window.innerWidth / 5;

          const percentage = (mouseDelta / maxDelta) * -75,
                nextPercentageUnconstrained = parseFloat(track?.dataset.prevPercentage) + percentage,
                nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -694);

          track.dataset.percentage = nextPercentage;

          track?.animate({
            transform: `translate(${nextPercentage}%, 0%)`
          }, { duration: 1200, fill: "forwards" });

          for(const image of track?.getElementsByClassName("product-screen-img")) {
            image.animate({
              objectPosition: `${60 + (nextPercentage / 37.5)}% center`,
            }, { duration: 1200, fill: "forwards"});
          }
        }

        const pic = document.getElementById('image-track')
        const fullPics = document.getElementById('fullscreen')
        const fullClose = document.getElementById('fullCloseBtn')
        const sizeClose = document.getElementById('sizeClose')
        const sizeShow = document.getElementById('sizeShow')
        const sizeImg = document.getElementById('sizeImg')

        if (fullPics) {
            sizeShow.addEventListener('click', () => {
                sizeImg.classList.remove('el-hidden')
                sizeClose.classList.remove('el-hidden')
            })
            sizeClose.addEventListener('click', () => {
                sizeImg.classList.add('el-hidden')
                sizeClose.classList.add('el-hidden')
            })
            pic.addEventListener('click', function (e) {
                let imgId = e.target.id;
                let fullScreen = document.getElementById(imgId)
                fullScreen.classList.remove('el-hidden')
                fullClose.classList.remove('el-hidden')

                fullClose.addEventListener('click', function(e) {
                    fullScreen.classList.add('el-hidden')
                    fullClose.classList.add('el-hidden')
                })
            })
        }
    } else {
        const track = document.getElementById("image-track");

        const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

        const handleOnUp = () => {
          track.dataset.mouseDownAt = "0";
          track.dataset.prevPercentage = track?.dataset.percentage;
        }

        const handleOnMove = e => {
          if(track?.dataset.mouseDownAt === "0") return;

          const mouseDelta = parseFloat(track?.dataset.mouseDownAt) - e.clientX,
                maxDelta = window.innerWidth / 7.5;

          const percentage = (mouseDelta / maxDelta) * -100,
                nextPercentageUnconstrained = parseFloat(track?.dataset.prevPercentage) + percentage,
                nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -693);

          track.dataset.percentage = nextPercentage;

          track?.animate({
            transform: `translate(${nextPercentage}%, 0%)`
          }, { duration: 1200, fill: "forwards" });

          for(const image of track?.getElementsByClassName("product-screen-img")) {
            image.animate({
              objectPosition: `${60 + (nextPercentage / 25)}% center`,
            }, { duration: 1200, fill: "forwards"});
          }
        }

        const pic = document.getElementById('image-track')
        const fullPics = document.getElementById('fullscreen')
        const fullClose = document.getElementById('fullCloseBtn')
        const sizeClose = document.getElementById('sizeClose')
        const sizeShow = document.getElementById('sizeShow')
        const sizeImg = document.getElementById('sizeImg')

        if (fullPics) {
            sizeShow.addEventListener('click', () => {
                sizeImg.classList.remove('el-hidden')
                sizeClose.classList.remove('el-hidden')
            })
            sizeClose.addEventListener('click', () => {
                sizeImg.classList.add('el-hidden')
                sizeClose.classList.add('el-hidden')
            })
            pic.addEventListener('dblclick', function (e) {
                let imgId = e.target.id;
                let fullScreen = document.getElementById(imgId)
                fullScreen.classList.remove('el-hidden')
                fullClose.classList.remove('el-hidden')

                fullClose.addEventListener('click', function(e) {
                    fullScreen.classList.add('el-hidden')
                    fullClose.classList.add('el-hidden')
                })
            })
        }
    }

    const [leftBtnLimit, setLeftBtnLimit] = useState(true)
    const [rightBtnLimit, setRightBtnLimit] = useState(false)

    var trackLeft = () => {
        const arr = document.querySelectorAll('.pics-arr-el')

        for (let i in arr) {
            if (i <= 9) {
                arr[i].classList.remove('pics-arr-active')
            }
        }

        const track = document.getElementById("image-track");

        if (Number(track.dataset.percentage) < 0) {
            track.dataset.percentage = Number(track.dataset.percentage) + 100
            setLeftBtnLimit(false)
            setRightBtnLimit(false)
            if (track.dataset.percentage > -60 && track.dataset.percentage >= 0) {
                track.dataset.percentage = 0
                setLeftBtnLimit(true)
                setRightBtnLimit(false)
            }
            track?.animate({
                transform: `translate(${Number(track.dataset.percentage)}%, 0%)`
            }, { duration: 750, fill: "forwards" });
        }
    }

    var trackRight = () => {
        const arr = document.querySelectorAll('.pics-arr-el')

        for (let i in arr) {
            if (i <= 9) {
                arr[i].classList.remove('pics-arr-active')
            }
        }

        const track = document.getElementById("image-track");

        if (Number(track.dataset.percentage) >= trackLimit) {
            track.dataset.percentage = Number(track.dataset.percentage) - 100
            setRightBtnLimit(false)
            setLeftBtnLimit(false)
            if (track.dataset.percentage < trackLimit) {
                track.dataset.percentage = trackLimit
                setRightBtnLimit(true)
                setLeftBtnLimit(false)
            }
            track?.animate({
                transform: `translate(${Number(track.dataset.percentage)}%, 0%)`
            }, { duration: 750, fill: "forwards" });
        }
    }

    const [products, setProducts] = useState([])

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

    useEffect(() => {
        extraMenuClose()
        fetchProducts()
        const track = document.getElementById("image-track")
        track.dataset.percentage = 0
        if ((windowInnerWidth <= 896 && windowInnerHeight <= 414) || (windowInnerWidth <= 414 && windowInnerHeight <= 896)) {
            setTrackLimit(-900)
        } else if ((windowInnerWidth <= 768 && windowInnerHeight <= 1024) || (windowInnerWidth <= 1024 && windowInnerHeight <= 768)) {
            setTrackLimit(-900)
        } else {
            setTrackLimit(-900)
        }
    }, [])

    const fetchProducts = async () => {
        const {data} = await axios.get('/api/products/')
        setProducts(data)
    }

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {
        loading: loadingProductReview,
        error: errorProductReview,
        success: successProductReview,
    } = productReviewCreate

    const { id } = useParams();

    const loadHandler = () => {
        const body = document.querySelector('.card').addEventListener('load', () => {
            window. scrollTo(0, 0)
        })
    }

    const result = document.getElementById('result')

    useEffect(() =>{
        if (successProductReview) {
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(listProductDetails(id))
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    },[dispatch, successProductReview])

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}?size=${size}`)
    }

    const [size, setSize] = useState('')
    const [qtySize, setQtySize] = useState(product.countInStock)
    const [newDescription, setNewDescription] = useState([])

    let count = (product.sizeInStockS === 0 && product.sizeInStockM === 0 && product.sizeInStockL === 0 && product.sizeInStockXL === 0) ? product.countInStock : (product.sizeInStockS + product.sizeInStockM + product.sizeInStockL + product.sizeInStockXL)

    const submitHandler = (e) => {
        e.preventDefault()
        if (rating !== 0) {
            dispatch(createProductReview(
                id,
                rating,
                comment
            ))
        } else {
            console.log({errorProductReview})
        }
    }

    const prodsAlike = []
    for (let i in Object?.values(products)[0]) {
        if (!Object?.values(products)?.[0]?.[i]?.category?.split(', ')?.includes(product?.category?.split(', ')?.[0])) {
            prodsAlike.push(Object?.values(products)?.[0]?.[i])
        }
    }

    const descriptionHandler = (description) => {
        if (description.includes(';')) {
            description = description.split(';')
        }
        return [...description]
    }

    const alikeIds = product.description2 && product.description2.split(';')
    const alikeForYou = []

    for (let i in alikeIds) {
        for (let y in products.products) {
            if (Number(products.products[y]._id) === Number(alikeIds[i])) {
                products.products[y] && alikeForYou.push(products.products[y])
            }
        }
    }

    const heightM = [175, 185]
    const weightM = [60, 75]
    const [yourHeight, setYourHeight] = useState(0)
    const [yourWeight, setYourWeight] = useState(0)

    const countYourSize = () => {
        if (yourHeight <= 0 || yourWeight <= 0) {
            setSize('')
            setTimeout(() => {result.style.display = 'none'}, 1)
        } else if (yourHeight < heightM[0]) {
            if (yourWeight < weightM[0]) {
                setSize('S')
            } else if (yourWeight >= weightM[0]) {
                 setSize('M')
            }
            setTimeout(() => {result.style.display = 'flex'}, 1)
        } else if (yourHeight >= heightM[0] && yourHeight <= heightM[1]) {
            if (yourWeight < weightM[0]) {
                setSize('S')
            } else if (yourWeight >= weightM[0] && yourWeight <= weightM[1]) {
                setSize('M')
            } else if (yourWeight >= weightM[1]) {
                setSize('L')
            }
            setTimeout(() => {result.style.display = 'flex'}, 1)
        } else if (yourHeight > heightM[1] || yourWeight > weightM[1]) {
            setSize('L')
            setTimeout(() => {result.style.display = 'flex'}, 1)
        }
    }

    const [calcView, setCalcView] = useState(true)
    const calcHandler = () => {
        setCalcView(!calcView)
        const calcText = document.querySelector('.showCalc')
        const calculator = document.querySelector('.product-calc')
        const arrowDown = document.querySelector('.fa-sort-down')

        if (calcView === true) {
            if (size) {
                setTimeout(() => {result.style.display = 'flex'}, 249)
            } else if (size === '') {
                setTimeout(() => {result.style.display = 'none'}, 249)
            }

            calculator.animate({
                height: '100%',
                opacity: '1'
            }, 250)

            arrowDown.animate({
                transform: 'rotate(180deg)'
            }, 250)

            setTimeout(() => {calculator.style.height = '100%'}, 249)
            setTimeout(() => {calculator.style.opacity = '1'}, 249)
            setTimeout(() => {arrowDown.style.transform = 'rotate(180deg)'}, 249)
        } else {
            if (size) {
                setTimeout(() => {result.style.display = 'none'}, 249)
            } else if (size === '') {
                setTimeout(() => {result.style.display = 'none'}, 249)
            }

            calculator.animate({
                height: '0',
                opacity: '0'
            }, 250)

            arrowDown.animate({
                transform: 'rotate(0deg)'
            }, 250)

            setTimeout(() => {calculator.style.height = '0'}, 249)
            setTimeout(() => {calculator.style.opacity = '0'}, 249)
            setTimeout(() => {arrowDown.style.transform = 'rotate(0deg)'}, 249)
        }
    }

    const picsArr = [
        product.preview1,
        product.preview2,
        product.preview3,
        product.preview4,
        product.preview5,
        product.preview6,
        product.preview7,
        product.preview8,
        product.preview9,
        product.preview10
    ]

    const picsArrHandler = (pic) => {
        const arr = document.querySelectorAll('.pics-arr-el')

        for (let i in arr) {
            if (i <= 9) {
                arr[i].classList.remove('pics-arr-active')
            }
        }

        pic.target.classList.add('pics-arr-active')

        const track = document.getElementById("image-track");

        track.dataset.percentage = (-100 * Number(pic.target.getAttribute('scrollMultiplier')))

        track?.animate({
            transform: `translate(${Number(track.dataset.percentage)}%, 0%)`
        }, { duration: 750, fill: "forwards" });
    }

    return (
        <div>
            {loading && <Loader/>}
            {error && <Message variant='danger'>{error}</Message>}
            {
                !error &&
                <div>
                    <div id="fullscreen">
                        <button id="fullCloseBtn" className="btn btn-light my-3 el-hidden"><i className="fa-solid fa-xmark fa-2xl"></i></button>

                        <button id="sizeClose" className="btn btn-light my-3 el-hidden"><i className="fa-solid fa-xmark fa-2xl"></i></button>

                        <Image src={product.productSize} id='sizeImg' className="product-img-fullscreen el-hidden" draggable="false"/>

                        <Image src={product.preview1} id={product.preview1} className="product-img-fullscreen el-hidden" draggable="false"/>
                        <Image src={product.preview2} id={product.preview2} className="product-img-fullscreen el-hidden" draggable="false"/>
                        <Image src={product.preview3} id={product.preview3} className="product-img-fullscreen el-hidden" draggable="false"/>
                        <Image src={product.preview4} id={product.preview4} className="product-img-fullscreen el-hidden" draggable="false"/>
                        <Image src={product.preview5} id={product.preview5} className="product-img-fullscreen el-hidden" draggable="false"/>
                        <Image src={product.preview6} id={product.preview6} className="product-img-fullscreen el-hidden" draggable="false"/>
                        <Image src={product.preview7} id={product.preview7} className="product-img-fullscreen el-hidden" draggable="false"/>
                        <Image src={product.preview8} id={product.preview8} className="product-img-fullscreen el-hidden" draggable="false"/>
                        <Image src={product.preview9} id={product.preview9} className="product-img-fullscreen el-hidden" draggable="false"/>
                        <Image src={product.preview10} id={product.preview10} className="product-img-fullscreen el-hidden" draggable="false"/>
                    </div>

                    <Container>

                        {
                            window.innerWidth >= 910 &&
                                <motion.div
                                    variants={reveal}
                                    initial='hiddenVariantX'
                                    animate='revealedVariantX'
                                    transition={{
                                        ease: 'easeIn',
                                        type: 'spring',
                                        staggerChildren: .1,
                                        duration: 1,
                                        delayChildren: animationStart,
                                        delay: animationStart
                                    }}
                                >
                                    <Link to='/' className='btn btn-light mt-3'>Назад</Link>
                                </motion.div>
                        }

                        <Row className='mt-3'>
                            <motion.div
                                className="col-md-6 image-track"
                                variants={reveal}
                                initial='hiddenVariantX'
                                animate='revealedVariantX'
                                transition={{
                                    ease: 'easeIn',
                                    type: 'spring',
                                    staggerChildren: .25,
                                    duration: 1,
                                    delayChildren: animationStart - 1,
                                    delay: animationStart - 1
                                }}
                            >
                                <Col id="image-track" data-mouse-down-at="0" data-prev-percentage="0">
                                    <motion.img variants={reveal} src={product.preview1} id={product.preview1} className="product-screen-img" draggable="false"/>
                                    <motion.img variants={reveal} src={product.preview2} id={product.preview2} className="product-screen-img" draggable="false"/>
                                    <motion.img variants={reveal} src={product.preview3} id={product.preview3} className="product-screen-img" draggable="false"/>
                                    <motion.img variants={reveal} src={product.preview4} id={product.preview4} className="product-screen-img" draggable="false"/>
                                    <motion.img variants={reveal} src={product.preview5} id={product.preview5} className="product-screen-img" draggable="false"/>
                                    <motion.img variants={reveal} src={product.preview6} id={product.preview6} className="product-screen-img" draggable="false"/>
                                    <motion.img variants={reveal} src={product.preview7} id={product.preview7} className="product-screen-img" draggable="false"/>
                                    <motion.img variants={reveal} src={product.preview8} id={product.preview8} className="product-screen-img" draggable="false"/>
                                    <motion.img variants={reveal} src={product.preview9} id={product.preview9} className="product-screen-img" draggable="false"/>
                                    <motion.img variants={reveal} src={product.preview10} id={product.preview10} className="product-screen-img" draggable="false"/>
                                </Col>

                                <div className='img-track-btns'>
                                    <motion.button variants={reveal} onClick={trackLeft} disabled={leftBtnLimit}><i className="fa-solid fa-arrow-left"></i></motion.button>
                                    <motion.button variants={reveal} onClick={trackRight} disabled={rightBtnLimit}><i className="fa-solid fa-arrow-right"></i></motion.button>
                                </div>

                                {
                                    (window.innerWidth > 767) &&
                                        <div className='pics-arr'>
                                            {
                                                picsArr.map((pic) =>(
                                                    <motion.img
                                                        variants={reveal}
                                                        src={pic}
                                                        id={pic}
                                                        scrollMultiplier={picsArr.indexOf(pic)}
                                                        className="pics-arr-el"
                                                        draggable="false"
                                                        onClick={picsArrHandler}
                                                    />
                                                ))
                                            }
                                        </div>
                                }
                            </motion.div>

                            <Col md={6} id='prod-desc'>
                                <motion.div>
                                    <Card>
                                        <ListGroup className='border-0 list-group-flush'>
                                            <motion.div variants={reveal} className='border-0'>
                                                <ListGroup.Item style={{border: 0}}>
                                                    <motion.h1
                                                        id='product-title'
                                                        variants={reveal}
                                                        initial='hiddenVariantX'
                                                        animate='revealedVariantX'
                                                        transition={{
                                                            ease: 'easeIn',
                                                            type: 'spring',
                                                            staggerChildren: .25,
                                                            duration: 1,
                                                            delayChildren: animationStart,
                                                            delay: animationStart
                                                        }}
                                                    >{product.name}</motion.h1>
                                                </ListGroup.Item>
                                            </motion.div>
                                            <div id="product-rating" style={{paddingLeft: '1rem'}}>
                                                <motion.span
                                                    style={{width: 32 + '%'}}
                                                    className="rating d-flex justify-content-left"
                                                    variants={reveal}
                                                    initial='hiddenVariantX'
                                                    animate='revealedVariantX'
                                                    transition={{
                                                        ease: 'easeIn',
                                                        type: 'spring',
                                                        staggerChildren: .1,
                                                        duration: 1,
                                                        delayChildren: animationStart,
                                                        delay: animationStart
                                                    }}
                                                >
                                                    <motion.span variants={reveal}> <i className={
                                                        product.rating >= 1
                                                            ? "fas fa-star d-flex justify-content-center"
                                                            : product.rating >= 0.5
                                                                ? "fas fa-star-half-alt d-flex justify-content-center"
                                                                : "far fa-star d-flex justify-content-center"
                                                    }></i></motion.span>
                                                    <motion.span variants={reveal}> <i className={
                                                        product.rating >= 2
                                                            ? "fas fa-star d-flex justify-content-center"
                                                            : product.rating >= 1.5
                                                                ? "fas fa-star-half-alt d-flex justify-content-center"
                                                                : "far fa-star d-flex justify-content-center"
                                                    }></i></motion.span>
                                                    <motion.span variants={reveal}> <i className={
                                                        product.rating >= 3
                                                            ? "fas fa-star d-flex justify-content-center"
                                                            : product.rating >= 2.5
                                                                ? "fas fa-star-half-alt d-flex justify-content-center"
                                                                : "far fa-star d-flex justify-content-center"
                                                    }></i></motion.span>
                                                    <motion.span variants={reveal}> <i className={
                                                        product.rating >= 4
                                                            ? "fas fa-star d-flex justify-content-center"
                                                            : product.rating >= 3.5
                                                                ? "fas fa-star-half-alt d-flex justify-content-center"
                                                                : "far fa-star d-flex justify-content-center"
                                                    }></i></motion.span>
                                                    <motion.span variants={reveal}> <i className={
                                                        product.rating >= 5
                                                            ? "fas fa-star d-flex justify-content-center"
                                                            : product.rating >= 4.5
                                                                ? "fas fa-star-half-alt d-flex justify-content-center"
                                                                : "far fa-star d-flex justify-content-center"
                                                    }></i></motion.span>
                                                </motion.span>
                                            </div>
                                            <motion.div
                                                id="product-price"
                                                variants={reveal}
                                                initial='hiddenVariantX'
                                                animate='revealedVariantX'
                                                transition={{
                                                    ease: 'easeIn',
                                                    type: 'spring',
                                                    staggerChildren: .25,
                                                    duration: 1,
                                                    delayChildren: animationStart,
                                                    delay: animationStart + 1
                                                }}
                                            >
                                                <ListGroup.Item variant="flush">
                                                    <Row>
                                                        <motion.Col variants={reveal} className='d-flex justify-content-left'>
                                                            <h4>{product.price} ₽</h4>
                                                        </motion.Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            </motion.div>

                                            <motion.div
                                                variants={reveal}
                                                initial='hiddenVariantX'
                                                animate='revealedVariantX'
                                                transition={{
                                                    ease: 'easeIn',
                                                    type: 'spring',
                                                    staggerChildren: .25,
                                                    duration: 1,
                                                    delayChildren: animationStart,
                                                    delay: animationStart + 1.2
                                                }}
                                            >
                                                <ListGroup.Item variant="flush">
                                                    <Row style={{height: 'auto'}} id='calcRow'>
                                                        <Col md={4} style={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            justifyContent: "end",
                                                            alignItems: "center"
                                                        }}>
                                                            <Size variants={reveal} product={product} setSize={setSize} size={size} qtySize={qtySize} setQtySize={setQtySize}/>
                                                            <motion.div variants={reveal} className='product-size'>
                                                                <Button
                                                                    variant='dark'
                                                                    className='size-btn mt-2'
                                                                    type='button'
                                                                    id='sizeShow'
                                                                >
                                                                    Таблица размеров
                                                                </Button>
                                                            </motion.div>
                                                        </Col>
                                                        <Col>
                                                            <motion.div variants={reveal} style={{height: 100 + '%'}}>
                                                                <div className='showCalc'
                                                                     onClick={calcHandler}
                                                                     style={{zIndex: 3}}
                                                                >
                                                                    <h4 style={{zIndex: 2, fontSize: '1.1rem', margin: 0}}>Подобрать размер</h4><i
                                                                    className="fas fa-sort-down fa-lg mx-2" style={{zIndex: 2}}></i>
                                                                </div>
                                                                <Form style={{zIndex: 1}}>
                                                                    <Form.Group className='product-calc'>
                                                                        <div className='calc-input'>
                                                                            <Form.Control
                                                                                style={{
                                                                                    height: 30 + 'px',
                                                                                    fontSize: 1 + 'rem'
                                                                                }}
                                                                                className='mb-1'
                                                                                type='number'
                                                                                placeholder='Рост'
                                                                                onChange={(e) => setYourHeight(e.target.value)}
                                                                            ></Form.Control>
                                                                            <Form.Control
                                                                                style={{
                                                                                    height: 30 + 'px',
                                                                                    fontSize: 1 + 'rem'
                                                                            }}
                                                                                type='number'
                                                                                placeholder='Вес'
                                                                                onChange={(e) => setYourWeight(e.target.value)}
                                                                            ></Form.Control>
                                                                        </div>
                                                                        <div className='calc-submit'>
                                                                            <Button
                                                                                variant='dark'
                                                                                className='size-btn'
                                                                                type='button'
                                                                                id='sizeCalc'
                                                                                onClick={countYourSize}
                                                                            >
                                                                                <i className="fa-solid fa-calculator fa-xl"></i>
                                                                            </Button>
                                                                        </div>
                                                                    </Form.Group>
                                                                </Form>
                                                                <div className='justify-content-center' id='result'>
                                                                    <span>Ваш результат: {size}</span>
                                                                </div>
                                                            </motion.div>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            </motion.div>

                                            {count > 0 && (
                                                <motion.div
                                                    variants={reveal}
                                                    initial='hiddenVariantX'
                                                    animate='revealedVariantX'
                                                    transition={{
                                                        ease: 'easeIn',
                                                        type: 'spring',
                                                        staggerChildren: .25,
                                                        duration: 1,
                                                        delayChildren: animationStart,
                                                        delay: animationStart + .8
                                                    }}
                                                >
                                                    <ListGroup.Item variant="flush">
                                                        <Row>
                                                            <motion.Col variants={reveal}>
                                                                Количество:
                                                            </motion.Col>
                                                            <motion.Col variants={reveal} xs='auto' className='my-1'>
                                                                <Form.Control
                                                                    className="qty-form"
                                                                    as="select" value={qty}
                                                                    onChange={(e) => setQty(e.target.value)}
                                                                >
                                                                    {
                                                                        [...Array(
                                                                            (size === 'S' && product.sizeInStockS) ||
                                                                            (size === 'M' && product.sizeInStockM) ||
                                                                            (size === 'L' && product.sizeInStockL) ||
                                                                            (size === 'XL' && product.sizeInStockXL) ||
                                                                            (product.countInStock)
                                                                        ).slice(0, 10).keys()].map((x) => (
                                                                            <option key={x+1} value={x+1}>{x+1}</option>
                                                                        ))
                                                                    }
                                                                </Form.Control>
                                                            </motion.Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                </motion.div>
                                            )}

                                            <motion.div className='rounded-bottom'
                                                variants={reveal}
                                                initial='hiddenVariantX'
                                                animate='revealedVariantX'
                                                transition={{
                                                    ease: 'easeIn',
                                                    type: 'spring',
                                                    staggerChildren: .25,
                                                    duration: 1,
                                                    delayChildren: animationStart,
                                                    delay: animationStart + 1.4
                                                }}
                                            >
                                                <ListGroup.Item className="d-grid gap-2" variant="flush">
                                                    <Button style={{color: 'red !important'}} onClick={() => {
                                                        addToCartHandler()
                                                        product.size = size
                                                    }} variant='dark' className='size-btn' type='button' disabled={
                                                        ((product?.countInStock === 0 || !size) && !product?.category?.includes('ACCESSORIES'))
                                                    }>{
                                                        product?.countInStock === 0
                                                            ? 'SOLD OUT'
                                                            : 'Добавить в корзину'
                                                    }</Button>
                                                </ListGroup.Item>
                                            </motion.div>
                                        </ListGroup>
                                    </Card>
                                </motion.div>
                                <motion.div variants={reveal} initial='hiddenVariantX' animate='revealedVariantX'>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item className='description-group-item'>
                                            <motion.div
                                                id="product-desc"
                                                variants={reveal}
                                                initial='hiddenVariantX'
                                                animate='revealedVariantX'
                                                transition={{
                                                    ease: 'easeIn',
                                                    type: 'spring',
                                                    staggerChildren: .25,
                                                    duration: 1,
                                                    delayChildren: animationStart,
                                                    delay: animationStart
                                                }}
                                            >
                                                {product.description1 && (
                                                    descriptionHandler(product.description1).map((desc) => (
                                                        <motion.div
                                                            variants={reveal}
                                                            key={desc}
                                                            className='mb-0'
                                                        >{desc}</motion.div>
                                                    ))
                                                )}
                                            </motion.div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </motion.div>
                            </Col>
                        </Row>
                    </Container>
                    <Row>
                        <Col md={12}>
                            {
                                product.description2 !== '' &&
                                <Carousel product={product} products={products.products}/>
                            }
                        </Col>
                    </Row>
                </div>
            }
        </div>
    );
}

export default ProductScreen;