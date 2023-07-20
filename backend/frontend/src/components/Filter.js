import React, {useEffect} from 'react';
import {Table} from "react-bootstrap";

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
            <Table striped responsive className='table-sm text-center overflow-hidden filter-table'>
                <tr>
                    <td>
                        <button className={activeFilter === "0" ? "active product-filter" : "product-filter"} onClick={() => setActiveFilter("0")}>ALL</button>
                    </td>

                    <td>
                        <button className={activeFilter === "OUTERWEAR" ? "active product-filter" : "product-filter"} onClick={() => setActiveFilter("OUTERWEAR")}>OUTERWEAR</button>
                    </td>

                    <td>
                        <button className={activeFilter === "HOODIES" ? "active product-filter" : "product-filter"} onClick={() => setActiveFilter("HOODIES")}>HOODIES</button>
                    </td>

                    <td>
                        <button className={activeFilter === "LONG" ? "active product-filter" : "product-filter"} onClick={() => setActiveFilter("LONG")}>LONG SLEEVE</button>
                    </td>

                    <td>
                        <button className={activeFilter === "T-SHIRTS" ? "active product-filter" : "product-filter"} onClick={() => setActiveFilter("T-SHIRTS")}>T-SHIRTS</button>
                    </td>

                    <td>
                        <button className={activeFilter === "PANTS" ? "active product-filter" : "product-filter"} onClick={() => setActiveFilter("PANTS")}>PANTS</button>
                    </td>

                    <td>
                        <button className={activeFilter === "SHORTS" ? "active product-filter" : "product-filter"} onClick={() => setActiveFilter("SHORTS")}>SHORTS</button>
                    </td>

                    <td>
                        <button className={activeFilter === "ACCESSORIES" ? "active product-filter" : "product-filter"} onClick={() => setActiveFilter("ACCESSORIES")}>ACCESSORIES</button>
                    </td>
                </tr>
            </Table>
        </div>
    );
}

export default Filter;