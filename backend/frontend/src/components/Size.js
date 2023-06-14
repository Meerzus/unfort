import React from 'react';
import {Button} from "react-bootstrap";

function Size({product, size, setSize, qtySize, setQtySize}) {

    const sizeHandler = (sizeItem) => {
        product.size = setSize(sizeItem)
        setQtySize(product.sizeInStockM)
    }

    return (
        <div className="filter-size">
            <Button variant='dark' className={size === "S" ? "active size-btn" : "size-btn"} disabled={product.sizeInStockS === 0} onClick={() => sizeHandler('S')}>S</Button>
            <Button variant='dark' className={size === "M" ? "active size-btn" : "size-btn"} disabled={product.sizeInStockM === 0} onClick={() => sizeHandler('M')}>M</Button>
            <Button variant='dark' className={size === "L" ? "active size-btn" : "size-btn"} disabled={product.sizeInStockL === 0} onClick={() => sizeHandler('L')}>L</Button>
            <Button variant='dark' className={size === "XL" ? "active size-btn" : "size-btn"} disabled={product.sizeInStockXL === 0} onClick={() => sizeHandler('XL')}>XL</Button>
        </div>
    );
}

export default Size;