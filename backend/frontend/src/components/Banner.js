import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {motion} from "framer-motion";
import {animationStart, reveal} from "../utils/animation";

import Video from "../1.mp4";
import Video1 from "../2.mp4";
import {Nav} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";


function Banner() {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const scrollHandler = () => {
        const products = document.getElementById('running-stroke')

        products?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <motion.div
            layout
            initial={{height: 0}}
            animate={{height: 95 + 'vh'}}
            transition={{delay: animationStart - 1, duration: 0, ease: [1, .5, 1, 1]}}
            className='player'
        >
            <video
                preload="metadata"
                className='video'
                autoPlay={true}
                muted={true}
                controls={false}
                loop={true}
                playsInline={true}
            >
             <source src={window.innerWidth >= 910 ? Video : Video1} type="video/mp4"/>
             Your browser does not support HTML5 video.
            </video>
            <motion.div
                className='banner-btns'
                animate={{opacity: .75, display: 'flex'}}
                transition={{
                    duration: 1,
                    delay: 1
                }}
            >
                {
                    userInfo ?
                        <LinkContainer className="banner-btn" to='/profile'>
                            <Nav.Link>Личный кабинет</Nav.Link>
                        </LinkContainer> :
                        <LinkContainer className="banner-btn" to='/login'>
                            <Nav.Link>Личный кабинет</Nav.Link>
                        </LinkContainer>
                }
                <button className='banner-btn' onClick={scrollHandler}>Каталог</button>
            </motion.div>
        </motion.div>
    );
}

export default Banner;