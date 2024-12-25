import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import getImage from '../../helpers/getImage';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { IAuthor } from '../../interfaces/author';
import Preloader from '../Common/Preloader';
import DOMPurify from 'isomorphic-dompurify';

const InstructorMain = () => {
    const [data, setData] = useState([])
    const [sectionData, setSectionData] = useState({})
    const [pageData, setPageData] = useState({})

    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/inner-page/instructors`,
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
            `${process.env.APP_BACK_END_URL}/author/instructors`,
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

    const handleResponseData = (res) => {
        setSectionData(res.data);
        let data = {
            'title': "Giáo viên",
            'sub_title': res.data?.site_instructors_sub_title,
            'image': res.data?.site_instructors_banner_image,
            'description': res.data?.site_instructors_description,
            'keywords': res.data?.site_instructors_keywords,
            'url': process.env.APP_BASE_URL
        }
        setPageData(data);
    }

    if (!data) return <Preloader />

    return typeof pageData !== 'undefined' ? (
        <>

            <Breadcrumb pageData={pageData} />

            <section className="member-area pt-125 pb-90">
                <div className="container">
                    <div className="row">
                        {data && data.map((instructor: IAuthor) => (
                            <div className="col-xl-3 col-lg-4 col-md-6" key={uuidv4()}>
                                <div className="member-main-wrapper mb-30">
                                    <div className="member-body text-center">
                                        <div className="member-item">
                                            <div className="member-thumb">
                                                <Link href={`/instructor/${instructor.slug}`} legacyBehavior><a><img src={getImage(instructor.logo_url)} alt="member-img" /></a></Link>
                                            </div>
                                            <div className="member-content">
                                                <h4><Link href={`/instructor/${instructor.slug}`} legacyBehavior><a>{instructor?.salute_name + ' ' + instructor?.titel_name + ' ' + instructor?.first_name + ' ' + instructor?.last_name}</a></Link></h4>
                                                <span>{instructor.designation} , {instructor?.institute}</span>
                                            </div>
                                            <div className="member-social">
                                                <ul>
                                                    <li dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(instructor.fb_url) }} />
                                                    <li dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(instructor.twitter_url) }} />
                                                    <li dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(instructor.instagram_url) }} />
                                                    <li dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(instructor.linkedin_url) }} />
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="member-meta justify-content-center">
                                        <div className="member-reating d-none">
                                            <i className="fas fa-star"></i>
                                            <span>4.8 (54k+)</span>
                                        </div>
                                        <div className="member-course">
                                            <i className="flaticon-computer"></i><Link href="/courses" legacyBehavior><a><span>{instructor.courses.length} {instructor.courses.length > 1 ? "Khoá học" : "Khoá học"}</span></a></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    ) : null
};

export default InstructorMain;