import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import getImage from '../../helpers/getImage';
import Preloader from '../Common/Preloader';
import DOMPurify from 'isomorphic-dompurify';

const HeroSection = () => {
   interface iDataType {
      home_01_header_title : string;
      home_01_header_subtitle: string
      home_01_header_description: string
      home_01_header_btn_url: string
      home_01_header_card_1_text: string
      home_01_header_card_2_img: string
      home_01_header_card_2_text: string
      home_01_header_hero_img: string
      home_01_header_btn_text: string
   };
   const [data, setData] = useState<iDataType>()

   useEffect(() => {
      fetch(
         `${process.env.APP_BACK_END_URL}/setting/home-01/header`,
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

   if (!data) return <Preloader />

   return typeof data?.home_01_header_title !== 'undefined' ? (
      <>
         {data && (
            <section className="slider-area hero-height position-relative fix" style={{ backgroundImage: `url(${getImage(data.home_01_header_hero_img)})` }}>
               <img className="shape-3 d-none d-xxl-block" src="assets/img/shape/shape-03.png" alt="img not found" />
               <div className="container">
                  <div className="row">
                     <div className="col-xl-6 col-lg-6 col-md-9">
                        <div className="hero-text pt-95">
                           <h5>{data.home_01_header_title}</h5>
                           <div className="hero-text-title">
                              <h2 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.home_01_header_subtitle) }} />
                           </div>
                           <h2 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.home_01_header_description) }} />
                           <div className="hero-btn">
                              <Link href={data.home_01_header_btn_url ?? ""} legacyBehavior><a className="edu-btn">{data.home_01_header_btn_text}</a></Link>
                           </div>
                        </div>
                     </div>
                     <div className="col-xl-6 col-lg-6 col-md-6">
                        <div className="hero-right position-relative">
                           <img className="shape shape-1" src="assets/img/shape/shape-01.png" alt="shape" />
                           <img className="shape-2" src="assets/img/shape/shape-02.png" alt="shape" />
                           <img className="shape-6" src="assets/img/shape/slider-shape-6.png" alt="shape" />
                           <div className="shape-4">
                              <img src="assets/img/shape/shape-04.png" alt="shape" />
                              <h5 className="hero-shape-text">{data.home_01_header_card_1_text}</h5>
                           </div>
                           <div className="shape-5">
                              <div className="course-card">
                                 <img src={getImage(data.home_01_header_card_2_img)} alt="img not found" />
                                 <span><i className="far fa-plus"></i></span>
                              </div>
                              <h5 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.home_01_header_card_2_text) }} />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         )}
      </>
   ) : null
};

export default HeroSection;