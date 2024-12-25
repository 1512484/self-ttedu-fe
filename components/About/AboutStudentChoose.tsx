import React, { useEffect, useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';

const AboutStudentChoose = () => {
    interface iDataType {
        home_01_about_us_title : string;
        home_01_about_us_section_image: string;
        home_01_about_us_description: string;
        home_01_about_us_items: string;
        home_01_about_us_btn_text: string;
        home_01_about_us_btn_url: string;
     };
     const [data, setData] = useState<iDataType>()

    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/home-01/about-us`,
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

    return typeof data?.home_01_about_us_title !== 'undefined' ? (
        <>
            {data && (
                <div className="student-choose-area fix pt-110 pb-90">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-5 col-lg-5">
                                <div className="student-wrapper mb-30">
                                    <div className="section-title mb-30">
                                        <h2 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.home_01_about_us_title) }} />
                                    </div>
                                    <div className="about-details" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.home_01_about_us_description) }} />
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-2">
                                <div className="student-wrapper position-relative">
                                    <div className="shap-01"></div>
                                </div>
                            </div>
                            <div className="col-xl-5 col-lg-5">
                                <div className="student-choose-wrapper position-relative mb-30">
                                    <div className="shap-02"></div>
                                    <div className="shap-03"></div>
                                    <div className="shap-04"></div>
                                    <div className="shap-05"></div>
                                    <div className="shap-06"></div>
                                    <div className="shap-07"></div>
                                    <div className="student-choose-thumb"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    ) : null
};

export default AboutStudentChoose;