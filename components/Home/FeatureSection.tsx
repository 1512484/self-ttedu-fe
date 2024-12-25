import React, { useEffect, useState } from 'react';
import getImage from '../../helpers/getImage';
import { v4 as uuidv4 } from 'uuid';
import { IFeature } from '../../interfaces/featureSetting';

const FeatureSection = () => {
   const [data, setData] = useState([])

   useEffect(() => {
      fetch(
         `${process.env.APP_BACK_END_URL}/setting/home-01/features`,
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
      <div className="features-area pt-45 pb-15" style={{ backgroundImage: "url(assets/img/fact/fact.png)" }}>
         <div className="container">
            <div className="row">
               {data && data.slice(0,3).map((featureItem: IFeature) => (
                  <div className="col-xl-4 col-lg-4 col-md-6" key={uuidv4()}>
                     <div className="features-wrapper d-flex align-items-center mb-30">
                        <div className="features-icon">
                           <img src={getImage(featureItem.image)} alt="img not found" />
                        </div>
                        <div className="features-content">
                           <h3>{featureItem.title}</h3>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   ) : null
};

export default FeatureSection;