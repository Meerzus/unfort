import React, {useEffect} from 'react';

import {Container} from "react-bootstrap";

import {motion} from "framer-motion";
import {animationStart, reveal} from "../utils/animation";

function SupportScreen() {

    const extraMenuClose = () => {
        const menu = document.querySelector('.extra-menu')
        const backGround = document.querySelector('.extra-background')

        menu.animate({
            left: '-16rem'
        }, 250)

        backGround.animate({
            opacity: '0'
        }, 250)

        setTimeout(() => {menu.style.left = '-16rem'}, 249)
        setTimeout(() => {backGround.style.display = 'none'}, 249)
    }

    useEffect(() =>{
        extraMenuClose()
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, [])

    return (
        <motion.div>
            <Container id='info' className='support'>
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
                    className='text-center my-3'
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
                    <motion.div variants={reveal}><strong className='support-info'>E-MAIL: </strong>support@unfort.ru</motion.div>
                    <motion.div variants={reveal}><strong className='support-info'>ЧАСЫ РАБОТЫ: </strong>Пн-сб - 10:00 до 21:00 - поддержка Unfort</motion.div>
                    <motion.div variants={reveal}><strong className='support-info'>ИП: </strong>Милькович Илья Михайлович</motion.div>
                    <motion.div variants={reveal}><strong className='support-info'>ИНН: </strong>860330317687</motion.div>
                    <motion.div variants={reveal}><strong className='support-info'>ОГРНИП: </strong>322861700084485</motion.div>
                    <motion.div variants={reveal}><strong className='support-info'>БАНК: </strong>АО "ТИНЬКОФФ БАНК"</motion.div>
                    <motion.div variants={reveal}><strong className='support-info'>БИК: </strong>044525974</motion.div>
                    <motion.div variants={reveal}><strong className='support-info'>РАСЧЁТНЫЙ СЧЁТ: </strong>40802810600003939678</motion.div>
                    <motion.div variants={reveal}><strong className='support-info'>КОРР. СЧЁТ: </strong>30101810145250000974</motion.div>
                </motion.div>
            </Container>
        </motion.div>
    );
}

export default SupportScreen;