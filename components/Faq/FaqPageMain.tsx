import React, { useEffect, useState } from 'react';
import BreadcrumbTwo from '../Common/BreadcrumbTwo';
import Link from 'next/link';
import { IFaq } from '../../interfaces/faq';

const FaqPageMain = () => {
    const [studentData, setStudentData] = useState([])
    const [instructorData, setInstructorData] = useState([])
    const [sectionData, setSectionData] = useState({})
    const [pageData, setPageData] = useState({})

    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/inner-page/faqs`,
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
            `${process.env.APP_BACK_END_URL}/faqs`,
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
                setStudentData(response.data);
                setInstructorData(response.dataInstructor);
            })
            .catch(err => console.error(err))
    }, [])

    const handleResponseData = (res) => {
        setSectionData(res.data);
        let data = {
            'title': "Chào mừng bạn đến trung tâm trợ giúp! Bạn muốn được hỗ trợ về?",
            'sub_title': "Câu hỏi thường gặp",
            'image': res.data.site_faq_banner_image,
            'description': res.data?.site_faq_description,
            'keywords': res.data?.site_faq_keywords,
            'url': process.env.APP_BASE_URL
        }
        setPageData(data);
    }

    return typeof pageData !== 'undefined' ? (
        <main>
            <BreadcrumbTwo pageData={pageData} />


            <div className="faq-topic-area pb-60">
                <div className="container">
                    <div className="faq-tabs-area mt-50">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="faq-nav-tab">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home"
                                                type="button" role="tab" aria-controls="home" aria-selected="true">Student</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile"
                                                type="button" role="tab" aria-controls="profile"
                                                aria-selected="false">Instructor</button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="faq-nav-content">
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                            <div className="faq-area pt-30 pb-30">
                                                <div className="row">
                                                    <div className="col-xl-12">
                                                        <div className="faq-tittle-info text-center pt-55 mb-50">
                                                            <h2>Frequently Asked Queastions</h2>
                                                        </div>
                                                    </div>
                                                    {studentData && studentData.map((question: IFaq) => (
                                                        <div className="col-xl-4 col-md-6" key={question.id}>
                                                            <div className="faq-wrapper mb-30">
                                                                <div className="faq-question-item">
                                                                    <div className="faq-queastion-text">
                                                                        <Link href={`/faq/${question.slug}`} legacyBehavior><a>{question.title}</a></Link>
                                                                    </div>
                                                                    <div className="faqicon-arrow">
                                                                        <Link href={`/faq/${question.slug}`} legacyBehavior><a><i className="far fa-chevron-right"></i></a></Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <div className="faq-area pt-30 pb-30">
                                                <div className="row">
                                                    <div className="col-xl-12">
                                                        <div className="faq-tittle-info text-center pt-55 mb-50">
                                                            <h2>Frequently Asked Queastions</h2>
                                                        </div>
                                                    </div>
                                                    {instructorData && instructorData.map((question: IFaq) => (
                                                        <div className="col-xl-4 col-md-6" key={question.id}>
                                                            <div className="faq-wrapper mb-30">
                                                                <div className="faq-question-item">
                                                                    <div className="faq-queastion-text">
                                                                        <Link href={`/faq/${question.slug}`} legacyBehavior><a>{question.title}</a></Link>
                                                                    </div>
                                                                    <div className="faqicon-arrow">
                                                                        <Link href={`/faq/${question.slug}`} legacyBehavior><a><i className="far fa-chevron-right"></i></a></Link>
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
                        </div>
                    </div>
                </div>
            </div>
        </main>
    ) : null
};

export default FaqPageMain;