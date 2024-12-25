import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import ContactFormSection from './ContactFormSection';
import ContactMap from './ContactMap';
import ContactSidebar from './ContactSidebar';

const ContactMain = () => {
    const [data, setData] = useState([])
    const [sectionData, setSectionData] = useState({})
    const [pageData, setPageData] = useState({})

    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/inner-page/contact`,
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
            `${process.env.APP_BACK_END_URL}/setting/inner-page/contact`,
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
            'title': "Liên hệ",
            'sub_title': res.data?.site_contact_sub_title,
            'image': res.data?.site_contact_banner_image,
            'description': res.data?.site_courses_description,
            'keywords': res.data?.site_courses_keywords,
            'url': process.env.APP_BASE_URL
        }
        setPageData(data);
    }

    return typeof pageData !== 'undefined' && pageData !== null ? (
        <main>
            <Breadcrumb pageData={pageData} />

            <div className="contact-area pt-120 pb-90">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-7 col-md-12">
                            <div className="contact-area-wrapper">
                                <ContactFormSection sectionData={sectionData} />
                                <ContactMap />
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-5 col-md-8">
                            <ContactSidebar sectionData={sectionData} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    ) : null
};

export default ContactMain;