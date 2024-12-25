import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Breadcrumb from '../Common/Breadcrumb';
import { ICourse } from '../../interfaces/course';
import { useRouter } from 'next/router';
import getImage from '../../helpers/getImage';
import { v4 as uuidv4 } from 'uuid';
import { IAuthor } from '../../interfaces/author';
import DOMPurify from 'isomorphic-dompurify';

const InstructorProMain = () => {
    const router = useRouter();
    const [data, setData] = useState<IAuthor>()
    const [pageData, setPageData] = useState({})
    const [sectionData, setSectionData] = useState({})
    const slug = router.query.slug;

    useEffect(() => {
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
            `${process.env.APP_BACK_END_URL}/author/details?slug=${slug}`,
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
    }, [slug])

    const handleResponseData = (res) => {
        setSectionData(res.data);
        let data = {
            'title': "Giáo viên",
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
                                    <img className='mb-20' src={getImage(data?.logo_url)} alt="instructors-img" />
                                    <div className="course-details-tittle mb-30">
                                        <h3>{data?.salute_name + ' ' + data?.titel_name + ' ' + data?.first_name + ' ' + data?.last_name}</h3>
                                        <span className='d-block mb-15'>{data?.designation}</span>
                                        <ul>
                                            <li><a href="mailto:info@example.com"><i className="fal fa-envelope"></i> {data?.email}</a></li>
                                            <li><a href="tel:987547587587"><i className="far fa-phone-alt"></i> {data?.phone}</a></li>
                                            <li><a href="#"><i className="far fa-map-marker-alt"></i> {data?.street_address}</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-8 col-lg-9">
                                <div className="course-details-wrapper">
                                    <div className="course-details-meta">
                                        <div className="total-course">
                                            {/* <span>Total {data.courses.length > 1 ? "Courses" : "Course"}</span> */}
                                            <span>Số khoá học</span>
                                            <label>{data.courses.length}</label>
                                        </div>
                                        <div className="student course">
                                            <span>Số học sinh</span>
                                        </div>
                                        <div className="review-course">
                                            <span>Đánh giá</span>
                                        </div>
                                        <div className="course-details-action">
                                            <div className="course-follow">
                                                <span className="d-block">Theo dõi</span>
                                                <div className="member-social">
                                                    <ul>
                                                        <li dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.fb_url) }} />
                                                        <li dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.twitter_url) }} />
                                                        <li dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.instagram_url) }} />
                                                        <li dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.linkedin_url) }} />
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="course-bio-text pt-45 pb-20">
                                        <h3>Tiểu sử</h3>
                                        <p>{data.teaser}</p>
                                    </div>
                                    {data.courses.length > 0 &&
                                        <div className="my-course-info">
                                            <h3>Khoá học của tôi</h3>
                                        </div>
                                    }
                                    <div className="row">
                                        {data?.courses && data.courses.map((course: ICourse) => (
                                            <div className="col-md-6" key={uuidv4()}>
                                                <div className="eduman-course-main-wrapper mb-30">
                                                    <div className="eduman-course-thumb w-img">
                                                        <Link href={`/course/${course.slug}`} legacyBehavior><a><img src={getImage(course.image_url)} alt="course-img" /></a></Link>
                                                    </div>
                                                    <div className="course-cart">
                                                        <div className="course-info-wrapper">
                                                            <div className="cart-info-body">
                                                                {course.categories && course.categories.slice(0, 1).map((cat: ICourse) => (
                                                                    <span key={`cat1-${cat.title}`} className="category-color category-color-1">
                                                                        <Link href={`/category/${cat.slug}`} legacyBehavior><a>{cat.title}</a></Link>
                                                                    </span>
                                                                ))}
                                                                <Link href={`/course/${course.slug}`} legacyBehavior><a><h3>{course.title}</h3></a></Link>
                                                                <div className="cart-lavel">
                                                                    <h5>Độ khó: <span>{course.level}</span></h5>
                                                                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(course.more_info) }} />
                                                                </div>
                                                                <div className="info-cart-text" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(course.teaser) }} />
                                                                <div className="course-action">
                                                                    <Link href={`/course/${course.slug}`} legacyBehavior><a className="view-details-btn">Xem chi tiết</a></Link>
                                                                    <Link href={`/my-wishlist?cid=${course.id}`} legacyBehavior><a>
                                                                        <button className="wishlist-btn"><i className="flaticon-like"></i></button>
                                                                    </a></Link>
                                                                    <Link href={`/course/${course.slug}`} legacyBehavior><a className="c-share-btn"><i className="flaticon-previous"></i></a></Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="eduman-course-wraper">
                                                        <div className="eduman-course-heading">
                                                            {course.categories && course.categories.slice(0, 1).map((cat: ICourse) => (
                                                                <div key={cat.title}>
                                                                    <Link href={`/category/${cat.slug}`} legacyBehavior><a className="course-link-color-1">{cat.title}</a></Link>
                                                                </div>
                                                            ))}
                                                            <span className="couse-star d-none"><i className={course.rating}></i>{course.ratingNumber} {course.ratingCount}</span>
                                                        </div>
                                                        <div className="eduman-course-text">
                                                            <h3><Link href={`/course/${course.slug}`} legacyBehavior><a>{course.title}</a></Link></h3>
                                                        </div>
                                                        <div className="eduman-course-meta">
                                                            <div className="eduman-course-price">
                                                                {course.price !== "Free" && <span className="price-now">${course.price}</span>}
                                                                {course.price == "Free" && <span className="price-now">{course.price}</span>}
                                                                {course.discount && <del className="price-old">${course?.discount}</del>}
                                                            </div>
                                                            <div className="eduman-course-tutor">
                                                                {course?.authors && course.authors.map((instructor: IAuthor) => (
                                                                    <div key={instructor.first_name}>
                                                                        <Link href="/instructor-profile" legacyBehavior><a><img src={getImage(instructor.logo_url)} alt="tutor-img" /></a></Link>
                                                                        <Link href="/instructor-profile" legacyBehavior><a>{instructor.salute_name + ' ' + instructor.titel_name + ' ' + instructor.first_name + ' ' + instructor.last_name}</a></Link>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="eduman-course-footer">
                                                        <div className="course-lessson-svg">
                                                            <i className="fal fa-tv"></i>
                                                            <span className="ms-2">{course.lessons.length} {course.lessons.length > 1 ? "Khoá học" : "Khoá học"}</span>
                                                        </div>
                                                        <div className="course-deteals-btn">
                                                            <Link href={`/course/${course.slug}`} legacyBehavior><a><span className="me-2">Xem chi tiết</span><i className="far fa-arrow-right"></i></a></Link>
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

export default InstructorProMain;