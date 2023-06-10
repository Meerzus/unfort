import React from 'react';
import {Button} from "react-bootstrap";

function Size({product, size, setSize, qtySize, setQtySize}) {
    return (
        <div className="filter-size">
            <Button variant='dark' className={size === "S" ? "active size-btn" : "size-btn"} disabled={product.sizeInStockS === 0} onClick={() => {
                setSize("S")
                setQtySize(product.sizeInStockS)
            }}>S</Button>
            <Button variant='dark' className={size === "M" ? "active size-btn" : "size-btn"} disabled={product.sizeInStockM === 0} onClick={() => {
                setSize("M")
                setQtySize(product.sizeInStockM)
            }}>M</Button>
            <Button variant='dark' className={size === "L" ? "active size-btn" : "size-btn"} disabled={product.sizeInStockL === 0} onClick={() => {
                setSize("L")
                setQtySize(product.sizeInStockL)
            }}>L</Button>
            <Button variant='dark' className={size === "XL" ? "active size-btn" : "size-btn"} disabled={product.sizeInStockXL === 0} onClick={() => {
                setSize("XL")
                setQtySize(product.sizeInStockXL)
            }}>XL</Button>
        </div>
    );
}

export default Size;