import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IEvent } from '../../interfaces/event';
import formatDate from '../../helpers/formatDate';
import { v4 as uuidv4 } from 'uuid';
import TestimonialSliderThree from '../Elements/Slider/TestimonialSliderThree';
import DOMPurify from 'isomorphic-dompurify';

const EventSection = () => {
    const [data, setData] = useState([])

    interface iSectionDataType {
        home_03_insta_images_titles_title : string;
    };
    const [sectionData, setSectionData] = useState<iSectionDataType>()

    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/events`,
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

        fetch(
            `${process.env.APP_BACK_END_URL}/setting/home-03/insta-images-more-titles`,
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
                setSectionData(response.data);
            })
            .catch(err => console.error(err))
    }, [])

    const formatDateLocal = (day_str) => {
        return { day: day_str.split(" ")[0], month_year: `${day_str.split(" ")[1]} ${day_str.split(" ")[2]}` }
    }

    return typeof data !== 'undefined'  &&  data !== null && sectionData?.home_03_insta_images_titles_title !== 'undefined' ? (
        <div className="event-area pt-110 pb-90">
            <div className="event-shape-wrapper position-relative">
                <div className="event-shape">
                    <img src="assets/img/shape/feedback-img.png" alt="image not found" />
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-12">
                        {sectionData?.home_03_insta_images_titles_title && (
                            <div className="section-title mb-45">
                                <h2 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(sectionData?.home_03_insta_images_titles_title) }} />
                            </div>
                        )}
                        {data && data.slice(0,3).map((event: IEvent) => (
                            <div className="current-event-box mb-15" key={uuidv4()}>
                                <div className="current-event-date d-flex position-relative">
                                    <div className="event-date-wrapper">
                                        <span className="event-date">{formatDateLocal(formatDate(event.start_datetime))["day"]}</span>
                                        <span className="event-month">{formatDateLocal(formatDate(event.start_datetime))["month_year"]}</span>
                                    </div>
                                    <div className="event-tour">
                                        <div className="event-box-text">
                                            <h3><Link href={`/event/${event.slug}`} legacyBehavior><a>{event.title}</a></Link></h3>
                                            <span><i className="fal fa-clock"></i>{formatDate(event.start_datetime)}</span>
                                            <span><i className="flaticon-place"></i>{event.location}</span>
                                        </div>
                                        <Link href={`/event/${event.slug}`} legacyBehavior><a className="event-arrow"><i className="fal fa-arrow-right"></i></a></Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-xl-6 col-lg-6 col-12">
                        <TestimonialSliderThree />
                    </div>
                </div>
            </div>
        </div>
    ) : null
};

export default EventSection;