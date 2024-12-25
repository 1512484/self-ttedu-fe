import { useState } from "react";
// import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
// import 'swiper/css/navigation';
import CategorySelect from "./CategorySelect";
import Link from "next/link";
import { motion } from "motion/react"

const CourseItem = ({ course }) => {
    return (
        <div className="course-item">
            <svg width="259" height="244" viewBox="0 0 259 244" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="330.94" y="-109.822" width="53.6667" height="322" transform="rotate(48.949 330.94 -109.822)" fill="currentColor" />
                <rect x="353.117" y="119.94" width="53.6667" height="322" transform="rotate(138.949 353.117 119.94)" fill="currentColor" />
                <rect x="390.004" y="-1.13867" width="53.6667" height="322" transform="rotate(93.949 390.004 -1.13867)" fill="currentColor" />
                <rect width="53.6667" height="322" transform="matrix(-0.997626 -0.0688683 -0.0688683 0.997626 266.648 -142.789)" fill="currentColor" />
            </svg>

            <p className="course-title">{course.title}</p>
            <p className="course-description">{course.description}</p>
            <div className="course-detail">
                <div className="course-detail-item">
                    <span>Số buổi</span>
                    <span>30 buổi</span>
                </div>
                <div className="course-detail-item">
                    <span>Lịch học</span>
                    <span>3 buổi/tuần</span>
                </div>
                <div className="course-detail-item">
                    <span>Thời lượng</span>
                    <span>120p/buổi</span>
                </div>
            </div>
            <Link href="#" legacyBehavior>
                <a>
                    <button className="course-detail-btn">
                        Tìm hiểu thêm
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.5 8H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 3.5L13.5 8L9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </a>
            </Link>
        </div>
    )
}

const ActiveCourseCateList = ({
    cateList,
    activeCate
}) => {
    const breakpoints = {
        // when window width is >= 320px
        320: {
            slidesPerView: 1.2,
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 1.5,
        },
        // when window width is >= 700px
        700: {
            slidesPerView: 2.0,
        },
        // when window width is >= 870px
        870: {
            slidesPerView: 3.0,
        },
        // when window width is >= 992px
        992: {
            slidesPerView: 3.0,
            spaceBetween: 24
        }
    };
    return (
        <div className="active-cate-list">
            {
                cateList?.map?.(cate => (
                    <div
                        className={`active-cate-item ${cate.id === activeCate?.id ? 'active' : ''}`}
                        key={cate.id}
                    >
                        <div className="active-cate">
                            <div className="course-swiper">
                                <Swiper
                                    spaceBetween={16}
                                    slidesPerView={1}
                                    breakpoints={breakpoints}
                                >
                                    {
                                        cate.items?.map?.(course => (
                                            <SwiperSlide key={course.id}>
                                                <CourseItem course={course} />
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

const CourseSection = () => {
    const cateList = [
        "Trung học phổ thông",
        "Trung học cơ sở",
        "Tiểu học"
    ].map((title, index) => ({
        id: index + 1,
        title,
        items: Array.from(Array(3), (_, index) => ({
            id: index + 1,
            title: "Chương trình học IELTS nâng cao",
            description: "Chương trình học IELTS Nâng Cao được thiết kế dành cho những học viên đã có nền tảng vững chắc và mong muốn đạt điểm số cao trong kỳ thi IELTS. Khóa học tập trung vào chiến lược làm bài chuyên sâu, phát triển kỹ năng tư duy học thuật và cải thiện toàn diện 4 kỹ năng Nghe, Nói, Đọc, Viết",
        }))
    }));

    const [activeCate, setActiveCate] = useState(cateList?.[0]);
    const [isCollapsed, setCollapsed] = useState(false);

    return (
        <section className="course-section">
            <motion.div
                initial={{ y: -200, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="container-fluid"
            >
                <div className="bg-layout d-none d-md-flex">
                    <Link href="/courses" legacyBehavior>
                        <a className="arrow-btn">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 16H27" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M18 7L27 16L18 25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </Link>
                </div>
                <div className="main-wrapper course-wrapper">
                    <h2 className="title">Chương trình học</h2>
                    <CategorySelect
                        cateList={cateList}
                        activeCate={activeCate}
                        setActiveCate={setActiveCate}
                        isCollapsed={isCollapsed}
                        setCollapsed={setCollapsed}
                        isTab
                    />
                    <ActiveCourseCateList
                        cateList={cateList}
                        activeCate={activeCate}
                    />
                </div>
            </motion.div>
        </section>
    )
}

export default CourseSection;