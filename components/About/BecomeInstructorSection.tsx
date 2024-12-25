import Link from 'next/link';
import React from 'react';

const BecomeInstructorSection = (data) => {
    return typeof data !== 'undefined'  &&  data !== null ? (
        <>
            {data && (
                <div className="become-intructor-area pt-110 pb-120">
                    <div className="container">
                        <div className="row justify-content-center text-center">
                            <div className="col-xl-6 col-md-8">
                                <div className="become-intructor-text">
                                    <h2>{data.sectionData?.site_about_instructor_title?? ""}</h2>
                                    <p>{data.sectionData?.site_about_instructor_description}</p>
                                    <Link href={data.sectionData?.site_about_instructor_btn_url ?? "/"} legacyBehavior><a className="edu-btn">{data.sectionData?.site_about_instructor_btn_text}</a></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    ) : null
};

export default BecomeInstructorSection;