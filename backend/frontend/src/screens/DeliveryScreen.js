import React, {useEffect} from 'react';

import {Container} from "react-bootstrap";

import {motion} from "framer-motion";
import {animationStart, reveal} from "../utils/animation";

function DeliveryScreen() {

    useEffect(() =>{
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
                        staggerChildren: .05,
                        duration: 1,
                        delayChildren: animationStart,
                        delay: animationStart
                    }}
                    className='text-center mb-3'
                >
                    <motion.h1>Доставка</motion.h1>
                </motion.div>

                <motion.div
                    variants={reveal}
                    initial='hiddenVariantX'
                    animate='revealedVariantX'
                    transition={{
                        ease: 'easeIn',
                        type: 'spring',
                        staggerChildren: .05,
                        duration: 1,
                        delayChildren: animationStart + .25,
                        delay: animationStart
                    }}
                    className='text-left mb-3'
                >
                    <motion.h2 variants={reveal} className='mx-1 my-0'>ТЕРМИНЫ</motion.h2>

                    <motion.h4 variants={reveal} className='mx-4 my-0 p-0'>Релиз:</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'>Публикация нового товара на
                        сайте.</motion.h5>

                    <motion.h4 variants={reveal} className='mx-4 my-0 p-0'>Дроп:</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'>Публикация товара на сайте с возможностью
                        его заказа в ограниченном тираже.</motion.h5>

                    <motion.h4 variants={reveal} className='mx-4 my-0 p-0'>Предзаказ:</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'>Статус товаров, которых ещё нет в наличии,
                        но они на стадии производства. Стоимость на данный товар временно снижена, однако получить
                        данный товар возможно лишь после дропа.</motion.h5>

                    <motion.h4 variants={reveal} className='mx-4 my-0 p-0'>Ресток:</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'>Повторный выход в продажу товара, который
                        ранее был в наличии.</motion.h5>

                    <motion.h2 variants={reveal} className='mx-1 my-0'>СДЭК</motion.h2>

                    <motion.h5 variants={reveal} className='mx-5 my-0 p-0'>Стоимость доставки рассчитывается
                        автоматически системой СДЭК. Срок обработки заказа: до 7 рабочих дней.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'>Более точные сроки доставки,
                        трек-код для отслеживания вы сможете увидеть в письме-подтверждении после передачи заказа
                        в транспортную компанию.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 my-3 p-0'>* В праздничные дни и сезонность.
                        Сроки доставки могут быть увеличены.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 my-0 p-0'>Обращаем Ваше внимание на то, что переданный
                        в транспортную компанию заказ не возможно скорректировать: изменить цвет, размер и прочие
                        характеристики.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'>Если Ваш заказ еще не передан в транспортную
                        компанию, его можно изменить/отменить, написав письмо на электронную почту поддержки:
                        <strong> «support@unfort.ru»</strong></motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'>В письме на почту поддержки необходимо
                        указать: номер заказа, состав заказа и уточнить характеристики, которые Вы хотели бы
                        изменить/отменить.</motion.h5>

                    <motion.h2 variants={reveal} className='mx-1 my-0'>ПОЧТА РОССИИ</motion.h2>

                    <motion.h5 variants={reveal} className='mx-5 my-0 p-0'>Стоимость доставки в пределах РФ:
                        <strong> 390Р</strong></motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 my-0 p-0'>Срок обработки заказа:
                        <strong> до 7 рабочих дней.</strong></motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 my-0 p-0'>Более точные сроки доставки, трек-код для
                        отслеживания вы сможете увидеть в письме-подтверждении после передачи заказа на
                        почту.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 my-3 p-0'>* В праздничные дни и сезонность. Сроки
                        доставки могут быть увеличены.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 my-0 p-0'>Обращаем Ваше внимание на то, что переданный
                        на почту заказ не возможно скорректировать: изменить цвет, размер и прочие
                        характеристики.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'>Если Ваш заказ еще не передан в транспортную
                        компанию, его можно изменить/отменить, написав письмо на электронную почту поддержки:
                        <strong> «support@unfort.ru»</strong></motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 my-0 p-0'>В письме на почту поддержки необходимо
                        указать: номер заказа, состав заказа и уточнить характеристики, которые Вы хотели бы
                        изменить/отменить.</motion.h5>
                </motion.div>
            </Container>
        </motion.div>
    );
}

export default DeliveryScreen;