import React from 'react';

import {Container} from "react-bootstrap";

import {motion} from "framer-motion";
import {animationStart, reveal} from "../utils/animation";

function ContractScreen(props) {
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
                        staggerChildren: .25,
                        duration: 1,
                        delayChildren: animationStart,
                        delay: animationStart
                    }}
                    className='text-center mb-3'
                >
                    <motion.h1>Договор оферты</motion.h1>
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
                        delayChildren: animationStart + .5,
                        delay: animationStart + .5
                    }}
                    className='text-left mb-3'
                >
                    <motion.h3 variants={reveal} className='mx-0 mb-2 p-0'>1. Основные понятия и
                        определения:</motion.h3>

                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>1.1. Продавец – ИП Милькович Илья
                        Михайлович, ОГРНИП 322861700084485;</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>1.2. Публичная оферта – публичное
                        предложение Продавца, адресованное неопределенному кругу лиц, заключить с Продавцом договор
                        купли-продажи товаров дистанционным способом (далее - «Договор»);</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>1.3. Покупатель – физическое лицо,
                        использующее программные средства просмотра контента в сети Интернет, принимающее условия
                        настоящего Договора и выражающее желание купить товар, сведения о котором размещены на сайте
                        https://нашсайт/;</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>1.4. Товар – изделия российского
                        производства, предлагаемые к продаже на сайте https://нашсайт/;</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>1.5. Интернет-магазин – сайт в сети
                        Интернет, расположенный по адресу https://нашсайт/, на котором любой Покупатель может
                        ознакомиться с представленными Товарами, их описанием и ценами, выбрать определённый Товар,
                        способ оплаты, сформировать и отправить Заказ Продавцу;</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>1.6. Заказ – оформленный запрос Покупателя
                        на приобретение, оплату и доставку Товара, выбранного на сайте https://нашсайт/, отправленный
                        Продавцу посредством сети Интернет;</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>1.7. Служба доставки – оператор российской
                        государственной почтовой сети «Почта России» https://www.pochta.ru/ или
                        «СДЭК» https://www.cdek.ru/ru;</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'>1.9. Сайт – сайт Продавца в сети Интернет,
                        расположенный по адресу https://нашсайт/.</motion.h5>

                    <motion.h3 variants={reveal} className='mx-0 mb-2 p-0'>2. Общие положения:</motion.h3>

                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>2.1. Заказывая Товар на сайте
                        https://нашсайт/ Покупатель выражает свое согласие с вышеизложенными условиями продажи
                        Товара и принимает их.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>2.2. Настоящие условия продажи Товара, а
                        также информация о Товаре, представленная на сайте https://нашсайт/, являются публичной офертой
                        в соответствии со ст. 435 и п.2 ст. 437 Гражданского кодекса Российской Федерации.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>2.3. Продавец имеет право вносить изменения
                        и дополнения в настоящий Договор, размещенный по адресу https://нашсайт/, при этом такие
                        изменения вступают в силу с даты размещения на сайте Продавца. Покупатель принимает на себя
                        обязательства отслеживать изменения и дополнения, внесенные в настоящий Договор. Самой
                        актуальной версией Договора является версия, размещенная на сайте Продавца.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>2.4. Нажимая кнопку «Заказать» при
                        формировании Заказа на сайте, Пользователь подтверждает свое согласие с условиями продажи
                        Товара, изложенными в настоящем Договоре,и одновременно предоставляет согласие на обработку
                        персональных данных, полученных при оформлении Заказа.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'>2.5. Настоящий Договор считается
                        заключенным с момента выдачи/отправки Продавцом Покупателю кассового чека, подтверждающего
                        полную оплату товара, или с момента получения Продавцом сообщения о намерении Покупателя
                        приобрести товар , нажав кнопку «Заказать».</motion.h5>

                    <motion.h3 variants={reveal} className='mx-0 mb-2 p-0'>3. Предмет договора:</motion.h3>

                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>3.1. Продавец предоставляет возможность
                        любому физическому лицу приобретать для личных, семейных или иных нужд, не связанных с
                        осуществлением Покупателем Предпринимательской деятельности, Товары, представленные на сайте
                        https://нашсайт/.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'>3.2. Данный Договор распространяется на все
                        виды Товаров, представленные на сайте https://нашсайт/, пока такие предложения с описанием
                        присутствуют в каталоге сайта.</motion.h5>

                    <motion.h3 variants={reveal} className='mx-0 mb-2 p-0'>4. Порядок оформления заказа:</motion.h3>

                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>4.1. Оформление Заказа в Интернет-магазине
                        осуществляется Покупателем самостоятельно. При оформлении Заказа Покупатель заполняет
                        электронную форму Заказа Товара и отправляет сформированный Заказ Продавцу посредством
                        системы сайта.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>4.2. При регистрации на сайте
                        Интернет-магазина Покупатель обязуется предоставить следующую регистрационную
                        информацию:</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>4.2.1. фамилия, имя, отчество Покупателя
                        или указанного им лица (получателя);</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>4.2.2. адрес, по которому следует доставить
                        Товар (если доставка до адреса Покупателя);</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>4.2.3. адрес электронной почты;</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>4.2.4. контактный телефон.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>4.3. Наименование, количество, ассортимент,
                        цена выбранного Покупателем Товара указываются в корзине Покупателя на сайте
                        Интернет-магазина.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>4.4. Продавец не несет ответственности за
                        содержание и достоверность информации, предоставленной Покупателем при оформлении
                        Заказа.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>4.5. Покупатель несет ответственность за
                        достоверность предоставленной информации при оформлении Заказа.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>4.6. Описания и характеристики Товара в
                        Интернет-магазине содержат основные и достоверные сведения о Товаре.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>4.7. По всем возникающим вопросам,
                        касающимся свойств и характеристик Товара, Покупатель может обратиться к Продавцу, посредством
                        отправки сообщения администратору официальной страницы Продавца в социальной сети instagram
                        https://www.instagram.com/unfort.4u или ВКонткате - https://vk.com/unfort_4u или отправив
                        письмо на электронную почту «наша почта».</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>4.8. Фотографии и макеты Товара,
                        представленные на сайте https://нашсайт/, созданы в условиях специального освещения с
                        использованием профессионального оборудования, либо откорректированы в программе Photoshop,
                        являются простыми иллюстрациями и могут отличаться от фактического внешнего вида Товара при
                        иных условиях наблюдения.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>4.9. Цена Товара указана на сайте
                        https://нашсайт/ рядом с изображением Товара.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>4.10. Получить Товар Покупатель может путем
                        доставки Почты России https://www.pochta.ru/ или СДЭК https://www.cdek.ru/ru.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>4.11. Доставка Товара осуществляется по
                        согласованию Покупателя и Продавца посредством службы доставки Почта России
                        https://www.pochta.ru/ или СДЭК https://www.cdek.ru/ru. Срок доставки Товара
                        Покупателю состоит из срока обработки заказа и срока доставки.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>4.12. Оплата полной стоимости доставки
                        осуществляется за счет Покупателя.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>4.13. Продажа Товара осуществляется путем
                        100% (Сто процентов) предоплаты стоимости Товара.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>4.14. Оплата производится путем
                        использования платежной системы на сайте.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>4.15. По оформлению заказа Покупателю
                        предоставляется информация посредством отправки письма на адрес электронной почты, указанный
                        Покупателем, далее возможно подключение Услуги оповещения на сайте Почты России
                        https://www.pochta.ru/ или СДЭК https://www.cdek.ru/ru. Срок доставки Товара может быть
                        изменен Продавцом, о чем Покупатель уведомляется путем отправки письма на адрес электронной
                        почты, указанного Покупателем, а также посредством массового уведомления на официальной
                        странице Продавца в социальной сети instagram - https://www.instagram.com/unfort.4u или
                        ВКонткате - https://vk.com/unfort_4u.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'>4.16. Покупатель получает уведомление о
                        состоянии заказа посредством отправки письма на адрес электронной почты, далее возможно
                        подключение Услуги оповещения на сайте Почты России https://www.pochta.ru/ или СДЭК
                        https://www.cdek.ru/ru.</motion.h5>

                    <motion.h3 variants={reveal} className='mx-0 mb-2 p-0'>5. Стоимость Товара и способы
                        оплаты:</motion.h3>

                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>5.1. Цена на Товар, представленный на
                        сайте https://нашсайт/, указана в рублях.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>5.2. Цена Товара на сайте https://нашсайт/
                        может быть изменена Продавцом в одностороннем порядке. При этом цена на заказанный Покупателем
                        Товар изменению не подлежит, кроме случаев, указанных в п. 5.3.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>5.3. Продавец вправе предоставлять скидки на
                        цену Товара, согласно действующим в Интернет-магазине в момент оформления Заказа торговым
                        акциям. В случае предоставления Покупателем при оформлении Заказа недостоверных (ошибочных)
                        данных, Продавец вправе при выдаче и оплате Товара произвести перерасчет суммы предоставленной
                        скидки с цены Товара.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>5.4. Оплата Товара производится Банковской
                        картой при оформлении Заказа на сайте с использованием платежной системы..</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>5.5. Оплата доставки осуществляется
                        Покупателем банковской картой при оформлении Заказа на сайте с использованием платежной
                        системы.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'>5.6. В случае отказа Покупателя от Товара,
                        при возврате Покупателю суммы полной  , внесенной Покупателем, банковские и иные комиссии,
                        уплаченные Покупателем в этой связи, Продавцом не компенсируются.</motion.h5>

                    <motion.h3 variants={reveal} className='mx-0 mb-2 p-0'>6. Гарантия, отмена Заказа, возврат Товара
                        и предоплаты:</motion.h3>

                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>6.1. Гарантийный срок на Товара равен 3
                        (Трём) днями исчисляется с момента передачи Товара Покупателю.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>6.2. Гарантия распространяется только на
                        производственный брак и не распространяется на дефекты, образовавшиеся в результате:
                        механических повреждений (царапин, разрывов, потертостей
                        и т.д.); воздействия экстремальных температур, растворителей, кислот, воды; неправильного
                        использования (эксплуатации); естественного
                        износа.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>6.3. Порядок отмены Заказа:</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>6.3.1. Для мгновенной отмены Заказа
                        Покупателю необходимо связаться с Продавцом посредством отправки сообщения администратору
                        официальной страницы Продавца в социальной сети
                        instagram - https://www.instagram.com/unfort.4u или ВКонткате - https://vk.com/unfort_4u или
                        направив письмо на почту «наша почта».</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>6.3.2. Договор купли-продажи считается
                        расторгнутым автоматически, в случае непоступления полной оплаты стоимости Заказа.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>6.4. Денежные средства, внесенные
                        Покупателем с банковской карты с использованием электронного средства платежа, возвращаются в
                        течение 30 (Тридцати) рабочих дней с даты отказа
                        Покупателя от Заказа/расторжения договора на тот лицевой счет/банковскую карту, с которой была
                        внесена оплата Заказа. Возврат денежных
                        средств за Заказ, внесенных иными средствами платежа (п.5.4.1- 5.4.3 настоящего Договора),
                        осуществляется в течение 5 (Пяти) рабочих дней с
                        даты подачи Покупателем соответствующего заявления в магазин Продавца, в котором была внесена
                        оплата.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>6.5. Товар надлежащего качества, полученный
                        Покупателем, обмену и возврату не подлежит.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'>6.6. В случае выявления производственного
                        брака, Покупатель обязуется подтвердить данный факт проведением экспертизы, в случае
                        положительного подтверждения экспертизой, возврат Товара возможен в срок не позднее 10 (Десяти)
                        дней с момента покупки такого Товара Покупателем.</motion.h5>

                    <motion.h3 variants={reveal} className='mx-0 mb-2 p-0'>7. Ответственность:</motion.h3>

                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>7.1. За неисполнение или ненадлежащее
                        исполнение своих обязательств по Договору Стороны несут ответственность в соответствии с
                        действующим законодательством РФ.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>7.2. Совокупная ответственность Продавца
                        по настоящему Договору ограничивается суммой платежа, уплаченного Покупателем по
                        Договору.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'>7.3. Не вступая в противоречие с указанным
                        выше, Продавец освобождается от ответственности за нарушение условий Договора, если такое
                        нарушение вызвано действием обстоятельств непреодолимой силы (форс-мажор) включая: действия
                        органов государственной̆ власти (в т.ч. принятие правовых актов), пожар, наводнение,
                        землетрясение, другие стихийные бедствия, отсутствие электроэнергии и/или сбои работы
                        компьютерной сети, забастовки, гражданские волнения, беспорядки, любые иные обстоятельства,
                        не ограничиваясь перечисленным, которые могут повлиять на исполнение Продавцом
                        Договора.</motion.h5>

                    <motion.h3 variants={reveal} className='mx-0 mb-2 p-0'>8. Прочие условия:</motion.h3>

                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>8.1. Покупатель обязуется дать свое согласие
                        на обработку персональных данных путем подтверждения Положения о политике конфиденциальности
                        персональных данных, размещенной на сайте https://нашсайт/.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>8.2. Сайт https://нашсайт/ и предоставляемые
                        сервисы могут временно частично или полностью недоступны по причине проведения профилактических
                        или иных работ или по любым другим причинам технического характера.</motion.h5>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'>8.3. В случае возникновения вопросов и
                        претензий со стороны Покупателя он вправе обратиться к Продавцу посредством отправки сообщения
                        администратору официальной страницы Продавца в социальной сети instagram -
                        https://www.instagram.com/unfort.4u или ВКонткате - https://vk.com/unfort_4u или направив
                        письмо на почту «наша почта».</motion.h5>

                    <motion.h4 variants={reveal} className='mx-5 mb-1 p-0'>Все Возникающее споры стороны будут
                        стараться решить путем переговоров, при не достижении соглашения, соответствующий спор
                        подлежит разрешению в суде.</motion.h4>
                </motion.div>
            </Container>
        </motion.div>
    );
}

export default ContractScreen;