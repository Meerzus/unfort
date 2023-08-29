import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";
import {Table, Button, Container, Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import {listProducts, deleteProduct, createProduct} from "../actions/productActions";
import {PRODUCT_CREATE_RESET} from "../constants/productConstants";
import products from "../products";

import {motion} from "framer-motion";
import {animationStart, reveal} from "../utils/animation";

function ProductListScreen() {
    const { id } = useParams();

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const productList = useSelector(state => state.productList)
    const {loading, error, products, page, pages} = productList

    const productCreate = useSelector(state => state.productCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct
    } = productCreate

    const productDelete = useSelector(state => state.productDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    let keyword = window.location.search

    const [trackLimit, setTrackLimit] = useState(0)

    const windowInnerWidth = document.documentElement.clientWidth
    const windowInnerHeight = document.documentElement.clientHeight

    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})
        if (!userInfo.isAdmin) {
            navigate('/')
        }

        if (successCreate) {
            navigate(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts(keyword))
        }

        const track = document.getElementById("table")
        if ((windowInnerWidth <= 896 && windowInnerHeight <= 414) || (windowInnerWidth <= 414 && windowInnerHeight <= 896)) {
            setTrackLimit(-67.5)
        } else if ((windowInnerWidth <= 768 && windowInnerHeight <= 1024) || (windowInnerWidth <= 1024 && windowInnerHeight <= 768)) {
            setTrackLimit(-57)
        } else {
            setTrackLimit(0)
        }
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct, keyword])

    const deleteHandler = (id) => {
        if (window.confirm('sure?')) {
           dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    const [leftBtnLimit, setLeftBtnLimit] = useState(true)
    const [rightBtnLimit, setRightBtnLimit] = useState(false)

    const trackLeft = () => {
        const track = document.getElementById("table");

        if (Number(track.dataset.position) < 0) {
            track.dataset.position = Number(track.dataset.position) + 25
            setLeftBtnLimit(false)
            setRightBtnLimit(false)
            if (track.dataset.position > -60 && track.dataset.position > 0) {
                track.dataset.position = 0
                setLeftBtnLimit(true)
                setRightBtnLimit(false)
            }
            track?.animate({
                transform: `translate(${Number(track.dataset.position)}%, 0%)`
            }, { duration: 1000, fill: "forwards" });
            console.log(60 + (Number(track.dataset.position) / 25))
        }
    }

    const trackRight = () => {
        const track = document.getElementById("table");

        if (Number(track.dataset.position) >= trackLimit) {
            track.dataset.position = Number(track.dataset.position) - 25
            setRightBtnLimit(false)
            setLeftBtnLimit(false)
            if (track.dataset.position < trackLimit) {
                track.dataset.position = trackLimit
                setRightBtnLimit(true)
                setLeftBtnLimit(false)
            }
            track?.animate({
                transform: `translate(${Number(track.dataset.position)}%, 0%)`
            }, { duration: 1000, fill: "forwards" });
            console.log(60 + (Number(track.dataset.position) / 25))
        }
    }

    return loading ? (
        <Loader/>
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <Container>
            {loadingDelete && <Loader/>}
            {loadingCreate && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            <Row className='align-items-center'>
                <Col>
                    <motion.h1
                        variants={reveal}
                        initial='hiddenVariantY'
                        animate='revealedVariantY'
                        transition={{
                            ease: 'easeIn',
                            type: 'spring',
                            staggerChildren: .2,
                            duration: 1,
                            delayChildren: animationStart,
                            delay: animationStart - .25
                        }}
                    >Товары</motion.h1>
                </Col>

                <Col className='create-product'>
                    <motion.div
                        variants={reveal}
                        initial='hiddenVariantY'
                        animate='revealedVariantY'
                        transition={{
                            ease: 'easeIn',
                            type: 'spring',
                            staggerChildren: .2,
                            duration: 1,
                            delayChildren: animationStart,
                            delay: animationStart
                        }}
                    >
                        <Button className='size-btn my-3' onClick={createProductHandler}>
                            <i className='fas fa-plus mx-2'></i> Создать Товар
                        </Button>
                    </motion.div>
                </Col>
            </Row>
            <motion.div
                id='product-list-screen'
                variants={reveal}
                initial='hiddenVariantX'
                animate='revealedVariantX'
                transition={{
                    ease: 'easeIn',
                    type: 'spring',
                    staggerChildren: .01,
                    duration: 1,
                    delayChildren: animationStart,
                    delay: animationStart
                }}
            >
                <div className='img-track-btns'>
                    <button onClick={trackLeft} disabled={leftBtnLimit}><i className="fa-solid fa-arrow-left"></i></button>
                    <button onClick={trackRight} disabled={rightBtnLimit}><i className="fa-solid fa-arrow-right"></i></button>
                </div>
                <Table
                    striped
                    bordered
                    hover
                    responsive
                    className='table-sm text-center' data-position="0" id='table'
                >
                    <thead>
                        <tr>
                            <motion.th variants={reveal}>ID</motion.th>
                            <motion.th variants={reveal}>НАЗВАНИЕ</motion.th>
                            <motion.th variants={reveal}>ЦЕНА</motion.th>
                            <motion.th variants={reveal}>КАТЕГОРИЯ</motion.th>
                            <motion.th variants={reveal}></motion.th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <motion.td variants={reveal}>{product._id}</motion.td>
                                <motion.td variants={reveal}>{product.name}</motion.td>
                                <motion.td variants={reveal}>₽ {product.price}</motion.td>
                                <motion.td variants={reveal}>{product.category}</motion.td>
                                <motion.td variants={reveal}>
                                    <LinkContainer
                                        className='mx-1'
                                        to={`/admin/product/${product._id}/edit`}
                                    >
                                        <Button
                                            variant='dark'
                                            className='size-btn btn-sm'
                                        >
                                            <i
                                                className='fas fa-edit fa-xl'
                                            ></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() => {deleteHandler(product._id)}}
                                    >
                                        <i
                                            className='fas fa-trash'
                                        ></i>
                                    </Button>
                                </motion.td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </motion.div>
            <Paginate
                page={page}
                pages={pages}
                isAdmin={true}
            />
        </Container>
    )
}

export default ProductListScreen;
