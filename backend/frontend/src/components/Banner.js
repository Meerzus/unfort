import React, {useState, useEffect} from 'react';

import {motion} from "framer-motion";
import {animationStart} from "../utils/animation";

function Banner() {

    const w = window.innerWidth
    const h = window.innerHeight

    const [height, setHeight] = useState(0)

    useEffect(() => {
        if (w >= 1920) {
            setHeight(100)
        } else if (w >= 1024) {
            setHeight(95)
        } else if (w >= 910) {
            setHeight(85)
        } else if (w >= 768) {
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
            className="banner"
        >
        </motion.div>
    );
}

export default Banner;