import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import CounterSectionThree from '../HomeThree/CounterSectionThree';
import FeatureScetion from './FeatureScetion';
import InstructorSection from './InstructorSection';

const StepJourneySection = dynamic(() => import('./StepJourneySection'), {
    ssr: false
  })

const BecomeInstructorMain = () => {

    const [data, setData] = useState([])
    const [sectionData, setSectionData] = useState({})
    const [pageData, setPageData] = useState({})

    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/inner-page/become-instructor`,
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

        fetch(
            `${process.env.APP_BACK_END_URL}/setting/inner-page/become-instructor`,
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
        let data = {
            'title': res.data?.site_become_instructor_title,
            'sub_title': res.data?.site_become_instructor_sub_title,
            'image': res.data?.site_become_instructor_banner_image,
            'description': res.data?.site_become_instructor_description,
            'keywords': res.data?.site_become_instructor_keywords,
            'url': process.env.APP_BASE_URL
        }
        setPageData(data);
    }

    return typeof data !== 'undefined'  &&  data !== null ? (
        <main>
            <Breadcrumb pageData={pageData} />
            <FeatureScetion />
            <CounterSectionThree />
            <StepJourneySection />
            <InstructorSection />
        </main>
    ) : null
};

export default BecomeInstructorMain;