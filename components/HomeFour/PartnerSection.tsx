import { motion } from "motion/react"

const PartnerSection = () => {
    const partners = [
        {
            image: "/assets/img/partner/partner-1.png",
            title: "Regional English Language Office"
        },
        {
            image: "/assets/img/partner/partner-2.png",
            title: "webthethao.vn"
        },
        {
            image: "/assets/img/partner/partner-3.png",
            title: "MSD United Way"
        },
        {
            image: "/assets/img/partner/partner-4.png",
            title: "Overflow"
        },
        {
            image: "/assets/img/partner/partner-5.png",
            title: "FPT"
        },
        {
            image: "/assets/img/partner/partner-6.png",
            title: "European Commission"
        },
        {
            image: "/assets/img/partner/partner-7.png",
            title: "Sport Diplomacy US Department Of State"
        },
        {
            image: "/assets/img/partner/partner-8.png",
            title: "U.S. Embassy Hanoi, Vietnam"
        }
    ]
    return (
        <section className="partner-section">
            <div className="container-fluid">
                <motion.div
                    initial={{ y: 200, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="main-wrapper partner-wrapper"
                >
                    <h2 className="title">Đồng hành cùng Thành Tuyên EDU</h2>

                    <div className="partner-list">
                        {
                            partners?.map((partner, index) => (
                                <div className="partner-item" key={index}>
                                    <img
                                        width={173}
                                        height={96}
                                        src={partner.image}
                                        alt={partner.image}
                                        title={partner.title}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default PartnerSection;