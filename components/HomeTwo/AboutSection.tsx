import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import getImage from '../../helpers/getImage';
import { IFeature } from '../../interfaces/featureSetting';
import DOMPurify from 'isomorphic-dompurify';

const AboutSection = () => {
    interface iDataType {
        home_02_cta_01_title : string;
        home_02_cta_01_image: string
        home_02_cta_01_description: string
        home_02_cta_01_features: string
        home_02_cta_01_btn_url: string
        home_02_cta_01_btn_text: string
     };
     const [data, setData] = useState<iDataType>()
    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/home-02/cta-01`,
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

    return typeof data?.home_02_cta_01_title !== 'undefined' ? (
        <>
            {data && (
                <section className="about-area p-relative pt-90 pb-70">
                    <div className="container">
                        <img className="about-shape" src="assets/img/shape/education-shape-03.png" alt="shape" />
                        <div className="row">
                            <div className="col-xl-6 col-lg-6">
                                <div className="about-img position-relative mb-50">
                                    <div className="about-main-img">
                                        <img src={getImage(data.home_02_cta_01_image)} alt="about" />
                                    </div>
                                    <img className="about-shape-1" src="assets/img/shape/education-shape-01.png" alt="about" />
                                    <img className="about-shape-2" src="assets/img/shape/education-shape-02.png" alt="about" />
                                    <img className="about-shape-3" src="assets/img/shape/education-shape-05.png" alt="about" />
                                </div>
                            </div>
                            <div className="col-xl-5 col-lg-5">
                                <div className="about-content mb-50">
                                    <div className="section-title mb-30">
                                        <h2 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.home_02_cta_01_title) }} />
                                    </div>
                                    <div className="student-choose-list">
                                        <p className="mb-30">{data.home_02_cta_01_description}</p>
                                        <ul>
                                            {data.home_02_cta_01_features && JSON.parse(data.home_02_cta_01_features).map((feature: IFeature, index: number) => (
                                                <li key={"hometwo-feature-" + index +'-'+ String(feature).replaceAll(" ", "-")}>
                                                    <>
                                                        <i className="fas fa-check-circle"></i>{feature}
                                                    </>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {
                                        data && (
                                            <Link href={data.home_02_cta_01_btn_url ?? ""} legacyBehavior><a className="edu-btn">{data.home_02_cta_01_btn_text}</a></Link>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    ) : null
};

export default AboutSection;