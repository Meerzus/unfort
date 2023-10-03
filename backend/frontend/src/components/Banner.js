import React, {useState, useEffect} from 'react';

import {motion} from "framer-motion";
import {animationStart} from "../utils/animation";

import Video from "../2.webm";


function Banner() {

    const [height, setHeight] = useState(0)

    const [muted, setMuted] = useState(true)

    const muteHandler = () => {
        const btn = document.getElementById('mute-btn')

        if (muted === true) {
            btn.classList.remove('fa-volume-xmark')
            btn.classList.add('fa-volume-high')
            setMuted(false)
        } else if (muted === false) {
            btn.classList.remove('fa-volume-high')
            btn.classList.add('fa-volume-xmark')
            setMuted(true)
        }
    }

    useEffect(() => {
        if (window.innerWidth >= 1920) {
            setHeight(95)
        } else if (window.innerWidth >= 1024) {
            setHeight(90)
        } else if (window.innerWidth >= 910) {
            setHeight(85)
        } else if (window.innerWidth >= 768) {
            setHeight(40)
        } else {
            setHeight(27.5)
        }
    }, [height])

    return (
        <motion.div
            layout
            initial={{height: 0}}
            animate={{height: height + 'vh'}}
            transition={{delay: animationStart - 1, duration: 2, ease: [1, .5, 1, 1]}}
            className='player'
        >
            <button className='mute' onClick={muteHandler}>
                <i id='mute-btn' className="fa-solid fa-volume-xmark"></i>
            </button>
            <video preload='auto' className='video' autoPlay muted={muted} controls={false} loop>
             <source src={Video} type="video/mp4"/>
             Your browser does not support HTML5 video.
            </video>
        </motion.div>
    );
}

export default Banner;