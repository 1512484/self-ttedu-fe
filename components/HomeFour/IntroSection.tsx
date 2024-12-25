import IntroOutstandingItems from "./IntroOutstandingItems";
import IntroDevices from "./IntroDevices";
import { motion } from "motion/react"

const IntroSection = () => {
    return (
        <section className="intro-section">
            <div className="container-fluid">
                <div className="main-wrapper">
                    <motion.div
                        initial={{ y: 200, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="intro-container"
                    >
                        <div className="intro-wrapper">
                            <div className="left-content">
                                <div className="intro-image">
                                    <img
                                        src="/assets/img/home/intro.png"
                                        title="Intro Image"
                                        alt="Intro Image"
                                        width={464}
                                        height={'auto'}
                                    />
                                </div>
                            </div>
                            <div className="right-content">
                                <span className="subtitle">Giới thiệu</span>
                                <h2 className="title">
                                    <span>Thành Tuyên EDU </span>– Nền tảng học tập trực tuyến hiện đại
                                </h2>
                                <p className="description">Thành Tuyên EDU giúp học sinh nắm vững kiến thức trước khi lên lớp, tăng cường khả năng tự học và giảm thiểu thời gian học trên lớp.</p>
                                <img
                                    src="/assets/img/home/glitter.png"
                                    className="glitter"
                                    title="Glitter Icon"
                                    alt="Glitter Icon"
                                    width={36}
                                    height={36}
                                />
                            </div>
                        </div>
                    </motion.div>

                    <IntroOutstandingItems />

                    <IntroDevices />
                </div>
            </div>
        </section>
    )
}

export default IntroSection;