import React, { useEffect, useState } from "react";
import { IClass } from "../../interfaces/class";
import Link from 'next/link';
import { useRouter } from "next/router";
import { v4 as uuidv4 } from 'uuid';
import storage from "local-storage-fallback"
import { LOCAL_STORAGE_KEYS } from '../../hooks/useStorage';
import moment from 'moment';
import DOMPurify from 'isomorphic-dompurify';

const ClassDetailsMain = () => {
    const router = useRouter();
    const slug = router.query.slug;
    const [navActive, setNavActive] = useState("")
    const [active, setActive] = useState("")
    const [data, setData] = useState<IClass>()
    
    useEffect(() => {
        const UserObj = JSON.parse(storage.getItem(LOCAL_STORAGE_KEYS.APP_USER));
        if(UserObj?.id ==  null)
        {
            router.push('/login');
        }
        else {
            const endDate = moment(UserObj.end_at);
            const todayDate = moment(new Date());
            const diffDays = endDate.diff(todayDate, 'days');
            if(UserObj?.id !=  null && diffDays <= 0)
            {
                router.push('/membership');
            }
        }
        
        fetch(
            `${process.env.APP_BACK_END_URL}/class/details?slug=${slug}`,
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

    const handleClick = e => {
        let tabClass = e.currentTarget.attributes['data-class'].value;
        let tabName = e.currentTarget.attributes['data-value'].value;
        setNavActive(tabName)
        setActive(tabClass);
    };

    return typeof data?.title !== 'undefined' ? (
        <main>
            {data && (
                <div className="bd-class-area pt-100 pb-120">
                    <div className="container-fluid">
                        <div className="header-main-wrapper">
                            <div className="bd-class-main">
                                <div className="bd-class-sidebar">
                                    <div className="bd-class-sidebar-header">
                                        <h3>{data?.title}</h3>
                                        <i className="far fa-chevron-right"></i>
                                    </div>
                                    <div className="bd-class-lessons">
                                        <ul>
                                            <li>
                                                {data?.lessons && data?.lessons.map((lesson: any, index: number) => (
                                                    <ul className={`bd-class-lesson-item ${active == 'lesson-'+index ||  navActive == 'lesson-'+index ? 'active' : ''}`} key={index}>
                                                        <li data-value={`lesson`} data-class={'lesson-'+index} onClick={handleClick}>
                                                            <span><i className="far fa-check-circle circle-icon"></i>{lesson.title} <i className="far fa-chevron-down right-arrow-down"></i><i className="far fa-chevron-up right-arrow-up"></i></span>
                                                        </li>
                                                        <li className="topic-quiz-wrap">    
                                                            {lesson?.topics && (
                                                                <ul className="bd-class-lesson-item-topics">
                                                                    {lesson?.topics && lesson?.topics.map((topic: any, topicIndex: number) => (
                                                                        <li data-value={`lesson-${index}`} data-class={'topic-'+topicIndex+'-'+index} onClick={handleClick} key={uuidv4()}><i className="far fa-ballot-check ballot-icon"></i>{topic?.title}</li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                            {lesson?.class_test && (
                                                                <ul className="bd-class-lesson-item-test">
                                                                    <li data-value={`lesson-${index}`} data-class={'quiz-'+index} onClick={handleClick}><i className="far fa-ballot-check ballot-icon"></i>{lesson?.class_test?.title}</li>
                                                                </ul>
                                                            )}
                                                        </li>
                                                    </ul>
                                                ))}
                                            </li>
                                        </ul>
                                        {data?.quiz &&
                                            <ul>
                                                <li><Link href={`/quiz/${data?.quiz.slug ?? "/"}?cid=${data?.course_id}`} legacyBehavior><a><i className="far fa-arrow-circle-right"></i>Final Exam</a></Link></li>
                                            </ul>
                                        }
                                    </div>
                                </div>
                                <div className="bd-class-content">
                                    <div className="bd-class-content-single mb-20">
                                        {data?.lessons && data?.lessons.map((lesson: any, index: number) => (
                                            <div className="bd-class-content-single-inner" key={uuidv4()}>
                                                <div className={`bd-class-content-single-item ${active == 'lesson-'+index ? 'active' : ''}`}>
                                                    <div data-id={`lesson-${index}`} className="bd-class-content-single-title">${index} - {lesson.title}</div>
                                                    <div className="bd-class-content-single-description pt-50 pb-50" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(lesson.description) }} />
                                                </div>
                                                {lesson?.topics && lesson?.topics.map((topic: any, topicIndex: number) => (
                                                <div className={`bd-class-content-single-item ${active == 'topic-'+topicIndex+'-'+index ? 'active' : ''}`} key={topicIndex+'-'+index}>
                                                    <div data-id={`topic-${topicIndex+'-'+index}`} className="bd-class-content-single-title">{topic?.title}</div>
                                                    <div className="bd-class-content-single-description pt-50 pb-50" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(topic?.description) }} />
                                                </div>
                                                ))}
                                                {lesson?.class_test && (
                                                    <div className={`bd-class-content-single-item ${active == 'quiz-'+index ? 'active' : ''}`}>
                                                        <div data-id={`quiz-${index}`} className="bd-class-content-single-title">{lesson?.class_test?.title}</div>
                                                        <div className="bd-class-content-single-description pt-50 pb-50" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(lesson?.class_test?.title) }} />
                                                    </div>
                                                )}
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

export default ClassDetailsMain;