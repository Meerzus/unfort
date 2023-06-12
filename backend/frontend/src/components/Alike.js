import React from 'react';
import Product from "./Product";

function Alike({products, product}) {
    const prodsAlike = []
    for (let i in products) {
        if (products?.[i]?.category?.includes(product?.category?.[0])) {
            prodsAlike.push(products?.[i])
        }
    }
    return (
        <div className="products">
            {prodsAlike.map((product) => {
                return <Product key={product._id} product={product}/>
            })}
        </div>
    )
}

export default Alike;