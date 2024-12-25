import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import getImage from '../../helpers/getImage';

const ErrorPageMain = () => {
    interface iDataType {
        site_404_title: string;
        site_404_logo: string
        site_404_description: string
        site_404_details: string
        site_404_btn_url: string
        site_404_btn_text: string
    };
    const [data, setData] = useState<iDataType>()

    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/inner-page/404-page`,
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

    return typeof data?.site_404_title !== 'undefined' ? (
        <main>
            {data.site_404_title && (
                <div className="content-error-area pt-120 pb-120">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-8">
                                <div className="content-error-item text-center">
                                    <div className="error-thumb">
                                        <img src={getImage(data.site_404_logo)} alt="image not found" />
                                    </div>
                                    <div className="section-title">
                                        <h2 className="mb-20">{data.site_404_title}</h2>
                                        <p>{data.site_404_description}</p>
                                    </div>
                                    <div className="error-btn">
                                        <Link href={data.site_404_btn_url ?? "#"} legacyBehavior><a className="edu-btn">{data.site_404_btn_text}</a></Link>
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

export default ErrorPageMain;