import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import getImage from '../../helpers/getImage';
import DOMPurify from 'isomorphic-dompurify';

const StudentChooseSection = () => {
   interface iDataType {
      home_01_about_us_title : string;
      home_01_about_us_section_image: string;
      home_01_about_us_description: string;
      home_01_about_us_items: string;
      home_01_about_us_btn_text: string;
      home_01_about_us_btn_url: string;
   };
   const [data, setData] = useState<iDataType>()

   useEffect(() => {
      fetch(
         `${process.env.APP_BACK_END_URL}/setting/home-01/about-us`,
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

   return typeof data !== 'undefined'  &&  data !== null ? (
      <>
         {data && (
            <div className="student-choose-area fix pt-120 pb-110">
               <div className="container">
                  <div className="row">
                     <div className="col-xl-5 col-lg-5">
                        <div className="student-wrapper">
                           <div className="section-title mb-30">
                              <h2 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.home_01_about_us_title) }} />
                           </div>
                           <div className="sitdent-choose-content">
                              <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.home_01_about_us_description) }} />
                           </div>
                           <div className="student-choose-list">
                              <ul>
                                 {data.home_01_about_us_items && JSON.parse(data.home_01_about_us_items).map((feature, index: number) => (
                                    <li key={"about-feature-"+ index +'-'+ String(feature).replaceAll(" ", "-")}>
                                       <>
                                          <i className="fas fa-check-circle"></i>{feature}
                                       </>
                                    </li>
                                 ))}
                              </ul>
                           </div>
                           <div className="student-btn">
                              <Link href={data.home_01_about_us_btn_url ?? ""} legacyBehavior><a className="edu-sec-btn">{data.home_01_about_us_btn_text}</a></Link>
                           </div>
                        </div>
                     </div>
                     <div className="col-xl-2 col-lg-2">
                        <div className="student-wrapper position-relative">
                           <div className="shap-01"></div>
                        </div>
                     </div>
                     <div className="col-xl-5 col-lg-5">
                        <div className="student-choose-wrapper position-relative">
                           <div className="shap-02"></div>
                           <div className="shap-03">
                              <img src="assets/img/shape/student-shape-03.png" alt="img not found" />
                           </div>
                           <div className="shap-04">
                              <img src="assets/img/shape/student-shape-04.png" alt="img not found" />
                           </div>
                           <div className="shap-05">
                              <img src="assets/img/shape/student-shape-05.png" alt="img not found" />
                           </div>
                           <div className="shap-06">
                              <img src="assets/img/shape/student-shape-06.png" alt="img not found" />
                           </div>
                           <div className="shap-07">
                              <img src="assets/img/shape/student-shape-07.png" alt="img not found" />
                           </div>
                           <div className="student-choose-thumb">
                              <img src={getImage(data.home_01_about_us_section_image)} alt="img not found" />
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

export default StudentChooseSection;