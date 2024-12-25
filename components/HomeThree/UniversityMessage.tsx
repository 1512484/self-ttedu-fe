import React, { useEffect, useState } from 'react';
import getImage from '../../helpers/getImage';
import DOMPurify from 'isomorphic-dompurify';

const UniversityMessage = () => {
    interface iDataType {
        home_03_welcome_message_title : string;
        home_03_welcome_message_description: string;
        home_03_welcome_message_image: string;
        home_03_course_overview_button_text: string;
        home_03_welcome_message_since: string;
    };
    const [data, setData] = useState<iDataType>()

    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/home-03/welcome-message`,
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

    return typeof data?.home_03_welcome_message_title !== 'undefined' ? (
        <>
            {data && (
                <div className="university-message-area pt-110 pb-105">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4 col-lg-4">
                                <div className="section-title mb-30">
                                    <h2 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.home_03_welcome_message_title) }} />
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.home_03_welcome_message_description) }} />
                            <div className="col-xl-4 col-lg-4">
                                <div className="message-sticker position-relative">
                                    <img src={getImage(data.home_03_welcome_message_image)} alt="img" />
                                    <div className='etablist-price' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.home_03_welcome_message_since) }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    ) : null
};

export default UniversityMessage;