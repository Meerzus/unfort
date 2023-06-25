import React, {useEffect, useState} from 'react';
import {animationStart, reveal} from "../utils/animation";
import {motion} from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";

function Carousel({windowInnerWidth}) {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {products} = productList

    const [filtered, setFiltered] = useState([])

    let keyword = window.location.search

    useEffect(() => {
        dispatch(listProducts(keyword))
        setFiltered(products)
    }, [dispatch, keyword])

    console.log(filtered)

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
        </div>
    );
}

export default Carousel;