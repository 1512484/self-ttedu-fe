import React, { useEffect, useState } from 'react';
import getImage from '../../helpers/getImage';
import DOMPurify from 'isomorphic-dompurify';

const CampusSection = () => {
    interface iDataType {
        home_03_about_title : string;
        home_03_about_badge_image: string
        home_03_about_badge_title: string
        home_03_about_description: string
        home_03_about_image: string
     };
     const [data, setData] = useState<iDataType>()

    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/home-03/about`,
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

    return typeof data?.home_03_about_title !== 'undefined' ? (
        <>
            {data && (
                <div className="campus-area fix pt-120 pb-90 ">
                    <div className="container">
                        <div className="campus-wrapper position-relative">
                            <div className="campus-shape-sticker">
                                <div className="shape-light">
                                    <img src={getImage(data.home_03_about_badge_image)} alt="img not found" />
                                </div>
                                <div className="campus-shape-content">
                                    <h5 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.home_03_about_badge_title) }} />
                                </div>
                            </div>
                            <div className="campus-shape-1">
                                <img src="assets/img/shape/campus-shape-2.png" alt="shape" />
                            </div>
                            <div className="campus-shape-2">
                                <img src="assets/img/shape/student-shape-05.png" alt="shape" />
                            </div>
                            <div className="row align-items-center">
                                <div className="col-xl-5 col-lg-6">
                                    <div className="compus-content mb-30">
                                        <div className="section-title mb-30">
                                            <h2 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.home_03_about_title) }} />
                                        </div>
                                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.home_03_about_description) }} />
                                    </div>
                                </div>
                                <div className="col-xl-6 offset-xl-1 col-lg-6">
                                    <div className="campus-img-wrapper position-relative mb-30">
                                        <div className="campus-shape-3">
                                            <img src="assets/img/shape/campus-shape-1.png" alt="img not found" />
                                        </div>
                                        <div className="campus-img-10">
                                            <img src={getImage(data.home_03_about_image)} alt="img not found" />
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

export default CampusSection;