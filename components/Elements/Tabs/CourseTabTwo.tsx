import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ICourse } from '../../../interfaces/course';
import { v4 as uuidv4 } from 'uuid';
import getImage from '../../../helpers/getImage';
import DOMPurify from 'isomorphic-dompurify';

const CourseTabTwo = () => {
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")
    const [allItems, setAllItems] = useState([])
    const [displayItems, setDisplayItems] = useState([])
    interface iDataType {
        home_01_course_section_title : string;
     };
    const [sectionData, setSectionData] = useState<iDataType>();

    useEffect(() => {
        if (!Object.keys(allItems).length) {
            fetch(
                `${process.env.APP_BACK_END_URL}/courses/tabs-courses-and-categories`,
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
                    if (response.data !== 'undefined') {
                        let all_categories = Object.values(response.data.cats);
                        let selected_category = all_categories[0] ?? "";
                        let selected_items = response.data.courses

                        setAllItems(response.data.courses)
                        setCategories(all_categories)
                        setDisplayItems(selected_items)
                    }
                })
                .catch(err => console.error(err))

            fetch(
                `${process.env.APP_BACK_END_URL}/setting/home-01/course`,
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
                    setSectionData(response?.data ?? "")
                })
                .catch(err => console.error(err))
        }


    }, [categories, selectedCategory, allItems, sectionData])

    const handleCategorySelect = (category: any) => {
        setSelectedCategory(category)
        setDisplayItems(allItems[category])
    }

    return typeof displayItems !== 'undefined' ? (
        <section className="course-area p-relative pt-110 pb-90">
            <div className="course-shape-1">
                <img src="assets/img/shape/portfolio-shap-1.png" alt="shape" />
            </div>
            <div className="course-shape-2">
                <img src="assets/img/shape/portfolio-shap-2.png" alt="shape" />
            </div>
            <div className="course-shape-3">
                <img src="assets/img/shape/portfolio-shap-3.png" alt="shape" />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-5 col-lg-5 f-left">
                        <div className="section-title mb-50">
                            <h2 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(sectionData.home_01_course_section_title) }}></h2>
                        </div>
                    </div>
                    <div className="col-xl-7 col-lg-7">
                        <div className="portfolio-button mt-60">
                            <nav>
                                <div className="nav portfolio-button-tabs" id="nav-tab" role="tablist">
                                    {
                                        categories && typeof categories.map === "function" &&
                                        categories.map((category, i) => (
                                            <button
                                                key={uuidv4()}
                                                className={`nav-link ${selectedCategory == category ? "active" : ""}`}
                                                id={`nav-${category}-tab`}
                                                data-bs-toggle="tab"
                                                data-bs-target={`#nav-${category}`}
                                                type="button"
                                                role="tab"
                                                aria-controls={`nav-${category}`}
                                                aria-selected="false"
                                                onClick={() => handleCategorySelect(category)}
                                            >
                                                {category}
                                            </button>
                                        ))
                                    }
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="course-main-items">
                    <div className="tab-content portfolio-tabs-content" id="nav-tabContent">
                        {categories && typeof categories.map === "function" &&
                            categories.map((category, i) => (
                                <div className={`tab-pane fade ${category == selectedCategory ? 'show active' : ''}`} id={`nav-${category}`} role="tabpanel" aria-labelledby={`nav-${category}-tab`} key={uuidv4()}>
                                    <div className='row'>
                                        {allItems[category] && allItems[category].map((course: ICourse) => (
                                            <div className="col-xl-4 col-lg-4 col-md-6" key={uuidv4()}>
                                                <div className="eduman-course-main-wrapper mb-30">
                                                    <div className="eduman-course-thumb w-img">
                                                        <Link href="/course-details" legacyBehavior><a><img src={getImage(course.image_url)} alt="course-img" /></a></Link>
                                                    </div>
                                                    <div className="course-cart">
                                                        <div className="course-info-wrapper">
                                                            <div className="cart-info-body">
                                                                <div className='cart-info-body-categories'>
                                                                    {course.categories && course.categories.map((cat: ICourse) => (
                                                                        <span key={cat.title} className={`category-color category-color-1 ${cat.slug}`}>
                                                                            <Link href={`/category/${cat.slug}`} legacyBehavior><a>{cat.title}</a></Link>
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                                <Link href="/course-details" legacyBehavior><a><h3>{course.title}</h3></a></Link>
                                                                <div className="cart-lavel">
                                                                    <h5>Level : <span>{course.level}</span></h5>
                                                                    <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(course.teaser) }} />
                                                                </div>

                                                                <div className="course-action">
                                                                    <Link href="/course-details" legacyBehavior><a className="view-details-btn">Xem chi tiết</a></Link>
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
                                                            <div className='cart-info-body-categories'>
                                                                {course.categories && course.categories.map((cat: ICourse) => (
                                                                    <div key={cat.title} className={`category-color category-color-1 ${cat.slug}`}>
                                                                        <Link href={`/category/${cat.slug}`} legacyBehavior><a>{cat.title}</a></Link>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <span className="couse-star"><i className={course.rating}></i>{course.ratingNumber} {course.ratingCount}</span>
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
                                                            <span className="ms-2">{course.lessons_count}</span>
                                                        </div>
                                                        <div className="course-deteals-btn">
                                                            <Link href="/course-details" legacyBehavior><a><span className="me-2">Xem chi tiết</span><i className="far fa-arrow-right"></i></a></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    ) : null
};

export default CourseTabTwo;