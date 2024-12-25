import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ICategory } from '../../interfaces/category';
import getImage from '../../helpers/getImage';
import { v4 as uuidv4 } from 'uuid';
import DOMPurify from 'isomorphic-dompurify';

const TopCategorySection = () => {
   interface iDataType {
      title : string;
      items: [];
   };
   const [data, setData] = useState<iDataType>()

   useEffect(() => {
      fetch(
         `${process.env.APP_BACK_END_URL}/setting/home-01/categories`,
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
      <div className="top-catagory-area pt-110 pb-90">
         {data && (
            <div className="container">
               <div className="row">
                  <div className="col-xl-4 offset-xl-4 col-lg-6 offset-lg-3 col-md-12 col-sm justify-content-center mb-30">
                     <div className="section-title mb-20 text-center">
                        <h2 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.title) }} />
                     </div>
                  </div>
               </div>
               <div className="row">
                  {data.items && data.items.map((categoryItem: ICategory) => (
                     <div className="col-xl-4 col-lg-6 col-md-6" key={uuidv4()}>
                        <Link href={`/category/${categoryItem.slug}`} legacyBehavior><a>
                           <div className="catagory-wrapper mb-30">
                              <div className="catagory-thumb">
                                 <img src={getImage(categoryItem.image)} alt="" />
                              </div>
                              <div className="catagory-content">
                                 <h3>{categoryItem.title}</h3>
                                 <span>{categoryItem.description}</span>
                              </div>
                           </div>
                        </a></Link>
                     </div>
                  ))}
               </div>
            </div>
         )}
      </div>
   ) : null
};

export default TopCategorySection;