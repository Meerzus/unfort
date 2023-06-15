import React from 'react';

import {Container} from "react-bootstrap";

import {motion} from "framer-motion";
import {animationStart, reveal} from "../utils/animation";

function AboutScreen() {
    return (
        <motion.div>
            <Container>
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
                    className='text-center mb-3'
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