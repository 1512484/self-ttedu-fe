import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import getImage from '../../helpers/getImage';
import { IBrand } from '../../interfaces/brandSetting';

const BrowserCourseSection = () => {

   const [data, setData] = useState([])

   useEffect(() => {
      fetch(
         `${process.env.APP_BACK_END_URL}/setting/home-01/cta-01`,
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


   return typeof data !== 'undefined' ? (
      <div className="browser-course-area">
         <div className="container">
            <div className="row">
               {data && data.map((bannerItem: IBrand) => (
                  <div className="col-xl-6 col-lg-6 col-md-12 mb-30" key={uuidv4()}>
                     <div className="browser-course-wrapper course-height">
                        <div className="browser-course-bg">
                           <img src={getImage(bannerItem.image)} alt="img not found" />
                        </div>
                        <div className="browser-course-content">
                           <span>{bannerItem.subtitle}</span>
                           <div className="browser-course-tittle">
                              <Link href={bannerItem.btn_url ?? ""} legacyBehavior><a>{bannerItem.title}</a></Link>
                           </div>
                           <div className="browser-btn">
                              <Link href={bannerItem.btn_url ?? ""} legacyBehavior><a className="course-btn">{bannerItem.btn_text}</a></Link>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   ) : null
};

export default BrowserCourseSection;