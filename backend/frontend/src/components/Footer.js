import React, {useEffect} from 'react';
import {Nav, Container, Row, Col, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

import {useNavigate} from "react-router-dom";

import {motion} from "framer-motion";
import {animationStart, reveal} from "../utils/animation";


function Footer() {
    const navigate = useNavigate()

    const w = window.innerWidth

    const email = 'unfort@email.com'

    const about = () => {
        navigate('/about')
    }

    const support = () => {
        navigate('/support')
    }

    const delivery = () => {
        navigate('/delivery')
    }

    const reTurn = () => {
        navigate('/return')
    }

    const contract = () => {
        navigate('/contract')
    }

    const privacy = () => {
        navigate('/privacy')
    }

    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const emailHoverHandler = () => {
        const element = document.getElementById("channel-link"),
            text = element && element?.innerText.split("");

        if (element) {
            element.innerText = "";
        }

        text && text.forEach((value, index) => {
            const outer = document.createElement("span");

            outer.className = "outer";

            const inner = document.createElement("span");

            inner.className = "inner";

            inner.style.animationDelay = `${rand(-5000, 0)}ms`;

            const letter = document.createElement("span");

            letter.className = "letter";

            letter.innerText = value;

            letter.style.animationDelay = `${index * 1000 }ms`;

            inner.appendChild(letter);

            outer.appendChild(inner);

            element.appendChild(outer);
        });
    }

    const unfortFooterHoverHandler = () => {
        const element = document.getElementById("unfort-link-footer"),
            text = element && element?.innerText.split("");

        if (element) {
            element.innerText = "";
        }

        text && text.forEach((value, index) => {
            const outer = document.createElement("span");

            outer.className = "outer";

            const inner = document.createElement("span");

            inner.className = "inner";

            inner.style.animationDelay = `${rand(-5000, 0)}ms`;

            const letter = document.createElement("span");

            letter.className = "letter";

            letter.innerText = value;

            letter.style.animationDelay = `${index * 1000 }ms`;

            inner.appendChild(letter);

            outer.appendChild(inner);

            element.appendChild(outer);
        });
    }

    const unfortHeaderHoverHandler = () => {
        const element = document.getElementById("unfort-link-header"),
            text = element && element?.innerText.split("");

        if (element) {
            element.innerText = "";
        }

        text && text.forEach((value, index) => {
            const outer = document.createElement("span");

            outer.className = "outer";

            const inner = document.createElement("span");

            inner.className = "inner";

            inner.style.animationDelay = `${rand(-5000, 0)}ms`;

            const letter = document.createElement("span");

            letter.className = "letter";

            letter.innerText = value;

            letter.style.animationDelay = `${index * 1000 }ms`;

            inner.appendChild(letter);

            outer.appendChild(inner);

            element.appendChild(outer);
        });
    }

    useEffect(() => {
        emailHoverHandler()
        unfortFooterHoverHandler()
        unfortHeaderHoverHandler()
    })

    return (
        <footer className="bg-black unfort-footer">
            <Navbar variant="dark" className="unfort-footer-nav">
                <motion.div
                    id='footer-d'
                    variants={reveal}
                    initial='hiddenVariantX'
                    animate='revealedVariantX'
                    transition={{
                        ease: 'easeIn',
                        type: 'spring',
                        staggerChildren: .25,
                        duration: 1,
                        delayChildren: animationStart
                    }}
                >
                    <div className="line" id='unf-logo'>
                        <LinkContainer to='/' style={{color: "white"}}>
                            <Nav.Link>
                                <svg width="200" height="2.5rem" viewBox="0 0 443 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M55.5302 0.720723H69.254V18.2883C69.254 21.5616 67.7732 24.4595 64.8116 26.982C61.9029 29.5045 57.8836 31.4715 52.7536 32.8829C47.6237 34.2943 41.8856 35 35.5393 35C29.193 35 23.2962 34.2943 17.849 32.8829C12.4546 31.4715 8.14442 29.5045 4.91838 26.982C1.69235 24.4294 0.0528859 21.5465 0 18.3333V0.720723H13.8032V18.6486C13.8032 21.0811 15.0196 23.033 17.4523 24.5045C19.8851 25.976 22.7674 27.027 26.0992 27.6577C29.431 28.2583 32.6041 28.5586 35.6186 28.5586C38.3687 28.5586 41.2774 28.2583 44.3448 27.6577C47.4122 27.027 50.03 25.976 52.1983 24.5045C54.4195 23.033 55.5302 21.0811 55.5302 18.6486V0.720723ZM92.317 34.0541H78.9105V0.720723L92.317 34.0541ZM134.917 24.3694V0.720723H148.324V34.0541H134.917L92.317 10.3604V34.0541H78.9105V0.720723H92.317L134.917 24.3694ZM218.561 0.720723V6.84685H171.916V13.6036H211.898V19.5045H171.916V34.0541H158.509V0.720723H218.561ZM256.582 0C263.458 0 269.645 0.750753 275.145 2.25225C280.698 3.75376 285.035 5.84084 288.155 8.51351C291.275 11.1862 292.836 14.1892 292.836 17.5225C292.836 20.8258 291.275 23.7988 288.155 26.4414C285.035 29.0841 280.725 31.1712 275.225 32.7027C269.724 34.2042 263.537 34.955 256.662 34.955C249.998 34.955 243.863 34.2042 238.257 32.7027C232.651 31.1712 228.209 29.0841 224.93 26.4414C221.651 23.7688 220.012 20.7958 220.012 17.5225C220.012 14.2192 221.651 11.2312 224.93 8.55856C228.209 5.88589 232.625 3.7988 238.178 2.2973C243.784 0.765768 249.919 0 256.582 0ZM256.582 28.7387C260.443 28.7387 264.092 28.3033 267.53 27.4324C270.967 26.5616 273.744 25.2853 275.859 23.6036C277.975 21.8919 279.032 19.8649 279.032 17.5225C279.032 15.2102 277.948 13.1982 275.78 11.4865C273.664 9.77478 270.862 8.46847 267.371 7.56757C263.933 6.66667 260.284 6.21622 256.424 6.21622C252.299 6.21622 248.517 6.66667 245.08 7.56757C241.695 8.46847 238.998 9.75976 236.988 11.4414C234.978 13.1231 233.974 15.1201 233.974 17.4324C233.974 19.8048 235.005 21.8468 237.067 23.5586C239.183 25.2402 241.959 26.5315 245.397 27.4324C248.835 28.3033 252.563 28.7387 256.582 28.7387ZM351.503 33.964L336.986 20.6579H314.219V33.964H301.88V0.630633H342.539C347.457 0.630633 354.884 1.25187 355.288 1.31579C358.247 1.78454 360.669 2.83717 360.669 2.83717C360.669 2.83717 364.173 4.88644 365.108 6.25822C366.185 7.83717 366.185 9.62068 366.185 10.5263C366.185 11.432 365.996 12.9688 365.108 14.4161C364.301 15.7319 362.687 16.6758 360.669 17.7056C358.651 18.7353 354.212 19.9424 349.234 20.6579L366.723 33.964H351.503ZM352.732 10.5263C352.732 9.15296 352.292 8.44637 351.503 7.83717C350.31 6.91612 348.561 6.53858 346.544 6.25822C344.526 5.97787 342.777 5.86349 340.624 5.86349C331.823 5.86349 323.021 5.78947 314.219 5.78947V14.7368H340.624C343.798 14.7368 344.826 14.6746 346.544 14.4161C348.292 14.153 350.176 13.7582 351.503 12.9688C352.328 12.1793 352.732 11.8997 352.732 10.5263ZM375.043 7.07207L373.315 0.720723H443L375.043 7.07207ZM443 0.720723V7.20721H414.48V34.0541H401.835V7.20721H373.315V0.720723H443Z" fill="white"/>
                                </svg>
                            </Nav.Link>
                        </LinkContainer>
                        <div><strong>&copy;</strong> UNFORT, 2022</div>
                    </div>
                </motion.div>
                <motion.div
                    id='footer-d'
                    variants={reveal}
                    initial='hiddenVariantX'
                    animate='revealedVariantX'
                    transition={{
                        ease: 'easeIn',
                        type: 'spring',
                        staggerChildren: .25,
                        duration: 1,
                        delayChildren: animationStart
                    }}
                >
                    <div className='info-links'>
                        <motion.div variants={reveal} className='footer-h'>
                            FOR U
                        </motion.div>
                        <motion.div variants={reveal}>
                            <LinkContainer className="text-center" to='/support' onClick={support}>
                                <Nav.Link className="cursor">SUPPORT</Nav.Link>
                            </LinkContainer>
                        </motion.div>
                        <motion.div variants={reveal}>
                            <LinkContainer className="text-center" to='/delivery' onClick={delivery}>
                                <Nav.Link className="cursor">DELIVERY</Nav.Link>
                            </LinkContainer>
                        </motion.div>
                        <motion.div variants={reveal}>
                            <LinkContainer className="text-center" to='/return' onClick={reTurn}>
                                <Nav.Link className="cursor">RETURN</Nav.Link>
                            </LinkContainer>
                        </motion.div>
                    </div>
                </motion.div>
                <motion.div
                    id='footer-d'
                    variants={reveal}
                    initial='hiddenVariantX'
                    animate='revealedVariantX'
                    transition={{
                        ease: 'easeIn',
                        type: 'spring',
                        staggerChildren: .25,
                        duration: 1,
                        delayChildren: animationStart
                    }}
                >
                    <div className='info-links'>
                        <motion.div variants={reveal} className='footer-h'>
                            INFO
                        </motion.div>
                        <motion.div variants={reveal}>
                            <LinkContainer className="text-center" to='/about' onClick={about}>
                                <Nav.Link className="cursor">ABOUT US</Nav.Link>
                            </LinkContainer>
                        </motion.div>
                        <motion.div variants={reveal}>
                            <LinkContainer className="text-center" to='/contract' onClick={contract}>
                                <Nav.Link className="cursor">CONTRACT OFFER</Nav.Link>
                            </LinkContainer>
                        </motion.div>
                        <motion.div variants={reveal}>
                            <LinkContainer className="text-center" to='/privacy' onClick={privacy}>
                                <Nav.Link className="cursor">PRIVACY POLICY</Nav.Link>
                            </LinkContainer>
                        </motion.div>
                    </div>
                </motion.div>
                <motion.div
                    id='footer-d'
                    variants={reveal}
                    initial='hiddenVariantX'
                    animate='revealedVariantX'
                    transition={{
                        ease: 'easeIn',
                        type: 'spring',
                        staggerChildren: .25,
                        duration: 1,
                        delayChildren: animationStart
                    }}
                >
                    <div className='info-links'>
                        <motion.div variants={reveal} className='footer-h d-flex justify-content-center'>
                            SOCIALS
                        </motion.div>
                        <div id='socials-d'>
                            <motion.div variants={reveal}>
                                <a href="https://vk.com/unfort_4u" target='_blank'
                                   className='text-center cursor footer-vk nav-link'>
                                    <svg id='vk' width="35" height="35" viewBox="0 0 1000 1000" fill="white" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M531.276 1000C510.443 1000 489.609 1000 468.776 1000C466.641 999.452 464.505 998.539 462.318 998.383C419.948 995.383 378.438 987.584 338.62 972.82C157.005 905.548 46.823 776.717 7.91677 587.11C4.14073 568.746 2.57813 549.939 0 531.315C0 510.474 0 489.658 0 468.817C0.572917 465.974 1.22391 463.156 1.74475 460.313C7.44787 428.386 10.5729 395.728 19.1927 364.61C106.328 50.6574 467.448 -96.3805 750.599 68.0296C884.062 145.526 964.271 262.776 992.474 414.874C995.781 432.716 997.526 450.845 1000 468.817C1000 489.006 1000 509.169 1000 529.359C999.427 532.489 998.776 535.593 998.333 538.749C995.625 558.365 993.906 578.189 990.13 597.596C951.198 798.863 788.307 957.9 586.068 992.279C567.917 995.409 549.557 997.47 531.276 1000ZM542.266 442.211C542.682 442.185 543.099 442.185 543.49 442.159C543.49 425.934 544.297 409.631 543.255 393.459C542.318 379.269 535.599 372.122 521.771 371.626C493.854 370.609 465.885 370.635 437.969 371.392C431.823 371.548 424.974 375.591 419.922 379.66C412.057 385.999 413.568 390.251 423.438 392.963C435.729 396.328 442.761 404.91 443.464 417.457C443.932 425.908 445.026 434.385 444.635 442.785C443.802 460.913 443.099 479.12 440.625 497.066C438.906 509.404 431.953 511.1 422.266 502.857C418.333 499.518 414.792 495.579 411.641 491.51C390.26 463.782 373.229 433.551 360.469 400.945C355.286 387.694 346.042 381.512 332.136 381.434C310 381.356 287.865 381.043 265.729 381.095C251.354 381.121 246.458 388.738 252.344 402.067C259.193 417.509 266.302 432.846 273.646 448.054C297.865 498.344 325.964 546.34 362.318 588.831C404.87 638.548 459.714 659.676 524.792 654.668C535.234 653.86 541.354 648.251 543.255 637.844C544.714 629.836 545.287 621.645 547.292 613.82C549.557 605.056 548.724 593.5 559.948 590.344C570.755 587.292 577.214 596.265 583.75 602.76C595.729 614.707 606.979 627.358 618.802 639.461C629.01 649.895 641.719 655.659 656.276 655.972C679.688 656.468 703.151 656.729 726.563 656.181C748.099 655.686 756.432 640.113 744.479 622.428C735.781 609.542 726.016 597.204 715.625 585.649C703.437 572.111 689.974 559.773 677.214 546.757C666.302 535.619 665.755 530.089 673.776 516.551C675.937 512.925 678.385 509.456 680.885 506.065C696.641 484.546 713.047 463.443 727.995 441.376C735.911 429.664 742.266 416.622 747.63 403.501C753.255 389.729 748.906 383.834 733.854 381.747C730.339 381.251 726.719 381.277 723.151 381.277C701.016 381.225 678.88 381.251 656.745 381.251C634.766 381.251 633.255 382.164 625.052 402.51C610.729 438.115 591.719 470.877 565.651 499.205C562.526 502.596 556.406 506.3 552.839 505.387C549.349 504.474 545.495 498.005 545.078 493.649C543.438 476.616 543.099 459.374 542.266 442.211Z" fill="white"/>
                                    </svg>
                                </a>
                            </motion.div>
                            <motion.div variants={reveal}>
                                <a href="https://t.me/unfort_4u" target='_blank'
                                   className='text-center cursor footer-telegram nav-link'>
                                    <svg id='telegram' width="35" height="35" viewBox="0 0 1000 1000" fill="white" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M468.776 0C489.609 0 510.443 0 531.276 0C533.776 0.546875 536.276 1.19793 538.776 1.64064C569.792 6.97918 601.38 10.026 631.719 17.9687C816.719 66.4583 961.51 225.964 992.396 413.828C995.391 432.057 997.5 450.443 1000 468.75C1000 489.583 1000 510.417 1000 531.25C999.453 533.75 998.568 536.25 998.385 538.802C991.745 624.87 965.156 704.297 916.823 775.755C837.136 893.568 727.161 966.12 587.083 992.24C568.646 995.677 549.87 997.448 531.25 1000C510.417 1000 489.583 1000 468.75 1000C466.589 999.479 464.427 998.62 462.24 998.464C375.495 991.875 295.469 965.13 223.516 916.302C106.146 836.615 33.8021 726.875 7.78643 587.161C4.34893 568.698 2.55208 549.922 0 531.276C0 510.443 0 489.609 0 468.776C2.23958 451.745 3.95832 434.609 6.8229 417.708C24.3489 314.323 69.7135 224.818 143.177 150.104C218.099 73.9063 308.385 26.0937 413.88 7.70831C432.083 4.50519 450.469 2.52604 468.776 0ZM493.229 658.49C496.172 660.547 498.88 662.37 501.458 664.271C538.385 691.458 575.261 718.698 612.214 745.885C638.88 765.495 657.266 758.542 664.115 726.38C689.375 607.526 714.766 488.698 739.766 369.766C743.021 354.297 745.964 338.385 745.912 322.708C745.86 306.719 732.031 298.177 716.38 301.849C712.292 302.813 708.307 304.323 704.375 305.833C589.219 350.234 474.089 394.661 358.958 439.115C313.516 456.667 268.021 474.089 222.734 492.031C213.724 495.599 203.333 500.651 203.932 512.031C204.531 523.672 215.755 526.406 225.052 529.349C262.187 541.12 299.479 552.474 336.562 564.453C343.776 566.771 349.193 565.99 355.547 561.979C445.391 505.156 535.365 448.542 625.365 391.927C630.026 388.984 634.714 385.677 639.87 384.089C643.281 383.021 647.552 384.714 651.458 385.156C649.792 388.047 648.568 391.354 646.38 393.776C642.917 397.63 638.802 400.911 634.948 404.401C564.688 467.865 494.479 531.38 424.063 594.661C418.542 599.635 416.042 604.74 415.859 612.188C415.469 626.484 413.958 640.729 412.969 655.026C411.302 679.297 409.687 703.568 408.021 728.099C418.281 729.011 425 724.245 431.198 718.281C451.771 698.411 472.396 678.568 493.229 658.49Z" fill="white"/>
                                    </svg>
                                </a>
                            </motion.div>
                            <motion.div variants={reveal}>
                                <a href="https://instagram.com/unfort.4u"
                                   target='_blank'
                                   className='text-center cursor footer-instagram nav-link'>
                                    <svg id='instagram' width="35" height="35" viewBox="0 0 1000 1000" fill="white" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M530.332 999.96C509.531 999.96 488.73 999.96 467.93 999.96C455.742 998.456 443.535 997.147 431.387 995.429C339.316 982.343 256.582 947.245 184.707 888.143C89.2969 809.706 29.8633 709.608 7.75391 587.85C4.39453 569.393 2.53906 550.683 0 532.069C0 511.268 0 490.487 0 469.686C3.16406 447.89 5.46875 425.936 9.58984 404.335C50.5664 190.019 233.086 24.1013 450.078 4.12082C556.66 -5.68386 658.008 13.3982 749.316 69.6677C927.988 179.804 1010.8 341.483 995.352 550.819C988.047 649.843 949.57 738.261 886.563 815.097C808.203 910.663 707.91 969.999 586.094 992.167C567.637 995.585 548.926 997.421 530.332 999.96ZM210.996 501.151C212.793 548.573 212.871 596.405 216.816 643.925C222.871 716.542 273.555 770.995 345.41 781.229C381.563 786.366 418.555 787.03 455.176 787.03C517.188 787.03 579.375 787.304 641.172 782.948C698.496 778.905 742.09 749.53 767.305 696.366C778.32 673.163 783.242 648.202 783.613 622.714C784.629 555.487 785.215 488.241 785.254 420.995C785.273 399.921 783.789 378.768 781.66 357.792C774.219 284.999 724.941 231.034 652.773 220.565C616.973 215.37 580.273 214.784 543.984 214.784C481.641 214.804 419.141 214.491 357.012 218.749C279.512 224.081 223.164 281.268 216.719 358.69C212.793 405.878 212.773 453.397 210.996 501.151Z" fill="white"/>
                                        <path d="M263.242 500.022C264.492 456.858 264.648 413.635 267.246 370.55C270.859 310.628 308.828 270.979 368.73 269.397C455.352 267.112 542.109 267.053 628.73 269.358C689.922 270.999 729.043 310.237 730.703 371.721C733.027 458.323 732.91 545.081 730.605 631.702C729.043 690.901 689.141 729.339 629.941 732.717C542.656 737.717 455.254 737.737 367.988 732.698C308.848 729.28 271.602 690.842 266.992 631.507C266.465 624.71 265.508 617.913 265.488 611.116C265.332 574.085 265.41 537.073 265.41 500.042C264.707 500.042 263.984 500.022 263.242 500.022ZM499.238 647.952C580.449 647.854 645.898 582.522 646.191 501.253C646.484 419.788 580.527 353.733 498.984 353.85C417.734 353.948 352.305 419.26 352.012 500.53C351.738 581.936 417.734 648.05 499.238 647.952ZM651.699 382.132C671.035 382.288 686.426 367.092 686.406 347.854C686.387 329.026 671.348 313.85 652.539 313.675C633.203 313.499 617.871 328.675 617.891 347.991C617.93 366.897 632.852 381.975 651.699 382.132Z" fill="white"/>
                                        <path d="M594.627 501.122C594.529 553.622 551.677 596.376 499.138 596.395C446.248 596.415 403.299 553.153 403.611 500.184C403.904 447.782 447.029 405.184 499.588 405.399C552.107 405.614 594.724 448.563 594.627 501.122Z" fill="white"/>
                                    </svg>
                                </a>
                            </motion.div>
                            <motion.div variants={reveal}>
                                <a href="https://www.tiktok.com/@unfort.4u?_t=8f00u29wiBe&_r=1"
                                   target='_blank'
                                   className='text-center cursor footer-tiktok nav-link'>
                                    <svg id='tiktok' width="35" height="35" viewBox="0 0 1000 1000" fill="white" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M470.691 0C490.873 0 511.054 0 531.236 0C533.736 0.546861 536.21 1.40618 538.762 1.58846C613.864 7.23936 684.461 28.2284 749.173 66.717C882.138 145.803 963.673 261.478 992.318 413.817C995.729 431.968 997.474 450.405 1000 468.738C1000 488.92 1000 509.101 1000 529.283C999.427 532.408 998.776 535.533 998.333 538.684C995.625 558.319 993.906 578.136 990.13 597.562C951.251 798.833 788.313 957.918 586.078 992.318C567.902 995.417 549.543 997.448 531.262 1000C510.429 1000 489.597 1000 468.764 1000C466.628 999.453 464.493 998.542 462.306 998.385C419.937 995.365 378.428 987.578 338.611 972.813C157.001 905.549 46.8216 776.698 7.9164 587.042C4.14046 568.683 2.57806 549.855 0 531.236C0 510.403 0 489.571 0 468.738C2.52598 450.431 4.53114 432.046 7.65606 413.869C42.2906 211.453 201.141 48.7227 402.307 9.86956C424.885 5.49467 447.879 3.22908 470.691 0ZM456.707 425.119C419.624 426.864 384.495 433.452 352.908 452.853C285.644 494.154 259.16 569.308 283.56 648.368C314.341 748.053 421.031 792.74 510.195 742.22C571.469 707.508 600.974 652.483 603.187 583.162C604.88 529.517 604.047 475.795 604.307 422.098C604.333 418.348 604.307 414.599 604.307 409.13C642.639 430.978 680.139 449.051 725.268 444.181C725.268 419.026 724.981 394.677 725.424 370.355C725.58 362.543 723.263 360.095 715.294 359.053C665.165 352.543 629.645 326.814 612.953 278.066C608.448 264.941 605.661 251.217 601.911 237.129C574.386 237.129 546.262 237.129 517.304 237.129C517.122 241.14 516.783 244.629 516.81 248.119C517.018 354.861 517.643 461.576 517.122 568.318C517.044 586.261 513.945 604.724 508.867 621.937C501.523 646.806 485.847 665.504 459.077 672.092C420.301 681.597 381.318 662.274 365.016 625.531C346.918 584.75 367.412 541.496 412.958 525.507C427.255 520.481 442.072 516.966 456.707 512.747C456.707 483.581 456.707 454.78 456.707 425.119Z" fill="white"/>
                                    </svg>
                                </a>
                            </motion.div>
                        </div>
                        <div style={{height: '3rem', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: "row"}}>
                            <div className="line">
                                <a
                                    id="channel-link"
                                    href='mailto:support@unfort.ru'
                                    target="_blank"
                                    className="word fancy mailto"
                                >
                                    support@unfort
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Navbar>
        </footer>
    );
}

export default Footer;