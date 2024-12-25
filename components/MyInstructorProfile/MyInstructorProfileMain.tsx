import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Breadcrumb from '../Common/Breadcrumb';
import { ICourse } from '../../interfaces/course';
import { useRouter } from 'next/router';
import getImage from '../../helpers/getImage';

import storage from "local-storage-fallback"
import { LOCAL_STORAGE_KEYS } from '../../hooks/useStorage';
import { IAuthor } from '../../interfaces/author';

const MyInstructorProfileMain = () => {
    const router = useRouter();
    const [data, setData] = useState<IAuthor>()
    const [pageData, setPageData] = useState({})
    const [sectionData, setSectionData] = useState({})
    const UserObj = JSON.parse(storage.getItem(LOCAL_STORAGE_KEYS.APP_USER));
    const logout = () => {
        storage.removeItem(LOCAL_STORAGE_KEYS.APP_TOKEN)
        storage.removeItem(LOCAL_STORAGE_KEYS.APP_USER)
        storage.clear()
        router.push('/login');
    }
    if(UserObj?.id ==  null)
    {
        router.push('/login');
    }

    useEffect(() => {
        const UserObj = JSON.parse(storage.getItem(LOCAL_STORAGE_KEYS.APP_USER));
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/inner-page/instructor-details`,
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
            `${process.env.APP_BACK_END_URL}/author/${UserObj.id}/details`,
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
                if(response.data.first_name)
                {
                    setData(response.data);
                }
                else 
                {
                    router.push('/404');
                }
            })
            .catch(err => console.error(err))
    }, [])

    const handleResponseData = (res) => {
        setSectionData(res.data);
        let data = {
            'title': res.data.site_instructor_details_title, 
            'sub_title': res.data.site_instructor_details_sub_title,
            'image': res.data.site_instructor_details_banner_image,
            'description': "",
            'keywords': "",
        } 
        setPageData(data);
    }

    return typeof data?.first_name !== 'undefined' ? (
        <main>
            <Breadcrumb pageData={pageData} />
            {data && (
                <div className="course-details-area pt-120 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-3 col-lg-3">
                                <div className="course-instructors-img mb-30">
                                    <img className='mb-20' src={getImage(data.logo_url)} alt="instructors-img" />
                                    <div className="course-details-tittle mb-30">
                                        <h3>{data.first_name +' '+ data.last_name}</h3>
                                        <span className='d-block mb-15'>{data.designation}</span>
                                        <ul>
                                            <li><a href="mailto:info@example.com"><i className="fal fa-envelope"></i> {data.email}</a></li>
                                            <li><a href="tel:987547587587"><i className="far fa-phone-alt"></i> {data.phone}</a></li>
                                            <li><a href="#"><i className="far fa-map-marker-alt"></i> {data.street_address}</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-8 col-lg-9">
                                <div className="course-details-wrapper">
                                    <div className="course-details-meta">
                                        <div className="total-course">
                                            <span>Total Courses</span>
                                            <label>{data.courses.length}</label>
                                        </div>
                                        <div className="student course">
                                            <span>Total Students</span>
                                            <label>{data.totalEnrolled}</label>
                                        </div>
                           
                                        <div className="course-details-action">
                                            <div className="course-follow">
                                                <span className='d-block'>Follows </span>
                                                <div className="member-social">
                                                    <ul>
                                                        <li><Link href="#" legacyBehavior><a><i className={data.fb_url}></i></a></Link></li>
                                                        <li><Link href="#" legacyBehavior><a><i className={data.twitter_url}></i></a></Link></li>
                                                        <li><Link href="#" legacyBehavior><a><i className={data.instagram_url}></i></a></Link></li>
                                                        <li><Link href="#" legacyBehavior><a><i className={data.linkedin_url}></i></a></Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="course-bio-text pt-45 pb-20">
                                        <h3>Bio</h3>
                                        <p>{data.description}</p>
                                    </div>
                                
                        
                                    <div className="my-course-info">
                                        <h3>My Courses</h3>
                                    </div>
                                    <div className="row">
                                        {data?.courses && data.courses.map((course: ICourse) => (
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-md-6" key={course.id}>
                                                <div className="eduman-course-main-wrapper mb-30">
                                                    <div className="eduman-course-thumb w-img">
                                                        <Link href="/course-details" legacyBehavior><a><img src={course.image_url} alt="course-img" /></a></Link>
                                                    </div>
                                                    <div className="course-cart">
                                                        <div className="course-info-wrapper">
                                                            <div className="cart-info-body">
                                                                <span className="category-color category-color-1"><Link href="/course" legacyBehavior><a>{course.category}</a></Link></span>
                                                                <Link href="/course-details" legacyBehavior><a><h3>{course.title}</h3></a></Link>

                                                                <div className="cart-lavel">
                                                                    <h5>Level : <span>{course.level}</span></h5>
                                                                    <p>{course.description}</p>
                                                                </div>
                                                                <div className="info-cart-text">
                                                                    {course.more_info}
                                                                </div>
                                                                <div className="course-action">
                                                                    <Link href={`course/${course.slug}`} legacyBehavior><a className="view-details-btn">Course Details</a></Link>
                                                                    <Link href={`/my-wishlist?cid=${course.id}`} legacyBehavior><a>
                                                                        <button className="wishlist-btn"><i className="flaticon-like"></i></button>
                                                                    </a></Link>
                                                                    <Link href="/course-details" legacyBehavior><a className="c-share-btn"><i className="flaticon-previous"></i></a></Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="eduman-course-wraper">
                                                        <div className="eduman-course-heading">
                                                            {course.more_info}
                                                        </div>
                                                        <div className="eduman-course-text">
                                                            <h3><Link href="/course-details" legacyBehavior><a>{course.title}</a></Link></h3>
                                                        </div>
                                                        <div className="eduman-course-meta">
                                                            <div className="eduman-course-price">
                                                                {course.price !== "Free" && <span className="price-now">${course.price}</span>}
                                                                {course.price == "Free" && <span className="price-now">{course.price}</span>}
                                                                {course.discount && <del className="price-old">${course?.discount}</del>}
                                                            </div>
                                                            <div className="eduman-course-tutor">
                                                                <Link href="/instructor-profile" legacyBehavior><a><img src={course.instructorImg} alt="tutor-img" /></a></Link>
                                                                <Link href="/instructor-profile" legacyBehavior><a><span>{course.instructor}</span></a></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="eduman-course-footer">
                                                        <div className="course-lessson-svg">
                                                            <i className="fal fa-tv"></i>
                                                            <span className="ms-2">{course.lessons.length}</span>
                                                        </div>
                                                        <div className="course-deteals-btn">
                                                            <Link href={`course/${course.slug}`} legacyBehavior><a><span className="me-2">Course Details</span><i className="far fa-arrow-right"></i></a></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                          
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    ) : null
};

export default MyInstructorProfileMain;