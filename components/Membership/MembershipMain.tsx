import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Breadcrumb from '../Common/Breadcrumb';
const MembershipPrice = dynamic(() => import('./MembershipPrice'), {
    ssr: false
})

const MembershipMain = () => {
    const [sectionData, setSectionData] = useState({})
    const [pageData, setPageData] = useState({})

    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/inner-page/membership`,
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
            'title': "Mua khoá học",
            'sub_title': res.data.site_membership_title,
            'image': res.data.site_membership_banner_image,
            'description': res.data.site_membership_description
        }
        setPageData(data);
    }

    return typeof pageData !== 'undefined' && pageData !== null ? (
        <main>
            <Breadcrumb pageData={pageData} />
            <MembershipPrice sectionData={sectionData} />
        </main>
    ) : null;
};

export default MembershipMain;