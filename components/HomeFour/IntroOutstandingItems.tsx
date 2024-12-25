import { motion } from "motion/react"

const IntroOutstandingItems = () => {
    const items = [
        {
            icon: "/assets/img/home/intro-item-1.png",
            title: "1,000,000+",
            description: "Nội dung học tập theo chuẩn kiến thức trên trường"
        },
        {
            icon: "/assets/img/home/intro-item-2.png",
            title: "10,000+",
            description: "Video bài giảng từ các giáo viên hàng đầu"
        },
        {
            icon: "/assets/img/home/intro-item-3.png",
            title: "Dễ sử dụng",
            description: "Được xây dựng với giao diện thân thiện, giúp học sinh nhanh chóng làm quen"
        },
        {
            icon: "/assets/img/home/intro-item-4.png",
            title: "Cá nhân hóa",
            description: "Học sinh được tự do lựa chọn thời gian học tập giúp tăng tính tự giác"
        },
    ];
    return (
        <div className="intro-container">
            <div className="intro-outstanding-items">
                {
                    items.map((item, index) =>
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.1 * index }}
                            viewport={{ once: true }}
                            className="intro-outstanding-item"
                            key={index}
                        >
                            <img
                                src={item.icon}
                                title={item.title}
                                alt={item.title}
                                width={48}
                                height={48}
                            />
                            <h4 className="title">{item.title}</h4>
                            <p className="description">{item.description}</p>
                        </motion.div>
                    )
                }
            </div>
        </div>
    )
}

export default IntroOutstandingItems;