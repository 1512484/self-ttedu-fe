import { motion } from "motion/react"
import Link from "next/link";

const HeroSectionFour = () => {
    return (
        <section className="hero-section-four">
            <img
                src="/assets/img/home/hero-ellipse.png"
                className="ellipse ellipse-1"
                title="Hero Right Ellipse"
                alt="Hero Right Ellipse"
                width={854}
                height={639}
            />
            <img
                src="/assets/img/home/hero-ellipse-1.png"
                className="ellipse ellipse-2"
                title="Hero Left Ellipse"
                alt="Hero Left Ellipse"
                width={401}
                height={694}
            />
            <img
                src="/assets/img/home/hero-mobile-ellipse.png"
                className="mobile-ellipse ellipse-1"
                title="Hero Mobile Right Ellipse"
                alt="Hero Mobile Right Ellipse"
                width={188}
                height={299}
            />
            <img
                src="/assets/img/home/hero-mobile-ellipse-1.png"
                className="mobile-ellipse ellipse-2"
                title="Hero Mobile Left Ellipse"
                alt="Hero Mobile Left Ellipse"
                width={401}
                height={694}
            />
            <div className="container-fluid">
                <div className="hero-section-wrapper main-wrapper">
                    <motion.div
                        initial={{ y: -200, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="left-content"
                    >
                        <h1>
                            <span className="underlined-text">Nâng cao</span> hiệu quả học tập với
                            <span className="primary-text"> Thành Tuyên EDU</span>
                        </h1>
                        <p>Xây dựng chiến lược học tập chủ động trước khi đến lớp</p>
                        <Link href="/courses" legacyBehavior>
                            <a>
                                <button className="try-btn">
                                    Học thử ngay
                                    <div className="btn-icon">
                                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.25 12H20.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M14 5.25L20.75 12L14 18.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </button>
                            </a>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ x: 200, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="right-content"
                    >
                        <div className="image-group">
                            <img
                                src="/assets/img/home/hero-image.png"
                                className="main-image"
                                title="Hero Main Image"
                                alt="Hero Main Image"
                                width={537}
                                height={'auto'}
                            />
                            <img
                                src="/assets/img/home/glitter.png"
                                className="image glitter"
                                title="Glitter Icon"
                                alt="Glitter Icon"
                                width={28}
                                height={28}
                            />
                            <img
                                src="/assets/img/home/dot-blue.png"
                                className="image dot"
                                title="Dot Icon"
                                alt="Dot Icon"
                                width={16}
                                height={16}
                            />
                            <img
                                src="/assets/img/home/bling-purple.png"
                                className="image bling"
                                title="Purple Bling Icon"
                                alt="Purple Bling Icon"
                                width={26}
                                height={27}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default HeroSectionFour;