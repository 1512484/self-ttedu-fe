import Link from 'next/link';
import React from 'react';

const WebinarsContent = () => {
    return (
        <>
            <div className="edu-webinar-area pt-120 pb-90">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="edu-webinar mb-30">
                                <div className="edu-webinar-img">
                                    <img src="assets/img/webinar/webinar-img-1.jpg" alt="img not found" />
                                    <span className='webinar-badge'>Upcoming</span>
                                </div>
                                <div className="edu-webinar-text">
                                    <h3 className="edu-webinar-text-title"><Link href="/webinar-details" legacyBehavior><a>WordPress Development Course for Plugins</a></Link></h3>
                                    <ul>
                                        <li><i className="far fa-calendar-alt"></i>12 Dec, 2022</li>
                                        <li><i className="far fa-clock"></i> 10:00 PM</li>
                                    </ul>
                                    <p>Knowledge is power. Information is liberating. Education is the premise of progress, in every society, in every family.</p>
                                    <Link href="/webinar-details" legacyBehavior><a className='edu-btn'>Read More</a></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="edu-webinar mb-30">
                                <div className="edu-webinar-img">
                                    <img src="assets/img/webinar/webinar-img-2.jpg" alt="img not found" />
                                    <span className='webinar-badge'>Upcoming</span>
                                </div>
                                <div className="edu-webinar-text">
                                    <h3 className="edu-webinar-text-title"><Link href="/webinar-details" legacyBehavior><a>Master Google Docs: Free online documents use</a></Link></h3>
                                    <ul>
                                        <li><i className="far fa-calendar-alt"></i>11 Dec, 2022</li>
                                        <li><i className="far fa-clock"></i> 10:00 PM</li>
                                    </ul>
                                    <p>Knowledge is power. Information is liberating. Education is the premise of progress, in every society, in every family</p>
                                    <Link href="/webinar-details" legacyBehavior><a className='edu-btn'>Read More</a></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="edu-webinar mb-30">
                                <div className="edu-webinar-img">
                                    <img src="assets/img/webinar/webinar-img-1.jpg" alt="img not found" />
                                </div>
                                <div className="edu-webinar-text">
                                    <h3 className="edu-webinar-text-title"><Link href="/webinar-details" legacyBehavior><a>Python and Django Full Stack Web Developer</a></Link></h3>
                                    <ul>
                                        <li><i className="far fa-calendar-alt"></i>09 Dec, 2022</li>
                                        <li><i className="far fa-clock"></i> 10:00 PM</li>
                                    </ul>
                                    <p>Knowledge is power. Information is liberating. Education is the premise of progress, in every society, in every family</p>
                                    <Link href="/webinar-details" legacyBehavior><a className='edu-btn'>Read More</a></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="edu-webinar mb-30">
                                <div className="edu-webinar-img">
                                    <img src="assets/img/webinar/webinar-img-2.jpg" alt="img not found" />
                                </div>
                                <div className="edu-webinar-text">
                                    <h3 className="edu-webinar-text-title"><Link href="/webinar-details" legacyBehavior><a>Data Science Real-Life Data Science Exercises Included</a></Link></h3>
                                    <ul>
                                        <li><i className="far fa-calendar-alt"></i>08 Dec, 2022</li>
                                        <li><i className="far fa-clock"></i> 10:00 PM</li>
                                    </ul>
                                    <p>Knowledge is power. Information is liberating. Education is the premise of progress, in every society, in every family</p>
                                    <Link href="/webinar-details" legacyBehavior><a className='edu-btn'>Read More</a></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="edu-webinar mb-30">
                                <div className="edu-webinar-img">
                                    <img src="assets/img/webinar/webinar-img-1.jpg" alt="img not found" />
                                </div>
                                <div className="edu-webinar-text">
                                    <h3 className="edu-webinar-text-title"><Link href="/webinar-details" legacyBehavior><a>Become a Super Human: Naturally and Safely Boost</a></Link></h3>
                                    <ul>
                                        <li><i className="far fa-calendar-alt"></i>07 Dec, 2022</li>
                                        <li><i className="far fa-clock"></i> 10:00 PM</li>
                                    </ul>
                                    <p>Knowledge is power. Information is liberating. Education is the premise of progress, in every society, in every family</p>
                                    <Link href="/webinar-details" legacyBehavior><a className='edu-btn'>Read More</a></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="edu-webinar mb-30">
                                <div className="edu-webinar-img">
                                    <img src="assets/img/webinar/webinar-img-2.jpg" alt="img not found" />
                                </div>
                                <div className="edu-webinar-text">
                                    <h3 className="edu-webinar-text-title"><Link href="/webinar-details" legacyBehavior><a>Write Better Emails: Tactics for Smarter Team Communication</a></Link></h3>
                                    <ul>
                                        <li><i className="far fa-calendar-alt"></i>06 Dec, 2022</li>
                                        <li><i className="far fa-clock"></i> 10:00 PM</li>
                                    </ul>
                                    <p>Knowledge is power. Information is liberating. Education is the premise of progress, in every society, in every family</p>
                                    <Link href="/webinar-details" legacyBehavior><a className='edu-btn'>Read More</a></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WebinarsContent;