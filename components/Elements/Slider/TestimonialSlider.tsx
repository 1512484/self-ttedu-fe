import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, } from 'swiper';
import DOMPurify from 'isomorphic-dompurify';

// Import Swiper styles
import 'swiper/css/bundle'
import { ITestimonial } from '../../../interfaces/testimonial';
import getImage from '../../../helpers/getImage';

const TestimonialSlider = () => {
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

   interface iDataType {
      home_01_section_title : string;
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
            setData(response.data);
         })
         .catch(err => console.error(err))
   }, [])

   return typeof data?.home_01_section_title !== 'undefined' ? (
      <div className="testimonial-area pb-120">
         <div className="container">
            <div className="row">
               <div className="col-lg-6 offset-lg-3">
                  {data.home_01_section_title && (
                     <div className="section-title text-center mb-55">
                        <h2 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.home_01_section_title) }} />
                     </div>
                  )}
               </div>
            </div>
            <div className="testimonial-active">
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
                           slidesPerView: 1
                        },
                        991: {
                           slidesPerView: 2
                        },
                        1200: {
                           slidesPerView: 3
                        },
                        1400: {
                           slidesPerView: 3
                        }
                     }}
                     pagination={{
                        clickable: true,
                        el: '.testimonial-pagination',
                     }}
                     autoplay={{
                        delay: 2000,
                        disableOnInteraction: true
                     }}
                  >
                     {data.testimonials && data.testimonials.map((testimonialItem: ITestimonial, index:number) => (
                        <SwiperSlide key={`${testimonialItem.title}-${index}`}>
                           <>
                           <div className="testimonial-items position-relative">
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
                           </>
                        </SwiperSlide>
                     ))}
                  </Swiper>
               </div>
               <div className="testimonial-pagination text-center"></div>
            </div>
         </div>
      </div>
   ) : null
};

export default TestimonialSlider;