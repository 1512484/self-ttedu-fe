import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ICourse } from '../../interfaces/course';
import getImage from '../../helpers/getImage';
import { v4 as uuidv4 } from 'uuid';
import DOMPurify from 'isomorphic-dompurify';

const AcademicCourse = () => {
    const [data, setData] = useState([])
    const [sectionData, setSectionData] = useState("");
    const [courseBtn, setCourseBtn] = useState("");
    const [courseUrl, setCourseUrl] = useState("");

    useEffect(() => {
        if (!sectionData.length || !courseBtn.length || !courseUrl.length) {
            fetch(
                `${process.env.APP_BACK_END_URL}/setting/home-03/course`,
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
                    setSectionData(response.data.home_03_course_section_title ?? "")
                    setCourseBtn(response.data.home_03_course_btn_text ?? "")
                    setCourseUrl(response.data.home_03_course_btn_url ?? "")
                })
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
                .then((response) => {
                    setData(response.data);
                })
                .catch(err => console.error(err))
        }
    }, [sectionData, courseBtn, courseUrl])

    return typeof data !== 'undefined'  &&  data !== null ? (
        <div className="academic-courses-area p-relative pt-110 pb-120">
            <img className="academic-shape-2" src="assets/img/shape/acadenic-shape-2.png" alt="shape" />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-4 col-lg-4">
                        <div className="section-title mb-50 text-center">
                            <h2 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(sectionData) }}></h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {data && data.slice(0, 3).map((course: ICourse) => (
                        <div className="col-xl-4 col-lg-6 col-md-6" key={uuidv4()}>
                            <div className="academic-box position-relative mb-30">
                                <div className="academic-thumb">
                                    <img src={getImage(course.image_url)} alt="img not found" />
                                </div>
                                <div className="academic-content">
                                    <div className="academic-content-header">
                                        <Link href={`/course/${course.slug}`} legacyBehavior><a><h3>{course.title.substring(0,45)} {course.title.length > 45 ? `...` : ''}</h3></a></Link>
                                    </div>
                                    <div className="academic-body">
                                        {course.authors && course.authors.map((author: any) => (
                                            <div className="academic-tutor d-flex align-items-center" key={uuidv4()}>
                                                <img src={getImage(author.logo_url)} alt="img not found" />
                                                <Link href={`/instructor/${author.slug}`} legacyBehavior><a>{author.salute_name + ' ' + author.titel_name + ' ' + author.first_name + ' ' + author.last_name}</a></Link>
                                            </div>
                                        ))}
                                        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(course.more_info) }} />
                                    </div>
                                    <div className="academic-footer">
                                        <div className="coursee-clock">
                                            <i className="flaticon-wall-clock"></i><span>{course.duration}</span>
                                        </div>
                                        <div className="course-creadit">
                                            <i className="flaticon-menu-1"></i><span>{course.credit} {course.credit > 1 ? "credits" : "credit"}</span>
                                        </div>
                                        <Link href={`/course/${course.slug}`} legacyBehavior><a className="edo-course-sec-btn">Apply now</a></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row justify-content-center">
                    <div className="col-xl-3 text-center">
                        <div className="academic-bottom-btn ">
                            <Link href={courseUrl ?? ""} legacyBehavior><a className="edo-theme-btn mt-30">{courseBtn}</a></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null
};

export default AcademicCourse;