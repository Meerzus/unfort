import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Form, Button, Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import {listProductDetails, updateProduct} from "../actions/productActions";
import {PRODUCT_UPDATE_RESET} from "../constants/productConstants";

import {motion} from "framer-motion";
import {animationStart, reveal} from "../utils/animation";

function ProductEditScreen({location, history}) {
    const { id } = useParams();

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [mainimg, setMainimg] = useState('')
    const [secImg, setSecImg] = useState('')
    const [preview1, setPreview1] = useState('')
    const [preview2, setPreview2] = useState('')
    const [preview3, setPreview3] = useState('')
    const [preview4, setPreview4] = useState('')
    const [preview5, setPreview5] = useState('')
    const [preview6, setPreview6] = useState('')
    const [preview7, setPreview7] = useState('')
    const [preview8, setPreview8] = useState('')
    const [preview9, setPreview9] = useState('')
    const [preview10, setPreview10] = useState('')
    const [productSize, setProductSize] = useState('')
    const [category, setCategory] = useState('sample')
    const [sizeInStockS, setSizeInStockS] = useState(0)
    const [sizeInStockM, setSizeInStockM] = useState(0)
    const [sizeInStockL, setSizeInStockL] = useState(0)
    const [sizeInStockXL, setSizeInStockXL] = useState(0)
    const [countInStock, setCountIntStock] = useState(0)
    const [description1, setDescription1] = useState([])
    const [description2, setDescription2] = useState('')
    const [description3, setDescription3] = useState('')
    const [description4, setDescription4] = useState('')
    const [description5, setDescription5] = useState('')
    const [rating, setRating] = useState(.01)
    const [numReviews, setNumReviews] = useState(0)
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {loading: loadingUpdate, error: errorUpdate, succsess: successUpdate} = productUpdate

    const navigate = useNavigate();

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
        if (successUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET})
            navigate('/admin/productlist')
        } else {
            if (!product.name || product._id !== Number(id)) {
                dispatch(listProductDetails(id))
            } else {
                setName(product.name)
                setPrice(product.price)
                setMainimg(product.mainimg)
                setSecImg(product.secImg)
                setPreview1(product.preview1)
                setPreview2(product.preview2)
                setPreview3(product.preview3)
                setPreview4(product.preview4)
                setPreview5(product.preview5)
                setPreview6(product.preview6)
                setPreview7(product.preview7)
                setPreview8(product.preview8)
                setPreview9(product.preview9)
                setPreview10(product.preview10)
                setProductSize(product.productSize)
                setCategory(product.category)
                setSizeInStockS(product.sizeInStockS)
                setSizeInStockM(product.sizeInStockM)
                setSizeInStockL(product.sizeInStockL)
                setSizeInStockXL(product.sizeInStockXL)
                setCountIntStock(product.countInStock)
                setDescription1(product.description1)
                setDescription2(product.description2)
                setDescription3(product.description3)
                setDescription4(product.description4)
                setDescription5(product.description5)
                setRating(product.rating)
                setNumReviews(product.numReviews)
            }
        }
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, [dispatch, product, id, navigate, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: id,
            name,
            price,
            mainimg,
            secImg,
            preview1,
            preview2,
            preview3,
            preview4,
            preview5,
            preview6,
            preview7,
            preview8,
            preview9,
            preview10,
            productSize,
            category,
            sizeInStockS,
            sizeInStockM,
            sizeInStockL,
            sizeInStockXL,
            countInStock,
            description1,
            description2,
            description3,
            description4,
            description5,
            rating,
            numReviews
        }))
        navigate('/admin/productlist')
    }

    const uploadImageHandler = async (e) => {
        const mainImg = e.target.files[0]
        const secImg = e.target.files[1]
        const prev1 = e.target.files[2]
        const prev2 = e.target.files[3]
        const prev3 = e.target.files[4]
        const prev4 = e.target.files[5]
        const prev5 = e.target.files[6]
        const prev6 = e.target.files[7]
        const prev7 = e.target.files[8]
        const prev8 = e.target.files[9]
        const prev9 = e.target.files[10]
        const prev10 = e.target.files[11]
        const prodSize = e.target.files[12]

        const formData = new FormData()
        formData.append('mainimg', mainImg)
        formData.append('secImg', secImg)
        formData.append('preview1', prev1)
        formData.append('preview2', prev2)
        formData.append('preview3', prev3)
        formData.append('preview4', prev4)
        formData.append('preview5', prev5)
        formData.append('preview6', prev6)
        formData.append('preview7', prev7)
        formData.append('preview8', prev8)
        formData.append('preview9', prev9)
        formData.append('preview10', prev10)
        formData.append('productSize', prodSize)
        formData.append('product_id', id)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const {data} = await axios.post('/api/products/upload/', formData, config)
            setMainimg(mainImg)
            setSecImg(secImg)
            setPreview1(prev1)
            setPreview2(prev2)
            setPreview3(prev3)
            setPreview4(prev4)
            setPreview5(prev5)
            setPreview6(prev6)
            setPreview7(prev7)
            setPreview8(prev8)
            setPreview9(prev9)
            setPreview10(prev10)
            setProductSize(prodSize)
            setUploading(false)
        } catch (error) {
            setUploading(false)
        }
    }

    let categoryArr = []

    const toggleHandler = (e) => {
        if (!(categoryArr.includes(e))) {
            categoryArr.push(e)
        } else if (categoryArr.includes(e)) {
            const index = categoryArr.indexOf(e)
            delete categoryArr[index]
        }
    }

    const confirmCategories = () => {
        console.log(categoryArr)
        setCategory(categoryArr.toString())
    }

    return (
        <Container>
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
                    delay: animationStart - .5
                }}
            >
                <Link to='/admin/productlist' className='btn btn-light my-3'>Назад</Link>
            </motion.div>
            <FormContainer>
                <motion.h1
                    className='text-sm-center'
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
                >Редактор Товара {product.name}</motion.h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {
                    loading ?
                        <Loader/> :
                        error ?
                            <Message variant='danger'>{error}</Message> :
                            (
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
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group className='mb-3' controlId='name'>
                                            <motion.div variants={reveal}>
                                                <Form.Label>Название</Form.Label>
                                            </motion.div>
                                            <motion.div variants={reveal}>
                                                <Form.Control
                                                    type='name'
                                                    placeholder='Крутое название товара'
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                ></Form.Control>
                                            </motion.div>
                                        </Form.Group>

                                        <Form.Group className='mb-3' controlId='price'>
                                            <motion.div variants={reveal}>
                                                <Form.Label>Цена</Form.Label>
                                            </motion.div>
                                            <motion.div variants={reveal}>
                                                <Form.Control
                                                    type='number'
                                                    placeholder='1000000'
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                ></Form.Control>
                                            </motion.div>
                                        </Form.Group>

                                        <Form.Group controlId="formFileMultiple" className="mb-3">
                                            <motion.div variants={reveal}>
                                                <Form.Label>Фото</Form.Label>
                                            </motion.div>
                                            <motion.div variants={reveal}>
                                                <Form.Control type="file" multiple onChange={uploadImageHandler}/>
                                            </motion.div>
                                            {uploading && <Loader/>}
                                        </Form.Group>

                                        <Form.Group className='mb-3' controlId='category'>
                                            <motion.div variants={reveal}>
                                                <Form.Label>Категория</Form.Label>
                                            </motion.div>
                                            <motion.div variants={reveal}>
                                                <Form.Control
                                                    type='text'
                                                    placeholder='Сумки, Шорты, Новое, Предзаказ и т.д.'
                                                    value={category}
                                                    onChange={(e) => setCategory(e.target.value)}
                                                ></Form.Control>
                                                <div className='d-flex justify-content-between mb-3'>
                                                    <Form.Check
                                                        label='NEW'
                                                        name='NEW'
                                                        type='checkbox'
                                                        id='NEW'
                                                        value='NEW'
                                                        onChange={(e) => toggleHandler(e.target.value)}
                                                    />

                                                    <Form.Check
                                                        label='PREORDER'
                                                        name='PREORDER'
                                                        type='checkbox'
                                                        id='PREORDER'
                                                        value='PREORDER'
                                                        onChange={(e) => toggleHandler(e.target.value)}
                                                    />

                                                    <Form.Check
                                                        label='HOODIES'
                                                        name='HOODIES'
                                                        type='checkbox'
                                                        id='HOODIES'
                                                        value='HOODIES'
                                                        onChange={(e) => toggleHandler(e.target.value)}
                                                    />

                                                    <Form.Check
                                                        label='LONG'
                                                        name='LONG'
                                                        type='checkbox'
                                                        id='LONG'
                                                        value='LONG'
                                                        onChange={(e) => toggleHandler(e.target.value)}
                                                    />
                                                </div>

                                                <div className='d-flex justify-content-between mb-3'>
                                                    <Form.Check
                                                        label='T-SHIRTS'
                                                        name='T-SHIRTS'
                                                        type='checkbox'
                                                        id='T-SHIRTS'
                                                        value='T-SHIRTS'
                                                        onChange={(e) => toggleHandler(e.target.value)}
                                                    />

                                                    <Form.Check
                                                        label='PANTS'
                                                        name='PANTS'
                                                        type='checkbox'
                                                        id='PANTS'
                                                        value='PANTS'
                                                        onChange={(e) => toggleHandler(e.target.value)}
                                                    />

                                                    <Form.Check
                                                        label='SHORTS'
                                                        name='SHORTS'
                                                        type='checkbox'
                                                        id='SHORTS'
                                                        value='SHORTS'
                                                        onChange={(e) => toggleHandler(e.target.value)}
                                                    />

                                                    <Form.Check
                                                        label='ACCESSORIES'
                                                        name='ACCESSORIES'
                                                        type='checkbox'
                                                        id='ACCESSORIES'
                                                        value='ACCESSORIES'
                                                        onChange={(e) => toggleHandler(e.target.value)}
                                                    />
                                                </div>

                                                <div className='d-flex justify-content-center'>
                                                    <Button
                                                        className='size-btn p-4'
                                                        style={{width: 10 + '%', display: "flex"}}
                                                        onClick={confirmCategories}
                                                    ><i id='confirm-icon' className="fa-solid fa-check fa-2xl"></i></Button>
                                                </div>
                                            </motion.div>
                                        </Form.Group>

                                        {/**/}

                                        <Form.Group className='mb-3' controlId='sizeInStockS'>
                                            <motion.div variants={reveal}>
                                                <Form.Label>Количество S</Form.Label>
                                            </motion.div>
                                            <motion.div variants={reveal}>
                                                <Form.Control
                                                    type='number'
                                                    placeholder='Количество товара размера S'
                                                    value={sizeInStockS}
                                                    onChange={(e) => setSizeInStockS(e.target.value)}
                                                ></Form.Control>
                                            </motion.div>
                                        </Form.Group>

                                        <Form.Group className='mb-3' controlId='sizeInStockM'>
                                            <motion.div variants={reveal}>
                                                <Form.Label>Количество M</Form.Label>
                                            </motion.div>
                                            <motion.div variants={reveal}>
                                                <Form.Control
                                                    type='number'
                                                    placeholder='Количество товара размера M'
                                                    value={sizeInStockM}
                                                    onChange={(e) => setSizeInStockM(e.target.value)}
                                                ></Form.Control>
                                            </motion.div>
                                        </Form.Group>

                                        <Form.Group className='mb-3' controlId='sizeInStockL'>
                                            <motion.div variants={reveal}>
                                                <Form.Label>Количество L</Form.Label>
                                            </motion.div>
                                            <motion.div variants={reveal}>
                                                <Form.Control
                                                    type='number'
                                                    placeholder='Количество товара размера L'
                                                    value={sizeInStockL}
                                                    onChange={(e) => setSizeInStockL(e.target.value)}
                                                ></Form.Control>
                                            </motion.div>
                                        </Form.Group>

                                        <Form.Group className='mb-3' controlId='countInStock'>
                                            <motion.div variants={reveal}>
                                                <Form.Label>Количество</Form.Label>
                                            </motion.div>
                                            <motion.div variants={reveal}>
                                                <Form.Control
                                                    type='number'
                                                    placeholder='777'
                                                    value={countInStock}
                                                    onChange={(e) => setCountIntStock(e.target.value)}
                                                ></Form.Control>
                                            </motion.div>
                                        </Form.Group>

                                        <Form.Group className='mb-3' controlId='description1'>
                                            <motion.div variants={reveal}>
                                                <Form.Label>Описание</Form.Label>
                                            </motion.div>
                                            <motion.div variants={reveal}>
                                                <Form.Control
                                                    as='textarea'
                                                    rows={10}
                                                    placeholder='Крутое описание товара'
                                                    value={description1}
                                                    onChange={(e) => setDescription1(e.target.value)}
                                                ></Form.Control>
                                            </motion.div>
                                        </Form.Group>

                                        <Form.Group className='mb-3' controlId='description2'>
                                            <motion.div variants={reveal}>
                                                <Form.Label>Рекомендованные</Form.Label>
                                            </motion.div>
                                            <motion.div variants={reveal}>
                                                <Form.Control
                                                    type='text'
                                                    placeholder='ID1;ID2;ID3;и т.д.;'
                                                    value={description2}
                                                    onChange={(e) => setDescription2(e.target.value)}
                                                ></Form.Control>
                                            </motion.div>
                                        </Form.Group>

                                        <Form.Group className='mb-3' controlId='rating'>
                                            <motion.div variants={reveal}>
                                                <Form.Label>Rating</Form.Label>
                                            </motion.div>
                                            <motion.div variants={reveal}>
                                                <Form.Control
                                                    type='number'
                                                    placeholder='Введите описание товара 3'
                                                    value={rating}
                                                    onChange={(e) => setRating(e.target.value)}
                                                ></Form.Control>
                                            </motion.div>
                                        </Form.Group>

                                        <Form.Group className='mb-3' controlId='numReviews'>
                                            <motion.div variants={reveal}>
                                                <Form.Label>numReviews</Form.Label>
                                            </motion.div>
                                            <motion.div variants={reveal}>
                                                <Form.Control
                                                    type='number'
                                                    placeholder='Введите описание товара 3'
                                                    value={numReviews}
                                                    onChange={(e) => setNumReviews(e.target.value)}
                                                ></Form.Control>
                                            </motion.div>
                                        </Form.Group>

                                        {/*<Form.Group className='mb-3' controlId='description4'>*/}
                                        {/*    <motion.div variants={reveal}>*/}
                                        {/*        <Form.Label>Описание 4</Form.Label>*/}
                                        {/*    </motion.div>*/}
                                        {/*    <motion.div variants={reveal}>*/}
                                        {/*        <Form.Control*/}
                                        {/*            type='text'*/}
                                        {/*            placeholder='Введите описание товара 4'*/}
                                        {/*            value={description4}*/}
                                        {/*            onChange={(e) => setDescription4(e.target.value)}*/}
                                        {/*        ></Form.Control>*/}
                                        {/*    </motion.div>*/}
                                        {/*</Form.Group>*/}

                                        {/*<Form.Group className='mb-3' controlId='description5'>*/}
                                        {/*    <motion.div variants={reveal}>*/}
                                        {/*        <Form.Label>Описание 5</Form.Label>*/}
                                        {/*    </motion.div>*/}
                                        {/*    <motion.div variants={reveal}>*/}
                                        {/*        <Form.Control*/}
                                        {/*            type='text'*/}
                                        {/*            placeholder='Введите описание товара 5'*/}
                                        {/*            value={description5}*/}
                                        {/*            onChange={(e) => setDescription5(e.target.value)}*/}
                                        {/*        ></Form.Control>*/}
                                        {/*    </motion.div>*/}
                                        {/*</Form.Group>*/}

                                        <motion.div variants={reveal}>
                                            <Button
                                                className='size-btn btn btn-dark mb-3'
                                                type='submit'
                                                style={{width: 100 + '%'}}>
                                                Обновить
                                            </Button>
                                        </motion.div>
                                    </Form>
                                </motion.div>
                            )
                }
            </FormContainer>
        </Container>
    );
}

export default ProductEditScreen;