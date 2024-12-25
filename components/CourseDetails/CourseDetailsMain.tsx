import React, { useEffect, useReducer, useState } from "react";
import Link from 'next/link';
import CourseCurriculam from "./CourseCurriculam";
import CourseDetailsInstructor from "./CourseDetailsInstructor";
import CourseDetailsSidebar from "./CourseDetailsSidebar";
import CourseReviews from "./CourseReviews";
import { ICourse } from "../../interfaces/course";
import { IPageData } from "../../interfaces/pageData";
import { useRouter } from "next/router";
import getImage from "../../helpers/getImage";
import { v4 as uuidv4 } from 'uuid';
import formatDate from "../../helpers/formatDate";
import Preloader from "../Common/Preloader";
import DOMPurify from 'isomorphic-dompurify';

const initialState = {
    isActive: true,
}
const reducer = (state: { isActive: any; }, action: any) => {
    switch (action) {
        case "writeReview":
            return {
                ...state,
                isActive: !state.isActive,
            };
        default:
            throw new Error("Unexpected action");
    }
};

const CourseDetailsMain = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const router = useRouter();
    const [data, setData] = useState<ICourse>()
    const [sectionData, setSectionData] = useState({})
    const [pageData, setPageData] = useState<IPageData>()
    const slug = router.query.slug;

    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/courses/details?slug=${slug}`,
            {
                next: { revalidate: 300 },
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            }
        )
            .then(response => response.json())
            .then((response) => {
                if (response.data.title) {
                    setData(response.data);
                }
                else {
                    router.push('/404');
                }
            })
            .catch(err => console.error(err))

        fetch(
            `${process.env.APP_BACK_END_URL}/setting/inner-page/course-details?slug=${slug}`,
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
            'title': res.data?.site_course_details_title,
            'sub_title': res.data?.site_course_details_sub_title,
            'image': res.data?.site_course_details_banner_image,
            'description': res.data?.site_course_details_description,
            'keywords': res.data?.site_course_details_keywords,
            'url': process.env.APP_BASE_URL ?? ""
        }
        setPageData(data);
    }

    if (!data) return <Preloader />

    return typeof data !== 'undefined' && data !== null ? (
        <main>
            <div className="hero-arera course-item-height" style={{ background: `url(${getImage(pageData?.image)})` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className='hero-breadcrumb-wrapper'>
                                <div className="hero-course-1-text">
                                    <h2>Chi tiết khoá học</h2>
                                </div>
                                <div className="course-title-breadcrumb">
                                    <nav>
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><Link href="/courses" legacyBehavior><a>Khoá học</a></Link></li>
                                            <li className="breadcrumb-item"><span>Chi tiết khoá học</span></li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {data && (
                <section className="course-detalis-area pb-65">
                    <div className="container">
                        <div className="row">
                            <div className="col-xxl-8 col-xl-8">
                                <div className="course-detalis-wrapper mb-30">
                                    <div className="course-heading mb-20">
                                        <h2>{data.title}</h2>
                                    </div>
                                    <div className="course-detelis-meta" >
                                        {data.authors && data.authors.map((author: any) => (
                                            <div className="course-meta-wrapper border-line-meta" key={uuidv4()}>
                                                <div className="course-meta-img">
                                                    <Link href={`/instructor/${author.slug}`} legacyBehavior><a><img src={getImage(author.logo_url)} alt="course-meta" /></a></Link>
                                                </div>
                                                <div className="course-meta-text">
                                                    <span>Created by</span>
                                                    <h6>
                                                        <Link href={`/instructor/${author.slug}`} legacyBehavior><a>{author.salute_name + ' ' + author.titel_name + ' ' + author.first_name + ' ' + author.last_name}</a></Link>
                                                    </h6>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="course-Enroll border-line-meta">
                                            <p>Học sinh đã đăng kí</p>
                                            <span>{data.enrol_users.length}</span>
                                        </div>
                                        <div className="course-update border-line-meta">
                                            <p>Cập nhật gần nhất</p>
                                            {
                                                data?.updated_at && <span>{formatDate(data?.updated_at)}</span>
                                            }
                                        </div>
                                        <div className="course-category">
                                            <p>Phân loại</p>
                                            <div className='cart-info-body-categories'>
                                                {data.categories && data.categories.map((category: any) => (
                                                    <span key={uuidv4()} className={`${category.slug}`}>
                                                        <Link href={`/category/${category.slug}`} legacyBehavior><a>{category.title}</a></Link>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.description) }} />
                                    <CourseCurriculam courseId={data.id} slug={slug} />
                                    <CourseDetailsInstructor instructor={data} />
                                    <CourseReviews courseId={data.id} />
                                </div>
                            </div>
                            <div className="col-xxl-4 col-xl-4 col-lg-8 col-md-8">
                                <CourseDetailsSidebar data={data} />
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </main>
    ) : null
};

export default CourseDetailsMain;