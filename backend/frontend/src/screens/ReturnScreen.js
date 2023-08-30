import React, {useEffect} from 'react';

import {Container} from "react-bootstrap";

import {motion} from "framer-motion";
import {animationStart, reveal} from "../utils/animation";

function ReturnScreen(props) {

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
                        staggerChildren: .05,
                        duration: 1,
                        delayChildren: animationStart,
                        delay: animationStart
                    }}
                    className='text-center mb-3'
                >
                    <motion.h1>Возврат</motion.h1>
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
                    <motion.h3 variants={reveal} className='mx-0 my-0 p-0'>Возврат:</motion.h3>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'>Вы можете вернуть товар, приобретенный в
                        нашем интернет-магазине, в течение 14 дней с момента получения заказа. Товар должен поступить в
                        отделение СДЭК / Почты России не позднее, чем через 14 дней с момента получения Вами
                        заказа.</motion.h5>

                    <motion.h3 variants={reveal} className='mx-0 my-0 p-0'>Важно!</motion.h3>
                    <motion.h5 variants={reveal} className='mx-5 my-0 p-0'>Для осуществления возврата предварительно
                        необходимо обратиться на электронную почту поддержки:
                        <strong> «support@unfort.ru»</strong>.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'>В письме на почту поддержки необходимо
                        указать: номер заказа, состав заказа, причину возврата.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'><strong>Возврат товара возможно только,
                        если вещь не была в употреблении, сохранены товарный вид (а также ярлыки, этикетки, упаковка).
                        Мы не принимаем возврат товара, который выглядит поношенным или стиранным. При нарушении
                        товарного вида приобретенной продукции Вам могут отказать в возврате.</strong></motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'><strong>Мы рекомендуем возвращать вещи в
                        оригинальной упаковке со всеми защитными этикетками и бирками, которыми был укомплектован
                        ваш товар.</strong></motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'><strong>Если вам не подошел размер, сумма
                        возврата будет состоять только из стоимости оплаченного товара. Если же вам неправильно
                        укомплектовали заказ, сумма возврата будет состоять из стоимости товара и стоимости доставки
                        туда и обратно.</strong></motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'><strong>Расходы на доставку товара
                        надлежащего качества в магазин несет покупатель.</strong></motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'>Возмещение денежных средств за товар,
                        доставку осуществляется в течение 14 дней со дня предъявления соответствующего требования на
                        почту поддержки: <strong> «support@unfort.ru»</strong></motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'>Мы вправе отказать покупателю в возврате
                        товара, если считаем, что обнаруженный недостаток является следствием неправильной эксплуатации
                        товара. В случае возникновения спора мы вправе произвести экспертизу товара.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'>Покупатель вправе участвовать в проверке
                        качества товара и оспорить заключение экспертизы в судебном порядке. Если в результате
                        экспертизы товара установлено, что его недостатки возникли вследствие неправильной эксплуатации,
                        покупатель обязан возместить расходы на проведение экспертизы, а также связанные с ее
                        проведением расходы на хранение и транспортировку товара.</motion.h5>

                    <motion.h3 variants={reveal} className='mx-0 my-0 p-0'>Возврату не подлежит:</motion.h3>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'>Бельевые (нижнее белье, боди, топы, бра),
                        чулочно-носочные изделия и трикотаж, тканевые маски для лица, изделия из драгоценных металлов,
                        с драгоценными камнями, из драгоценных металлов со вставками из полудрагоценных и синтетических
                        камней, ограненные драгоценными камнями; солнцезащитные очки, средства ухода.</motion.h5>

                    <motion.h3 variants={reveal} className='mx-0 my-0 p-0'>Как вернуть товар?</motion.h3>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'>После подтверждения оформления возврата на
                        электронной почте - <strong> «support@unfort.ru»</strong> упакуйте письменное заявление вместе с
                        товаром.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 my-0 p-0'>* Пожалуйста, отправляйте товары в
                        оригинальной упаковке, только внутри почтовых коробок, чтобы в дороге оригинальная упаковка
                        не пострадала.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 my-0 p-0'>Если товар был дополнительно уложен в
                        коробку или чехол, не забудьте вернуть и их.</motion.h5>
                </motion.div>
            </Container>
        </motion.div>
    );
}

export default ReturnScreen;