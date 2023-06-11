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
            <button className={activeFilter === "0" ? "active product-filter" : "product-filter"} onClick={() => setActiveFilter("0")}>Все товары</button>
            <button className={activeFilter === "Штаны" ? "active product-filter" : "product-filter"} onClick={() => setActiveFilter("Штаны")}>Штаны</button>
            <button className={activeFilter === "Худи" ? "active product-filter" : "product-filter"} onClick={() => setActiveFilter("Худи")}>Худи</button>
            <button className={activeFilter === "Шорты" ? "active product-filter" : "product-filter"} onClick={() => setActiveFilter("Шорты")}>Шорты</button>
            <button className={activeFilter === "Новое" ? "active product-filter" : "product-filter"} onClick={() => setActiveFilter("Новое")}>Новое</button>
        </div>
    );
}

export default Filter;