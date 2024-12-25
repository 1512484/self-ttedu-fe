import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import Link from 'next/link';
import storage from "local-storage-fallback"
import { LOCAL_STORAGE_KEYS } from '../../hooks/useStorage';

const ThankyouMain = () => {
    interface iSectionDataType {
        site_thankyou_message: string
        site_thankyou_btn_text: string
        site_thankyou_btn_url: string
    };
    const [sectionData, setSectionData] = useState<iSectionDataType>()
    const [pageData, setPageData] = useState({})
    const [data, setData] = useState([])
    const bearerToken = storage.getItem(LOCAL_STORAGE_KEYS.APP_TOKEN);
    const UserObj = JSON.parse(storage.getItem(LOCAL_STORAGE_KEYS.APP_USER));
    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/inner-page/thankyou`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            }
        )
            .then(response => response.json())
            .then((response) =>handleResponseData(response))
            .catch(err => console.error(err))
        // users data
        fetch(
            `${process.env.APP_BACK_END_URL}/users/me`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${bearerToken}`,
                },
            }
        )
            .then(response => response.json())
            .then((response) => handleUserResData(response))
            .catch(err => console.error(err))
    }, [])

    const handleResponseData = (res) => {
        setSectionData(res.data);
        let data = {
            'title': res.data.site_thankyou_title, 
            'sub_title': res.data.site_thankyou_sub_title,
            'image': res.data.site_thankyou_banner_image,
            'description': res.data.site_thankyou_description,
            'keywords': res.data?.site_thankyou_keywords,
        } 
        setPageData(data);
    }

    const handleUserResData = (res) => {
        let userData = JSON.stringify({
            id: res.user.id,
            email: res.user.email,
            first_name: res.user.first_name,
            last_name: res.user.last_name,
            role: res.user.role,
            end_at: res.user?.order?.end_at,
        })
        storage.setItem(LOCAL_STORAGE_KEYS.APP_USER, userData)
    }
 
    return (
        <main>
            <Breadcrumb pageData={pageData} />
            <div className="thanks-area pt-110 pb-120">
                    <div className="container">
                        <div className="row justify-content-center text-center">
                            <div className="col-xl-6 col-md-8">
                                <div className="become-intructor-text">
                                    <h2>{sectionData?.site_thankyou_message?? ""}</h2>
                                    <Link href={sectionData?.site_thankyou_btn_url ?? "/"} legacyBehavior><a className="edu-btn">{sectionData?.site_thankyou_btn_text}</a></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </main>
    );
};

export default ThankyouMain;