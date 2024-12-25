import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DOMPurify from 'isomorphic-dompurify';
import EventDetailsSidebar from './EventDetailsSidebar';
import Breadcrumb from '../Common/Breadcrumb';
import getImage from '../../helpers/getImage';
import { IEvent } from '../../interfaces/event';
import { v4 as uuidv4 } from 'uuid';

const EventDetailsMain = () => {
    const router = useRouter();
    const [data, setData] = useState<IEvent>()
    const [sectionData, setSectionData] = useState({})
    const [pageData, setPageData] = useState({})
    const slug = router.query.slug;
    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/events/details?slug=${slug}`,
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
                if(response.data.title)
                {
                    setData(response.data);
                }
                else 
                {
                    router.push('/404');
                }
            })
            .catch(err => console.error(err))

        fetch(
            `${process.env.APP_BACK_END_URL}/setting/inner-page/event-details?slug=${slug}`,
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
    }, [slug])

    const handleResponseData = (res) => {
        setSectionData(res.data);
        let data = {
            'title': res.data?.site_event_details_title,
            'sub_title': res.data?.site_event_details_sub_title,
            'image': res.data?.site_event_details_banner_image,
            'description': res.data?.site_event_details_description,
            'keywords': res.data?.site_event_details_keywords,
            'url': process.env.APP_BASE_URL
        }
        setPageData(data);
    }

    return typeof pageData !== 'undefined' ? (
        <main>
            <Breadcrumb pageData={pageData} />

            <div className="event-detalis-area pt-120 pb-90">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-7">
                            <div className="event-main-wrapper mb-30">
                                {data && (
                                    <>
                                        {data?.organization && (
                                            <div className="course-detelis-meta mb-30">
                                                {data.authors && data.authors.map((author: any) => (
                                                    <div className="course-meta-wrapper border-line-meta" key={uuidv4()}>
                                                        <div className="course-meta-img">
                                                            <Link href={`/instructor/${author.slug}`} legacyBehavior><a><img src={getImage(author.logo_url)} alt="course-meta" /></a></Link>
                                                        </div>
                                                        <div className="course-meta-text">
                                                            <span>Hosted by</span>
                                                            <h6>
                                                                <Link href={`/instructor/${author.slug}`} legacyBehavior><a>{author.salute_name + ' ' + author.titel_name + ' ' + author.first_name + ' ' + author.last_name}</a></Link>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="course-Enroll border-line-meta">
                                                    <p>Total Joined</p>
                                                    <span>{data.attendeesCount} Audience{data.attendeesCount > 1 ? 's' : ''}</span>
                                                </div>
                                                <div className="course-update border-line-meta">
                                                    <p>Estimated {data.available_seat > 1 ? "Seats" : "Seat"}</p>
                                                    <span>{data.available_seat}</span>
                                                </div>
                                                <div className="course-category">
                                                    <p>Category</p>
                                                    <span><Link href={`/category/${data.category.slug}`} legacyBehavior><a>{data.category.title}</a></Link></span>
                                                </div>
                                            </div>
                                        )}
                                        <div className="event-details-thumb w-img mb-20">
                                            <img src={getImage(data.image_url)} alt="event-img" />
                                        </div>
                                        <div className="event-contact-info">
                                            <h2>{data.title}</h2>
                                        </div>
                                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.description) }} />
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-5 col-md-8">
                            <EventDetailsSidebar data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    ) : null
};

export default EventDetailsMain;