import React, { useEffect, useState } from 'react';
import { IBrand } from '../../interfaces/brandSetting';
import getImage from '../../helpers/getImage';
import { v4 as uuidv4 } from 'uuid';

const AffiliateSection = () => {
    interface iDataType {
        home_01_brand_images : string;
     };
     const [data, setData] = useState<iDataType>()

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
        <div className="affiliates-area pt-120 pb-120">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="affiliates-wrapper">
                            {data.home_01_brand_images && JSON.parse(data.home_01_brand_images).map((brand: IBrand) => (
                                <div className="singel-affiliates-img" key={uuidv4()}>
                                    <img height="100" src={getImage(brand)} alt="affiliates-img" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null
};

export default AffiliateSection;