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

function ProductScreen() {
    // const productList = useSelector(state => state.productList)
    // const {products} = productList
    const navigate = useNavigate();
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

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
                maxDelta = window.innerWidth / 2;

          const percentage = (mouseDelta / maxDelta) * -100,
                nextPercentageUnconstrained = parseFloat(track?.dataset.prevPercentage) + percentage,
                nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -796);

          track.dataset.percentage = nextPercentage;

          track?.animate({
            transform: `translate(${nextPercentage}%, 0%)`
          }, { duration: 1200, fill: "forwards" });

          for(const image of track?.getElementsByClassName("product-screen-img")) {
            image.animate({
              objectPosition: `${60 + (nextPercentage / 12.5)}% center`,
            }, { duration: 1200, fill: "forwards"});
          }
        }

        window.onmousedown = e => handleOnDown(e);

        window.ontouchstart = e => handleOnDown(e.touches[0]);

        window.onmouseup = e => handleOnUp(e);

        window.ontouchend = e => handleOnUp(e.touches[0]);

        window.onmousemove = e => handleOnMove(e);

        window.ontouchmove = e => handleOnMove(e.touches[0]);

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
                maxDelta = window.innerWidth / 10;

          const percentage = (mouseDelta / maxDelta) * -100,
                nextPercentageUnconstrained = parseFloat(track?.dataset.prevPercentage) + percentage,
                nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -694);

          track.dataset.percentage = nextPercentage;

          track?.animate({
            transform: `translate(${nextPercentage}%, 0%)`
          }, { duration: 1200, fill: "forwards" });

          for(const image of track?.getElementsByClassName("product-screen-img")) {
            image.animate({
              objectPosition: `${60 + (nextPercentage / 7.5)}% center`,
            }, { duration: 1200, fill: "forwards"});
          }
        }

        window.onmousedown = e => handleOnDown(e);

        window.ontouchstart = e => handleOnDown(e.touches[0]);

        window.onmouseup = e => handleOnUp(e);

        window.ontouchend = e => handleOnUp(e.touches[0]);

        window.onmousemove = e => handleOnMove(e);

        window.ontouchmove = e => handleOnMove(e.touches[0]);

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
                maxDelta = window.innerWidth / 10;

          const percentage = (mouseDelta / maxDelta) * -75,
                nextPercentageUnconstrained = parseFloat(track?.dataset.prevPercentage) + percentage,
                nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -694);

          track.dataset.percentage = nextPercentage;

          track?.animate({
            transform: `translate(${nextPercentage}%, 0%)`
          }, { duration: 1200, fill: "forwards" });

          for(const image of track?.getElementsByClassName("product-screen-img")) {
            image.animate({
              objectPosition: `${60 + (nextPercentage / 40)}% center`,
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
                        <Link to='/' className='btn btn-light my-3'>Go Back</Link>
                        <Row>
                            <div className="col-md-6 image-track">
                                <Col md={6} id="image-track" data-mouse-down-at="0" data-prev-percentage="0">
                                    <motion.img layout src={product.preview1} id={product.preview1} className="product-screen-img" draggable="false"/>
                                    <motion.img layout src={product.preview2} id={product.preview2} className="product-screen-img" draggable="false"/>
                                    <motion.img layout src={product.preview3} id={product.preview3} className="product-screen-img" draggable="false"/>
                                    <motion.img layout src={product.preview4} id={product.preview4} className="product-screen-img" draggable="false"/>
                                    <motion.img layout src={product.preview5} id={product.preview5} className="product-screen-img" draggable="false"/>
                                    <motion.img layout src={product.preview6} id={product.preview6} className="product-screen-img" draggable="false"/>
                                    <motion.img layout src={product.preview7} id={product.preview7} className="product-screen-img" draggable="false"/>
                                    <motion.img layout src={product.preview8} id={product.preview8} className="product-screen-img" draggable="false"/>
                                    <motion.img layout src={product.preview9} id={product.preview9} className="product-screen-img" draggable="false"/>
                                    <motion.img layout src={product.preview10} id={product.preview10} className="product-screen-img" draggable="false"/>
                                </Col>
                            </div>

                            <Col md={3}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <span className="my-3 rating">
                                            <span> <i className={
                                                product.rating >= 1
                                                    ? "fas fa-star"
                                                    : product.rating >= 0.5
                                                        ? "fas fa-star-half-alt"
                                                        : "far fa-star"
                                            }></i></span>
                                            <span> <i className={
                                                product.rating >= 2
                                                    ? "fas fa-star"
                                                    : product.rating >= 1.5
                                                        ? "fas fa-star-half-alt"
                                                        : "far fa-star"
                                            }></i></span>
                                            <span> <i className={
                                                product.rating >= 3
                                                    ? "fas fa-star"
                                                    : product.rating >= 2.5
                                                        ? "fas fa-star-half-alt"
                                                        : "far fa-star"
                                            }></i></span>
                                            <span> <i className={
                                                product.rating >= 4
                                                    ? "fas fa-star"
                                                    : product.rating >= 3.5
                                                        ? "fas fa-star-half-alt"
                                                        : "far fa-star"
                                            }></i></span>
                                            <span> <i className={
                                                product.rating >= 5
                                                    ? "fas fa-star"
                                                    : product.rating >= 4.5
                                                        ? "fas fa-star-half-alt"
                                                        : "far fa-star"
                                            }></i></span>
                                        </span>
                                        <span className="mx-2"><i className="fas fa-user"></i> {product.numReviews}</span>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Цена: ₽ {product.price}
                                    </ListGroup.Item>

                                    <ListGroup.Item className='description-group-item'>
                                        - {product.description1}
                                        <br/>
                                        <br/>
                                        - {product.description2}
                                        <br/>
                                        <br/>
                                        - {product.description3}
                                        <br/>
                                        <br/>
                                        - {product.description4}
                                        <br/>
                                        <br/>
                                        - {product.description5}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Цена: </Col>
                                                <Col>
                                                    <strong>₽ {product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    <Size product={product} setSize={setSize} size={size} qtySize={qtySize} setQtySize={setQtySize}/>
                                                    <div className='product-size'>
                                                        <Button
                                                            variant='dark'
                                                            className='size-btn mt-2'
                                                            type='button'
                                                            id='sizeShow'
                                                        >
                                                            Таблица размеров
                                                        </Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        {count > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        Количество:
                                                    </Col>
                                                    <Col xs='auto' className='my-1'>
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
                                                                ).keys()].map((x) => (
                                                                    <option key={x+1} value={x+1}>{x+1}</option>
                                                                ))
                                                            }
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}

                                        <ListGroup.Item className="d-grid gap-2">
                                            <Button onClick={() => {
                                                addToCartHandler()
                                                product.size = size
                                            }} variant='dark' className='size-btn' type='button' disabled={
                                                ((product?.countInStock === 0 || !size) && !product?.category?.includes('Аксессуары'))
                                            }>Добавить в корзину</Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                    <Row>
                        <Col md={12}>
                            <h2 className='text-center'>Рекомендуем</h2>

                            <div className="products">
                                {prodsAlike.slice(0, 7).map((productI) => {
                                    return <Product key={productI._id} product={productI}/>
                                })}
                            </div>
                        </Col>
                    </Row>
                </div>
            }
        </div>
    );
}

export default ProductScreen;