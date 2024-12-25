import Link from 'next/link';
import Head from 'next/head';
import React from 'react';
import getImage from '../../helpers/getImage';

const Breadcrumb = (settingData) => {
    return typeof settingData?.pageData.title !== 'undefined' ? (
        <>
            <Head>
                <title>{settingData.pageData.title}</title>
                <meta name="description" content={settingData.pageData.description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="hero-arera course-item-height" style={{ backgroundImage: `url(${getImage(settingData?.pageData?.image)})` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className='hero-breadcrumb-wrapper'>
                                <div className="hero-course-1-text">
                                    <h2>{settingData.pageData.title}</h2>
                                </div>
                                <div className="course-title-breadcrumb">
                                    <nav>
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><Link href="/" legacyBehavior><a>Trang chủ</a></Link></li>
                                            <li className="breadcrumb-item"><span>{settingData.pageData.title}</span></li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) : null;
};

export default Breadcrumb;