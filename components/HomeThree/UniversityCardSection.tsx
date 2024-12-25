import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import getImage from '../../helpers/getImage';
import { IBrand } from '../../interfaces/brandSetting';
import DOMPurify from 'isomorphic-dompurify';

const UniversityCardSection = () => {
    interface iDataType {
        home_03_course_overview_title : string;
        home_03_course_overview_sub_title: string;
        home_03_course_overview_button_url: string;
        home_03_course_overview_button_text: string;
        home_03_header_button_text: string;
        items: []
    };
    const [data, setData] = useState<iDataType>()

    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/home-03/course-overview`,
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

    return typeof data?.home_03_course_overview_title !== 'undefined' ? (
        <>
            {data && (
                <div className="university-card">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12">
                                <div className="university-main-wraper d-flex align-items-center">
                                    <div className="university-course-box">
                                        <div className="university-card-text">
                                            <p>{data.home_03_course_overview_sub_title}</p>
                                            <h3 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.home_03_course_overview_title) }} />
                                            <Link href={data.home_03_course_overview_button_url ?? ""} legacyBehavior><a className="edu-six-btn">{data.home_03_course_overview_button_text}</a></Link>
                                        </div>
                                    </div>
                                    {data.items && data.items.slice(0, 3).map((cardItem: IBrand) => (
                                        <div className="university-card-wrapper" key={uuidv4()}>
                                            <div className="university-card-icon">
                                                <img src={getImage(cardItem.image)} alt="img not found" />
                                            </div>
                                            <div className="university-card-content">
                                                <h3>{cardItem.title}</h3>
                                                <p>{cardItem.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    ) : null
};

export default UniversityCardSection;