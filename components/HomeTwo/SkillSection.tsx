import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import getImage from '../../helpers/getImage';
import DOMPurify from 'isomorphic-dompurify';

const SkillSection = () => {
    interface iDataType {
        home_02_cta_04_title : string;
        home_02_cta_04_subtitle: string
        home_02_cta_04_btn_url: string
        home_02_cta_04_btn_text: string
        home_02_cta_04_img: string
        home_02_cta_04_badge_text: string
    };
    const [data, setData] = useState<iDataType>()

    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/home-02/cta-04`,
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

    return typeof data?.home_02_cta_04_title !== 'undefined' ? (
        <>
            {data && (
                <div className="skill-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="skill-background-img skill-wrapper" style={{ backgroundImage: "url(assets/img/bg/skill.jpg)" }}>
                                    <div className="row">
                                        <div className="col-xl-6 col-lg-6 col-md-12">
                                            <div className="skill-content">
                                                <span>{data.home_02_cta_04_subtitle}</span>
                                                <h3 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.home_02_cta_04_title) }} />
                                                <Link href={data.home_02_cta_04_btn_url ?? ""} legacyBehavior><a className="edu-four-btn">{data.home_02_cta_04_btn_text}</a></Link>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-12">
                                            <div className="skill-thumb position-relative">
                                                <img src={getImage(data.home_02_cta_04_img)} alt="img not found" />
                                                <div className="course-price-start" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.home_02_cta_04_badge_text) }} />
                                            </div>
                                        </div>
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

export default SkillSection;