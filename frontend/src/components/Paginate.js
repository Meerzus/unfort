import React from 'react';
import {Pagination, Button} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {useNavigate} from "react-router-dom";

function Paginate({pages, page, keyword = '', isAdmin=false}) {
    if (keyword) {
        keyword = keyword.split('keyword=')[1].split('&')[0]
    }

    const navigate = useNavigate()

    const currentLocation = window.location.search.split('?keyword=&')[1]

    const goToPage = (x) => {
        if (!isAdmin) {
            navigate(`/?keyword=${keyword}&page=${x + 1}`)
        } else {
            navigate(`/admin/productlist/?keyword=${keyword}&page=${x + 1}`)
        }
        navigate(0)
    }

    return ( pages > 1 && (
            <Pagination
                className='justify-content-center'
            >
                {[...Array(pages).keys()].map((x) => (
                    <LinkContainer
                        key={x + 1}
                        onClick={() => goToPage(x)}
                        to={
                        !isAdmin ?
                            {
                                pathname: '/',
                                search: `?keyword=${keyword}&page=${x + 1}`,
                            }
                            : {
                                pathname: '/admin/productlist/',
                                search: `?keyword=${keyword}&page=${x + 1}`
                            }
                        }
                    >
                        {}
                        <Pagination.Item
                            active={x + 1 === page}
                        >{x + 1}</Pagination.Item>
                    </LinkContainer>
                ))}
                {/*{*/}
                {/*    !isAdmin &&*/}
                {/*    <Button*/}
                {/*        type='button'*/}
                {/*        className='size-btn pagination-btn'*/}
                {/*        onClick={goToPage}*/}
                {/*    >Перейти</Button>*/}
                {/*}*/}
            </Pagination>
        )
    );
}

export default Paginate;