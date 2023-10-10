import React, {useState, useEffect} from 'react';
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

    const [trackLimit, setTrackLimit] = useState(0)

    const [leftBtnLimit, setLeftBtnLimit] = useState(true)
    const [rightBtnLimit, setRightBtnLimit] = useState(false)

    const trackLeft = () => {
        const track = document.getElementById("table");

        if (Number(track.dataset.position) < 0) {
            track.dataset.position = Number(track.dataset.position) + 25
            setLeftBtnLimit(false)
            setRightBtnLimit(false)
            if (track.dataset.position > -60 && track.dataset.position > 0) {
                track.dataset.position = 0
                setLeftBtnLimit(true)
                setRightBtnLimit(false)
            }
            track?.animate({
                transform: `translate(${Number(track.dataset.position)}%, 0%)`
            }, { duration: 300, fill: "forwards" });
            console.log(60 + (Number(track.dataset.position) / 25))
        }
    }

    const trackRight = () => {
        const track = document.getElementById("table");

        console.log(track.dataset.position)

        if (Number(track.dataset.position) >= trackLimit) {
            track.dataset.position = Number(track.dataset.position) - 25
            if (track.dataset.position < trackLimit) {
                track.dataset.position = trackLimit
            }
            track?.animate({
                transform: `translate(${Number(track.dataset.position)}%, 0%)`
            }, { duration: 300, fill: "forwards" });
            console.log(60 + (Number(track.dataset.position) / 25))
        }
    }

    return (
        <div className="filter-container" id='filter-container'>
            {/*<div className='img-track-btns'>*/}
            {/*    <button onClick={trackLeft} disabled={leftBtnLimit}><i className="fa-solid fa-arrow-left"></i></button>*/}
            {/*    <button onClick={trackRight} disabled={rightBtnLimit}><i className="fa-solid fa-arrow-right"></i></button>*/}
            {/*</div>*/}
            <Table striped responsive className='table-sm text-center filter-table' data-position="0" id='table'>
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