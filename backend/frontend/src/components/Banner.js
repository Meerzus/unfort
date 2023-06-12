import React from 'react';

import {motion} from "framer-motion";
import {animationStart} from "../utils/animation";

function Banner() {
    return (
        <motion.div
            layout
            initial={{height: 0}}
            animate={{height: 95 + 'vh'}}
            transition={{delay: animationStart - 1, duration: 2.5, type: 'spring'}}
            className="banner"
        >
        </motion.div>
    );
}

export default Banner;