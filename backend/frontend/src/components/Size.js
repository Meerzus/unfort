import React from 'react';
import {Button} from "react-bootstrap";

import {motion} from "framer-motion";
import {animationStart, reveal} from "../utils/animation";

function Size({product, size, setSize, qtySize, setQtySize}) {

    const sizeHandler = (sizeItem) => {
        product.size = setSize(sizeItem)
        setQtySize(product.sizeInStockM)
    }

    return (
        <motion.div
            className="filter-size"
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
            <Button variants={reveal} className={size === "S" ? "active size-btn" : "size-btn"} disabled={product.sizeInStockS === 0} onClick={() => sizeHandler('S')}>S</Button>
            <Button variants={reveal} className={size === "M" ? "active size-btn" : "size-btn"} disabled={product.sizeInStockM === 0} onClick={() => sizeHandler('M')}>M</Button>
            <Button variants={reveal} className={size === "L" ? "active size-btn" : "size-btn"} disabled={product.sizeInStockL === 0} onClick={() => sizeHandler('L')}>L</Button>
            {/*<Button variants={reveal} className={size === "XL" ? "active size-btn" : "size-btn"} disabled={product.sizeInStockXL === 0} onClick={() => sizeHandler('XL')}>XL</Button>*/}
        </motion.div>
    );
}

export default Size;