import React, { useEffect, useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import DOMPurify from 'isomorphic-dompurify';

// Import Swiper styles
import 'swiper/css/bundle';
import Link from 'next/link';
import { ICategory } from '../../../interfaces/category';
import { v4 as uuidv4 } from 'uuid';
import getImage from '../../../helpers/getImage';

const CategorySlider = () => {
    const [data, setData] = useState<ICategory>()

    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/home-02/categories`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            }
        )
            .then(response => response.json())
            .then((response) => {
                setData(response.data);
            })
            .catch(err => console.error(err))
    }, [])

    return typeof data?.title !== 'undefined' ? (
        <>
            {data && (
                <div className="categories-area grey-2 pt-110 position-relative">
                    <div className="category-shap-02">
                        <img src="assets/img/shape/categorey-shap-02.png" alt="image not found" />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center mb-20">
                                <div className="section-title mb-30">
                                    <h2 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.title) }} />
                                </div>
                            </div>
                            <div>
                                <div className="category-main-wrapper position-relative">
                                    <div className="category-shap-01">
                                        <img src="assets/img/shape/categorey-shap-01.png" alt="image not found" />
                                    </div>
                                    <div>
                                        <div className="category-slide-wrapper position-relative">
                                            <div className="category-active">
                                                <div>
                                                    <Swiper
                                                        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                                                        spaceBetween={30}
                                                        loop={true}
                                                        breakpoints={{
                                                            320: {
                                                                slidesPerView: 1
                                                            },
                                                            480: {
                                                                slidesPerView: 1
                                                            },
                                                            640: {
                                                                slidesPerView: 2
                                                            },
                                                            991: {
                                                                slidesPerView: 3
                                                            },
                                                            1200: {
                                                                slidesPerView: 3
                                                            },
                                                            1400: {
                                                                slidesPerView: 5
                                                            }
                                                        }}
                                                        autoplay={{
                                                            delay: 3000,
                                                            disableOnInteraction: true
                                                        }}
                                                        navigation={{
                                                            nextEl: '.category-button-next',
                                                            prevEl: '.category-button-prev'
                                                        }}
                                                    >
                                                        {data.items && data.items.map((categoryItem: ICategory) => (
                                                            <SwiperSlide key={uuidv4()}>
                                                                <Link href={categoryItem.url ?? ""} legacyBehavior><a>
                                                                    <div className="categories-wrapper text-center">
                                                                        <div className="categiories-thumb">
                                                                            <img src={getImage(categoryItem.image)} alt="img not found" />
                                                                        </div>
                                                                        <div className="categories-content">
                                                                            <h4>{categoryItem.title}</h4>
                                                                            <p>{categoryItem.subtitle}</p>
                                                                        </div>
                                                                    </div>
                                                                </a></Link>
                                                            </SwiperSlide>
                                                        ))}
                                                    </Swiper>
                                                </div>
                                            </div>

                                            <div className="category-nav">
                                                <div className="category-button-prev"><i className="far fa-long-arrow-left"></i></div>
                                                <div className="category-button-next"><i className="far fa-long-arrow-right"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    ) : null
};

export default CategorySlider;