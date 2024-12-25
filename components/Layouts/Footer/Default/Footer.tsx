import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IFooter } from '../../../../interfaces/footerSetting';
import getImage from '../../../../helpers/getImage';
import DOMPurify from 'isomorphic-dompurify';

const Footer = () => {
    interface iDataType {
        site_footer_logo : string;
        site_footer_about_company: string
        site_footer_menu_1_title: string
        menu_c1: []
        site_footer_menu_2_title: string
        menu_c2: []
        site_footer_newsletter_title: string
        site_footer_app_download_title: string
        site_footer_newsletter_message: string
        site_footer_android_app_logo: string
        site_footer_apple_app_logo: string
        site_footer_copyright: string
        menu_copyright: []
        social_links: []
    };
    const [data, setData] = useState<iDataType>()

    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/site-setting/footer`,
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

    // handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return typeof data !== 'undefined'  &&  data !== null ? (
        <>
            {data && (
                <footer>
                    <div className="university-footer-area pt-100 pb-60">
                        <div className="footer">
                            <div className="container">
                                <div className="footer-main">
                                    <div className="row">
                                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
                                            <div className="university-footer-widget uf-w1 mb-40">
                                                <div className="footer-widget-head">
                                                    <div className="footer-logo mb-30">
                                                        <Link href="/" legacyBehavior><a><img src={getImage(data.site_footer_logo)} alt="img not found" /></a></Link>
                                                    </div>
                                                </div>
                                                <div className="university-footer-widget-body">
                                                    <div className="mb-30" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.site_footer_about_company) }} />
                                                    <div className="university-footer-icon">
                                                        <ul>
                                                            {data.social_links && data.social_links.map((menuItem: IFooter) => (
                                                                <li key={menuItem.link}><Link href={menuItem.link ?? "/"} legacyBehavior><a><i className={menuItem.icon}></i></a></Link></li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
                                            <div className="university-footer-widget uf-w2 mb-40">
                                                <div className="university-footer-widget-head mb-35">
                                                    <h4 className="university-footer-widget-title">{data.site_footer_menu_1_title}</h4>
                                                </div>
                                                <div className="university-footer-widget-body">
                                                    <div className="university-footer-link">
                                                        <ul>
                                                            {data.menu_c1 && data.menu_c1.map((menuItem: IFooter) => (
                                                                <li key={menuItem.id}><Link href={menuItem.url ?? "/"} legacyBehavior><a>{menuItem.title}</a></Link></li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
                                            <div className="university-footer-widget uf-w3 mb-40">
                                                <div className="university-footer-widget-head mb-35">
                                                    <h4 className="university-footer-widget-title">{data.site_footer_menu_2_title}</h4>
                                                </div>
                                                <div className="university-footer-widget-body">
                                                    <div className="university-footer-link">
                                                        <ul>
                                                            {data.menu_c2 && data.menu_c2.map((menuItem: IFooter) => (
                                                                <li key={menuItem.id}><Link href={menuItem.url ?? "/"} legacyBehavior><a>{menuItem.title}</a></Link></li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
                                            <div className="university-footer-widget uf-w4 mb-40">
                                                <div className="footer-widget-head mb-35">
                                                    <h4 className="footer-widget-title">{data.site_footer_newsletter_title}</h4>
                                                </div>
                                                <div className="university-footer-widget-body">
                                                    <div className="university-footer-subscribe">
                                                        <form onSubmit={handleSubmit}>
                                                            <div className="university-footer-subscribe position-relative mb-35">
                                                                <div className="field po">
                                                                    <input type="email" placeholder={data.site_footer_newsletter_message} />
                                                                </div>
                                                                <button type="submit">
                                                                    <i className="fas fa-paper-plane"></i>
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <h3>{data.site_footer_app_download_title}</h3>
                                                    <div className="app-store">
                                                        <Link href="#" legacyBehavior><a><img src={getImage(data.site_footer_android_app_logo)} alt="img not found" /></a></Link>
                                                        <Link href="#" legacyBehavior><a><img src={getImage(data.site_footer_apple_app_logo)} alt="img not found" /></a></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="university-sub-footer">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-7">
                                    <div className="sub-footer-text">
                                        <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.site_footer_copyright) }} />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-5">
                                    <div className="sub-footer-link">
                                        <ul>
                                            {data.menu_copyright && data.menu_copyright.map((menuItem: IFooter) => (
                                                <li key={menuItem.id}><Link href={menuItem.url ?? "/"} legacyBehavior><a>{menuItem.title}</a></Link></li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            )}
        </>
    ) : null
};

export default Footer;