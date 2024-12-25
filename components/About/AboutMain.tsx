import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import StudentChooseSection from '../Home/StudentChooseSection';
import AboutCounterSection from './AboutCounterSection';
import AboutFeatureSection from './AboutFeatureSection';
import AboutFeatureVideo from './AboutFeatureVideo';
import AffiliateSection from './AffiliateSection';
import BecomeInstructorSection from './BecomeInstructorSection';
import KnowUsBetter from './KnowUsBetter';

const AboutMain = () => {
    const [sectionData, setSectionData] = useState({})
    const [pageData, setPageData] = useState({})
    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/inner-page/about`,
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
    }, [])

    const handleResponseData = (res) => {
        setSectionData(res.data);
        setPageData({
            'title': "Giới thiệu",
            'sub_title': res.data?.site_about_sub_title,
            'image': res.data?.site_about_banner_image,
            'description': res.data?.site_about_description,
            'keywords': res.data?.site_about_keywords,
            'url': process.env.APP_BASE_URL
        });
    }

    return typeof pageData !== 'undefined' && pageData !== null ? (
        <main>
            <Breadcrumb pageData={pageData} />
            <StudentChooseSection />
            <AboutFeatureSection sectionData={sectionData} />
            <AboutFeatureVideo sectionData={sectionData} />
            <AboutCounterSection />
            <KnowUsBetter sectionData={sectionData} />
            <BecomeInstructorSection sectionData={sectionData} />
            <AffiliateSection />
        </main>
    ) : null
};

export default AboutMain;