import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

import {motion} from "framer-motion";
import {reveal} from "../utils/animation";


function SearchBox() {
    const [keyword, setKeyword] = useState('')

    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            navigate(`/?keyword=${keyword}&page=1`)
            window.location.reload()
            console.log(keyword)
        } else {
            navigate('/')
        }
    }


    return (
        <motion.Form variants={reveal}
            onSubmit={submitHandler}
            className='search-box'
        >
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>
            <Button
                type='submit'
                variant='outline-success'
                className='mx-3 p-2'
            >Поиск</Button>
        </motion.Form>
    );
}

export default SearchBox;