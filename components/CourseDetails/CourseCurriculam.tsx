import React, { useEffect, useState } from 'react';
import { ICourse } from '../../interfaces/course';
import { v4 as uuidv4 } from 'uuid';
import DOMPurify from 'isomorphic-dompurify';
import Link from 'next/link';

const CourseCurriculam = (prop: any) => {
    const [data, setData] = useState([])
    const courseId = prop.courseId;
    const slug = prop.slug;
    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/lessons/by-course?courseId=${courseId}`,
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

    return typeof data !== 'undefined' && data !== null ? (
        <>
            {data.length > 0 &&
                <div className="course-curriculum pt-40 pb-10">
                    <div className="course-curriculam">
                        <h4>Curriculum</h4>
                    </div>
                    <ul>
                        <li> {data.length > 1 ? data.length + ' lessons' : data.length + ' lesson'}</li>
                    </ul>
                    <div className="course-curriculam-accodion mt-30">
                        <div className="accordion" id="accordionExample">
                            {data && data.map((curriculam: ICourse, lCount: number) => (
                                <div className="accordion-item" key={uuidv4()}>
                                    <div className="accordion-body" id={`heading-${lCount}`}>
                                        <button className={`accordion-button${(lCount != 0) ? ' collapsed' : ''}`} type="button" data-bs-toggle="collapse"
                                            data-bs-target={`#collapse-${lCount}`} aria-expanded="true"
                                            aria-controls={`collapse-${lCount}`}>
                                            <span className="accordion-header">
                                                <span className="accordion-tittle">
                                                    <span>{lCount + 1}. {curriculam.title}</span>
                                                </span>
                                            </span>
                                        </button>
                                    </div>
                                    <div id={`collapse-${lCount}`} className={`accordion-collapse collapse px-4 py-2 ${(lCount == 0) ? ' show' : ''}`}
                                        aria-labelledby={`heading-${lCount}`} data-bs-parent="#accordionExample">
                                        <div className="accordion-body" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(curriculam.teaser) }} />
                                        <div className="d-flex justify-content-end p-2 mt-4">
                                            <Link href={`/lesson/${slug}/${curriculam.slug}`} legacyBehavior>
                                                <a className='view-lesson-detail'>Xem bài học <i className="fa fa-angle-double-right"></i></a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </>
    ) : null
};

export default CourseCurriculam;