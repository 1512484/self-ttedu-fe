import Link from 'next/link';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import DOMPurify from 'isomorphic-dompurify';

const HeaderTopTwo = ({data}) => {
    return typeof data !== 'undefined'  &&  data !== null ? (
        <>
            {data && (
                <div className="header-top-area d-none d-lg-block">
                    <div className="container-fluid">
                        <div className="header-top-inner">
                            <div className="row align-items-center">
                                <div className="col-xl-9 col-lg-10">
                                    <div className="header-top-icon">
                                        <a href={`tel:${data.site_header_phone}`}><i className="fas fa-phone-alt"></i>{data.site_header_phone}</a>
                                        <a href={`mailto:${data.site_header_email}`}><i className="fal fa-envelope"></i>{data.site_header_email}</a>
                                        <div className='mobile-menu-address-two'>
                                            <i className="fal fa-map-marker-alt"></i><span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.site_header_address) }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-2">
                                    <div className="header-top-login d-flex f-right">
                                        <div className="header-social">
                                        {data.social_links && data.social_links.map((url: any) => (
                                            <span className='social-link' key={uuidv4()}>
                                                <Link href={url.link ?? "/"} legacyBehavior><a target="_blank"><i className={url.icon}></i></a></Link>
                                            </span>
                                            ))}
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

export default HeaderTopTwo;