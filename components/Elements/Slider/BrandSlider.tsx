import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, } from 'swiper';
import { IBrand } from '../../../interfaces/brandSetting';
import getImage from '../../../helpers/getImage';
// Import Swiper styles
import 'swiper/css/bundle'



const BrandSlider = () => {
   const [data, setData] = useState<IBrand>()

   useEffect(() => {
      fetch(
         `${process.env.APP_BACK_END_URL}/setting/home-01/brand`,
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

   return typeof data?.home_01_brand_images !== 'undefined' ? (
      <div className="brand-area theme-bg pt-90 pb-120">
         <div className="container">
            <div className="row">
               <div className="col-xl-12">
                  <div className="brand-wrapper text-center">
                     <div className="brand-wrapper text-center">
                        <div className="brand-active">
                           <div>
                              <Swiper
                                 modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                                 spaceBetween={30}
                                 loop={true}
                                 breakpoints={{
                                    320: {
                                       slidesPerView: 1,
                                    },
                                    480: {
                                       slidesPerView: 2,
                                    },
                                    640: {
                                       slidesPerView: 3,
                                    },
                                    768: {
                                       slidesPerView: 3,
                                    },
                                    991: {
                                       slidesPerView: 4,
                                    },
                                    1200: {
                                       slidesPerView: 5,
                                    },
                                    1400: {
                                       slidesPerView: 6,
                                    }
                                 }}
                                 autoplay={{
                                    delay: 2000,
                                    disableOnInteraction: true
                                 }}
                              >
                                 {data.home_01_brand_images && JSON.parse(data.home_01_brand_images).map((brand: IBrand, index: number) => (
                                    <SwiperSlide key={"brand-" + index +'-'+ String(brand).replaceAll(" ", "-")}>
                                       <div className="singel-brand">
                                          <img height="100" src={getImage(brand)} alt="img not found" />
                                       </div>
                                    </SwiperSlide>
                                 ))}
                              </Swiper>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   ) : null
};

export default BrandSlider;