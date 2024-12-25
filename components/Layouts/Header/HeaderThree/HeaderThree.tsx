import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSticky from '../../../../hooks/useSticky';
import MobileMenu from '../HeaderOne/MobileMenu';
import HeaderMenu from '../HeaderOne/HeaderMenu';
import HeaderTopThree from './HeaderTopThree';
import getImage from '../../../../helpers/getImage';
import storage from "local-storage-fallback"
import { LOCAL_STORAGE_KEYS } from '../../../../hooks/useStorage';

const HeaderThree = () => {
    // sticky nav
    const { sticky } = useSticky();

    const [menuOpen, setMenuOpen] = useState(false)

    const router = useRouter()
    const [path, setPath] = useState("")
    interface iDataType {
        site_header_logo: string;
        site_header_white_logo: string;
        site_header_category_icon: string;
        site_header_name: string;
        site_header_slogan: string;
        site_header_phone: string;
        site_header_email: string;
        site_header_address: string;
        site_header_category_title: string;
        site_header_login_text: string;
        site_header_login_url: string;
        site_header_signup_text: string;
        site_header_signup_url: string;
        site_header_promo_message: string;
    };
    const [data, setData] = useState<iDataType>()
    const UserObj = JSON.parse(storage.getItem(LOCAL_STORAGE_KEYS.APP_USER));
    const logout = () => {
        storage.removeItem(LOCAL_STORAGE_KEYS.APP_TOKEN)
        storage.removeItem(LOCAL_STORAGE_KEYS.APP_USER)
        storage.clear()
        router.push('/login');
    }

    useEffect(() => {
        setPath(router.pathname)
        fetch(
            `${process.env.APP_BACK_END_URL}/site-setting/header`,
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
    }, [router])

    return typeof data !== 'undefined' && data !== null ? (
        <header>
            <div className="university-header-wrapper">
                <HeaderTopThree data={data} />
                {data && (
                    <div className={sticky ? "sticky header-main3 transpaerent-header sticky-header" : "header-main3 transpaerent-header sticky-header"}>
                        <div className="container">
                            <div className="header-main-wrapper">
                                <div className="row align-items-center">
                                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3">
                                        <div className="header-logo">
                                            <Link href="/" legacyBehavior><a><img className="logo-white" src={getImage(data.site_header_white_logo)} alt="logo" /></a></Link>
                                            <Link href="/" legacyBehavior><a><img className="logo-black" src={getImage(data.site_header_logo)} alt="logo" /></a></Link>
                                        </div>
                                    </div>
                                    <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9">
                                        <div className="header-main-right d-flex justify-content-end">
                                            <div className="main-menu d-none d-xl-block">
                                                <nav id="mobile-menu">
                                                    <HeaderMenu />
                                                </nav>
                                            </div>
                                            <div className="header-btn">
                                                {UserObj?.id == null ?
                                                    <Link href={data.site_header_login_url ?? "/"} legacyBehavior><a className="edu-thard-btn d-none d-sm-block">{data.site_header_login_text}</a></Link>
                                                    :
                                                    <ul className='bd-profile-dropdown'>
                                                        <li className="menu-item-has-children"><button type='button' className="profile-button">Profile <i className="far fa-chevron-down"></i></button>
                                                            <ul className="sub-menu">
                                                                <li className='pb-0'><Link href="/my-profile" legacyBehavior><a>Hi, {UserObj.first_name} {UserObj.last_name}</a></Link></li>
                                                                <li><Link href="/my-profile" legacyBehavior><a>Edit Account</a></Link></li>
                                                                <li>
                                                                    <button type='button' className="side-toggle header-3" onClick={() => { logout() }}>Logout</button>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                }
                                                <div className="menu-bar ml-20 bd-profile-menu-space">
                                                    <button type='button' className="side-toggle header-3" onClick={() => { setMenuOpen(!menuOpen) }}>
                                                        <div className="bar-icon header-3">
                                                            <span></span>
                                                            <span></span>
                                                            <span></span>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <MobileMenu data={data} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <div onClick={() => setMenuOpen(false)} className={menuOpen ? "offcanvas-overlay overlay-signin" : "offcanvas-overlay"}></div>

        </header>
    ) : null
};

export default HeaderThree;