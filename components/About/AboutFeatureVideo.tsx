import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import getImage from '../../helpers/getImage';
import ModalVideo from 'react-modal-video';
import DOMPurify from 'isomorphic-dompurify';

const AboutFeatureVideo = (data: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const openVideoModal = () => setIsOpen(!isOpen);

    return typeof data !== 'undefined'  &&  data !== null ? (
        <>
            {data && (
                <div className="features-video-area">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10 col-md-9">
                                <div className="feature-video-wrap">
                                    <ModalVideo channel='youtube' isOpen={isOpen} videoId={data.sectionData.site_about_intro_video} onClose={() => { openVideoModal(); }} />
                                    <div className="features-video-wrapper">
                                        <div className="features-shape-wrapper-1"> 
                                            <img className="features-shape" src={'assets/img/shape/features-shape.png'} alt="features-shape" />
                                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.sectionData.site_about_intro_promo_text) }} />
                                        </div>
                                        <div className="features-shape-werapper-2">
                                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.sectionData.site_about_intro_promo_text2) }} />
                                            <img className="features-shape-2" src={'assets/img/shape/features-shape-2.png'} alt="features-shape-2" />
                                        </div>
                                        <div className="reatures-video-thumb">
                                            <img src={getImage(data.sectionData.site_about_intro_video_image)} alt="features-img" />
                                        </div>
                                        <div className="features-video-content">
                                            <div className="features-btn">
                                                <span className="popup-video" onClick={() => { openVideoModal(); }}><i className="fas fa-play"></i></span>
                                            </div>
                                            <div className="video-btn-text">
                                                <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.sectionData.site_about_intro_btn_text) }} />
                                            </div>
                                        </div>
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

export default AboutFeatureVideo;