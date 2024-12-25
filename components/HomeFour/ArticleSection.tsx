import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { motion } from "motion/react"

const ArticleItem = ({ article }) => {
    return article && (
        <Link href="#" legacyBehavior>
            <a className="article-item">
                <div className="article-item-wrapper">
                    <div className="article-image">
                        <img
                            src={article.image}
                            title={article.title}
                            alt={article.title}
                        />
                    </div>
                    <div className="article-info">
                        <h4 className="article-title">{article.title}</h4>
                        <p className="article-description">{article.description}</p>
                    </div>
                </div>
            </a>
        </Link>
    )
}

const ArticleList = ({ articles, className = "" }) => {
    return (
        <div className={`${className} article-list`}>
            {
                articles?.map?.((article, index) => (
                    <ArticleItem
                        article={article}
                        key={index}
                    />
                ))
            }
        </div>
    )
}

const ArticleSwiper = ({ articles, className = "" }) => {
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
        <div className={`${className} article-swiper`}>
            <Swiper
                spaceBetween={16}
                slidesPerView={1}
                breakpoints={breakpoints}
            >
                {
                    articles?.map?.(article => (
                        <SwiperSlide key={article.id}>
                            <ArticleItem article={article} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

const ArticleSection = () => {
    const articles = [
        "/assets/img/home/article-1.png",
        "/assets/img/home/article-2.png",
        "/assets/img/home/article-3.png",
        "/assets/img/home/article-4.png",
    ].map((item, index) => ({
        id: index + 1,
        image: item,
        title: "Tiêu đề tin tức: Làm thế nào để học tốt hơn trong môi trường công nghệ hiện đại và phát triển",
        description: "Công nghệ hiện đại mang đến nhiều cơ hội học tập sáng tạo, nhưng cũng đặt ra không ít thách thức. Bài viết chia sẻ bí quyết tận dụng công nghệ để nâng cao hiệu quả học tập, từ quản lý thời gian, tìm kiếm tài liệu đến duy trì sự tập trung."
    }));

    return (
        <section className="article-section">
            <div className="container-fluid">
                <motion.div
                    initial={{ y: 200, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="main-wrapper article-wrapper"
                >
                    <div className="section-top">
                        <h2 className="title">Tin tức - Sự kiện</h2>
                        <Link href="#" legacyBehavior>
                            <a className="view-all">
                                Xem tất cả
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.5 8H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9 3.5L13.5 8L9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        </Link>
                    </div>

                    <ArticleList articles={articles} className="d-none d-md-grid" />
                    <ArticleSwiper articles={articles} className="d-block d-md-none" />
                </motion.div>
            </div>
        </section>
    )
}

export default ArticleSection;