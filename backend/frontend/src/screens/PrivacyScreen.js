import React from 'react';
import {motion} from "framer-motion";
import {animationStart, reveal} from "../utils/animation";
import {Container} from "react-bootstrap";

function PrivacyScreen(props) {
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
                    <motion.h1>Политика конфиденциальности</motion.h1>
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
                    <motion.h2 variants={reveal} className='mx-1 my-0'>1. Общие положения</motion.h2>

                    <motion.h4 variants={reveal} className='mx-4 mb-0 p-0'>1.1. Настоящая политика обработки
                        персональных данных составлена в соответствии с требованиями</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>Федерального закона от 27.07.2006. No152-ФЗ
                        «О персональных данных» и определяет порядок обработки персональных данных и меры по
                        обеспечению безопасности персональных данных, предпринимаемые ИП Милькович Илья Михайлович,
                        ОГРНИП 322861700084485 (далее – Оператор).</motion.h5>

                    <motion.h4 variants={reveal} className='mx-4 mb-0 p-0'>1.2. Настоящая политика Оператора в
                        отношении обработки персональных данных</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'>(далее – Политика) применяется ко всей
                        информации, которую Оператор может получить о посетителях веб-сайта
                        https://нашсайт/.</motion.h5>

                     <motion.h2 variants={reveal} className='mx-1 my-0'>2. Основные понятия, используемые в
                         Политике</motion.h2>

                    <motion.h4 variants={reveal} className='mx-4 mb-0 p-0'>2.1. Автоматизированная обработка
                        персональных данных – обработка персональных данных</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>с помощью средств вычислительной
                        техники;</motion.h5>

                    <motion.h4 variants={reveal} className='mx-4 mb-0 p-0'>2.2. Блокирование персональных данных –
                        временное прекращение обработки персональных данных</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>(за исключением случаев, если обработка
                        необходима для уточнения персональных данных);</motion.h5>

                    <motion.h4 variants={reveal} className='mx-4 mb-0 p-0'>2.3. Веб-сайт – совокупность графических и
                        информационных материалов, а также программ для</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>ЭВМ и баз данных, обеспечивающих их
                        доступность в сети интернет по сетевому адресу https://нашсайт/.</motion.h5>

                    <motion.h4 variants={reveal} className='mx-4 mb-0 p-0'>2.4. Информационная система персональных
                        данных — совокупность содержащихся в базах данных</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>персональных данных, и обеспечивающих их
                        обработку информационных технологий и технических средств;</motion.h5>

                    <motion.h4 variants={reveal} className='mx-4 mb-0 p-0'>2.5. Обезличивание персональных данных —
                        действия, в результате которых невозможно определить</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>без использования дополнительной информации
                        принадлежность персональных данных конкретному Пользователю или иному субъекту персональных
                        данных;</motion.h5>

                    <motion.h4 variants={reveal} className='mx-4 mb-0 p-0'>2.6. Обработка персональных данных – любое
                        действие (операция) или совокупность действий</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>(операций), совершаемых с использованием
                        средств автоматизации или без использования таких средств с персональными данными, включая
                        сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение),
                        извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание,
                        блокирование, удаление, уничтожение персональных данных;</motion.h5>

                    <motion.h4 variants={reveal} className='mx-4 mb-0 p-0'>2.7. Оператор – государственный орган,
                        муниципальный орган, юридическое или физическое лицо,</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>самостоятельно или совместно с другими
                        лицами организующие и (или) осуществляющие обработку персональных данных, а также определяющие
                        цели обработки персональных данных, состав персональных данных, подлежащих обработке, действия
                        (операции), совершаемые с персональными данными;</motion.h5>

                    <motion.h4 variants={reveal} className='mx-4 mb-0 p-0'>2.8. Персональные данные – любая информация,
                        относящаяся прямо или косвенно к определенному</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>или определяемому Пользователю веб-сайта
                        https://нашсайт/;</motion.h5>

                    <motion.h4 variants={reveal} className='mx-4 mb-1 p-0'>2.9. Пользователь – любой посетитель
                        веб-сайта https://нашсайт/;</motion.h4>

                    <motion.h4 variants={reveal} className='mx-4 mb-0 p-0'>2.10. Предоставление персональных
                        данных – действия, направленные на раскрытие персональных</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>данных определенному лицу или определенному
                        кругу лиц;</motion.h5>

                    <motion.h4 variants={reveal} className='mx-4 mb-0 p-0'>2.11. Распространение персональных данных – любые действия, направленные на раскрытие</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>персональных данных неопределенному кругу
                        лиц (передача персональных данных) или на ознакомление с персональными данными неограниченного
                        круга лиц, в том числе обнародование персональных данных в средствах массовой информации,
                        размещение в информационно-телекоммуникационных сетях или предоставление доступа к персональным
                        данным каким-либо иным способом;</motion.h5>

                    <motion.h4 variants={reveal} className='mx-4 mb-0 p-0'>2.12. Трансграничная передача персональных
                        данных – передача персональных данных на</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>территорию иностранного государства органу
                        власти иностранного государства, иностранному физическому или иностранному юридическому
                        лицу;</motion.h5>

                    <motion.h4 variants={reveal} className='mx-4 mb-0 p-0'>2.13. Уничтожение персональных данных –
                        любые действия, в результате которых персональные</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'>данные уничтожаются безвозвратно с
                        невозможностью дальнейшего восстановления содержания персональных данных в информационной
                        системе персональных данных и (или) уничтожаются материальные носители персональных
                        данных.</motion.h5>

                    <motion.h2 variants={reveal} className='mx-1 my-0'>3. Оператор может обрабатывать следующие
                        персональные данные Пользователя</motion.h2>

                    <motion.h4 variants={reveal} className='mx-4 mb-1 p-0'>3.1. Фамилия, имя, отчество;</motion.h4>

                    <motion.h4 variants={reveal} className='mx-4 mb-1 p-0'>3.2. Электронный адрес;</motion.h4>

                    <motion.h4 variants={reveal} className='mx-4 mb-1 p-0'>3.3. Номера телефонов;</motion.h4>

                    <motion.h4 variants={reveal} className='mx-4 mb-1 p-0'>3.4. Адрес фактического места проживания
                        или по месту пребывания;</motion.h4>

                    <motion.h4 variants={reveal} className='mx-4 mb-0 p-0'>3.5. Также на сайте происходит сбор и
                        обработка обезличенных данных о посетителях</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>(в т.ч. файлов «cookie») с помощью сервисов
                        интернет-статистики (Яндекс Метрика и Гугл Аналитика и других).</motion.h5>

                    <motion.h4 variants={reveal} className='mx-4 mb-3 p-0'>3.6. Вышеперечисленные данные далее по
                        тексту Политики объединены общим понятием Персональные данные.</motion.h4>

                    <motion.h2 variants={reveal} className='mx-1 my-0'>4. Цели обработки персональных данных</motion.h2>

                    <motion.h4 variants={reveal} className='mx-4 mb-0 p-0'>4.1. Цель обработки персональных данных
                        Пользователя — информирование Пользователя</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>посредством отправки электронных писем;
                        осуществление отправки заказов Пользователю по месту проживания или по месту
                        пребывания.</motion.h5>

                    <motion.h4 variants={reveal} className='mx-4 mb-0 p-0'>4.2. Также Оператор имеет право
                        направлять Пользователю уведомления о новых продуктах и</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>услугах, специальных предложениях и
                        различных событиях. Пользователь всегда может отказаться от получения информационных сообщений,
                        направив Оператору письмо на адрес электронной почты «наша почта» с пометкой «Отказ от
                        уведомлений о новых продуктах и услугах и специальных предложениях».</motion.h5>

                    <motion.h4 variants={reveal} className='mx-4 mb-0 p-0'>4.3. Обезличенные данные Пользователей,
                        собранные с помощью сервисов интернет-статистики,</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'>служат для сбора информации о действиях
                        Пользователей на сайте, улучшения качества сайта и его содержания.</motion.h5>

                    <motion.h2 variants={reveal} className='mx-1 my-0'>5. Правовые основания обработки персональных
                        данных</motion.h2>

                    <motion.h4 variants={reveal} className='mx-4 mb-0 p-0'>5.1. Оператор обрабатывает персональные
                        данные Пользователя только в случае их заполнения</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'>и/или отправки Пользователем самостоятельно
                        через специальные формы, расположенные на сайте https://нашсайт/. Заполняя соответствующие
                        формы и/или отправляя свои персональные данные Оператору, Пользователь выражает свое согласие
                        с данной Политикой.</motion.h5>

                    <motion.h2 variants={reveal} className='mx-1 my-0'>6. Порядок сбора, хранения, передачи и других
                        видов обработки персональных данных</motion.h2>

                    <motion.h4 variants={reveal} className='mx-4 mb-0 p-0'>Безопасность персональных данных, которые
                        обрабатываются Оператором, обеспечивается путем</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>реализации правовых, организационных и
                        технических мер, необходимых для выполнения в полном объеме требований действующего
                        законодательства в области защиты персональных данных.</motion.h5>

                    <motion.h4 variants={reveal} className='mx-4 mb-0 p-0'>6.1. Оператор обеспечивает сохранность
                        персональных данных и принимает все возможные меры,</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>исключающие доступ к персональным данным не
                        уполномоченных лиц.</motion.h5>

                    <motion.h4 variants={reveal} className='mx-4 mb-0 p-0'>6.2. Персональные данные Пользователя
                        никогда, ни при каких условиях не будут переданы третьим</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>лицам, за исключением случаев, связанных с
                        исполнением действующего законодательства.</motion.h5>

                    <motion.h4 variants={reveal} className='mx-4 mb-0 p-0'>6.3. В случае выявления неточностей в
                        персональных данных, Пользователь может актуализировать</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>их самостоятельно, путем направления
                        Оператору уведомление на адрес электронной почты Оператора «наша почта» с пометкой
                        «Актуализация персональных данных».</motion.h5>

                    <motion.h4 variants={reveal} className='mx-4 mb-0 p-0'>6.4. Срок обработки персональных данных
                        является неограниченным. Пользователь может в любой</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'>момент отозвать свое согласие на обработку
                        персональных данных, направив Оператору уведомление посредством электронной почты на
                        электронный адрес Оператора «наша почта» с пометкой
                        «Отзыв согласия на обработку персональных данных».</motion.h5>

                    <motion.h2 variants={reveal} className='mx-1 my-0'>7. Трансграничная передача персональных
                        данных</motion.h2>

                    <motion.h4 variants={reveal} className='mx-4 mb-0 p-0'>7.1. Оператор до начала осуществления
                        трансграничной передачи персональных данных</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>обязан убедиться в том, что иностранным
                        государством, на территорию которого предполагается осуществлять передачу персональных данных,
                        обеспечивается надежная защита прав
                        субъектов персональных данных.</motion.h5>

                    <motion.h4 variants={reveal} className='mx-4 mb-0 p-0'>7.2. Трансграничная передача персональных
                        данных на территории иностранных государств, не</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'>отвечающих выше указанным требованиям,
                        может осуществляться только в случае наличия согласия в письменной форме субъекта персональных
                        данных на трансграничную передачу его
                        персональных данных и/или исполнения договора, стороной которого является субъект персональных
                        данных.</motion.h5>

                    <motion.h2 variants={reveal} className='mx-1 my-0'>8. Заключительные положения</motion.h2>

                    <motion.h4 variants={reveal} className='mx-4 mb-0 p-0'>8.1. Пользователь может получить любые
                        разъяснения по интересующим вопросам, касающимся</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>обработки его персональных данных,
                        обратившись к Оператору с помощью электронной почты «наша почта» или в социальной сети
                        instagram.com - https://www.instagram.com/unfort.4u или
                        ВКонткате - https://vk.com/unfort_4u</motion.h5>

                    <motion.h4 variants={reveal} className='mx-4 mb-0 p-0'>8.2. В данном документе будут отражены любые
                        изменения политики обработки персональных</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-1 p-0'>данных Оператором. Политика действует
                        бессрочно до замены ее новой версией.</motion.h5>

                    <motion.h4 variants={reveal} className='mx-4 mb-0 p-0'>8.3. Актуальная версия Политики в свободном
                        доступе расположена в сети Интернет по адресу</motion.h4>
                    <motion.h5 variants={reveal} className='mx-5 mb-3 p-0'>http://localhost:3000/#/privacy</motion.h5>
                </motion.div>
            </Container>
        </motion.div>
    );
}

export default PrivacyScreen;