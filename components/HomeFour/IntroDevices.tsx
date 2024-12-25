import Link from "next/link";
import { motion } from "motion/react"

const IntroDevices = () => {
    return (
        <div className="intro-devices">
            <div className="intro-container">
                <div className="intro-devices-wrapper">
                    <motion.div
                        initial={{ y: 200, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="left-content"
                    >
                        <h2 className="title">Học trên mọi thiết bị</h2>
                        <p className="description">Học tập bất cứ lúc nào, bất cứ nơi đâu với ứng dụng Thành Tuyên EDU dành cho học sinh.</p>

                        <div className="devices">
                            <Link href="#" legacyBehavior>
                                <a className="devices-item">
                                    <img
                                        src="/assets/img/home/gg-play.png"
                                        title="Google Play"
                                        alt="Google Play"
                                        width={197}
                                        height={'auto'}
                                    />
                                </a>
                            </Link>
                            <Link href="#" legacyBehavior>
                                <a className="devices-item">
                                    <img
                                        src="/assets/img/home/app-store.png"
                                        title="App Store"
                                        alt="App Store"
                                        width={198}
                                        height={'auto'}
                                    />
                                </a>
                            </Link>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ y: -200, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="right-content"
                    >
                        <img
                            src="/assets/img/home/intro-devices.png"
                            title="Intro Laptop & Mobile Screen"
                            alt="Intro Laptop & Mobile Screen"
                            width={515}
                            height={'auto'}
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default IntroDevices;