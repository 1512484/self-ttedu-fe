import { useState } from "react";
import CategorySelect from "./CategorySelect";
import { motion } from "motion/react"

const BenefitSection = () => {
    const cateList = [
        {
            id: 1,
            title: "Phụ huynh",
            image: "/assets/img/home/bene-1.png",
            items: [
                {
                    id: 1,
                    title: "Tiết kiệm thời gian",
                    description: "Tiết kiệm thời gian khi con có thể chủ động trong việc học. "
                },
                {
                    id: 2,
                    title: "Theo dõi sát sao",
                    description: "Nhận báo cáo chi tiết về tiến độ học tập của con em"
                },
                {
                    id: 3,
                    title: "Hỗ trợ học tập",
                    description: "Dễ dàng hỗ trợ con cái với lộ trình học đã được cá nhân hóa."
                }
            ]
        },
        {
            id: 2,
            title: "Học sinh",
            image: "/assets/img/home/bene-2.png",
            items: [
                {
                    id: 1,
                    title: "Linh hoạt và chủ động",
                    description: "Học mọi lúc, mọi nơi trên các thiết bị kết nối Internet."
                },
                {
                    id: 2,
                    title: "Lộ trình học cá nhân hóa",
                    description: "Chủ động học tập và nghiên cứu trước bài giảng, giúp rút ngắn thời gian học tập lên đến 50%"
                },
                {
                    id: 3,
                    title: "Tăng hứng thú học tập",
                    description: "Học sinh được toàn quyền quyết định lộ trình học phù hợp khiến cho việc học trở nên hào hứng hơn."
                },
            ]
        },
        {
            id: 3,
            title: "Giáo viên",
            image: "/assets/img/home/bene-3.png",
            items: [
                {
                    id: 1,
                    title: "Tiết kiệm thời gian",
                    description: "Tối ưu hóa quá trình chuẩn bị giáo án, giao bài tập và đánh giá kết quả."
                },
                {
                    id: 2,
                    title: "Dạy học hiệu quả",
                    description: "Giảm 70% thời gian giảng bài trên lớp, tập trung giải đáp thắc mắc cho học sinh."
                },
                {
                    id: 3,
                    title: "Quản lý học tập",
                    description: "Theo dõi kết quả học tập của học sinh nhanh chóng và chính xác."
                },
            ]
        },
        {
            id: 4,
            title: "Nhà trường",
            image: "/assets/img/home/bene-4.png",
            items: [
                {
                    id: 1,
                    title: "Quản lý toàn diện",
                    description: "Dễ dàng quản lý hoạt động giảng dạy và học tập của giáo viên và học sinh."
                },
                {
                    id: 2,
                    title: "Đánh giá chính xác",
                    description: "Nắm bắt rõ ràng điểm mạnh, điểm yếu của học sinh theo từng lớp."
                },
                {
                    id: 3,
                    title: "Nâng cao chất lượng đào tạo",
                    description: "Tận dụng tài nguyên học liệu và công nghệ để cải thiện chất lượng giảng dạy."
                },
            ]
        },
    ];

    const [activeCate, setActiveCate] = useState(cateList?.[0]);
    const [isCollapsed, setCollapsed] = useState(false);

    return (
        <section className="benefit-section">
            <div className="container-fluid">
                <motion.div
                    initial={{ y: 200, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="main-wrapper benefit-wrapper"
                >
                    <div className="left-content">
                        <div className="cate-list-wrapper">
                            <h2 className="title">
                                Lợi ích khi chọn <span>Thành Tuyên EDU</span>
                            </h2>
                            <CategorySelect
                                cateList={cateList}
                                activeCate={activeCate}
                                setActiveCate={setActiveCate}
                                isCollapsed={isCollapsed}
                                setCollapsed={setCollapsed}
                            />
                        </div>
                    </div>
                    <div className="right-content">
                        <div className="active-cate-list">
                            {
                                cateList?.map?.(cate => (
                                    <div
                                        className={`active-cate-item ${cate.id === activeCate?.id ? 'active' : ''}`}
                                        key={cate.id}
                                    >
                                        <div className="active-cate">
                                            <h4 className="active-cate-title">{cate.title}</h4>
                                            <div className="active-cate-image">
                                                <img
                                                    width={710}
                                                    height={459}
                                                    src={cate.image}
                                                    title={cate.title}
                                                    alt={cate.title}
                                                />
                                            </div>
                                            <img
                                                width={45}
                                                height={45}
                                                src="/assets/img/home/bling-orange.png"
                                                className="bling"
                                                title="Orange Bling Icon"
                                                alt="Orange Bling Icon"
                                            />
                                            <div className="bene-list">
                                                {
                                                    cate.items?.map?.(item => (
                                                        <div className="bene-item" key={item.id}>
                                                            <p className="bene-title">{item.title}</p>
                                                            <p className="bene-description">{item.description}</p>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <img
                        width={24}
                        height={24}
                        src="/assets/img/home/dot-blue.png"
                        className="dot"
                        title="Blue Dot Icon"
                        alt="Blue Dot Icon"
                    />
                </motion.div>
            </div>
        </section>
    )
}

export default BenefitSection;