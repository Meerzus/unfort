import React from 'react';
import {Card} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";

import {motion} from "framer-motion";


function Product({product}) {
    const navigate = useNavigate()

    const linkHandler = () => {
        navigate(`/product/${product._id}/`)
        navigate(0)
    }

    return (
        <motion.div
            animate={{opacity: 1, scale: 1}}
            initial={{opacity: 0, scale: .75}}
            exit={{opacity: 0, scale: .8}}
            transition={{duration: .25}}
            layout
            id={product._id}
            className={
                product.category.includes('NEW') ?
                "p-3 rounded-3 card new-product"
                    : product.category.includes('PREORDER') ? "p-3 rounded-3 card preorder-product"
                        : "p-3 rounded-3 card"
        }
        >
            <Link
                onClick={linkHandler}
                to={`/product/${product._id}/`}
            >
                <Card.Img src={product.mainimg} className="rounded-3 product-img"/>
            </Link>
            <Card.Body>
                <Link
                    onClick={linkHandler}
                    to={`/product/${product._id}/`}
                >
                    <Card.Title as="div" className="product-title">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <div className="rating">
                        <span className="my-3">
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
                    </div>
                </Card.Text>
                <br/>
                <Card.Text
                    as="h3"
                    className={product.countInStock === 0 ? 'text-center' : ''}
                >
                    {
                        product.countInStock === 0 ?
                            <span className='fs-5 fw-light' style={{color: 'red'}}>Sold Out</span> : <span>₽ {product.price}</span>
                    }
                </Card.Text>
            </Card.Body>
        </motion.div>
    );
}

export default Product;