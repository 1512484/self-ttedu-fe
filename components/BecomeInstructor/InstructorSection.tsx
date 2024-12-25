import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const InstructorSection = () => {
    interface iDataType {
        site_about_instructor_title : string;
        site_about_instructor_description: string;
        site_about_instructor_btn_url: string;
        site_about_instructor_btn_text: string;
     };
     const [data, setData] = useState<iDataType>()

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
            .then((response) => {
                setData(response.data);
            })
            .catch(err => console.error(err))
    }, [])
    return typeof data !== 'undefined'  &&  data !== null ? (
        <>
            {data && (
                <div className="become-intructor-areaa pb-120">
                    <div className="container">
                        <div className="row justify-content-center text-center">
                            <div className="col-xl-6 col-md-8">
                                <div className="become-intructor-text">
                                    <h2>{data?.site_about_instructor_title?? ""}</h2>
                                    <p>{data?.site_about_instructor_description}</p>
                                    <Link href={data?.site_about_instructor_btn_url ?? "/"} legacyBehavior><a className="edu-btn">{data?.site_about_instructor_btn_text}</a></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    ) : null
};

export default InstructorSection;