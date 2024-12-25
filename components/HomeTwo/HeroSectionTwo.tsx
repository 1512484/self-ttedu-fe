import React, { useEffect, useState } from 'react';
import getImage from '../../helpers/getImage';
import { IFeature } from '../../interfaces/featureSetting';
import Preloader from '../Common/Preloader';
import DOMPurify from 'isomorphic-dompurify';

const HeroSectionTwo = () => {
    interface iDataType {
        home_02_header_title : string;
        home_02_header_right_floating_text: string
        home_02_header_left_badge_image: string
        home_02_header_left_badge_text: string
        home_02_header_features: string
    };
    const [data, setData] = useState<iDataType>()

    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/home-02/header`,
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

    return typeof data?.home_02_header_title !== 'undefined' ? (
        <>
            {data && (
                <div className="hero-area hero-height d-flex align-items-center position-relative">
                    <img className="hero-shape-5" src="assets/img/shape/shape-02.png" alt="shape" />
                    <img className="hero-shape-1" src="assets/img/shape/shape-03.png" alt="shape" />
                    <img className="hero-shape-6" src="assets/img/shape/shape-01.png" alt="shape" />
                    <img className="hero-shape-7" src="assets/img/shape/shape-10.png" alt="shape" />
                    <div className="hero-shap-5 d-none d-xxl-block">
                        <div className="hero-card">
                            <img src="assets/img/shape/slider-card-1.png" alt="image not found" />
                            <span><i className="far fa-plus"></i></span>
                        </div>
                        <h5 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.home_02_header_right_floating_text) }} />
                    </div>
                    <div className="container">
                        <div className="hero-2-content-wrpapper position-relative">
                            <div className="hero-shape-3 d-none d-xl-block">
                                <img src={getImage(data.home_02_header_left_badge_image)} alt="image not found" />
                                <h5 className="slider-shap-text">{data.home_02_header_left_badge_text}</h5>
                            </div>
                            <div className="hero-shape-2 d-none d-xl-block">
                                <img src="assets/img/shape/shape-09.png" alt="shape" />
                            </div>
                            <div className="hero-shape-4 d-none d-lg-block">
                                <img src="assets/img/shape/shape-8.png" alt="shape" />
                            </div>
                            <div className="hero-thumb-01 d-none d-xl-block">
                                <img src="assets/img/slider/hero-01.png" alt="shape" />
                            </div>
                            <div className="hero-thumb-02 d-none d-lg-block">
                                <img src="assets/img/slider/hero-02.png" alt="shape" />
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-xl-8 col-lg-8 col-md-10">
                                    <div className="slider-content-wrapper">
                                        <div className="hero-tittle-info text-center mb-45">
                                            <h2 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.home_02_header_title) }} />
                                        </div>
                                        <div className="slider-search ">
                                            <form action="#">
                                                <div className="slider-search-icon position-relative">
                                                    <input type="text" placeholder="Search courses..." />
                                                    <button type="submit"><i className="far fa-search"></i></button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="slider-course-content text-center">
                                            <ul>
                                                {data.home_02_header_features && JSON.parse(data.home_02_header_features).map((feature: IFeature, index: number) => (
                                                    <li key={"hero-feature-"+ index +'-'+ String(feature).replaceAll(" ", "-")}>
                                                        <><i className="fas fa-check-circle"></i>{<span><>{feature}</></span>}</>
                                                    </li>
                                                ))}
                                            </ul>
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

export default HeroSectionTwo;