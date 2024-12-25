import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { IPricePlan } from '../../interfaces/pricePlan';
import { IFeature } from '../../interfaces/featureSetting';
import Preloader from '../Common/Preloader';
import storage from "local-storage-fallback"
import { LOCAL_STORAGE_KEYS } from '../../hooks/useStorage';
import DOMPurify from 'isomorphic-dompurify';

const MembershipPrice = (propData) => {
   const UserObj = JSON.parse(storage.getItem(LOCAL_STORAGE_KEYS.APP_USER));
   const [data, setData] = useState([])
   useEffect(() => {
      fetch(
         `${process.env.APP_BACK_END_URL}/subscription/packages`,
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

   return typeof data !== 'undefined' && data !== null ? (
      <>
         {data && (
            <section className="membership-area pt-110 pb-90">
               <div className="container">
                  <div className="row justify-content-center">
                     <div className="col-xl-6 col-lg-6">
                        <div className="section-title text-center mb-40">
                           <h2>{propData.sectionData.site_membership_title}</h2>
                           <p>{propData.sectionData.site_membership_description}</p>
                        </div>
                     </div>
                  </div>
                  <div className="row">
                     {data.length && data.map((member: IPricePlan) => (
                        <div className="col-xl-4 col-lg-4 col-md-6" key={uuidv4()}>
                           <div className="membership-box mb-30">
                              <div className="membership-info pb-20">
                                 <h4>{member.type}</h4>
                                 <div className="membership-price">
                                    <span>{member.money_sign}{member.amount}</span>
                                    <p>{member.title}</p>
                                 </div>
                                 <div className="membership-list">
                                    {member.details && (
                                       <p>{member.details}</p>
                                    )}
                                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(member.features) }} />
                                 </div>
                              </div>
                              <Link href={(UserObj?.id == null) ? '/login' : "/checkout?pck=" + member.id} legacyBehavior><a className="membership-btn">{propData.sectionData.site_membership_btn_text}</a></Link>
                              {member.is_highlighted === 1 &&
                                 <div className="Popular-plan">
                                    <span>{member.badge_text}</span>
                                 </div>
                              }
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </section>
         )}
      </>
   ) : null
};

export default MembershipPrice;