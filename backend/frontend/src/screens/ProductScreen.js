import React, {useEffect, useState} from 'react';
import {Link, useParams, useNavigate, Navigate} from "react-router-dom";
import {Button, Card, Col, Container, Image, ListGroup, Row, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {listProductDetails, createProductReview} from "../actions/productActions";
import {PRODUCT_CREATE_REVIEW_RESET} from "../constants/productConstants";

import axios from "axios";

import {motion} from "framer-motion";
import Size from "../components/Size";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";
import {animationStart, reveal} from "../utils/animation";

import Carousel from "../components/Carousel";

function ProductScreen() {
    // const productList = useSelector(state => state.productList)
    // const {products} = productList
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

        // window.onmousedown = e => handleOnDown(e);
        //
        // window.ontouchstart = e => handleOnDown(e.touches[0]);
        //
        // window.onmouseup = e => handleOnUp(e);
        //
        // window.ontouchend = e => handleOnUp(e.touches[0]);
        //
        // window.onmousemove = e => handleOnMove(e);
        //
        // window.ontouchmove = e => handleOnMove(e.touches[0]);

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

        // window.onmousedown = e => handleOnDown(e);
        //
        // window.ontouchstart = e => handleOnDown(e.touches[0]);
        //
        // window.onmouseup = e => handleOnUp(e);
        //
        // window.ontouchend = e => handleOnUp(e.touches[0]);
        //
        // window.onmousemove = e => handleOnMove(e);
        //
        // window.ontouchmove = e => handleOnMove(e.touches[0]);

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

        window.onmousedown = e => {
            handleOnDown(e);
            window.onmouseup = e => handleOnUp(e);
            window.onmousemove = e => handleOnMove(e);
        }

        window.ontouchstart = e => {
            handleOnDown(e.touches[0]);
            window.ontouchend = e => handleOnUp(e.touches[0]);
            window.ontouchmove = e => handleOnMove(e.touches[0]);
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

    const [products, setProducts] = useState([])

    useEffect(() => {
        fetchProducts()
        const track = document.getElementById("image-track")
        track.dataset.percentage = 0
        if ((windowInnerWidth <= 896 && windowInnerHeight <= 414) || (windowInnerWidth <= 414 && windowInnerHeight <= 896)) {
            setTrackLimit(-796)
        } else if ((windowInnerWidth <= 768 && windowInnerHeight <= 1024) || (windowInnerWidth <= 1024 && windowInnerHeight <= 768)) {
            setTrackLimit(-694)
        } else {
            setTrackLimit(-693)
        }
    }, [])

    const fetchProducts = async () => {
        const {data} = await axios.get('/api/products/')
        setProducts(data)
    }

    const [leftBtnLimit, setLeftBtnLimit] = useState(true)
    const [rightBtnLimit, setRightBtnLimit] = useState(false)

    const trackLeft = () => {
        const track = document.getElementById("image-track");

        if (Number(track.dataset.percentage) < 0) {
            track.dataset.percentage = Number(track.dataset.percentage) + 200
            setLeftBtnLimit(false)
            setRightBtnLimit(false)
            if (track.dataset.percentage > -60 && track.dataset.percentage > 0) {
                track.dataset.percentage = 0
                setLeftBtnLimit(true)
                setRightBtnLimit(false)
            }
            track?.animate({
                transform: `translate(${Number(track.dataset.percentage)}%, 0%)`
            }, { duration: 1000, fill: "forwards" });

            for(const image of track?.getElementsByClassName("product-screen-img")) {
                image.animate({
                    objectPosition: `${60 + (Number(track.dataset.percentage) / 25)}% center`,
                }, { duration: 1000, fill: "forwards"});
            }
            console.log(60 + (Number(track.dataset.percentage) / 25))
        }
    }

    const trackRight = () => {
        const track = document.getElementById("image-track");

        if (Number(track.dataset.percentage) >= trackLimit) {
            track.dataset.percentage = Number(track.dataset.percentage) - 200
            setRightBtnLimit(false)
            setLeftBtnLimit(false)
            if (track.dataset.percentage < trackLimit) {
                track.dataset.percentage = trackLimit
                setRightBtnLimit(true)
                setLeftBtnLimit(false)
            }
            track?.animate({
                transform: `translate(${Number(track.dataset.percentage)}%, 0%)`
            }, { duration: 1000, fill: "forwards" });

            for(const image of track?.getElementsByClassName("product-screen-img")) {
                image.animate({
                    objectPosition: `${60 + (Number(track.dataset.percentage) / 25)}% center`,
                }, { duration: 1000, fill: "forwards"});
            }
            console.log(60 + (Number(track.dataset.percentage) / 25))
        }
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

    useEffect(() =>{
        if (successProductReview) {
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(listProductDetails(id))
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

    const heightS = [150, 173]
    const heightM = [174, 178]
    const heightL = [179, 184]
    const weightS = [40, 66]
    const weightM = [67, 77]
    const weightL = [78, 85]
    const [yourHeight, setYourHeight] = useState(0)
    const [yourWeight, setYourWeight] = useState(0)

    const countYourSize = () => {
        if (yourHeight <= 0 || yourWeight <= 0) {
            setSize('')
        } else if ((yourHeight >= 0 && yourHeight <= heightS[0]) && (yourWeight >= 0 && yourWeight <= weightS[0])) {
            setSize('S')
        } else if ((yourHeight >= heightS[0] && yourHeight <= heightS[1]) && (yourWeight >= weightS[0] && yourWeight <= weightS[1])) {
            setSize('S')
        } else if ((yourHeight >= heightM[0] && yourHeight <= heightM[1]) && (yourWeight >= weightM[0] && yourWeight <= weightM[1])) {
            setSize('M')
        } else if ((yourHeight >= heightL[0] && yourHeight <= heightL[1]) && (yourWeight >= weightL[0] && yourWeight <= weightL[1])) {
            setSize('L')
        } else if (yourHeight >= heightL[1] || yourWeight >= weightL[1]) {
            setSize('L')
        }
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
                            <Link to='/' className='btn btn-light my-3'>Назад</Link>
                        </motion.div>

                        <Row>
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
                                    delayChildren: animationStart,
                                    delay: animationStart
                                }}
                            >
                                <Col md={6} id="image-track" data-mouse-down-at="0" data-prev-percentage="0">
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
                                    <button onClick={trackLeft} disabled={leftBtnLimit}><i className="fa-solid fa-arrow-left"></i></button>
                                    <button onClick={trackRight} disabled={rightBtnLimit}><i className="fa-solid fa-arrow-right"></i></button>
                                </div>
                            </motion.div>

                            <Col md={6} id='prod-desc'>
                                <motion.div>
                                    <Card className='border-0'>
                                        <ListGroup variant="flush" className='list-group-flush'>
                                            <motion.div className='rounded-top'
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
                                                        <motion.Col variants={reveal}>Цена: </motion.Col>
                                                        <motion.Col variants={reveal}>
                                                            <strong>₽ {product.price}</strong>
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
                                                    <Row>
                                                        <Col md={7}>
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
                                                        <Col md={5}>
                                                            <motion.div variants={reveal} style={{height: 100 + '%'}}>
                                                                <Form style={{height: 100 + '%'}}>
                                                                    <Form.Group className='product-calc'>
                                                                        <div className='calc-input'>
                                                                            <Form.Control
                                                                                style={{
                                                                                    height: 30 + 'px',
                                                                                    fontSize: 1 + 'rem'
                                                                                }}
                                                                                className='mb-2'
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
                                                    <Button onClick={() => {
                                                        addToCartHandler()
                                                        product.size = size
                                                    }} variant='dark' className='size-btn' type='button' disabled={
                                                        ((product?.countInStock === 0 || !size) && !product?.category?.includes('ACCESSORIES'))
                                                    }>Добавить в корзину</Button>
                                                </ListGroup.Item>
                                            </motion.div>
                                        </ListGroup>
                                    </Card>
                                </motion.div>
                                <motion.div variants={reveal} initial='hiddenVariantX' animate='revealedVariantX'>
                                    <ListGroup variant="flush">
                                        <motion.div variants={reveal} className='border-0'>
                                            <ListGroup.Item style={{border: 0}}>
                                                <motion.h3
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
                                                >{product.name}</motion.h3>
                                            </ListGroup.Item>
                                        </motion.div>

                                        <ListGroup.Item style={{border: 0, paddingTop: 0, paddingBottom: 0}}>
                                            <motion.span
                                                style={{width: 32 + '%'}}
                                                className="rating"
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
                                                        ? "fas fa-star"
                                                        : product.rating >= 0.5
                                                            ? "fas fa-star-half-alt"
                                                            : "far fa-star"
                                                }></i></motion.span>
                                                <motion.span variants={reveal}> <i className={
                                                    product.rating >= 2
                                                        ? "fas fa-star"
                                                        : product.rating >= 1.5
                                                            ? "fas fa-star-half-alt"
                                                            : "far fa-star"
                                                }></i></motion.span>
                                                <motion.span variants={reveal}> <i className={
                                                    product.rating >= 3
                                                        ? "fas fa-star"
                                                        : product.rating >= 2.5
                                                            ? "fas fa-star-half-alt"
                                                            : "far fa-star"
                                                }></i></motion.span>
                                                <motion.span variants={reveal}> <i className={
                                                    product.rating >= 4
                                                        ? "fas fa-star"
                                                        : product.rating >= 3.5
                                                            ? "fas fa-star-half-alt"
                                                            : "far fa-star"
                                                }></i></motion.span>
                                                <motion.span variants={reveal}> <i className={
                                                    product.rating >= 5
                                                        ? "fas fa-star"
                                                        : product.rating >= 4.5
                                                            ? "fas fa-star-half-alt"
                                                            : "far fa-star"
                                                }></i></motion.span>
                                            </motion.span>
                                        </ListGroup.Item>

                                        <ListGroup.Item className='description-group-item'>
                                            <motion.div className='border-top'
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