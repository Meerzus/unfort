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

function ProductEditScreen({location, history}) {
    const { id } = useParams();

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [mainimg, setMainimg] = useState('')
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
    const [description1, setDescription1] = useState('')
    const [description2, setDescription2] = useState('')
    const [description3, setDescription3] = useState('')
    const [description4, setDescription4] = useState('')
    const [description5, setDescription5] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {loading: loadingUpdate, error: errorUpdate, succsess: successUpdate} = productUpdate

    const navigate = useNavigate();

    useEffect(() => {
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
            }
        }
    }, [dispatch, product, id, navigate, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: id,
            name,
            price,
            mainimg,
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
            description5
        }))
        navigate('/admin/productlist')
    }

    const uploadImageHandler = async (e) => {
        const mainImg = e.target.files[0]
        const prev1 = e.target.files[1]
        const prev2 = e.target.files[2]
        const prev3 = e.target.files[3]
        const prev4 = e.target.files[4]
        const prev5 = e.target.files[5]
        const prev6 = e.target.files[6]
        const prev7 = e.target.files[7]
        const prev8 = e.target.files[8]
        const prev9 = e.target.files[9]
        const prev10 = e.target.files[10]
        const prodSize = e.target.files[11]

        const formData = new FormData()
        formData.append('mainimg', mainImg)
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

    return (
        <Container>
            <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>
            <FormContainer>
                <h1 className='text-sm-center'>Edit Product {product.name}</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {
                    loading ?
                        <Loader/> :
                        error ?
                            <Message variant='danger'>{error}</Message> :
                            (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group className='mb-3' controlId='name'>
                                        <Form.Label>Имя</Form.Label>
                                        <Form.Control
                                            type='name'
                                            placeholder='Введите Имя'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='price'>
                                        <Form.Label>price</Form.Label>
                                        <Form.Control
                                            type='number'
                                            placeholder='Введите price'
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="formFileMultiple" className="mb-3">
                                        <Form.Label>Images (mainImg + 10 preview + productSize)(12 files)</Form.Label>
                                        <Form.Control type="file" multiple onChange={uploadImageHandler}/>
                                        {uploading && <Loader/>}
                                    </Form.Group>

                                    {/**/}

                                    <Form.Group className='mb-3' controlId='category'>
                                        <Form.Label>category</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Введите mainimg'
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    {/**/}

                                    <Form.Group className='mb-3' controlId='sizeInStockS'>
                                        <Form.Label>sizeInStockS</Form.Label>
                                        <Form.Control
                                            type='number'
                                            placeholder='Введите sizeInStockS'
                                            value={sizeInStockS}
                                            onChange={(e) => setSizeInStockS(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='sizeInStockM'>
                                        <Form.Label>sizeInStockM</Form.Label>
                                        <Form.Control
                                            type='number'
                                            placeholder='Введите sizeInStockM'
                                            value={sizeInStockM}
                                            onChange={(e) => setSizeInStockM(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='sizeInStockL'>
                                        <Form.Label>sizeInStockL</Form.Label>
                                        <Form.Control
                                            type='number'
                                            placeholder='Введите sizeInStockL'
                                            value={sizeInStockL}
                                            onChange={(e) => setSizeInStockL(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='sizeInStockXL'>
                                        <Form.Label>sizeInStockXL</Form.Label>
                                        <Form.Control
                                            type='number'
                                            placeholder='Введите sizeInStockXL'
                                            value={sizeInStockXL}
                                            onChange={(e) => setSizeInStockXL(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='countInStock'>
                                        <Form.Label>countInStock</Form.Label>
                                        <Form.Control
                                            type='number'
                                            placeholder='Введите countInStock'
                                            value={countInStock}
                                            onChange={(e) => setCountIntStock(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    {/**/}

                                    <Form.Group className='mb-3' controlId='description1'>
                                        <Form.Label>description1</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Введите description1'
                                            value={description1}
                                            onChange={(e) => setDescription1(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='description2'>
                                        <Form.Label>description2</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Введите description2'
                                            value={description2}
                                            onChange={(e) => setDescription2(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='description3'>
                                        <Form.Label>description3</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Введите description3'
                                            value={description3}
                                            onChange={(e) => setDescription3(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='description4'>
                                        <Form.Label>description4</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Введите description4'
                                            value={description4}
                                            onChange={(e) => setDescription4(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='description5'>
                                        <Form.Label>description5</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Введите description5'
                                            value={description5}
                                            onChange={(e) => setDescription5(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    <Button
                                        className='size-btn btn btn-dark mb-3'
                                        type='submit'
                                        style={{width: 100 + '%'}}>
                                        Update
                                    </Button>
                                </Form>
                            )
                }
            </FormContainer>
        </Container>
    );
}

export default ProductEditScreen;