import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import getImage from '../../helpers/getImage';
import DOMPurify from 'isomorphic-dompurify';

const EducationSection = () => {
   interface iDataType {
      home_01_cta_02_title : string;
      home_01_cta_02_image: string
      home_01_cta_02_description: string
      home_01_cta_02_btn_url: string
      home_01_cta_02_btn_text: string
   };
   
   const [data, setData] = useState<iDataType>()

   useEffect(() => {
      fetch(
         `${process.env.APP_BACK_END_URL}/setting/home-01/cta-02`,
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

   return typeof data?.home_01_cta_02_title !== 'undefined' ? (
      <>
         {data && (
            <section className="education-area position-relative pt-85">
               <div className="container">
                  <img className="education-shape-2" src="assets/img/shape/education-shape-04.png" alt="shape" />
                  <img className="education-shape-3" src="assets/img/shape/education-shape-01.png" alt="shape" />
                  <img className="education-shape-4" src="assets/img/shape/education-shape-03.png" alt="shape" />
                  <div className="row">
                     <div className="col-xl-4 col-lg-4 offset-xl-2 offset-lg-2">
                        <div className="education-img mb-30">
                           <img src={getImage(data.home_01_cta_02_image)} alt="img not found" />
                        </div>
                     </div>
                     <div className="col-xl-4 col-lg-4">
                        <div className="section-title mb-30">
                           <h2 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.home_01_cta_02_title) }} />
                        </div>
                        <div className="education-content mb-30">
                           <p>{data.home_01_cta_02_description}</p>
                           <Link href={data.home_01_cta_02_btn_url ?? ""} legacyBehavior><a className="edu-sec-btn">{data.home_01_cta_02_btn_text}</a></Link>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         )}
      </>
   ) : null
};

export default EducationSection;