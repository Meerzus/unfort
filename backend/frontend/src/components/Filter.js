import React, {useEffect} from 'react';

function Filter({setActiveFilter, activeFilter, setFiltered, products}) {

    useEffect(() => {
        if (activeFilter === "0") {
            setFiltered(products)
            return
        }
        const filtered = products.filter((product) =>
            product.category.includes(activeFilter)
        )
        setFiltered(filtered)
    }, [activeFilter])

    return (
        <div className="filter-container">
            <button className={activeFilter === "0" ? "active product-filter" : "product-filter"} onClick={() => setActiveFilter("0")}>ALL</button>
            <button className={activeFilter === "OUTERWEAR" ? "active product-filter" : "product-filter"} onClick={() => setActiveFilter("OUTERWEAR")}>OUTERWEAR</button>
            <button className={activeFilter === "HOODIES" ? "active product-filter" : "product-filter"} onClick={() => setActiveFilter("HOODIES")}>HOODIES</button>
            <button className={activeFilter === "LONG" ? "active product-filter" : "product-filter"} onClick={() => setActiveFilter("LONG")}>LONG SLEEVE</button>
            <button className={activeFilter === "T-SHIRTS" ? "active product-filter" : "product-filter"} onClick={() => setActiveFilter("T-SHIRTS")}>T-SHIRTS</button>
            <button className={activeFilter === "PANTS" ? "active product-filter" : "product-filter"} onClick={() => setActiveFilter("PANTS")}>PANTS</button>
            <button className={activeFilter === "SHORTS" ? "active product-filter" : "product-filter"} onClick={() => setActiveFilter("SHORTS")}>SHORTS</button>
            <button className={activeFilter === "ACCESSORIES" ? "active product-filter" : "product-filter"} onClick={() => setActiveFilter("ACCESSORIES")}>ACCESSORIES</button>
        </div>
    );
}

export default Filter;