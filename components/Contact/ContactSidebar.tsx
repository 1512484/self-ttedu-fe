import React from 'react';
import getImage from '../../helpers/getImage';
import { ICourse } from '../../interfaces/course';
import { v4 as uuidv4 } from 'uuid';
import DOMPurify from 'isomorphic-dompurify';

const ContactSidebar = (data) => {
    return (
        <>
            <div className="sidebar-widget-wrapper">
                <div className='support-contact mb-30'>
                    <div className='support-tittle'>
                        <h4>{data.sectionData.site_contact_info_title}</h4>
                    </div>
                    <div className='support-contact-inner'>
                        <div className='support-item'>
                            <div className='support-icon'>
                                <img src={getImage(data.sectionData.site_contact_phone_icon)} alt="icon not found" />
                            </div>
                            <div className='support-info-phone'>
                                <span>{data.sectionData.site_contact_phone_title}</span>
                                {data.sectionData.numbers && data.sectionData.numbers.map((phone: ICourse) => (
                                    <div key={uuidv4()} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(phone.number) }} />
                                ))}
                            </div>
                        </div>
                        <div className='support-item'>
                            <div className='support-icon'>
                                <img src={getImage(data.sectionData.site_contact_email_icon)} alt="icon not found" />
                            </div>
                            <div className='support-info-email'>
                                <span>{data.sectionData.site_contact_email_title}</span>
                                {data.sectionData.emails && data.sectionData.emails.map((message: ICourse) => (
                                    <div key={uuidv4()} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message.email) }} />
                                ))}
                            </div>
                        </div>
                        <div className='support-item'>
                            <div className='support-icon'>
                                <img src={getImage(data.sectionData.site_contact_location_icon)} alt="icon not found" />
                            </div>
                            <div className='support-info-location'>
                                <span>{data.sectionData.site_contact_location_title}</span>
                                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.sectionData.site_contact_location_address) }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactSidebar;