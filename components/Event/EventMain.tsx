import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Breadcrumb from '../Common/Breadcrumb';
import { IEvent } from '../../interfaces/event';
import formatDate from '../../helpers/formatDate';
import { v4 as uuidv4 } from 'uuid';
import DOMPurify from 'isomorphic-dompurify';

const EventMain = () => {
    interface iFormDataType {
        site_events_form_title : string;
        site_events_form_btn_url : string;
        site_events_form_btn_title : string;
    };
    const [data, setData] = useState([])
    const [sectionData, setSectionData] = useState({})
    const [formData, setFormData] = useState<iFormDataType>()
    const [pageData, setPageData] = useState({})

    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/inner-page/events`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            }
        )
            .then(response => response.json())
            .then((response) => handleResponseData(response))
            .catch(err => console.error(err))

            fetch(
                `${process.env.APP_BACK_END_URL}/setting/inner-page/events`,
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
                    setFormData(response.data);
                })
                .catch(err => console.error(err))

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
    }, [])

    const formatDateLocal = (day_str) => {
        return { day: day_str.split(" ")[0], month_year: `${day_str.split(" ")[1]} ${day_str.split(" ")[2]}` }
    }
    const handleResponseData = (res) => {
        setSectionData(res.data);
        let data = {
            'title': res.data.site_events_title, 
            'sub_title': res.data.site_events_sub_title,
            'image': res.data.site_events_banner_image,
            'description': res.data?.site_events_description,
            'keywords': res.data?.site_events_keywords,
            'url': process.env.APP_BASE_URL,
        } 
        setPageData(data);
    }

    return typeof pageData !== 'undefined' && formData?.site_events_form_title !== 'undefined' ? (
        <main>
            <Breadcrumb pageData={pageData} />

            <div className="event-ara pt-120 pb-90">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-7">
                            {data && data.map((event: IEvent) => (
                                <div className="single-item mb-30" key={uuidv4()}>
                                    <div className="event_date f-left">
                                        <div className="event_date_inner">
                                            <h4>{formatDateLocal(formatDate(event.start_datetime))["day"]}</h4>
                                            <span>{formatDateLocal(formatDate(event.start_datetime))["month_year"]}</span>
                                        </div>
                                    </div>
                                    <div className="event_info">
                                        <h3><Link href={`/event/${event.slug}`} legacyBehavior><a>{event.title}</a></Link></h3>
                                        <div className="event-detalis d-flex align-items-center">
                                            <div className="event-time mr-30 d-flex align-items-center">
                                                <i className="flaticon-clock-1"></i>
                                                <span>{formatDate(event.start_datetime)}</span>
                                            </div>
                                            <div className="event-location d-flex align-items-centere">
                                                <i className="flaticon-pin"></i>
                                                <span>{event.location}</span>
                                            </div>
                                        </div>
                                        <div className="event-aduence d-flex align-items-center">
                                            <div className="adence-info">
                                                <span className='event-desc' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(event.teaser) }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="get-ticket-btn">
                                        <Link href={`/event/${event.slug}`} legacyBehavior><a className="get-btn">Get ticket</a></Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-xl-4 col-lg-5 col-md-8">
                            <div className="sidebar-widget-wrapper">
                                <div className="sidebar-widget mb-30">
                                    <div className="event-wrapper">
                                        <div className="event-select">
                                            <select>
                                                <option defaultValue="volvo">All Events</option>
                                                <option defaultValue="saab">This Month</option>
                                                <option defaultValue="opel">Next Month</option>
                                                <option defaultValue="audi">This Year</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="side-bar-widget mb-30">
                                    <div className="event-sidebar">
                                        <div className="find-event">
                                            <div className="find-event-info">
                                                <h4>{formData?.site_events_form_title}</h4>
                                            </div>
                                            <div className="find-event-wrapper mb-25">
                                                <div className="find-event-input">
                                                    <input type="date" />
                                                </div>
                                            </div>
                                            <div className="find-event-wrapper mb-25">
                                                <div className="find-event-input">
                                                    <input type="text" placeholder="Location" />
                                                    <i className="far fa-map-marker-alt"></i>
                                                </div>
                                            </div>
                                            <div className="find-event-wrapper mb-25">
                                                <div className="find-event-input">
                                                    <input type="text" placeholder="Search keyword...." />
                                                    <i className="flaticon-search"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="zoom-btn">
                                            <Link href={formData?.site_events_form_btn_url ?? ""} legacyBehavior><a className="event-btn">{formData?.site_events_form_btn_title}</a></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    ) : null
};

export default EventMain;