import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import getImage from '../../helpers/getImage';
import DOMPurify from 'isomorphic-dompurify';

const ZoomSection = () => {
    interface iDataType {
        home_02_cta_03_title : string;
        home_02_cta_03_img_02: string
        home_02_cta_03_img_01: string
        home_02_cta_03_subtitle: string
        home_02_cta_03_btn_url: string
        home_02_cta_03_btn_text: string
    };
    const [data, setData] = useState<iDataType>()

    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/home-02/cta-03`,
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

    return typeof data?.home_02_cta_03_title !== 'undefined' ? (
        <>
            {data && (
                <section className="zoom-area pt-120 pb-60">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xxl-4 col-xl-5 col-lg-5 order-lg-2">
                                <div className="zoom-thumb position-relative">
                                    <img className="zoom-shape-01" src="assets/img/teacher/zoom-shape-1.png" alt="img not found" />
                                    <img className="zoom-shape-02" src={getImage(data.home_02_cta_03_img_02)} alt="img not found" />
                                    <img className="zoom-thumb-main-img" src={getImage(data.home_02_cta_03_img_01)} alt="img not found" />
                                </div>
                            </div>
                            <div className="col-xxl-4 col-xl-5 col-lg-5 order-lg-1">
                                <div className="zoom-class-wrapper mb-60">
                                    <div className="section-title mb-30">
                                        <h2 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.home_02_cta_03_title) }} />
                                    </div>
                                    <div className="zoon-class-text">
                                        <p>{data.home_02_cta_03_subtitle}</p>
                                    </div>
                                    <Link href={data.home_02_cta_03_btn_url ?? ""} legacyBehavior><a className="edu-btn btn-transparent mt-25">{data.home_02_cta_03_btn_text}</a></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    ) : null
};

export default ZoomSection;