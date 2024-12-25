import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import getImage from '../../helpers/getImage';
import DOMPurify from 'isomorphic-dompurify';

const TeacherSection = () => {
    interface iDataType {
        home_02_cta_02_title : string;
        home_02_cta_02_img_01: string
        home_02_cta_02_img_02: string
        home_02_cta_02_subtitle: string
        home_02_cta_02_btn_url: string
        home_02_cta_02_btn_text: string
    };
    const [data, setData] = useState<iDataType>()

    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/home-02/cta-02`,
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

    return typeof data?.home_02_cta_02_title !== 'undefined' ? (
        <>
            {data && (
                <section className="teacher-area position-relative pt-120 fix">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-xxl-4 col-xl-5 col-lg-5">
                                <div className="teacher-img position-relative">
                                    <img className="teacher-main-img" src={getImage(data.home_02_cta_02_img_01)} alt="img not found" />
                                    <img className="teacher-shape" src="assets/img/teacher/teacher-shape-01.png" alt="img not found" />
                                    <img className="teacher-shape-02" src={getImage(data.home_02_cta_02_img_02)} alt="img not found" />
                                    <img className="teacher-shape-03" src="assets/img/teacher/teacher-shape-03.png" alt="img not found" />
                                    <img className="teacher-shape-04" src="assets/img/teacher/teacher-shape-04.png" alt="img not found" />
                                </div>
                            </div>
                            <div className="col-xxl-4 col-xl-5 col-lg-5">
                                <div className="teacher-content mr-20">
                                    <div className="section-title mb-30">
                                        <h2 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.home_02_cta_02_title) }} />
                                    </div>
                                    <p>{data.home_02_cta_02_subtitle}</p>
                                    <Link href={data.home_02_cta_02_btn_url ?? ""} legacyBehavior><a className="edu-btn btn-transparent mt-25">{data.home_02_cta_02_btn_text}</a></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    ) : null
};

export default TeacherSection;