import React, {useEffect, useState} from 'react';
import {animationStart, reveal} from "../utils/animation";
import {AnimatePresence, motion} from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";
import Product from "./Product";

function Carousel({product, products}) {

    const filtered = products

    let keyword = window.location.search

    const alikeIds = product?.description2?.split(';')

    const alikeForYou = []

    for (let i in product?.description2?.split(';')) {
        for (let y in filtered) {
            if (Number(filtered[y]?._id) === Number(product?.description2?.split(';')[i])) {
                filtered[y] && alikeForYou?.push(filtered[y])
            }
        }
    }


    return (
        <div>
            <motion.h2
                className='text-center'
                variants={reveal}
                initial='hiddenVariantY'
                animate='revealedVariantY'
                transition={{
                    ease: 'easeIn',
                    type: 'spring',
                    staggerChildren: .25,
                    duration: 1,
                    delayChildren: animationStart,
                    delay: animationStart + 1.5
                }}
            >Рекомендуем</motion.h2>

            <motion.div
                className="products"
                variants={reveal}
                initial='hiddenVariantX'
                animate='revealedVariantX'
                transition={{
                    ease: 'easeIn',
                    type: 'spring',
                    staggerChildren: .25,
                    duration: 1,
                    delayChildren: animationStart,
                    delay: animationStart + 1.5
                }}
            >
                {
                    alikeForYou &&
                        alikeForYou.map((product) => {
                            return <Product key={product._id} product={product}/>
                        })
                }
            </motion.div>
        </div>
    );
}

export default Carousel;