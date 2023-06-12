import React, {useState, useEffect} from 'react';
import {Row, Col, Container} from 'react-bootstrap';
import Product from "../components/Product";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";

import Banner from "../components/Banner";
import Filter from "../components/Filter";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";

import {motion, AnimatePresence} from "framer-motion";
import {useNavigate} from "react-router-dom";

function HomeScreen() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products, page, pages} = productList
    const navigate = useNavigate

    let keyword = window.location.search

    const [filtered, setFiltered] = useState([])
    const [activeFilter, setActiveFilter] = useState("0")

    useEffect(() => {
        dispatch(listProducts(keyword))
        setFiltered(products)
    }, [dispatch, keyword])

    return loading ? (
        <Loader/>
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div>
            <Banner/>
            <Container>
                <Filter products={products}
                        setFiltered={setFiltered}
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                />
                <Paginate
                    page={page}
                    pages={pages}
                    keyword={keyword}
                />
                <motion.div layout className="products">
                    <AnimatePresence>
                        {
                            filtered.map((product) => {
                                return <Product key={product._id} product={product}/>
                            })
                        }
                    </AnimatePresence>
                </motion.div>
                {
                    Number(filtered.length) > 4 &&
                    <Paginate
                        page={page}
                        pages={pages}
                        keyword={keyword}
                    />
                }
            </Container>
        </div>
    );
}

export default HomeScreen;