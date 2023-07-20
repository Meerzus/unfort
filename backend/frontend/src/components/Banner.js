import React, {useState, useEffect} from 'react';

import {motion} from "framer-motion";
import {animationStart} from "../utils/animation";

function Banner() {

    const w = window.innerWidth

    console.log(w)

    const [height, setHeight] = useState(0)

    useEffect(() => {
        if (w >= 1920) {
            setHeight(95)
        } else if (w >= 768) {
            setHeight(40)
        } else if (w >= 414) {
            setHeight(30)
        } else if (w >= 390) {
            setHeight(25)
        }
    }, [height])

    return (
        <motion.div
            layout
            initial={{height: 0}}
            animate={{height: height + 'vh'}}
            transition={{delay: animationStart - 1, duration: 2.5, type: 'spring'}}
            className="banner"
        >
        </motion.div>
    );
}

export default Banner;