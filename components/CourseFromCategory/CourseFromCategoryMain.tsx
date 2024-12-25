import React, { useEffect, useState } from 'react';
import CourseFromCategoryBar from './CourseFromCategoryBar';
import CourseFromCategorySidebar from './CourseFromCategorySidebar';
import Link from 'next/link';
import { useRouter } from "next/router";
import Breadcrumb from '../Common/Breadcrumb';
import { ICourse } from '../../interfaces/course';
import { ICategory } from '../../interfaces/category';
import getImage from '../../helpers/getImage';
import { v4 as uuidv4 } from 'uuid';
import Preloader from '../Common/Preloader';
import DOMPurify from 'isomorphic-dompurify';

const CourseFromCategoryMain = () => {
    const [data, setData] = useState([])
    const [sectionData, setSectionData] = useState({})
    const [categoriesData, setCategoriesData] = useState({})
    const [pageData, setPageData] = useState({})
    const router = useRouter();
    const slug = router.query.slug;

    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/inner-page/course`,
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
            `${process.env.APP_BACK_END_URL}/courses/all`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            }
        )
            .then(response => response.json())
            .then((response) =>  {
                setData(response.data);
            })
            .catch(err => console.error(err))

            fetch(
                `${process.env.APP_BACK_END_URL}/categories/courses?slug=${slug}`,
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
                    setCategoriesData(response.data);
                })
                .catch(err => console.error(err))
    }, [slug])

    const handleResponseData = (res) => {
        setSectionData(res.data);
        let data = {
            'title': res.data.site_courses_title, 
            'sub_title': res.data.site_courses_sub_title,
            'image': res.data.site_courses_banner_image,
            'description': res.data?.site_courses_description,
            'keywords': res.data?.site_courses_keywords,
            'url': process.env.APP_BASE_URL
        } 
        setPageData(data);
    }

    if (!pageData) return <Preloader />

    return typeof data !== 'undefined'  &&  data !== null ? (
        <main>
            <Breadcrumb pageData={pageData} />

            <CourseFromCategoryBar sectionData={sectionData}  />
            <section className="course-content-area pb-90">
                <div className="container">
                    <div className="row mb-10">
                        <div className="col-xl-3 col-lg-4 col-md-12">
                            <CourseFromCategorySidebar sectionData={sectionData} categoriesData={categoriesData} />
                        </div>
                        <div className="col-xl-9 col-lg-8 col-md-12">
                            <div className="row">
                                {data && data.map((course: ICourse) => (
                                    <div key={uuidv4()} className="col-xl-4 col-lg-6 col-md-6">
                                        <div className="protfolio-course-2-wrapper mb-30">
                                            <div className="student-course-img">
                                                <Link href={`/course/${course.slug}`} legacyBehavior><a><img src={getImage(course.image_url)} alt="course-img" /></a></Link>
                                            </div>
                                            <div className="course-cart">
                                                <div className="course-info-wrapper">
                                                    <div className="cart-info-body">
                                                        {course.categories && course.categories.map((cat: ICategory) => (
                                                            <span key={cat.title} className="category-color category-color-1">
                                                                <Link href={`/category/${cat.slug}`} legacyBehavior><a>{cat.title}</a></Link>
                                                            </span>
                                                        ))}
                                                        <Link href={`/course/${course.slug}`} legacyBehavior><a><h3>{course.title}</h3></a></Link>
                                                        <div className="cart-lavel">
                                                            <h5>Level : <span>{course.level}</span></h5>
                                                            <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(course.teaser) }} />
                                                        </div>
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
                                            <div className="portfolio-course-2-content">
                                                <div className="portfolio-course-wrapper">
                                                    <div className="portfolio-price">
                                                        {course.price !== "Free" && <span>{course.money_sign}{course.price}</span>}
                                                        {course.price == "Free" && <span>{course.money_sign}{course.price}</span>}
                                                        {course.discount && <del>{course.money_sign}{course?.discount}</del>}
                                                    </div> 
                                                    <div className="portfolio-course-2">
                                                        <h3><Link href={`/course/${course.slug}`} legacyBehavior><a>{course.title}</a></Link></h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="course-2-footer">
                                                <div className="coursee-clock">
                                                    <i className="flaticon-clock"></i><span>{course.duration}</span>
                                                </div>
                                                <div className="course-creadit d-none">
                                                    <i className="flaticon-menu-1"></i><span>{course.credit}</span>
                                                </div>
                                                <div className="course-network">
                                                    <i className="fal fa-signal mr-10"></i><span>{course.level.substring(0,20)} {course.level.length > 20 ? `...` : ''}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    ) : null
};

export default CourseFromCategoryMain;