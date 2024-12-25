import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import getImage from '../../helpers/getImage';
import DOMPurify from 'isomorphic-dompurify';

const StepJourneySection = () => {
    interface iDataType {
        site_become_instructor_section_title: string;
        tab_items: [];
    };
    const [data, setData] = useState<iDataType>()

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
    }, [])

    return typeof data?.site_become_instructor_section_title !== 'undefined' ? (
        <>
            {data && (
                <div className="step-journey-area pt-110 pb-90">
                    <div className="container">
                        <div className="row">
                            <div className="col-xxl-12">
                                <div className="section-title text-center mb-45">
                                    <h2 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.site_become_instructor_section_title) }} />
                                </div>
                            </div>
                            <div className="col-xxl-12">
                                <ul className="nav nav-tabs step-journey justify-content-center" id="myTab" role="tablist">
                                    {data.tab_items && data.tab_items.map((item: any, index: any) => (
                                        <li className="nav-item" role="presentation" key={uuidv4()}>
                                            <button className={`nav-link${index == 0 ? ' active' : ''}`} id={`jam${index}-tab`} data-bs-toggle="tab" data-bs-target={`#jam${index}`} type="button" role="tab" aria-controls={`jam${index}`} aria-selected="true">{item.title}</button>
                                        </li>
                                    ))}
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    {data.tab_items && data.tab_items.map((item: any, index: any) => (
                                        <div className={`tab-pane fade${index == 0 ? '  show active' : ''}`} id={`jam${index}`} role="tabpanel" aria-labelledby={`#jam${index}-tab`} key={uuidv4()}>
                                            <div className="step-tab-content pt-60 mb-30">
                                                <div className="row">
                                                    <div className="col-xl-6 col-lg-6">
                                                        <div className="step-journey-box mb-30" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.content) }} />
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6">
                                                        <div className="step-journey-thumb d-flex-align-items-center">
                                                            <img src={getImage(item.image)} alt="step-journey" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    ) : null
};

export default StepJourneySection;