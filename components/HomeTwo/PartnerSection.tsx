import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import getImage from '../../helpers/getImage';
import { IBrand } from '../../interfaces/brandSetting';
import DOMPurify from 'isomorphic-dompurify';

const PartnerSection = () => {
    interface iDataType {
        home_02_partner_section_title : string;
        home_02_partner_section_img: string
        home_02_cta_01_description: string
        home_02_partner_section_description: string
        home_02_partner_section_desc_more: string
        partners: []
     };
     const [data, setData] = useState<iDataType>()
    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/home-02/partners`,
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

    return typeof data?.home_02_partner_section_title !== 'undefined' ? (
        <div className="patner-area pt-110 pb-80">
            <div className="container">
                <div className="row">
                    <div className="col-xl-5 col-lg-4 col-md-4">
                    {data && (
                        <div className="partner-box mb-30">
                            <div className="partner-thumb d-none d-sm-block">
                                <img src={getImage(data.home_02_partner_section_img)} alt="partner-png"/>
                            </div>
                            <div className="section-title mb-30">
                                <h2 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize( data.home_02_partner_section_title) }} />
                            </div>
                            <div className="Partner-content">
                                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize( data.home_02_partner_section_description) }} />
                                <div className="partner-text">
                                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize( data.home_02_partner_section_desc_more) }} />
                                </div>
                            </div>
                        </div>
                    )}
                    </div>
                    <div className="col-xl-7 col-lg-8 col-md-8">
                        <div className="partner-wrapper">
                            {data.partners && data.partners.slice(0, 10).map((partnerItem: IBrand) => (
                                <div className="singel-partner" key={uuidv4()}>
                                    <img src={getImage(partnerItem.image)} alt="image not found" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null
};

export default PartnerSection;