import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import getImage from '../../helpers/getImage';
import Preloader from '../Common/Preloader';

const HeroSectionThree = () => {
    interface iDataType {
        home_03_header_title: string;
        home_03_header_sub_title: string;
        home_03_header_image: string;
        home_03_header_button_url: string;
        home_03_header_button_text: string;
    };
    const [data, setData] = useState<iDataType>()

    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/home-03/header`,
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

    if (!data) return <Preloader />

    return typeof data?.home_03_header_title !== 'undefined' ? (
        <>
            {data && (
                <div className="hero-area-3 hero-height-3" style={{ backgroundImage: `url(${getImage(data.home_03_header_image)})` }}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-8 col-lg-8 text-center">
                                <div className='hero-university-text-wrap'>
                                    <div className="hero-university-text">
                                        <span>{data.home_03_header_sub_title}</span>
                                        <h2>{data.home_03_header_title}</h2>
                                    </div>
                                    <div className="university-btn">
                                        <Link href={data.home_03_header_button_url ?? ""} legacyBehavior><a className="edu-five-btn">{data.home_03_header_button_text}</a></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    ) : null
};

export default HeroSectionThree;