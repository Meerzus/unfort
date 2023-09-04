import React, {useEffect} from 'react';

import {Container} from "react-bootstrap";

import {motion} from "framer-motion";
import {animationStart, reveal} from "../utils/animation";

function AboutScreen() {

    const extraMenuClose = () => {
        const menu = document.querySelector('.extra-menu')

        menu.animate({
            left: '-16rem'
        }, 250)

        setTimeout(() => {menu.style.left = '-16rem'}, 249)
    }

    useEffect(() =>{
        extraMenuClose()
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, [])

    return (
        <motion.div>
            <Container id='info' className='about-us'>
                <motion.div
                    variants={reveal}
                    initial='hiddenVariantY'
                    animate='revealedVariantY'
                    transition={{
                        ease: 'easeIn',
                        type: 'spring',
                        staggerChildren: .2,
                        duration: 1,
                        delayChildren: animationStart,
                        delay: animationStart
                    }}
                    className='text-center my-3'
                >
                    <motion.h1>О нас</motion.h1>
                </motion.div>
                <motion.div
                    variants={reveal}
                    initial='hiddenVariantX'
                    animate='revealedVariantX'
                    transition={{
                        ease: 'easeIn',
                        type: 'spring',
                        staggerChildren: .2,
                        duration: 1,
                        delayChildren: animationStart + .25,
                        delay: animationStart
                    }}
                    className='text-center'
                >
                    <motion.h2
                        variants={reveal}
                        className='text-center'
                    >
                        UNFORT — Российский, концептуальный бренд одежды
                    </motion.h2>

                    <motion.div
                        variants={reveal}
                        className='text-center'
                    >
                        <strong>Основная цель UNFORT</strong> - объединить и вдохновить людей, которые чувствуют наше видение.
                    </motion.div>

                    <motion.div
                        variants={reveal}
                        className='text-center'
                    >
                        Дать им возможность для самовыражения и экспериментов.
                    </motion.div>
                </motion.div>
            </Container>
        </motion.div>
    );
}

export default AboutScreen;