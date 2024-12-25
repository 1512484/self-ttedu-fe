import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, } from 'swiper';
import DOMPurify from 'isomorphic-dompurify';

// Import Swiper styles
import 'swiper/css/bundle'
import { ITestimonial } from '../../../interfaces/testimonial';
import getImage from '../../../helpers/getImage';

const TestimonialSliderThree = () => {

    //for rating handle
    const getRating = (rating: any) => {
        let empty_rating_count = 5 - rating;
        let ratings = [];
        for (let i = 0; i < rating; i++) {
            ratings.push(<i className="fas fa-star" key={`s-${i}`}></i>)
        }
        for (let i = 0; i < empty_rating_count; i++) {
            ratings.push(<i className="far fa-star" key={`e-${i}`}></i>)
        }
        return ratings;
    }
    //for rating handle

    interface iTestimonialType {
        home_01_section_title : string;
        testimonials: []
     };
     const [dataTestimonial, setDataTestimonial] = useState<iTestimonialType>()

    interface iDataType {
        home_01_section_title : string;
        home_03_insta_images_titles_feedback_title: string;
        testimonials: []
     };
     const [data, setData] = useState<iDataType>()

    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/home-01/testimonial`,
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
                setDataTestimonial(response.data);
            })
            .catch(err => console.error(err))

        fetch(
            `${process.env.APP_BACK_END_URL}/setting/home-03/insta-images-more-titles`,
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

    return typeof dataTestimonial?.home_01_section_title !== 'undefined' ? (
        <div className="feedback-wrapper">
            {data?.home_03_insta_images_titles_feedback_title && (
                <div className="section-title mb-45">
                    <h2>{data?.home_03_insta_images_titles_feedback_title}</h2>
                </div>
            )}

            <div className="feedback-active">
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                    spaceBetween={30}
                    loop={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: true
                    }}
                    breakpoints={{
                        320: {
                           slidesPerView: 1
                        }
                     }}
                >
                    {dataTestimonial?.testimonials && dataTestimonial?.testimonials.map((testimonialItem: ITestimonial, index: number) => (
                        <SwiperSlide key={index +'-'+ testimonialItem.name}>
                            <div className="testimonial-items position-relative feedback-items">
                                <div className="testimonial-header">
                                    <div className="testimonial-img">
                                        <img src={getImage(testimonialItem.profile_img)} alt="img not found" />
                                    </div>
                                    <div className="testimonial-title">
                                        <h4>{testimonialItem.name}</h4>
                                        <span>{testimonialItem.designation}</span>
                                    </div>
                                </div>
                                <div className="testimoni-quotes">
                                    <img src="assets/img/testimonial/quotes.png" alt="img not found" />
                                </div>
                                <div className="testimonial-body">
                                    <h3>{testimonialItem.title}</h3>
                                    <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(testimonialItem.message) }} />
                                </div>
                                <div className="testimonial-icon">
                                    {getRating(testimonialItem.rating)}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    ) : null
};

export default TestimonialSliderThree;
