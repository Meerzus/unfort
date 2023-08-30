import React, {useEffect} from 'react';

import {Container} from "react-bootstrap";

import {motion} from "framer-motion";
import {animationStart, reveal} from "../utils/animation";

function SupportScreen() {

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
            <Container>
                <motion.div
                    variants={reveal}
                    initial='hiddenVariantY'
                    animate='revealedVariantY'
                    transition={{
                        ease: 'easeIn',
                        type: 'spring',
                        staggerChildren: .1,
                        duration: 1,
                        delayChildren: animationStart,
                        delay: animationStart
                    }}
                    className='text-center mb-3'
                >
                    <motion.h1 variants={reveal}>Поддержка</motion.h1>
                </motion.div>

                <motion.div
                    variants={reveal}
                    initial='hiddenVariantX'
                    animate='revealedVariantX'
                    transition={{
                        ease: 'easeIn',
                        type: 'spring',
                        staggerChildren: .1,
                        duration: 1,
                        delayChildren: animationStart + .25,
                        delay: animationStart
                    }}
                    className='text-left'
                >
                    <motion.div variants={reveal}><strong className='mx-5'>E-MAIL: </strong>support@unfort.ru</motion.div>
                    <motion.div variants={reveal}><strong className='mx-5'>ЧАСЫ РАБОТЫ: </strong>Пн-сб - 10:00 до 21:00 - поддержка Unfort</motion.div>
                    <motion.div variants={reveal}><strong className='mx-5'>ИП: </strong>Милькович Илья Михайлович</motion.div>
                    <motion.div variants={reveal}><strong className='mx-5'>ИНН: </strong>860330317687</motion.div>
                    <motion.div variants={reveal}><strong className='mx-5'>ОГРНИП: </strong>322861700084485</motion.div>
                    <motion.div variants={reveal}><strong className='mx-5'>БАНК: </strong>АО "ТИНЬКОФФ БАНК"</motion.div>
                    <motion.div variants={reveal}><strong className='mx-5'>БИК: </strong>044525974</motion.div>
                    <motion.div variants={reveal}><strong className='mx-5'>РАСЧЁТНЫЙ СЧЁТ: </strong>40802810600003939678</motion.div>
                    <motion.div variants={reveal}><strong className='mx-5'>КОРР. СЧЁТ: </strong>30101810145250000974</motion.div>
                </motion.div>
            </Container>
        </motion.div>
    );
}

export default SupportScreen;